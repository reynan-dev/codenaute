import { SandpackTemplates } from 'enums/sandpack-templates';
import { SandpackTemplate } from 'pages/code/code.service';

export const getCheckedTemplateParam = (_templateParam: string | null) => {
	const validSandpackTemplates = Object.values(SandpackTemplates);

	if (!_templateParam) return undefined;
	if (!validSandpackTemplates.some((validTemplate) => validTemplate !== _templateParam)) {
		return undefined;
	}

	return _templateParam as SandpackTemplate;
};
