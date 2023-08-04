import { MemberServices } from 'services/MemberServices';
import { ProjectServices } from 'services/ProjectServices';
import { ErrorMessages } from 'utils/enums/ErrorMessages';
import { SandpackTemplates } from 'utils/enums/SandpackTemplates';
import { v4 as uuid } from 'uuid';

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

	describe('when there are no project or member', () => {
		it('throw a Project Not Found error', async () => {
			const shareToUser = await MemberService.signUp(
				shareToData.username,
				shareToData.email,
				shareToData.password
			);

			expect(() => ProjectService.share(uuid(), [shareToUser])).rejects.toThrowError(
				ErrorMessages.PROJECT_NOT_FOUND
			);
		});
	});

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
				mainFile: '/App.tsx',
				sandpackTemplate: SandpackTemplates.REACT_TS
			};

			const project = await ProjectService.create(projectData);

			const sharedProject = await ProjectService.share(project.id, [shareUser]);

			expect(sharedProject.editors).toHaveLength(1);
			expect(sharedProject.editors[0].id).toEqual(shareUser.id);
		});
	});
});
