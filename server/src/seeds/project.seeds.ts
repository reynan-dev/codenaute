import { FileProject } from 'models/FileProject';
import { Member } from 'models/Member';
import { Project } from 'models/Project';
import { MemberResolver } from 'resolvers/MemberResolver';
import { createProjectArgs } from 'resolvers/args/ProjectArgs';
import { memberFixtures } from 'seeds/member.seeds';
import { DataSource, InsertResult } from 'typeorm';
import { Database } from 'utils/configs/database';
import { ProgrammingLanguages } from 'utils/enums/ProgrammingLanguages';
import { SandpackTemplates } from 'utils/enums/SandpackTemplates';

export const generateProjectFixture: (member: Member) => createProjectArgs = (member: Member) => {
	return {
		name: 'Admin project',
		memberId: member.id,
		isTemplate: false,
		isPublic: false,
		sandpackTemplate: SandpackTemplates.VANILLA_TS
	};
};

export const generateFileFixtures = (project: Project) => {
	return [
		{
			path: '/index.ts',
			content: "import { BLACK } from './color.ts'\n\nconsole.log(BLACK)",
			projectId: project.id,
			isHidden: false,
			programmingLanguage: ProgrammingLanguages.TYPESCRIPT
		},
		{
			path: '/constants/color.ts',
			content: "export const BLACK = 'black'",
			projectId: project.id,
			isHidden: false,
			programmingLanguage: ProgrammingLanguages.TYPESCRIPT
		}
	];
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

		if (!project) return console.error('Project is needed to create files');

		const fileFixtures = generateFileFixtures(project.identifiers[0].id);
		const files: InsertResult = await dataSource
			.createQueryBuilder()
			.insert()
			.into(FileProject)
			.values(fileFixtures)
			.execute();

		console.log({ files });
	};

	await Database.seed(seeds);
};
