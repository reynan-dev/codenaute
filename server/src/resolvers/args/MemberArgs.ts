import { IsEmail, Matches, MinLength } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';
import { ErrorMessages } from 'utils/enums/ErrorMessages';
import { Validations } from 'utils/enums/Validations';

const passwordRegExp = new RegExp(Validations.PASSWORD_REGEX);

@ArgsType()
export class SignUpArgs {
	@Field()
	@MinLength(3, { message: ErrorMessages.USERNAME_MUST_BE_LONG_ERROR_MESSAGE })
	username: string;

	@Field()
	@IsEmail()
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

	@Field()
	id: string;
}

@ArgsType()
export class UpdateEmailArgs {
	@Field()
	@IsEmail()
	email: string;

	@Field()
	id: string;
}

@ArgsType()
export class UpdatePasswordArgs {
	@Field()
	@Matches(passwordRegExp, { message: ErrorMessages.PASSWORD_FORMAT_ERROR_MESSAGE })
	password: string;

	@Field()
	@IsEmail()
	email: string;
}

@ArgsType()
export class DeleteAccountArgs {
	@Field()
	@Matches(passwordRegExp, { message: ErrorMessages.PASSWORD_FORMAT_ERROR_MESSAGE })
	password: string;

	@Field()
	id: string;
}
