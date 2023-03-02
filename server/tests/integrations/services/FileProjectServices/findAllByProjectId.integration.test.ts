import { FileProjectServices } from 'services/FileProjectServices';
import { MemberServices } from 'services/MemberServices';
import { ProjectServices } from 'services/ProjectServices';
import { ProgramingLanguageServices } from 'services/ProgramingLanguageServices';

import { dataSource, closeDatabase, startDatabase } from 'db';

describe('Finding files by a project id integration test', () => {
	const FileProjectService = new FileProjectServices();
    const MemberService = new MemberServices();
    const ProjectService = new ProjectServices();
    const ProgramingLanguageService = new ProgramingLanguageServices();

	beforeAll(async () => {
		jest.spyOn(console, 'info').mockImplementation(() => {});
		await startDatabase();
	});

	afterAll(async () => {
		await closeDatabase();
	});

	beforeEach(async () => {
		for (const entity of dataSource.entityMetadatas) {
			const repository = dataSource.getRepository(entity.name);
			await repository.query(`TRUNCATE ${entity.tableName} RESTART IDENTITY CASCADE;`);
		}
	});

	describe('when project id is not valid', () => {
		it('throw an empty array', async () => {
            const projectId = 'invalidProjectId';

			expect(() => FileProjectService.findAllByProjectId(projectId)).toHaveLength(0);
		});
	});

	describe('when project id is valid', () => {
		it('return an array of files', async () => {
            const member = {
                username: 'username',
                email: 'email',
                password: 'password',
            }

            const newMember = await MemberService.signUp(member.username, member.email, member.password);

            const language = {
                language: 'language name',
                version: '3.10',
            }

            const newLanguage = await ProgramingLanguageService.create(language);

            const project = {
                name: 'project name',
                members: [newMember],
                language: newLanguage,
                isTemplate: false,
                isPublic: false
            };

            const newProject = await ProjectService.create(project);

			const file = {
                path: 'path',
                code: 'code',
                project: newProject,
                isHidden: false
            }

			const newFile = await FileProjectService.create(file);

            const searchResult = await FileProjectService.findById(newFile.id);

            expect(await FileProjectService.findAllByProjectId(newProject.id))
            .toHaveLength(1);

			expect(await FileProjectService.findAllByProjectId(newProject.id))
            .toEqual([searchResult])

		});
	});
});
