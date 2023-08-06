import { SANDBOX_TEMPLATES } from '@codesandbox/sandpack-react';
import Container from 'components/container';
import { TemplateButton } from 'components/template-button/template-button';
import { getCheckedTemplateParam } from 'helpers/get-cheked-template-param';
import { useCreateProjectService } from 'pages/create-project/create-project.service';
import { SandpackTemplate, SandpackTemplatesEnum } from 'types/sandpack';

export const CreateProjectPage = () => {
	const sandpackTemplates = Object.values(SandpackTemplatesEnum);

	const { createProject } = useCreateProjectService();

	const handleOnClick = async (sandpackTemplate: SandpackTemplate | undefined) => {
		if (sandpackTemplate === undefined) return console.error('ERROR');

		return await createProject({
			name: 'untitled',
			files: SANDBOX_TEMPLATES[sandpackTemplate].files,
			environment: SANDBOX_TEMPLATES[sandpackTemplate].environment,
			mainFile: SANDBOX_TEMPLATES[sandpackTemplate].mainFile,
			sandpackTemplate
		});
	};

	return (
		<Container className='flex items-center justify-center h-full'>
			<div className='space-y-5 rounded-lg bg-black p-14 border border-dark-700'>
				<h3 className='mb-10'>Create a project</h3>
				<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
					{sandpackTemplates.map((template, i) => (
						<TemplateButton
							key={i}
							sandpackTemplate={getCheckedTemplateParam(template)}
							onClick={handleOnClick}
						/>
					))}
				</div>
			</div>
		</Container>
	);
};
