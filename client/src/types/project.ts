import { SandpackFiles } from '@codesandbox/sandpack-react/types';

export interface ProjectContextData {
	id?: string;
	name: string;
	sandpackTemplate?: string;
	files: SandpackFiles;
}

export type SetProjectContextData = React.Dispatch<React.SetStateAction<ProjectContextData | null>>;
