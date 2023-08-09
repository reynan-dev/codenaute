import { Member } from 'models/Member';
import { Project } from 'models/Project';
import { MemberResolver } from 'resolvers/MemberResolver';
import { createProjectArgs } from 'resolvers/args/ProjectArgs';
import { memberFixtures } from 'utils/seeds/member.seeds';
import { DataSource, InsertResult } from 'typeorm';
import { Database } from 'utils/configs/database';
import { SandpackTemplates } from 'utils/enums/SandpackTemplates';

export const fileFixtures = JSON.stringify({
	'/index.ts': "import { BLACK } from './color.ts'\n\nconsole.log(BLACK)",
	'/constants/color.ts': "export const BLACK = 'black'"
});

export const generateProjectFixture: (member: Member) => createProjectArgs = (member: Member) => {
	return {
		name: 'Admin project',
		memberId: member.id,
		isTemplate: false,
		isPublic: false,
		sandpackTemplate: SandpackTemplates.VANILLA_TS,
		files: fileFixtures,
		environment: 'create-react-app-typescript',
		mainFile: '/App.tsx'
	};
};

export const createProjects = async () => {
	const seeds = async (dataSource: DataSource) => {
		const _MemberResolver = new MemberResolver();
		const member = await _MemberResolver.getMemberByEmail({ email: memberFixtures[0].email });

		if (!member) return console.error('Provided fixture member does not exist');

		const projectFixture = generateProjectFixture(member);
		const project: InsertResult = await dataSource
			.createQueryBuilder()
			.insert()
			.into(Project)
			.values(projectFixture)
			.execute();
	};

	await Database.seed(seeds);
};
