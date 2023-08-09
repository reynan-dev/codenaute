import { compareSync } from 'bcryptjs';
import { UUID } from 'utils/types/Uuid';
import { Args, Mutation, Ctx, Query, Resolver, Authorized, Arg } from 'type-graphql';
import { Member } from 'models/Member';
import { MemberServices } from 'services/MemberServices';
import {
	DeleteMemberAccountArgs,
	SignInArgs,
	SignUpArgs,
	UpdateMemberEmailArgs,
	UpdateMemberPasswordArgs,
	UpdateMemberUsernameArgs
} from 'resolvers/args/MemberArgs';
import { GlobalContext } from 'utils/types/GlobalContext';
import { ErrorMessages } from 'utils/enums/ErrorMessages';
import { Cookie } from 'utils/methods/Cookie';
import { AuthInterface } from 'utils/interfaces/AuthInterface';

@Resolver(Member)
export class MemberResolver {
	private MemberServices: MemberServices = new MemberServices();

	@Authorized()
	@Mutation(() => Member)
	async deleteMemberAccount(
		@Args() { password }: DeleteMemberAccountArgs,
		@Ctx() context: GlobalContext
	): Promise<Boolean> {
		if (!compareSync(password, context.user?.hashedPassword as string))
			throw Error(ErrorMessages.INVALID_PASSWORD_ERROR_MESSAGE);

		return this.MemberServices.deleteAccount(context.user as Member);
	}

	@Authorized()
	@Mutation(() => Member)
	async getMemberByEmail(@Arg('email') email: string): Promise<Member | null> {
		return await this.MemberServices.findOneBy({ email });
	}

	@Authorized()
	@Query(() => Member)
	async profile(@Ctx() context: GlobalContext): Promise<Member> {
		return context.user as Member;
	}

	@Mutation(() => AuthInterface)
	async signIn(@Args() { email, password }: SignInArgs): Promise<AuthInterface> {
		const { user, session } = await this.MemberServices.signIn(email, password);

		const cookies = Cookie.setSessionToken(session);

		return { user, cookies };
	}

	@Authorized()
	@Mutation(() => Boolean)
	async signOut(@Ctx() context: GlobalContext): Promise<any> {
		return await this.MemberServices.signOut(Cookie.getSessionToken(context) as string);
	}

	@Mutation(() => Member)
	async signUp(
		@Args() { username, email, password, confirmedPassword }: SignUpArgs
	): Promise<Member | null> {
		const checkEmail = (await this.MemberServices.findOneBy({ email })) as Member;
		if (checkEmail) throw Error(ErrorMessages.EMAIL_ALREADY_REGISTERED_ERROR_MESSAGE);

		const checkUsername = (await this.MemberServices.findOneBy({ username })) as Member;
		if (checkUsername) throw Error(ErrorMessages.USERNAME_ALREADY_REGISTERED_ERROR_MESSAGE);

		if (confirmedPassword !== password)
			throw Error(ErrorMessages.PASSWORDS_DO_NOT_MATCH_ERROR_MESSAGE);

		const member = (await this.MemberServices.signUp(username, email, password)) as Member;

		return await this.MemberServices.findById(member.id);
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
		if (!compareSync(oldPassword, context.user?.hashedPassword as string))
			throw Error(ErrorMessages.INVALID_PASSWORD_ERROR_MESSAGE);

		if (newPassword !== confirmedNewPassword)
			throw Error(ErrorMessages.PASSWORDS_DO_NOT_MATCH_ERROR_MESSAGE);

		return this.MemberServices.updatePassword(context.user as Member, newPassword);
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
}
