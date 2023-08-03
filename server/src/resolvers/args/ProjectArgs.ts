import { IsUUID, Matches } from 'class-validator';
import { UUID } from 'utils/types/Uuid';
import { ArgsType, Field, ID, Int } from 'type-graphql';
import { ErrorMessages } from 'utils/enums/ErrorMessages';
import { Validations } from 'utils/enums/Validations';
import { SandpackTemplates } from 'utils/enums/SandpackTemplates';

const nameRegExp = new RegExp(Validations.PROJECT_NAME_REGEX);

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

	@Field()
	environment: string;

	@Field()
	main: string;
}

@ArgsType()
export class deleteProjectArgs {
	@Field()
	projectId: UUID;
}

@ArgsType()
export class favoriteProjectArgs {
	@Field()
	projectId: UUID;
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
export class getProjectByIdArgs {
	@Field(() => ID)
	@IsUUID()
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

	@Field()
	environment: string;

	@Field()
	main: string;
}
