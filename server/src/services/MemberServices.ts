import { compareSync, hashSync } from 'bcryptjs';
import { UUID } from 'utils/types/Uuid';
import { Member } from 'models/Member';
import { BaseServices } from 'services/base/BaseServices';
import { SessionServices } from 'services/SessionServices';
import { ErrorMessages } from 'utils/enums/ErrorMessages';

export class MemberServices extends BaseServices {
	SessionServices: SessionServices = new SessionServices();

	constructor() {
		super(Member);
	}

	async deleteAccount(member: Member) {
		await this.delete(member.id);

		return true;
	}

	async findOneBySessionToken(token: string): Promise<Member | null> {
		const member = await this.repository.findOne({
			where: { sessions: { token } },
			relations: ['ownedProjects']
		});

		if (!member) return null;

		return member;
	}

	async signIn(email: string, password: string) {
		const user = (await this.findOneBy({ email })) as Member;

		if (!user || !compareSync(password, user.hashedPassword))
			throw Error(ErrorMessages.INVALID_CREDENTIALS_ERROR_MESSAGE);

		const session = await this.SessionServices.create(user);

		return { user, session };
	}

	async signOut(token: string) {
		return await this.SessionServices.delete(token);
	}

	async signUp(username: string, email: string, password: string): Promise<Member> {
		const hashedPassword = hashSync(password, 10);

		return await this.create({
			username: username,
			email: email,
			hashedPassword: hashedPassword
		});
	}

	async updateEmail(memberId: UUID, email: string) {
		return await this.update(memberId, { email, isValidEmail: false });
	}

	async updatePassword(user: Member, password: string) {
		const hashedPassword = hashSync(password, 10);

		return await this.update(user.id, { hashedPassword });
	}

	async updateUsername(memberId: UUID, username: string) {
		return await this.update(memberId, { username });
	}
}
