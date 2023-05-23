import Container from 'components/container';
import { SandpackTemplates } from 'enums/sandpack-templates';
import { renderTemplateElements } from 'pages/create-project/helpers/render-template-element';
import { Link } from 'react-router-dom';
import { twJoin } from 'tailwind-merge';

interface CreateProjectProps {}

export const CreateProjectPage = ({}: CreateProjectProps) => {
	const sandpackTemplates = Object.values(SandpackTemplates);

	return (
		<Container className='flex items-center justify-center'>
			<div className='space-y-5 rounded-lg bg-dark p-14'>
				<h3 className='mb-10'>Create a project</h3>
				<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
					{sandpackTemplates.map((template) => (
						<Link
							to={`/code?template=${template}`}
							className={twJoin(
								'flex',
								'space-x-2 p-5',
								'rounded-lg border text-lg',
								'transition duration-150 ease-in-out',
								'hover:bg-dark-800'
							)}
						>
							{renderTemplateElements(template)}
						</Link>
					))}
				</div>
			</div>
		</Container>
	);
};
