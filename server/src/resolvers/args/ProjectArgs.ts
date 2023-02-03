import { Matches } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';
import { ErrorMessages } from 'utils/enums/ErrorMessages';
import { Validations } from 'utils/enums/Validations';

const nameRegExp = new RegExp(Validations.USERNAME_REGEX);

@ArgsType()
export class getByIdArgs {
	@Field()
	id: string;
}

@ArgsType()
export class getByNameArgs {
	@Field()
	name: string;
}

@ArgsType()
export class getByMemberArgs {
	@Field()
	id: string;
}

@ArgsType()
export class createArgs {
	@Field()
	@Matches(nameRegExp, { message: ErrorMessages.USERNAME_MUST_BE_LONG_ERROR_MESSAGE })
	name: string;

	@Field()
	members: string[];

	@Field()
	files: string[];

	@Field()
	language: string;

	@Field()
	template: string;

	@Field()
	activeFile: string;

	@Field()
	isTemplate: boolean;

	@Field()
	isPublic: boolean;
}

@ArgsType()
export class shareProjectArgs {
	@Field()
	id: string;

	@Field()
	members: string[];
}

@ArgsType()
export class addFileArgs {
	@Field()
	id: string;

	@Field()
	files: string[];
}

@ArgsType()
export class updateNameArgs {
	@Field()
	id: string;

	@Field()
	@Matches(nameRegExp, { message: ErrorMessages.USERNAME_MUST_BE_LONG_ERROR_MESSAGE })
	name: string;
}

@ArgsType()
export class updateActiveFileArgs {
	@Field()
	id: string;

	@Field()
	activeFile: string;
}

@ArgsType()
export class updateIsTemplateArgs {
	@Field()
	id: string;

	@Field()
	isTemplate: boolean;
}

@ArgsType()
export class updateIsPublic {
	@Field()
	id: string;

	@Field()
	isPublic: boolean;
}

@ArgsType()
export class deleteArgs {
	@Field()
	id: string;
}
