import { compareSync, hashSync } from 'bcryptjs';

import { Member } from 'entities/Member';
import { BaseServices } from 'services/base/BaseServices';
import { SessionServices } from 'services/SessionServices';
import { ObjectLiteral } from 'typeorm';

import { ErrorMessages } from 'utils/enums/ErrorMessages';

export class MemberServices extends BaseServices {
	SessionServices: SessionServices = new SessionServices();

	constructor() {
		super(Member);
	}

	async signIn(email: string, password: string) {
		const user = (await this.findOneBy({ email })) as Member;

		if (!user || !compareSync(password, user.hashedPassword))
			throw Error(ErrorMessages.INVALID_CREDENTIALS_ERROR_MESSAGE);

		const session = await this.SessionServices.create(user);

		return { user, session };
	}

	async signUp(username: string, email: string, password: string): Promise<Member> {
		const hashedPassword = hashSync(password, 10);

		return await this.create({
			username: username,
			email: email,
			hashedPassword: hashedPassword
		});
	}

	async signOut(token: string) {
		return await this.SessionServices.delete(token);
	}

	async findBySessionToken(token: string): Promise<Member | null> {
		const member = await this.repository.findOne({ where: {sessions: { token }}, relations: ['projects', 'favorites'] });

		if (!member) return null;

		return member;
	}

	async findOneById (id: string): Promise<Member | null> {
		const member = await this.repository.findOne({ where: {id: id}, relations: ['projects', 'favorites'] });

		if (!member) return null;

		return member;
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

	async updatePassword(email: string, newPassword: string, confirmedNewPassword: string) {
		const user = (await this.findOneBy({ email })) as Member;

		if (!user) throw Error(ErrorMessages.INVALID_EMAIL_ERROR_MESSAGE);

		if (newPassword !== confirmedNewPassword)
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
