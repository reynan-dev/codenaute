import { MemberServices } from 'services/MemberServices';
import { ProjectServices } from 'services/ProjectServices';
import { SandpackTemplates } from 'utils/enums/SandpackTemplates';

describe('Find All Projects By Editor Id', () => {
	const ProjectService = new ProjectServices();
	const MemberService = new MemberServices();

	const ownerData = {
		username: 'data',
		email: 'data@gmail.com',
		password: 'data'
	};

	const shareToData = {
		username: 'share',
		email: 'share@gmail.com',
		password: 'data'
	};

	describe('when there are project and member', () => {
		it('returns an array of public projects', async () => {
			const shareUser = await MemberService.signUp(
				shareToData.username,
				shareToData.email,
				shareToData.password
			);

			const projectData = {
				name: 'project_test',
				owner: await MemberService.signUp(ownerData.username, ownerData.email, ownerData.password),
				environment: 'create-react-app',
				main: '/App.tsx',
				sandpackTemplate: SandpackTemplates.REACT_TS
			};

			const project = await ProjectService.create(projectData);

			const sharedProject = await ProjectService.share(project, [shareUser]);

			expect(sharedProject.editors).toHaveLength(1);
			expect(sharedProject.editors[0].id).toEqual(shareUser.id);
		});
	});
});
