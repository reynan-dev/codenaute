import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class getAllFilesByProjectArgs {
	@Field()
	projectId: string;
}

@ArgsType()
export class getFileProjectByIdArgs {
	@Field()
	fileId: string;
}

@ArgsType()
export class createFileProjectArgs {
	@Field()
	path: string;

	@Field()
	content: string;

	@Field()
	projectId: string;

	@Field({ defaultValue: false, nullable: true })
	isHidden: boolean;
}

@ArgsType()
export class updatePathFileProjectArgs {
	@Field()
	fileId: string;

	@Field()
	path: string;
}

@ArgsType()
export class updateCodeFileProjectArgs {
	@Field()
	fileId: string;

	@Field()
	content: string;
}

@ArgsType()
export class updateHiddenFileProjectArgs {
	@Field()
	fileId: string;

	@Field()
	isHidden: boolean;
}

@ArgsType()
export class deleteFileProjectArgs {
	@Field()
	fileId: string;
}
