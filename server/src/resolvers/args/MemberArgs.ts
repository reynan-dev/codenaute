import { IsEmail, Matches, MinLength } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';
import { ErrorMessages } from '../../utils/enums/ErrorMessages';

const passwordRegExp = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');

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
