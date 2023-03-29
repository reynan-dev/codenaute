import { MemberServices } from 'services/MemberServices';
import { ProgrammingLanguageServices } from 'services/ProgrammingLanguageServices';
import { ProjectServices } from 'services/ProjectServices';
import { SandpackTemplateServices } from 'services/SandpackTemplateServices';

describe('Find All Projects By Template', () => {
	const ProjectService = new ProjectServices();
	const MemberService = new MemberServices();
	const ProgrammingLanguageService = new ProgrammingLanguageServices();
	const SandpackTemplateService = new SandpackTemplateServices();

	const ownerData = {
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

			const projectData = {
				name: 'data',
				version: 'version',
				owner: await MemberService.signUp(
					ownerData.username,
					ownerData.email,
					ownerData.password
				),
				programmingLanguage: await ProgrammingLanguageService.create({
					name: 'data',
					version: '3.10'
				}),
				template: template
			};

			const project = await ProjectService.create(projectData);

			const projectsFound = await ProjectService.findAllByTemplate(template.id);

			expect(projectsFound).toHaveLength(1);
			expect(projectsFound[0].id).toEqual(project.id);
		});
	});
});
