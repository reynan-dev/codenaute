import { ArgsType, Field } from 'type-graphql';
import { ErrorMessages } from 'utils/enums/ErrorMessages';

@ArgsType()
export class getLanguageByIdArgs {
	@Field()
	languageId: string;
}

@ArgsType()
export class createLanguageArgs {
	@Field()
	name: string;

	@Field()
	version: string;
}

@ArgsType()
export class updateLanguageArgs {
	@Field()
	languageId: string;

	@Field()
	name: string;

	@Field()
	version: string;
}

@ArgsType()
export class deleteLanguageArgs {
	@Field()
	languageId: string;
}
