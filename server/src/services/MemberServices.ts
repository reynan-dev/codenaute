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

	async findOneBySessionToken(token: string): Promise<Member | null> {
		const member = await this.repository.findOne({
			where: { sessions: { token } },
			relations: [
				'ownedProjects',
				'projectsInvitedOn',
				'favoritedProjects',
				'followers',
				'following'
			]
		});

		if (!member) return null;

		return member;
	}

	async findOneById(memberId: UUID): Promise<Member | null> {
		const member = await this.repository.findOne({
			where: { id: memberId },
			relations: [
				'ownedProjects',
				'projectsInvitedOn',
				'favoritedProjects',
				'followers',
				'following'
			]
		});

		if (!member) return null;

		return member;
	}

	async followMember(memberId: UUID, memberToFollowId: UUID) {
		const member = (await this.findOneById(memberId)) as Member;
		const memberToFollow = (await this.findOneById(memberToFollowId)) as Member;

		if (!member || !memberToFollow) throw Error(ErrorMessages.MEMBER_NOT_FOUND);

		if (member.following.includes(memberToFollow))
			throw Error(ErrorMessages.ALREADY_FOLLOWING_MEMBER_ERROR_MESSAGE);

		member.following.push(memberToFollow);

		return this.repository.save(member);
	}

	async updateUsername(memberId: UUID, username: string) {
		return await this.update(memberId, { username });
	}

	async updateEmail(memberId: UUID, email: string) {
		return await this.update(memberId, { email, isValidEmail: false });
	}

	async validEmail(email: string) {
		const member = await this.findOneBy({ email });

		return await this.update(member.id, { isValidEmail: true });
	}

	async updatePassword(email: string, newPassword: string, confirmedNewPassword: string) {
		const user = (await this.findOneBy({ email })) as Member;

		if (!user) throw Error(ErrorMessages.INVALID_EMAIL_ERROR_MESSAGE);

		if (newPassword !== confirmedNewPassword)
			throw Error(ErrorMessages.PASSWORDS_DO_NOT_MATCH_ERROR_MESSAGE);

		const hashedPassword = hashSync(newPassword, 10);

		return await this.update(user.id, { hashedPassword });
	}

	async deleteAccount(memberId: UUID, password: string) {
		const user = (await this.findOneBy({ id: memberId })) as Member;

		if (!compareSync(password, user.hashedPassword))
			throw Error(ErrorMessages.INVALID_PASSWORD_ERROR_MESSAGE);

		await this.delete(memberId);

		return true;
	}
}
