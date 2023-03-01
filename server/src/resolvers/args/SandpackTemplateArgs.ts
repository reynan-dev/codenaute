import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class getSandpackTemplateByIdArgs {
	@Field()
	sandpackTemplateId: string;
}

@ArgsType()
export class createSandpackTemplateArgs {
	@Field()
	slug: string;
}

@ArgsType()
export class updateSandpackTemplateArgs {
	@Field()
	sandpackTemplateId: string;

	@Field()
	slug: string;
}

@ArgsType()
export class deleteSandpackTemplateArgs {
	@Field()
	sandpackTemplateId: string;
}
