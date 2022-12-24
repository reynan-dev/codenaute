import { IsEmail, Matches } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';
import { ErrorMessages } from '../../utils/enums/ErrorMessages';

const passwordRegExp = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');

@ArgsType()
export class ForgotPasswordArgs {
	@Field()
	@IsEmail()
	email: string;
}

@ArgsType()
export class ResetPasswordArgs {
	@Field()
	@Matches(passwordRegExp, { message: ErrorMessages.PASSWORD_FORMAT_ERROR_MESSAGE })
	password: string;

	@Field()
	token: string;
}

@ArgsType()
export class ValidEmailArgs {
	@Field()
	id: string;

	@Field()
	token: string;
}
