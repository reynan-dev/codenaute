import { Member } from 'models/Member';
import { Factory, Seeder } from 'typeorm-seeding';

const memberFixtures = {
	username: 'admin',
	email: 'admin@codenaute.com',
	password: 'Admin1234!'
};

export default class CreateMember implements Seeder {
	public async run(factory: Factory): Promise<any> {
		await factory(Member)().create();
	}
}
