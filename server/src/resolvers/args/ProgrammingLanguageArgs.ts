import { UUID } from 'utils/types/Uuid';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class getProgrammingLanguageByIdArgs {
	@Field()
	languageId: UUID;
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
	languageId: UUID;

	@Field()
	name: string;

	@Field()
	version: string;
}

@ArgsType()
export class deleteProgrammingLanguageArgs {
	@Field()
	languageId: UUID;
}
