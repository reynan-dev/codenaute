import { IsUUID, Matches } from 'class-validator';
import { UUID } from 'utils/types/Uuid';
import { ArgsType, Field, ID, Int } from 'type-graphql';
import { ErrorMessages } from 'utils/enums/ErrorMessages';
import { Validations } from 'utils/enums/Validations';
import { ProgrammingLanguages } from 'utils/enums/ProgrammingLanguages';
import { SandpackTemplates } from 'utils/enums/SandpackTemplates';
import { SandpackFiles } from 'utils/types/Sandpack';

const nameRegExp = new RegExp(Validations.PROJECT_NAME_REGEX);

@ArgsType()
export class getProjectByIdArgs {
	@Field(() => ID)
	@IsUUID()
	projectId: UUID;
}

@ArgsType()
export class getProjectsByNameArgs {
	@Field()
	projectName: string;
}

@ArgsType()
export class getAllProjectsByMemberArgs {
	@Field()
	memberId: UUID;
}

@ArgsType()
export class getAllProjectsByTemplateArgs {
	@Field()
	template: SandpackTemplates;
}

@ArgsType()
export class createProjectArgs {
	@Field()
	@Matches(nameRegExp, { message: ErrorMessages.INVALID_PROJECT_NAME })
	name: string;

	@Field()
	memberId: UUID;

	@Field()
	isTemplate: boolean;

	@Field()
	isPublic: boolean;

	@Field()
	sandpackTemplate: SandpackTemplates;

	@Field()
	files: string;
}

@ArgsType()
export class updateProjectArgs {
	@Field()
	@Matches(nameRegExp, { message: ErrorMessages.USERNAME_MUST_BE_LONG_ERROR_MESSAGE })
	name: string;

	@Field()
	projectId: UUID;

	@Field()
	isTemplate: boolean;

	@Field()
	isPublic: boolean;

	@Field()
	sandpackTemplate: SandpackTemplates;

	@Field()
	files: string;
}

@ArgsType()
export class favoriteProjectArgs {
	@Field()
	projectId: UUID;
}

@ArgsType()
export class shareProjectArgs {
	@Field()
	projectId: UUID;

	@Field(() => [String])
	membersId: UUID[];
}

@ArgsType()
export class updateProjectNameArgs {
	@Field()
	projectId: UUID;

	@Field()
	@Matches(nameRegExp, { message: ErrorMessages.USERNAME_MUST_BE_LONG_ERROR_MESSAGE })
	name: string;
}

@ArgsType()
export class updateProjectActiveFileArgs {
	@Field()
	projectId: UUID;

	@Field()
	activeFileId: UUID;
}

@ArgsType()
export class updateProjectIsTemplateArgs {
	@Field()
	projectId: UUID;

	@Field()
	isTemplate: boolean;
}

@ArgsType()
export class updateProjectIsPublic {
	@Field()
	projectId: UUID;

	@Field()
	isPublic: boolean;
}

@ArgsType()
export class deleteProjectArgs {
	@Field()
	projectId: UUID;
}
