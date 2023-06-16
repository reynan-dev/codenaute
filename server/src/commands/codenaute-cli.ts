import { Command } from 'commander';
import { seedAllData } from 'seeds';
import { createMultipleMembers } from 'seeds/member.seeds';
import { createProjects } from 'seeds/project.seeds';

const program = new Command();

program.command('seed-members').description('Seed members').action(createMultipleMembers);

program.command('seed-projects').description('Seed projects').action(createProjects);

program.command('seed').description('Seed data').action(seedAllData);

program.parse();
