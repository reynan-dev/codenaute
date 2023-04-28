import { Command } from 'commander';
import { createMultipleMembers } from 'seeds/member.seeds';

const program = new Command();

program.command('seed').description('Seed data').action(createMultipleMembers);

program.parse();
