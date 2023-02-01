import { Args, Mutation, Ctx, Query, Resolver, Authorized } from 'type-graphql';

import Member from 'entities/Member';
import MemberServices from 'services/MemberServices';

import {
	DeleteAccountArgs,
	SignInArgs,
	SignUpArgs,
	UpdateEmailArgs,
	UpdatePasswordArgs,
	UpdateUsernameArgs
} from 'resolvers/args/MemberArgs';

import { GlobalContext } from 'utils/types/GlobalContext';
import { ErrorMessages } from 'utils/enums/ErrorMessages';
import { Cookie } from 'utils/methods/Cookie';

import { compareSync } from 'bcryptjs';

@Resolver(Member)
export default class MemberResolver {
	@Mutation(() => Member)
	async signIn(
		@Args() { email, password }: SignInArgs,
		@Ctx() context: GlobalContext
	): Promise<Member> {
		const { user, session } = await MemberServices.signIn(email, password);

		Cookie.setSessionToken(context, session.token);

		return user;
	}
	@Mutation(() => Member)
	async signUp(
		@Args() { username, email, password, confirmedPassword }: SignUpArgs
	): Promise<Member> {
		let existingEmail = (await MemberServices.findOneBy({ email })) as Member;
		let existingUsername = (await MemberServices.findOneBy({ username })) as Member;
		if (existingEmail) throw Error(ErrorMessages.EMAIL_ALREADY_REGISTERED_ERROR_MESSAGE);
		if (existingUsername) throw Error(ErrorMessages.USERNAME_ALREADY_REGISTERED_ERROR_MESSAGE);

		if (confirmedPassword !== password) throw ErrorMessages.CONFIRMED_PASSWORD_ERROR_MESSAGE;

		return MemberServices.signUp(username, email, password);
	}

	@Authorized()
	@Mutation(() => Boolean)
	async signOut(@Ctx() context: GlobalContext): Promise<any> {
		return await MemberServices.signOut(Cookie.getSessionToken(context) as string);
	}

	@Authorized()
	@Query(() => Member)
	async profile(@Ctx() context: GlobalContext): Promise<Member> {
		return context.user as Member;
	}

	@Authorized()
	@Mutation(() => Member)
	async updateUsername(
		@Args() { username }: UpdateUsernameArgs,
		@Ctx() context: GlobalContext
	): Promise<Member> {
		const username_registered = (await MemberServices.findOneBy({ username })) as Member;

		if (username_registered) throw Error(ErrorMessages.USERNAME_ALREADY_REGISTERED_ERROR_MESSAGE);

		return await MemberServices.updateUsername(context.user?.id as string, username);
	}

	@Authorized()
	@Mutation(() => Member)
	async updateEmail(
		@Args() { email }: UpdateEmailArgs,
		@Ctx() context: GlobalContext
	): Promise<Member> {
		const email_registered = (await MemberServices.findOneBy({ email })) as Member;

		if (email_registered) throw Error(ErrorMessages.EMAIL_ALREADY_REGISTERED_ERROR_MESSAGE);

		return await MemberServices.updateEmail(context.user?.id as string, email);
	}

	@Authorized()
	@Mutation(() => Member)
	async updatePassword(
		@Args() { newPassword, confirmPassword, oldPassword }: UpdatePasswordArgs,
		@Ctx() context: GlobalContext
	): Promise<Member> {
		const user = (await MemberServices.findById(context.user?.id as string)) as Member;

		if (!compareSync(oldPassword, user.hashedPassword))
			throw Error(ErrorMessages.INVALID_PASSWORD_ERROR_MESSAGE);

		return MemberServices.updatePassword(user.email, newPassword, confirmPassword);
	}

	@Authorized()
	@Mutation(() => Member)
	async deleteAccount(
		@Args() { password }: DeleteAccountArgs,
		@Ctx() context: GlobalContext
	): Promise<Member> {
		return MemberServices.deleteAccount(context.user?.id as string, password);
	}
}
