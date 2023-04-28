import { hashSync } from 'bcryptjs';
import { Member } from 'models/Member';
import { DataSource } from 'typeorm';
import { Database } from 'utils/configs/database';

const memberFixtures: Partial<Member>[] = [
	{
		username: 'admin',
		email: 'admin@codenaute.com',
		hashedPassword: hashSync('Admin1234!', 10)
	},
	{
		username: 'member',
		email: 'member@member.com',
		hashedPassword: hashSync('Member1234!', 10)
	}
];

export const createMultipleMembers = async () => {
	const seeds = async (dataSource: DataSource) => {
		await dataSource.createQueryBuilder().insert().into(Member).values(memberFixtures).execute();
	};

	await Database.seed(seeds);
};
