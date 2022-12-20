import { Args, Mutation, Ctx, Query, Resolver, Authorized } from 'type-graphql';

import Member from '../entities/Member.js';
import MemberServices from '../services/MemberServices.js';

import { SignInArgs, SignUpArgs } from './args/MemberArgs.js';

import { GlobalContext } from '../utils/GlobalContext.js';

@Resolver(Member)
export default class MemberResolver {
	@Mutation(() => Member)
	async signIn(
		@Args() { email, password }: SignInArgs,
		@Ctx() context: GlobalContext
	): Promise<Member> {
		const { user, session } = await MemberServices.signIn(email, password);

		return user;
	}

	@Authorized()
	@Query(() => Member)
	async me(@Ctx() context: GlobalContext): Promise<Member> {
		return context.user as Member;
	}
}
