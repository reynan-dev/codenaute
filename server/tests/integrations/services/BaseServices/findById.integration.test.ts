import { closeDatabase, dataSource, startDatabase } from '../../../../src/db';
import MemberServices from '../../../../src/services/MemberServices';
import { v4 as uuid } from 'uuid';

describe('FindById integration test', () => {
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
		it('returns an nullable element', async () => {
			expect(await MemberServices.findById(uuid())).toBeNull();
		});
	});

	describe('when records exist', () => {
		it('returns a element', async () => {
			const email = 'unknow@test.com';

			const member = await MemberServices.signUp('usertest', email, 'password');

			expect(await MemberServices.findById(member.id)).toEqual(member);
		});
	});
});