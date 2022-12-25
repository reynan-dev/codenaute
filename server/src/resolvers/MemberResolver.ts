import { Args, Mutation, Ctx, Query, Resolver, Authorized } from 'type-graphql';

import Member from '../entities/Member';
import Session from '../entities/Session';
import MemberServices from '../services/MemberServices';

import { SignInArgs, SignUpArgs } from './args/MemberArgs';

import { GlobalContext } from '../utils/GlobalContext';
import { setSessionTokenInCookie } from '../utils/setSessionTokenInCookie';
import { getSessionTokenInCookie } from '../utils/getSessionTokenInCookie';
import SessionServices from '../services/SessionServices';

@Resolver(Member)
export default class MemberResolver {
	@Mutation(() => Member)
	async signIn(
		@Args() { email, password }: SignInArgs,
		@Ctx() context: GlobalContext
	): Promise<Member> {
		const { user, session } = await MemberServices.signIn(email, password);

		setSessionTokenInCookie(context, session.token);
		return user;
	}
	@Mutation(() => Member)
	async signUp(@Args() { username, email, password }: SignUpArgs): Promise<Member> {
		const { user } = await MemberServices.signUp(username, email, password);

		return user;
	}

	@Mutation(() => Boolean)
	async signOut(@Ctx() context: GlobalContext): Promise<any> {
		const token = getSessionTokenInCookie(context) as string;

		await MemberServices.signOut(token);
	}

	@Authorized()
	@Query(() => Member)
	async profile(@Ctx() context: GlobalContext): Promise<Member> {
		return context.user as Member;
	}
}
