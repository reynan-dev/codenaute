import { createMultipleMembers } from 'utils/seeds/member.seeds';
import { createProjects } from 'utils/seeds/project.seeds';

export const seedAllData = async () => {
	await createMultipleMembers();
	await createProjects();
};
