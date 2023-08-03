export interface SandpackFile {
	code: string;
	hidden?: boolean;
	active?: boolean;
	readOnly?: boolean;
}

export declare type SandpackFiles = Record<string, string | SandpackFile>;
