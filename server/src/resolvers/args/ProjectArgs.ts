import { Matches } from 'class-validator';
import { ArgsType, Field, InputType } from 'type-graphql';
import { ErrorMessages } from 'utils/enums/ErrorMessages';
import { Validations } from 'utils/enums/Validations';

import ProjectFile from 'entities/ProjectFile';
import Member from 'entities/Member';
import SandpackTemplate from 'entities/SandpackTemplate';
import Language from 'entities/Language';
import {
	LanguageType,
	MemberType,
	ProjectFileType,
	SandpackTemplateType
} from 'utils/types/EntitiesTypes';

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
export class getAllByTemplateArgs {
	@Field(() => SandpackTemplate)
	template: SandpackTemplateType;
}

@ArgsType()
export class getAllByLanguageArgs {
	@Field(() => Language)
	language: LanguageType;
}

@ArgsType()
export class createArgs {
	@Field()
	@Matches(nameRegExp, { message: ErrorMessages.USERNAME_MUST_BE_LONG_ERROR_MESSAGE })
	name: string;

	@Field(() => [Member])
	members: Member[];

	@Field(() => [ProjectFile])
	files: ProjectFileType[];

	@Field(() => Language)
	language: Language;

	@Field(() => SandpackTemplate, { nullable: true })
	template: SandpackTemplateType;

	@Field(() => ProjectFile, { nullable: true })
	activeFile: ProjectFileType;

	@Field()
	isTemplate: boolean;

	@Field()
	isPublic: boolean;
}

@ArgsType()
export class favoriteProjectArgs {
	@Field()
	id: string;
}

@ArgsType()
export class shareProjectArgs {
	@Field()
	id: string;

	@Field(() => [Member])
	members: MemberType[];
}

@ArgsType()
export class addFileArgs {
	@Field()
	id: string;

	@Field(() => [ProjectFile])
	files: ProjectFileType[];
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

	@Field(() => ProjectFile)
	activeFile: ProjectFileType;
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
