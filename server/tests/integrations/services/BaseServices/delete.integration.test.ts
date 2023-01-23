import { closeDatabase, dataSource, startDatabase } from '@/db';
import MemberServices from '@/services/MemberServices';
import { ErrorMessages } from '@/utils/enums/ErrorMessages';
import { v4 as uuid } from 'uuid';

describe('Delete integration test', () => {
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

	describe('when delete a element', () => {
		describe('when id is invalid', () => {
			it('throw an error not found', async () => {
				expect(() => MemberServices.delete(uuid())).rejects.toThrowError(
					ErrorMessages.NOT_FOUND_ERROR_MESSAGE
				);
			});
		});
		describe('when id is valid', () => {
			it('delete item', async () => {
				const member = await MemberServices.signUp('usertest', 'unknow@test.com', 'password');

				await MemberServices.delete(member.id);

				expect(await MemberServices.findById(member.id)).toBeNull();
			});
		});
	});
});
