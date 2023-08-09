import { Command } from 'commander';
import { seedAllData } from 'utils/seeds';
import { createMultipleMembers } from 'utils/seeds/member.seeds';
import { createProjects } from 'utils/seeds/project.seeds';

const program = new Command();

program.command('seed-members').description('Seed members').action(createMultipleMembers);

program.command('seed-projects').description('Seed projects').action(createProjects);

program.command('seed').description('Seed data').action(seedAllData);

program.parse();
