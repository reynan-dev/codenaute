import { IsEmail, Matches, MinLength } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';

const passwordRegExp = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');

@ArgsType()
export class SignUpArgs {
	@Field()
	@MinLength(1, {
		message: 'Le username doit faire au moins un caractère de long.'
	})
	username: string;

	@Field()
	@IsEmail()
	email: string;

	@Field()
	@Matches(passwordRegExp, {
		message:
			'Le mot de passe doit comporter au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.'
	})
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