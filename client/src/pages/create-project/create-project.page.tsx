import Container from 'components/container';
import { SandpackTemplates } from 'enums/sandpack-templates';
import { ChooseTemplateLink } from 'pages/create-project/components/choose-template-link';

export const CreateProjectPage = () => {
	const sandpackTemplates = Object.values(SandpackTemplates);

	return (
		<Container className='flex items-center justify-center'>
			<div className='space-y-5 rounded-lg bg-dark p-14'>
				<h3 className='mb-10'>Create a project</h3>
				<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
					{sandpackTemplates.map((template) => (
						<ChooseTemplateLink sandpackTemplate={template} />
					))}
				</div>
			</div>
		</Container>
	);
};
