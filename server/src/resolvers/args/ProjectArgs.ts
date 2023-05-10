import { Matches } from 'class-validator';
import { UUID } from 'utils/types/Uuid';
import { ArgsType, Field } from 'type-graphql';
import { ErrorMessages } from 'utils/enums/ErrorMessages';
import { Validations } from 'utils/enums/Validations';

const nameRegExp = new RegExp(Validations.USERNAME_REGEX);

@ArgsType()
export class getProjectByIdArgs {
	@Field()
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
	templateId: UUID;
}

@ArgsType()
export class getAllProjectsByProgrammingLanguageArgs {
	@Field()
	languageId: UUID;
}

@ArgsType()
export class createProjectArgs {
	@Field()
	@Matches(nameRegExp, { message: ErrorMessages.USERNAME_MUST_BE_LONG_ERROR_MESSAGE })
	name: string;

	@Field()
	memberId: UUID;

	@Field()
	isTemplate: boolean;

	@Field()
	isPublic: boolean;
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
