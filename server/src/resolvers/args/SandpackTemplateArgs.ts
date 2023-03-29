import { UUID } from 'utils/types/Uuid';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class getSandpackTemplateByIdArgs {
	@Field()
	sandpackTemplateId: UUID;
}

@ArgsType()
export class createSandpackTemplateArgs {
	@Field()
	slug: string;
}

@ArgsType()
export class updateSandpackTemplateArgs {
	@Field()
	sandpackTemplateId: UUID;

	@Field()
	slug: string;
}

@ArgsType()
export class deleteSandpackTemplateArgs {
	@Field()
	sandpackTemplateId: UUID;
}
