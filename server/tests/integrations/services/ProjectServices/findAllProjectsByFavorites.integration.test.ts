import { MemberServices } from 'services/MemberServices';
import { ProgrammingLanguageServices } from 'services/ProgrammingLanguageServices';
import { ProjectServices } from 'services/ProjectServices';

describe('Find All Projects By Favorite Id', () => {
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

	describe('when there are no projects', () => {
		it('returns an empty array', async () => {
			const favoriteUser = await MemberService.signUp(
				favoriteData.username,
				favoriteData.email,
				favoriteData.password
			);

			expect(await ProjectService.findAllByFavorites(favoriteUser.id)).toEqual([]);
		});
	});

	describe('when there are projects', () => {
		it('returns an array of projects', async () => {
			const favoriteUser = await MemberService.signUp(
				favoriteData.username,
				favoriteData.email,
				favoriteData.password
			);

			const data = {
				name: 'project_test',
				owner: await MemberService.signUp(memberData.username, memberData.email, memberData.password),
				programmingLanguage: await ProgrammingLanguageService.create({
					name: 'data',
					version: '3.10'
				}),
				favoritedBy: [favoriteUser]
			};

			const project = await ProjectService.create(data);

			const find = await ProjectService.findAllByFavorites(favoriteUser.id)

			expect(find).toHaveLength(1);
			expect(find[0].id).toEqual(project.id);
		});
	});
});
