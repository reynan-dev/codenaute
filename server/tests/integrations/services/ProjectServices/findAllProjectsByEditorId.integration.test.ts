import { MemberServices } from 'services/MemberServices';
import { ProgrammingLanguageServices } from 'services/ProgrammingLanguageServices';
import { ProjectServices } from 'services/ProjectServices';

describe('Find All Projects By Editor Id', () => {
	const ProjectService = new ProjectServices();
	const MemberService = new MemberServices();
	const ProgrammingLanguageService = new ProgrammingLanguageServices();

	const ownerData = {
		username: 'data',
		email: 'data@gmail.com',
		password: 'data'
	};

	const editorData = {
		username: 'editor',
		email: 'editor@gmail.com',
		password: 'data'
	};

	describe('when there are no projects', () => {
		it('returns an empty array', async () => {
			const editorMember = await MemberService.signUp(
				editorData.username,
				editorData.email,
				editorData.password
			);

			expect(await ProjectService.findAllByEditorId(editorMember.id)).toEqual([]);
		});
	});

	describe('when there are projects', () => {
		it('returns an array of projects', async () => {
			const editorMember = await MemberService.signUp(
				editorData.username,
				editorData.email,
				editorData.password
			);

			const projectData = {
				name: 'data',
				version: 'version',
				owner: await MemberService.signUp(ownerData.username, ownerData.email, ownerData.password),
				programmingLanguage: await ProgrammingLanguageService.create({
					name: 'data',
					version: 'version'
				}),
				editors: [editorMember]
			};

			const project = await ProjectService.create(projectData);

			const find = await ProjectService.findAllByEditorId(editorMember.id);

			expect(find).toHaveLength(1);
			expect(find[0].id).toEqual(project.id);
		});
	});
});
