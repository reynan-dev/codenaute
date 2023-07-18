import { SandpackTemplatesEnum, SandpackTemplate } from 'types/sandpack';

export const getCheckedTemplateParam = (_templateParam: string | null) => {
	const validSandpackTemplates = Object.values(SandpackTemplatesEnum);

	if (!_templateParam) return undefined;
	if (!validSandpackTemplates.some((validTemplate) => validTemplate !== _templateParam)) {
		return undefined;
	}

	return _templateParam as SandpackTemplate;
};
