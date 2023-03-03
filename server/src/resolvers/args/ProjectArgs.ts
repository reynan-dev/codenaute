import { Matches } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';
import { ErrorMessages } from 'utils/enums/ErrorMessages';
import { Validations } from 'utils/enums/Validations';

const nameRegExp = new RegExp(Validations.USERNAME_REGEX);

@ArgsType()
export class getProjectByIdArgs {
	@Field()
	projectId: string;
}

@ArgsType()
export class getProjectByNameArgs {
	@Field()
	projectName: string;
}

@ArgsType()
export class getProjectByMemberArgs {
	@Field()
	memberId: string;
}

@ArgsType()
export class getAllProjectByTemplateArgs {
	@Field()
	templateId: string;
}

@ArgsType()
export class getAllProjectByProgrammingLanguageArgs {
	@Field()
	languageId: string;
}

@ArgsType()
export class createProjectArgs {
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
export class updateProjectNameArgs {
	@Field()
	projectId: string;

	@Field()
	@Matches(nameRegExp, { message: ErrorMessages.USERNAME_MUST_BE_LONG_ERROR_MESSAGE })
	name: string;
}

@ArgsType()
export class updateProjectActiveFileArgs {
	@Field()
	projectId: string;

	@Field()
	activeFile: string;
}

@ArgsType()
export class updateProjectIsTemplateArgs {
	@Field()
	projectId: string;

	@Field()
	isTemplate: boolean;
}

@ArgsType()
export class updateProjectIsPublic {
	@Field()
	projectId: string;

	@Field()
	isPublic: boolean;
}

@ArgsType()
export class deleteProjectArgs {
	@Field()
	projectId: string;
}
