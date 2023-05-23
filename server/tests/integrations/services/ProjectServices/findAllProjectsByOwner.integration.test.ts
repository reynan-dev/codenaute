import { MemberServices } from 'services/MemberServices';
import { ProjectServices } from 'services/ProjectServices';

describe('Find Projects By Owner', () => {
	const ProjectService = new ProjectServices();
	const MemberService = new MemberServices();

	const ownerData = {
		username: 'data',
		email: 'data@gmail.com',
		password: 'data'
	};

	describe('when there are no projects', () => {
		it('returns an empty array', async () => {
			const ownerMember = await MemberService.signUp(
				ownerData.username,
				ownerData.email,
				ownerData.password
			);

			expect(await ProjectService.findAllByOwner(ownerMember.id)).toEqual([]);
		});
	});

	describe('when there are projects', () => {
		it('returns an array of projects', async () => {
			const ownerMember = await MemberService.signUp(
				ownerData.username,
				ownerData.email,
				ownerData.password
			);

			const projectData = {
				name: 'project_test',
				owner: ownerMember
			};

			const project = await ProjectService.create(projectData);

			const projectsFound = await ProjectService.findAllByOwner(ownerMember.id);

			expect(projectsFound).toHaveLength(1);
			expect(projectsFound[0].id).toEqual(project.id);
		});
	});
});
