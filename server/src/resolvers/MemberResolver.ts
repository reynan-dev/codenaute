import { compareSync } from 'bcryptjs';
import { UUID } from 'utils/types/Uuid';
import { Args, Mutation, Ctx, Query, Resolver, Authorized } from 'type-graphql';
import { Member } from 'models/Member';
import { MemberServices } from 'services/MemberServices';
import {
	DeleteMemberAccountArgs,
	SignInArgs,
	SignUpArgs,
	FindMemberByIdArgs,
	UpdateMemberEmailArgs,
	UpdateMemberPasswordArgs,
	UpdateMemberUsernameArgs,
	FollowMemberArgs,
	FindMemberByEmailArgs
} from 'resolvers/args/MemberArgs';
import { GlobalContext } from 'utils/types/GlobalContext';
import { ErrorMessages } from 'utils/enums/ErrorMessages';
import { Cookie } from 'utils/methods/Cookie';

@Resolver(Member)
export class MemberResolver {
	MemberServices: MemberServices = new MemberServices();
	@Mutation(() => Member)
	async signIn(
		@Args() { email, password }: SignInArgs,
		@Ctx() context: GlobalContext
	): Promise<Member> {
		const { user, session } = await this.MemberServices.signIn(email, password);

		Cookie.setSessionToken(context, session.token);

		console.log({ session });

		return user;
	}

	@Mutation(() => Member)
	async signUp(
		@Args() { username, email, password, confirmedPassword }: SignUpArgs
	): Promise<Member | null> {
		const existingEmail = (await this.MemberServices.findOneBy({ email })) as Member;
		const existingUsername = (await this.MemberServices.findOneBy({ username })) as Member;
		if (existingEmail) throw Error(ErrorMessages.EMAIL_ALREADY_REGISTERED_ERROR_MESSAGE);
		if (existingUsername) throw Error(ErrorMessages.USERNAME_ALREADY_REGISTERED_ERROR_MESSAGE);

		if (confirmedPassword !== password)
			throw Error(ErrorMessages.PASSWORDS_DO_NOT_MATCH_ERROR_MESSAGE);

		const newMember = (await this.MemberServices.signUp(username, email, password)) as Member;

		return await this.MemberServices.findById(newMember.id);
	}

	@Authorized()
	@Mutation(() => Boolean)
	async signOut(@Ctx() context: GlobalContext): Promise<any> {
		return await this.MemberServices.signOut(Cookie.getSessionToken(context) as string);
	}

	@Authorized()
	@Query(() => Member)
	async getMemberById(@Args() { memberId }: FindMemberByIdArgs): Promise<Member | null> {
		return await this.MemberServices.findById(memberId);
	}

	@Authorized()
	@Query(() => Member)
	async getMemberByEmail(@Args() { email }: FindMemberByEmailArgs): Promise<Member | null> {
		return await this.MemberServices.findOneByEmail(email);
	}

	@Authorized()
	@Query(() => [Member])
	async getAllMembers(): Promise<Member[]> {
		return await this.MemberServices.find();
	}

	@Authorized()
	@Query(() => Member)
	async profile(@Ctx() context: GlobalContext): Promise<Member> {
		return context.user as Member;
	}

	@Authorized()
	@Mutation(() => Member)
	async followMember(
		@Args() { memberId }: FollowMemberArgs,
		@Ctx() context: GlobalContext
	): Promise<Member> {
		if (context.user?.id === memberId) throw Error(ErrorMessages.CANNOT_FOLLOW_SELF_ERROR_MESSAGE);

		return await this.MemberServices.followMember(context.user?.id as string, memberId);
	}

	@Authorized()
	@Mutation(() => Member)
	async updateMemberUsername(
		@Args() { username }: UpdateMemberUsernameArgs,
		@Ctx() context: GlobalContext
	): Promise<Member> {
		const username_registered = (await this.MemberServices.findOneBy({ username })) as Member;

		if (username_registered) throw Error(ErrorMessages.USERNAME_ALREADY_REGISTERED_ERROR_MESSAGE);

		return await this.MemberServices.updateUsername(context.user?.id as UUID, username);
	}

	@Authorized()
	@Mutation(() => Member)
	async updateMemberEmail(
		@Args() { email }: UpdateMemberEmailArgs,
		@Ctx() context: GlobalContext
	): Promise<Member> {
		const existingEmail = (await this.MemberServices.findOneBy({ email })) as Member;

		if (existingEmail) throw Error(ErrorMessages.EMAIL_ALREADY_REGISTERED_ERROR_MESSAGE);

		return await this.MemberServices.updateEmail(context.user?.id as UUID, email);
	}

	@Authorized()
	@Mutation(() => Member)
	async updateMemberPassword(
		@Args() { newPassword, confirmedNewPassword, oldPassword }: UpdateMemberPasswordArgs,
		@Ctx() context: GlobalContext
	): Promise<Member> {
		const user = (await this.MemberServices.findById(context.user?.id as UUID)) as Member;

		if (!compareSync(oldPassword, user.hashedPassword))
			throw Error(ErrorMessages.INVALID_PASSWORD_ERROR_MESSAGE);

		return this.MemberServices.updatePassword(user.email, newPassword, confirmedNewPassword);
	}

	@Authorized()
	@Mutation(() => Member)
	async deleteMemberAccount(
		@Args() { password }: DeleteMemberAccountArgs,
		@Ctx() context: GlobalContext
	): Promise<Boolean> {
		return this.MemberServices.deleteAccount(context.user?.id as string, password);
	}
}
