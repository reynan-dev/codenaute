import { IsEmail, Matches, MinLength } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';
import { ErrorMessages } from 'utils/enums/ErrorMessages';
import { Validations } from 'utils/enums/Validations';

const passwordRegExp = new RegExp(Validations.PASSWORD_REGEX);
const emailRegExp = new RegExp(Validations.EMAIL_REGEX)
const usernameRegExp = new RegExp(Validations.USERNAME_REGEX)


@ArgsType()
export class SignUpArgs {
	@Field()
	@Matches(usernameRegExp, { message: ErrorMessages.USERNAME_MUST_BE_LONG_ERROR_MESSAGE })
	username: string;

	@Field()
	@Matches(emailRegExp, { message: ErrorMessages.INVALID_EMAIL_ERROR_MESSAGE })
	email: string;

	@Field()
	@Matches(passwordRegExp, { message: ErrorMessages.PASSWORD_FORMAT_ERROR_MESSAGE })
	password: string;

	@Field()
	confirmedPassword: string;
}

@ArgsType()
export class SignInArgs {
	@Field()
	@IsEmail()
	email: string;

	@Field()
	password: string;
}

@ArgsType()
export class UpdateUsernameArgs {
	@Field()
	@MinLength(3, { message: ErrorMessages.USERNAME_MUST_BE_LONG_ERROR_MESSAGE })
	username: string;
}

@ArgsType()
export class UpdateEmailArgs {
	@Field()
	@IsEmail()
	email: string;
}

@ArgsType()
export class UpdatePasswordArgs {
	@Field()
	@Matches(passwordRegExp, { message: ErrorMessages.PASSWORD_FORMAT_ERROR_MESSAGE })
	newPassword: string;

	@Field()
	@Matches(passwordRegExp, { message: ErrorMessages.PASSWORD_FORMAT_ERROR_MESSAGE })
	confirmPassword: string;

	@Field()
	@Matches(passwordRegExp, { message: ErrorMessages.PASSWORD_FORMAT_ERROR_MESSAGE })
	oldPassword: string;
}

@ArgsType()
export class DeleteAccountArgs {
	@Field()
	@Matches(passwordRegExp, { message: ErrorMessages.PASSWORD_FORMAT_ERROR_MESSAGE })
	password: string;
}
