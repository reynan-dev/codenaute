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
	async signUp(@Args() { username, email, password }: SignUpArgs): Promise<Member> {

		const user = MemberServices.signUp(username, email, password)

		return user;
	}

	@Mutation(() => Boolean)
	async signOut(@Ctx() context: GlobalContext): Promise<any> {
		const token = Cookie.getSessionToken(context) as string;

		await MemberServices.signOut(token);
	}

	@Authorized()
	@Query(() => Member)
	async profile(@Ctx() context: GlobalContext): Promise<Member> {
		return context.user as Member;
	}

	@Authorized()
	@Mutation(() => Member)
	async updateUsername(@Args() { username, id }: UpdateUsernameArgs): Promise<Member> {
		const user = (await MemberServices.findOneBy({ username })) as Member;

		if (user) throw Error(ErrorMessages.USERNAME_ALREADY_REGISTERED_ERROR_MESSAGE);

		return await MemberServices.updateUsername(id, username);
	}

	@Authorized()
	@Mutation(() => Member)
	async updateEmail(@Args() { email, id }: UpdateEmailArgs): Promise<Member> {
		const user = (await MemberServices.findOneBy({ email })) as Member;

		if (user) throw Error(ErrorMessages.EMAIL_ALREADY_REGISTERED_ERROR_MESSAGE);

		return await MemberServices.updateEmail(id, email);
	}

	@Authorized()
	@Mutation(() => Member)
	async updatePassword(@Args() { password, email }: UpdatePasswordArgs): Promise<Member> {
		return await MemberServices.updatePassword(email, password);
	}

	@Authorized()
	@Mutation(() => Member)
	async deleteAccount(@Args() { password, id }: DeleteAccountArgs): Promise<Member> {
		return await MemberServices.deleteAccount(id, password);
	}
}
