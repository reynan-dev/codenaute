import { MemberServices } from 'services/MemberServices';
import { ProgrammingLanguageServices } from 'services/ProgrammingLanguageServices';
import { ProjectServices } from 'services/ProjectServices';
import { ErrorMessages } from 'utils/enums/ErrorMessages';
import { v4 as uuid } from 'uuid';

describe('Find All Projects By Editor Id', () => {
	const ProjectService = new ProjectServices();
	const MemberService = new MemberServices();
	const ProgrammingLanguageService = new ProgrammingLanguageServices();

	const memberData = {
		username: 'data',
		email: 'data@gmail.com',
		password: 'data'
	};

	const shareData = {
		username: 'share',
		email: 'share@gmail.com',
		password: 'data'
	};

	describe('when there are no project or member', () => {
		it('throw a Project Not Found error', async () => {
			const shareUser = await MemberService.signUp(
				shareData.username,
				shareData.email,
				shareData.password
			);

			expect(() => ProjectService.share(uuid(), [shareUser])).rejects.toThrowError(
				ErrorMessages.PROJECT_NOT_FOUND
			);
		});
	});

	describe('when there are project and member', () => {
		it('returns an array of public projects', async () => {
			const shareUser = await MemberService.signUp(
				shareData.username,
				shareData.email,
				shareData.password
			);

			const data = {
				name: 'project_test',
				owner: await MemberService.signUp(memberData.username, memberData.email, memberData.password),
				programmingLanguage: await ProgrammingLanguageService.create({
					name: 'data',
					version: 'version'
				}),
			};

			const project = await ProjectService.create(data);

			const sharedProject = await ProjectService.share(project.id, [shareUser]);

			expect(sharedProject.editors).toHaveLength(1);
			expect(sharedProject.editors[0].id).toEqual(shareUser.id);
		});
	});
});
