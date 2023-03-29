import { MemberServices } from 'services/MemberServices';
import { ProgrammingLanguageServices } from 'services/ProgrammingLanguageServices';
import { ProjectServices } from 'services/ProjectServices';

describe('Find All Projects By Editor Id', () => {
	const ProjectService = new ProjectServices();
	const MemberService = new MemberServices();
	const ProgrammingLanguageService = new ProgrammingLanguageServices();

	const memberData = {
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
			const editor = await MemberService.signUp(
				editorData.username,
				editorData.email,
				editorData.password
			);

			expect(await ProjectService.findAllProjectsByEditorId(editor.id)).toEqual([]);
		});
	});

	describe('when there are projects', () => {
		it('returns an array of projects', async () => {
			const editor = await MemberService.signUp(
				editorData.username,
				editorData.email,
				editorData.password
			);

			const data = {
				name: 'data',
				version: 'version',
				owner: await MemberService.signUp(memberData.username, memberData.email, memberData.password),
				programmingLanguage: await ProgrammingLanguageService.create({
					name: 'data',
					version: 'version'
				}),
				editors: [editor]
			};

			const project = await ProjectService.create(data);

			const find = await ProjectService.findAllProjectsByEditorId(editor.id)

			expect(find).toHaveLength(1);
			expect(find[0].id).toEqual(project.id);
		});
	});
});
