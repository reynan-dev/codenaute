import { IsUUID, Matches } from 'class-validator';
import { UUID } from 'utils/types/Uuid';
import { ArgsType, Field } from 'type-graphql';
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
	isPublic: boolean;

	@Field()
	sandpackTemplate: SandpackTemplates;

	@Field()
	files: string;

	@Field()
	environment: string;

	@Field()
	mainFile: string;
}

@ArgsType()
export class getProjectByIdArgs {
	@Field()
	@IsUUID()
	projectId: UUID;
}

@ArgsType()
export class updateProjectArgs {
	@Field()
	@Matches(nameRegExp, { message: ErrorMessages.USERNAME_MUST_BE_LONG_ERROR_MESSAGE })
	name: string;

	@Field()
	projectId: UUID;

	@Field()
	isPublic: boolean;

	@Field()
	sandpackTemplate: SandpackTemplates;

	@Field()
	files: string;

	@Field()
	environment: string;

	@Field()
	mainFile: string;
}
