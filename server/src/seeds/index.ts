import { createMultipleMembers } from 'seeds/member.seeds';
import { createProjects } from 'seeds/project.seeds';

export const seedAllData = async () => {
	await createMultipleMembers();
	await createProjects();
};
