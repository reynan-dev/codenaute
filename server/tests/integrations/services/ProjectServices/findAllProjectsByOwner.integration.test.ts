import { MemberServices } from 'services/MemberServices';
import { ProgrammingLanguageServices } from 'services/ProgrammingLanguageServices';
import { ProjectServices } from 'services/ProjectServices';

describe('Find Projects By Owner', () => {
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
            const member = await MemberService.signUp(
                memberData.username,
                memberData.email,
                memberData.password
            );

            expect(await ProjectService.findAllByOwner(member.id)).toEqual([]);
        });
    });

    describe('when there are projects', () => {
        it('returns an array of projects', async () => {
            const member = await MemberService.signUp(
                memberData.username,
                memberData.email,
                memberData.password
            );

            const data = {
                name: 'project_test',
                owner: member,
                programmingLanguage: await ProgrammingLanguageService.create({
                    name: 'data',
                    version: 'version'
                })
            };

            const project = await ProjectService.create(data);

            const find = await ProjectService.findAllByOwner(member.id)

            expect(find).toHaveLength(1);
            expect(find[0].id).toEqual(project.id);
        });
    });
});
