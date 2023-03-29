import { MemberServices } from 'services/MemberServices';
import { ProgrammingLanguageServices } from 'services/ProgrammingLanguageServices';
import { ProjectServices } from 'services/ProjectServices';
import { SandpackTemplateServices } from 'services/SandpackTemplateServices';

describe('Find All Projects By Template', () => {
	const ProjectService = new ProjectServices();
	const MemberService = new MemberServices();
	const ProgrammingLanguageService = new ProgrammingLanguageServices();
	const SandpackTemplateService = new SandpackTemplateServices();

	const memberData = {
		username: 'data',
		email: 'data@gmail.com',
		password: 'data'
	};

	describe('when there are no projects', () => {
		it('returns an empty array', async () => {
			const template = await SandpackTemplateService.create({ slug: 'data' });

			expect(await ProjectService.findAllByTemplate(template.id)).toEqual([]);
		});
	});

	describe('when there are projects', () => {
		it('returns an array of projects', async () => {
			const template = await SandpackTemplateService.create({ slug: 'data' });

			const data = {
				name: 'data',
				version: 'version',
				owner: await MemberService.signUp(memberData.username, memberData.email, memberData.password),
				programmingLanguage: await ProgrammingLanguageService.create({
					name: 'data',
					version: '3.10'
				}),
				template: template
			};

			const project = await ProjectService.create(data);

			const find = await ProjectService.findAllByTemplate(template.id);

			expect(find).toHaveLength(1);
			expect(find[0].id).toEqual(project.id);
		});
	});
});
