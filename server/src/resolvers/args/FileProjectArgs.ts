import { UUID } from 'utils/types/Uuid';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class getAllFilesByProjectIdArgs {
	@Field()
	projectId: UUID;
}

@ArgsType()
export class getFileProjectByIdArgs {
	@Field()
	fileId: UUID;
}

@ArgsType()
export class createFileProjectArgs {
	@Field()
	path: string;

	@Field()
	content: string;

	@Field()
	projectId: UUID;

	@Field({ defaultValue: false, nullable: true })
	isHidden: boolean;
}

@ArgsType()
export class updateFileProjectPathArgs {
	@Field()
	fileId: UUID;

	@Field()
	path: string;
}

@ArgsType()
export class updateFileProjectCodeArgs {
	@Field()
	fileId: UUID;

	@Field()
	content: string;
}

@ArgsType()
export class updateFileProjectHiddenArgs {
	@Field()
	fileId: UUID;

	@Field()
	isHidden: boolean;
}

@ArgsType()
export class deleteFileProjectArgs {
	@Field()
	fileId: UUID;
}
