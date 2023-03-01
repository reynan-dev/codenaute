import { Args, Mutation, Resolver } from 'type-graphql';

import { Member } from 'entities/Member';
import { RoutingToken } from 'entities/RoutingToken';

import { MemberServices } from 'services/MemberServices';
import { RoutingTokenServices } from 'services/RoutingTokenServices';

import { ErrorMessages } from 'utils/enums/ErrorMessages';

import {
	ForgotPasswordArgs,
	ResetPasswordArgs,
	ValidEmailArgs
} from 'resolvers/args/RoutingTokenArgs';

@Resolver(RoutingToken)
export class MemberResolver {
	MemberServices: MemberServices = new MemberServices();
	RoutingTokenServices: RoutingTokenServices = new RoutingTokenServices();
	@Mutation(() => RoutingToken)
	async forgotPassword(@Args() { email }: ForgotPasswordArgs): Promise<void> {
		const user = (await this.MemberServices.findOneBy({ email })) as Member;

		if (!user) throw Error(ErrorMessages.EMAIL_NOT_FOUND_ERROR_MESSAGE);

		const routingToken = await this.RoutingTokenServices.create(user);

		// await RoutingTokenServices.sendEmail(routingToken);

		// TODO: Implement jobs to send email with token
	}

	@Mutation(() => Member)
	async resetPassword(
		@Args() { token, newPassword, confirmPassword }: ResetPasswordArgs
	): Promise<Member> {
		const routingToken = (await this.RoutingTokenServices.findByToken(token)) as RoutingToken;

		if (!routingToken) throw Error(ErrorMessages.INVALID_TOKEN_ERROR_MESSAGE);

		return await this.MemberServices.updatePassword(
			routingToken.email,
			newPassword,
			confirmPassword
		);
	}

	@Mutation(() => RoutingToken)
	async validEmail(@Args() { id, token }: ValidEmailArgs): Promise<Member> {
		const routingToken = (await this.RoutingTokenServices.findByToken(token)) as RoutingToken;

		if (!routingToken) throw Error(ErrorMessages.INVALID_TOKEN_ERROR_MESSAGE);

		return await this.MemberServices.validEmail(id);
	}
}
