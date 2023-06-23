import { SandboxEnvironment } from '@codesandbox/sandpack-react/index';

export function checkSandboxEnvironment(
	environment: string | undefined
): SandboxEnvironment | undefined {
	const validTypes: SandboxEnvironment[] = [
		'angular-cli',
		'create-react-app',
		'create-react-app-typescript',
		'svelte',
		'parcel',
		'vue-cli',
		'static',
		'solid',
		'node'
	];

	if (validTypes.includes(environment as SandboxEnvironment)) {
		return environment as SandboxEnvironment;
	} else {
		return undefined;
	}
}
