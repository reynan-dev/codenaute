import { closeDatabase, dataSource, startDatabase } from 'db';
import { MemberServices } from 'services/MemberServices';

describe('FindOneBy integration test', () => {
	const MemberService = new MemberServices();

	beforeAll(async () => {
		jest.spyOn(console, 'info').mockImplementation(() => {});
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
			const email = 'unknow@test.com';

			expect(await MemberService.findOneBy({ email })).toBeNull();
		});
	});

	describe('when records exist', () => {
		it('returns a element', async () => {
			const email = 'unknow@test.com';

			const member = await MemberService.signUp('usertest', email, 'password');

			expect(await MemberService.findOneBy({ email })).toEqual(member);
		});
	});

	describe('when params is empty', () => {
		it('returns an array empty', async () => {
			expect(await MemberService.findOneBy()).toEqual([]);
		});
	});
});
