import { closeDatabase, dataSource, startDatabase } from 'db';
import MemberServices from 'services/MemberServices';

describe('FindBy integration test', () => {
	beforeAll(async () => {
		await startDatabase();
	});

	afterAll(async () => {
		await closeDatabase();
	});

	beforeEach(async () => {
		for (const entity of dataSource.entityMetadatas) {
			const repository = dataSource.getRepository(entity.name);
			await repository.query(`TRUNCATE ${entity.tableName} RESTART IDENTITY CASCADE;`);
		}
	});

	describe('when no records exist', () => {
		it('returns an empty array', async () => {
			const email = 'unknow@test.com';

			expect(await MemberServices.findBy({ email })).toEqual([]);
		});
	});

	describe('when records exist', () => {
		it('returns an array of records', async () => {
			const email = 'unknow@test.com';

			const member = await MemberServices.signUp('usertest', email, 'password');

			expect(await MemberServices.findBy({ email })).toEqual([member]);
		});
	});

	describe('when params is empty', () => {
		it('returns an empty array', async () => {
			expect(await MemberServices.findBy()).toEqual([]);
		});
	});
});
