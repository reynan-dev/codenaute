import { Matches } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';
import { ErrorMessages } from 'utils/enums/ErrorMessages';
import { Validations } from 'utils/enums/Validations';

const nameRegExp = new RegExp(Validations.USERNAME_REGEX);

@ArgsType()
export class getProjectsByIdArgs {
	@Field()
	projectId: string;
}

@ArgsType()
export class getProjectsByNameArgs {
	@Field()
	projectName: string;
}

@ArgsType()
export class getProjectsByMemberArgs {
	@Field()
	memberId: string;
}

@ArgsType()
export class getAllProjectsByTemplateArgs {
	@Field()
	templateId: string;
}

@ArgsType()
export class getAllProjectsByProgrammingLanguageArgs {
	@Field()
	languageId: string;
}

@ArgsType()
export class createProjectsArgs {
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
export class favoriteProjectsArgs {
	@Field()
	projectId: string;
}

@ArgsType()
export class shareProjectsArgs {
	@Field()
	projectId: string;

	@Field(() => [String])
	membersId: string[];
}

@ArgsType()
export class updateProjectsNameArgs {
	@Field()
	projectId: string;

	@Field()
	@Matches(nameRegExp, { message: ErrorMessages.USERNAME_MUST_BE_LONG_ERROR_MESSAGE })
	name: string;
}

@ArgsType()
export class updateProjectsActiveFileArgs {
	@Field()
	projectId: string;

	@Field()
	activeFile: string;
}

@ArgsType()
export class updateProjectsIsTemplateArgs {
	@Field()
	projectId: string;

	@Field()
	isTemplate: boolean;
}

@ArgsType()
export class updateProjectsIsPublic {
	@Field()
	projectId: string;

	@Field()
	isPublic: boolean;
}

@ArgsType()
export class deleteProjectsArgs {
	@Field()
	projectId: string;
}
