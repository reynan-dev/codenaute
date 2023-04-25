import { MemberServices } from 'services/MemberServices';
import { ProgrammingLanguageServices } from 'services/ProgrammingLanguageServices';
import { ProjectServices } from 'services/ProjectServices';

describe('Find All Public Projects', () => {
	const ProjectService = new ProjectServices();
	const MemberService = new MemberServices();
	const ProgrammingLanguageService = new ProgrammingLanguageServices();

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
				programmingLanguage: await ProgrammingLanguageService.create({
					name: 'data',
					version: 'version'
				}),
				isPublic: true
			};

			const project = await ProjectService.create(projectData);

			const projectsFound = await ProjectService.findAllPublic();

			expect(projectsFound).toHaveLength(1);
			expect(projectsFound[0].id).toEqual(project.id);
		});
	});
});
