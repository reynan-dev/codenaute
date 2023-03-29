import { MemberServices } from 'services/MemberServices';
import { ProgrammingLanguageServices } from 'services/ProgrammingLanguageServices';
import { ProjectServices } from 'services/ProjectServices';

describe('Find All Projects By Programming Language', () => {
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
			const programmingLanguage = await ProgrammingLanguageService.create({
				name: 'data',
				version: '3.10'
			});

			expect(await ProjectService.findAllByTemplate(programmingLanguage.id)).toEqual([]);
		});
	});

	describe('when there are projects', () => {
		it('returns an array of projects', async () => {
			const programmingLanguage = await ProgrammingLanguageService.create({
				name: 'data',
				version: '3.10'
			});

			const projectData = {
				name: 'project_test',
				owner: await MemberService.signUp(
					ownerData.username,
					ownerData.email,
					ownerData.password
				),
				programmingLanguage: programmingLanguage
			};

			const project = await ProjectService.create(projectData);

			const projectsFound = await ProjectService.findAllByProgrammingLanguage(programmingLanguage.id);

			expect(projectsFound).toHaveLength(1);
			expect(projectsFound[0].id).toEqual(project.id);
		});
	});
});
