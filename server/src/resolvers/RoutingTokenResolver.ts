import { Args, Mutation, Resolver } from 'type-graphql';

import Member from '@/entities/Member';
import RoutingToken from '@/entities/RoutingToken';

import MemberServices from '@/services/MemberServices';
import RoutingTokenServices from '@/services/RoutingTokenServices';

import { ErrorMessages } from '@/utils/enums/ErrorMessages';

import {
	ForgotPasswordArgs,
	ResetPasswordArgs,
	ValidEmailArgs
} from '@/resolvers/args/RoutingTokenArgs';

@Resolver(RoutingToken)
export default class MemberResolver {
	@Mutation(() => RoutingToken)
	async forgotPassword(@Args() { email }: ForgotPasswordArgs): Promise<void> {
		const user = (await MemberServices.findOneBy({ email })) as Member;

		if (!user) throw Error(ErrorMessages.EMAIL_NOT_FOUND_ERROR_MESSAGE);

		const routingToken = await RoutingTokenServices.create(user);

		// await RoutingTokenServices.sendEmail(routingToken);
	}

	@Mutation(() => Member)
	async resetPassword(@Args() { token, password }: ResetPasswordArgs): Promise<Member> {
		const routingToken = (await RoutingTokenServices.findByToken(token)) as RoutingToken;

		if (!routingToken) throw Error(ErrorMessages.INVALID_TOKEN_ERROR_MESSAGE);

		return await MemberServices.updatePassword(routingToken.email, password);
	}

	@Mutation(() => RoutingToken)
	async validEmail(@Args() { id, token }: ValidEmailArgs): Promise<Member> {
		const routingToken = (await RoutingTokenServices.findByToken(token)) as RoutingToken;

		if (!routingToken) throw Error(ErrorMessages.INVALID_TOKEN_ERROR_MESSAGE);

		return await MemberServices.validEmail(id);
	}
}
