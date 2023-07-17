import { SANDBOX_TEMPLATES } from '@codesandbox/sandpack-react';
import Container from 'components/container';
import { getCheckedTemplateParam } from 'helpers/get-cheked-template-param';
import { ChooseTemplateLink } from 'pages/create-project/_components/choose-template-link';
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
			main: SANDBOX_TEMPLATES[sandpackTemplate].main,
			sandpackTemplate
		});
	};

	return (
		<Container className='flex items-center justify-center h-full'>
			<div className='space-y-5 rounded-lg bg-dark p-14 border border-dark-700'>
				<h3 className='mb-10'>Create a project</h3>
				<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
					{sandpackTemplates.map((template, i) => (
						<ChooseTemplateLink
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
