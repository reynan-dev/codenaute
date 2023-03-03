import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class getProgrammingLanguageByIdArgs {
	@Field()
	languageId: string;
}

@ArgsType()
export class createProgrammingLanguageArgs {
	@Field()
	name: string;

	@Field()
	version: string;
}

@ArgsType()
export class updateProgrammingLanguageArgs {
	@Field()
	languageId: string;

	@Field()
	name: string;

	@Field()
	version: string;
}

@ArgsType()
export class deleteProgrammingLanguageArgs {
	@Field()
	languageId: string;
}
