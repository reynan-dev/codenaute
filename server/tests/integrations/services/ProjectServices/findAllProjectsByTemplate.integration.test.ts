import { MemberServices } from 'services/MemberServices';
import { ProjectServices } from 'services/ProjectServices';
import { SandpackTemplates } from 'utils/enums/SandpackTemplates';

describe('Find All Projects By Template', () => {
	const ProjectService = new ProjectServices();
	const MemberService = new MemberServices();

	const ownerData = {
		username: 'data',
		email: 'data@gmail.com',
		password: 'data'
	};

	describe('when there are no projects', () => {
		it('returns an empty array', async () => {
			expect(await ProjectService.findAllByTemplate(SandpackTemplates.REACT_TS)).toEqual([]);
		});
	});

	describe('when there are projects', () => {
		it('returns an array of projects', async () => {
			const projectData = {
				name: 'data',
				version: 'version',
				owner: await MemberService.signUp(ownerData.username, ownerData.email, ownerData.password),
				sandpackTemplate: SandpackTemplates.REACT_TS,
				environment: 'create-react-app',
				main: '/App.tsx'
			};

			const project = await ProjectService.create(projectData);

			const projectsFound = await ProjectService.findAllByTemplate(SandpackTemplates.REACT_TS);

			expect(projectsFound).toHaveLength(1);
			expect(projectsFound[0].id).toEqual(project.id);
		});
	});
});
