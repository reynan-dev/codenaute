import { closeDatabase, dataSource, startDatabase } from '../../../../src/db';
import MemberServices from '../../../../src/services/MemberServices';

describe('Find integration test', () => {
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
			expect(await MemberServices.find()).toEqual([]);
		});
	});

	describe('when records exist', () => {
		it('returns an array of records', async () => {
			const member = await MemberServices.signUp('usertest', 'user@test.com', 'password');

			expect(await MemberServices.find()).toEqual([member]);
		});
	});
});
