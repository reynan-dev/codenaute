import { MemberServices } from 'services/MemberServices';
import { ProjectServices } from 'services/ProjectServices';
import { SandpackTemplates } from 'utils/enums/SandpackTemplates';

describe('Find All Public Projects', () => {
	const ProjectService = new ProjectServices();
	const MemberService = new MemberServices();

	const ownerData = {
		username: 'data',
		email: 'data@gmail.com',
		password: 'data'
	};

	describe('when there are no projects', () => {
		it('returns an empty array', async () => {
			expect(await ProjectService.findAllPublic()).toEqual([]);
		});
	});

	describe('when there are projects', () => {
		it('returns an array of projects', async () => {
			const projectData = {
				name: 'data',
				version: 'version',
				owner: await MemberService.signUp(ownerData.username, ownerData.email, ownerData.password),
				isPublic: true,
				environment: 'create-react-app',
				mainFile: '/App.tsx',
				sandpackTemplate: SandpackTemplates.REACT_TS
			};

			const project = await ProjectService.create(projectData);

			const projectsFound = await ProjectService.findAllPublic();

			expect(projectsFound).toHaveLength(1);
			expect(projectsFound[0].id).toEqual(project.id);
		});
	});
});
