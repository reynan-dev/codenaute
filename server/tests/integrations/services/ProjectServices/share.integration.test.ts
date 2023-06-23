import { MemberServices } from 'services/MemberServices';
import { ProjectServices } from 'services/ProjectServices';
import { ErrorMessages } from 'utils/enums/ErrorMessages';
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

	describe('when there are project and member', () => {
		it('returns an array of public projects', async () => {
			const shareUser = await MemberService.signUp(
				shareToData.username,
				shareToData.email,
				shareToData.password
			);

			const projectData = {
				name: 'project_test',
				owner: await MemberService.signUp(ownerData.username, ownerData.email, ownerData.password)
			};

			const project = await ProjectService.create(projectData);

			const sharedProject = await ProjectService.share(project, [shareUser]);

			expect(sharedProject.editors).toHaveLength(1);
			expect(sharedProject.editors[0].id).toEqual(shareUser.id);
		});
	});
});
