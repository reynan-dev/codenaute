import { IsEmail, Matches } from 'class-validator';
import { UUID } from 'utils/types/Uuid';
import { ArgsType, Field } from 'type-graphql';
import { ErrorMessages } from 'utils/enums/ErrorMessages';
import { Validations } from 'utils/enums/Validations';

const passwordRegExp = new RegExp(Validations.PASSWORD_REGEX);

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
	newPassword: string;

	@Field()
	@Matches(passwordRegExp, { message: ErrorMessages.PASSWORD_FORMAT_ERROR_MESSAGE })
	confirmPassword: string;

	@Field()
	token: string;
}

@ArgsType()
export class ValidEmailArgs {
	@Field()
	token: string;
}
