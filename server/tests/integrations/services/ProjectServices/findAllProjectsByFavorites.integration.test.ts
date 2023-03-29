import { MemberServices } from 'services/MemberServices';
import { ProgrammingLanguageServices } from 'services/ProgrammingLanguageServices';
import { ProjectServices } from 'services/ProjectServices';

describe('Find All Projects By Favorite Id', () => {
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

	describe('when there are no projects', () => {
		it('returns an empty array', async () => {
			const favoringUser = await MemberService.signUp(
				favoringData.username,
				favoringData.email,
				favoringData.password
			);

			expect(await ProjectService.findAllByFavorites(favoringUser.id)).toEqual([]);
		});
	});

	describe('when there are projects', () => {
		it('returns an array of projects', async () => {
			const favoringUser = await MemberService.signUp(
				favoringData.username,
				favoringData.email,
				favoringData.password
			);

			const data = {
				name: 'project_test',
				owner: await MemberService.signUp(
					ownerData.username,
					ownerData.email,
					ownerData.password
				),
				programmingLanguage: await ProgrammingLanguageService.create({
					name: 'data',
					version: '3.10'
				}),
				favoritedBy: [favoringUser]
			};

			const project = await ProjectService.create(data);

			const projectsFound = await ProjectService.findAllByFavorites(favoringUser.id);

			expect(projectsFound).toHaveLength(1);
			expect(projectsFound[0].id).toEqual(project.id);
		});
	});
});
