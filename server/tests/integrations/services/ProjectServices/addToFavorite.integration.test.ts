import { MemberServices } from 'services/MemberServices';
import { ProgrammingLanguageServices } from 'services/ProgrammingLanguageServices';
import { ProjectServices } from 'services/ProjectServices';
import { ErrorMessages } from 'utils/enums/ErrorMessages';
import { v4 as uuid } from 'uuid';

describe('Add to Favorite', () => {
	const ProjectService = new ProjectServices();
	const MemberService = new MemberServices();
	const ProgrammingLanguageService = new ProgrammingLanguageServices();

	const ownerData = {
		username: 'data',
		email: 'data@gmail.com',
		password: 'data'
	};

	const favoringData = {
		username: 'favorite',
		email: 'favorite@gmail.com',
		password: 'data'
	};

	describe('when there are no project', () => {
		it('throw a Project Not Found error', async () => {
			const favoringMember = await MemberService.signUp(
				favoringData.username,
				favoringData.email,
				favoringData.password
			);

			expect(() => ProjectService.addToFavorite(favoringMember, uuid())).rejects.toThrowError(
				ErrorMessages.PROJECT_NOT_FOUND
			);
		});
	});

	describe('when there are project and favorite', () => {
		it('returns an array of members', async () => {
			const favoringUser = await MemberService.signUp(
				favoringData.username,
				favoringData.email,
				favoringData.password
			);

			const data = {
				name: 'data',
				version: 'version',
				owner: await MemberService.signUp(
					ownerData.username,
					ownerData.email,
					ownerData.password
				),
				programmingLanguage: await ProgrammingLanguageService.create({
					name: 'data',
					version: 'version'
				})
			};

			const project = await ProjectService.create(data);

			const favoritedProject = await ProjectService.addToFavorite(favoringUser , project.id);

			expect(favoritedProject.favoritedBy).toHaveLength(1);
			expect(favoritedProject.favoritedBy[0].id).toEqual(favoringUser .id);
		});
	});
});
