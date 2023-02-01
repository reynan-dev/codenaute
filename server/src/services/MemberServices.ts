import { compareSync, hashSync } from 'bcryptjs';

import Member from 'entities/Member';
import BaseServices from 'services/base/BaseServices';
import SessionServices from 'services/SessionServices';

import { ErrorMessages } from 'utils/enums/ErrorMessages';

class MemberServices extends BaseServices {
	constructor() {
		super(Member);
	}

	async signIn(email: string, password: string) {
		const user = (await this.findOneBy({ email })) as Member;

		if (!user || !compareSync(password, user.hashedPassword))
			throw Error(ErrorMessages.INVALID_CREDENTIALS_ERROR_MESSAGE);

		const session = await SessionServices.create(user);

		return { user, session };
	}

	async signUp(username: string, email: string, password: string) {
		let user = (await this.findOneBy({ email })) as Member;

		if (user) throw Error(ErrorMessages.MEMBER_ALREADY_EXISTS_ERROR_MESSAGE);

		const hashedPassword = hashSync(password, 10);

		return await this.create({
			username: username,
			email: email,
			hashedPassword: hashedPassword
		});
	}

	async signOut(token: string) {
		return await SessionServices.delete(token);
	}

	async findBySessionToken(token: string): Promise<Member | null> {
		const session = await SessionServices.findByToken(token);

		if (!session) return null;

		return session.member;
	}

	async updateUsername(id: string, username: string) {
		return await this.update(id, { username });
	}

	async updateEmail(id: string, email: string) {
		return await this.update(id, { email });
	}

	async validEmail(id: string) {
		return await this.update(id, { isValidEmail: true });
	}

	async updatePassword(email: string, newPassword: string, confirmPasssword: string) {
		const user = (await this.findOneBy({ email })) as Member;

		if (!user) throw Error(ErrorMessages.INVALID_EMAIL_ERROR_MESSAGE);

		if (newPassword !== confirmPasssword)
			throw Error(ErrorMessages.PASSWORDS_DO_NOT_MATCH_ERROR_MESSAGE);

		const hashedPassword = hashSync(newPassword, 10);

		return await this.update(user.id, { hashedPassword });
	}

	async deleteAccount(id: string, password: string) {
		const user = (await this.findOneBy({ id })) as Member;

		if (!compareSync(password, user.hashedPassword))
			throw Error(ErrorMessages.INVALID_PASSWORD_ERROR_MESSAGE);

		return await this.delete(id);
	}
}

export default new MemberServices();
