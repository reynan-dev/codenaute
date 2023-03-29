import { MemberServices } from 'services/MemberServices';
import { ProgrammingLanguageServices } from 'services/ProgrammingLanguageServices';
import { ProjectServices } from 'services/ProjectServices';
import { ErrorMessages } from 'utils/enums/ErrorMessages';
import { v4 as uuid } from 'uuid';

describe('Add to Favorite', () => {
	const ProjectService = new ProjectServices();
	const MemberService = new MemberServices();
	const ProgrammingLanguageService = new ProgrammingLanguageServices();

	const memberData = {
		username: 'data',
		email: 'data@gmail.com',
		password: 'data'
	};

	const favoriteData = {
		username: 'favorite',
		email: 'favorite@gmail.com',
		password: 'data'
	};

	describe('when there are no project', () => {
		it('throw a Project Not Found error', async () => {
			const favorite = await MemberService.signUp(
				favoriteData.username,
				favoriteData.email,
				favoriteData.password
			);

			expect(() => ProjectService.addToFavorite(favorite.id, uuid())).rejects.toThrowError(
				ErrorMessages.PROJECT_NOT_FOUND
			);
		});
	});

	describe('when there are project but not favorite user', () => {
		it('throw a Member Not Found error', async () => {
			const data = {
				name: 'data',
				version: 'version',
				owner: await MemberService.signUp(memberData.username, memberData.email, memberData.password),
				programmingLanguage: await ProgrammingLanguageService.create({
					name: 'data',
					version: 'version'
				}),
			};

			const project = await ProjectService.create(data);

			expect(() => ProjectService.addToFavorite(uuid(), project.id)).rejects.toThrowError(
				ErrorMessages.MEMBER_NOT_FOUND
			);
		});
	});

	describe.skip('when there are project and favorite', () => {
		it('returns an array of members', async () => {
			const favoriteUser = await MemberService.signUp(
				favoriteData.username,
				favoriteData.email,
				favoriteData.password
			);

			const data = {
				name: 'data',
				version: 'version',
				owner: await MemberService.signUp(memberData.username, memberData.email, memberData.password),
				programmingLanguage: await ProgrammingLanguageService.create({
					name: 'data',
					version: 'version'
				}),
			};

			const project = await ProjectService.create(data);

			const favoriteProject = await ProjectService.addToFavorite(favoriteUser.id, project.id);

			expect(favoriteProject.favoritedBy).toHaveLength(1);
			expect(favoriteProject.favoritedBy[0].id).toEqual(favoriteUser.id);
		});
	});
});
