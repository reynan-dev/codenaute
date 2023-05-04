import { Command } from 'commander';
import { createMultipleMembers } from 'seeds/member.seeds';
import { createProjects } from 'seeds/project.seeds';

const program = new Command();

program
	.command('seed')
	.description('Seed data')
	.action(() => {
		createMultipleMembers;
	});
program.command('projects').description('Seed data').action(createProjects);

program.parse();
