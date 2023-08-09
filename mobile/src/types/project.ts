export interface ProjectContextData {
	id?: string;
	name: string;
	sandpackTemplate?: string;
	files: SandpackFiles;
	environment: string;
	mainFile: string;
	isPublic: boolean;
	isTemplate: boolean;
}

export type SetProjectContextData = React.Dispatch<React.SetStateAction<ProjectContextData | null>>;

export interface SandpackFile {
	code: string;
	hidden?: boolean;
	active?: boolean;
	readOnly?: boolean;
}

export declare type SandpackFiles = Record<string, string | SandpackFile>;
