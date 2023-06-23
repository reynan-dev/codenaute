import { Matches } from 'class-validator';
import { UUID } from 'utils/types/Uuid';
import { ArgsType, Field } from 'type-graphql';
import { ErrorMessages } from 'utils/enums/ErrorMessages';
import { Validations } from 'utils/enums/Validations';

const passwordRegExp = new RegExp(Validations.PASSWORD_REGEX);
const emailRegExp = new RegExp(Validations.EMAIL_REGEX);
const usernameRegExp = new RegExp(Validations.USERNAME_REGEX);

@ArgsType()
export class DeleteMemberAccountArgs {
	@Field()
	@Matches(passwordRegExp, { message: ErrorMessages.PASSWORD_FORMAT_ERROR_MESSAGE })
	password: string;
}

@ArgsType()
export class FindMemberByEmailArgs {
	@Field()
	email: string;
}

@ArgsType()
export class FindMemberByIdArgs {
	@Field()
	memberId: UUID;
}

@ArgsType()
export class FollowMemberArgs {
	@Field()
	memberId: UUID;
}

@ArgsType()
export class SignInArgs {
	@Field()
	@Matches(emailRegExp, { message: ErrorMessages.INVALID_EMAIL_ERROR_MESSAGE })
	email: string;

	@Field()
	@Matches(passwordRegExp, { message: ErrorMessages.PASSWORD_FORMAT_ERROR_MESSAGE })
	password: string;
}

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
	@Matches(passwordRegExp, { message: ErrorMessages.PASSWORD_FORMAT_ERROR_MESSAGE })
	confirmedPassword: string;
}

@ArgsType()
export class UpdateMemberEmailArgs {
	@Field()
	@Matches(emailRegExp, { message: ErrorMessages.INVALID_EMAIL_ERROR_MESSAGE })
	email: string;
}

@ArgsType()
export class UpdateMemberPasswordArgs {
	@Field()
	@Matches(passwordRegExp, { message: ErrorMessages.PASSWORD_FORMAT_ERROR_MESSAGE })
	newPassword: string;

	@Field()
	@Matches(passwordRegExp, { message: ErrorMessages.PASSWORD_FORMAT_ERROR_MESSAGE })
	confirmedNewPassword: string;

	@Field()
	@Matches(passwordRegExp, { message: ErrorMessages.PASSWORD_FORMAT_ERROR_MESSAGE })
	oldPassword: string;
}

@ArgsType()
export class UpdateMemberUsernameArgs {
	@Field()
	@Matches(usernameRegExp, { message: ErrorMessages.USERNAME_MUST_BE_LONG_ERROR_MESSAGE })
	username: string;
}
