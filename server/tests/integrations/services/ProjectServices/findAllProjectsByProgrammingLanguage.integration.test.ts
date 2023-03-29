import { MemberServices } from 'services/MemberServices';
import { ProgrammingLanguageServices } from 'services/ProgrammingLanguageServices';
import { ProjectServices } from 'services/ProjectServices';

describe('Find All Projects By Programming Language', () => {
	const ProjectService = new ProjectServices();
	const MemberService = new MemberServices();
	const ProgrammingLanguageService = new ProgrammingLanguageServices();

	const memberData = {
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

			const data = {
				name: 'project_test',
				owner: await MemberService.signUp(
					memberData.username,
					memberData.email,
					memberData.password
				),
				programmingLanguage: programmingLanguage
			};

			const project = await ProjectService.create(data);

			const find = await ProjectService.findAllByProgrammingLanguage(programmingLanguage.id);

			expect(find).toHaveLength(1);
			expect(find[0].id).toEqual(project.id);
		});
	});
});
