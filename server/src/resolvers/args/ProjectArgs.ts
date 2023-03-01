import { Matches } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';
import { ErrorMessages } from 'utils/enums/ErrorMessages';
import { Validations } from 'utils/enums/Validations';

const nameRegExp = new RegExp(Validations.USERNAME_REGEX);

@ArgsType()
export class getByIdArgs {
	@Field()
	projectId: string;
}

@ArgsType()
export class getByNameArgs {
	@Field()
	projectName: string;
}

@ArgsType()
export class getByMemberArgs {
	@Field()
	memberId: string;
}

@ArgsType()
export class getAllByTemplateArgs {
	@Field()
	templateId: string;
}

@ArgsType()
export class getAllByLanguageArgs {
	@Field()
	languageId: string;
}

@ArgsType()
export class createArgs {
	@Field()
	@Matches(nameRegExp, { message: ErrorMessages.USERNAME_MUST_BE_LONG_ERROR_MESSAGE })
	name: string;

	@Field()
	memberId: string;

	@Field()
	languageId: string;

	@Field({ nullable: true })
	templateId: string;

	@Field({ nullable: true })
	activeFileId: string;

	@Field()
	isTemplate: boolean;

	@Field()
	isPublic: boolean;
}

@ArgsType()
export class favoriteProjectArgs {
	@Field()
	projectId: string;
}

@ArgsType()
export class shareProjectArgs {
	@Field()
	projectId: string;

	@Field(() => [String])
	membersId: string[];
}

@ArgsType()
export class updateNameArgs {
	@Field()
	projectId: string;

	@Field()
	@Matches(nameRegExp, { message: ErrorMessages.USERNAME_MUST_BE_LONG_ERROR_MESSAGE })
	name: string;
}

@ArgsType()
export class updateActiveFileArgs {
	@Field()
	projectId: string;

	@Field()
	activeFile: string;
}

@ArgsType()
export class updateIsTemplateArgs {
	@Field()
	projectId: string;

	@Field()
	isTemplate: boolean;
}

@ArgsType()
export class updateIsPublic {
	@Field()
	projectId: string;

	@Field()
	isPublic: boolean;
}

@ArgsType()
export class deleteArgs {
	@Field()
	projectId: string;
}
