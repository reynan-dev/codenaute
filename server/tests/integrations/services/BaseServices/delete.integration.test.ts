import { Database } from 'db';
import { MemberServices } from 'services/MemberServices';
import { ErrorMessages } from 'utils/enums/ErrorMessages';
import { v4 as uuid } from 'uuid';

describe('Delete integration test', () => {
	const MemberService = new MemberServices();

	beforeAll(async () => {
		jest.spyOn(console, 'info').mockImplementation(() => {});
		await Database.start();
	});

	afterAll(async () => {
		await Database.stop();
	});

	beforeEach(async () => {
		for (const entity of Database.entityMetadatas()) {
			const repository = Database.repository(entity.name);
			await repository.query(`TRUNCATE ${entity.tableName} RESTART IDENTITY CASCADE;`);
		}
	});

	describe('when delete a element', () => {
		describe('when id is invalid', () => {
			it('throw an error not found', async () => {
				expect(() => MemberService.delete(uuid())).rejects.toThrowError(
					ErrorMessages.NOT_FOUND_ERROR_MESSAGE
				);
			});
		});
		describe('when id is valid', () => {
			it('delete item', async () => {
				const member = await MemberService.signUp('usertest', 'unknow@test.com', 'password');

				await MemberService.delete(member.id);

				expect(await MemberService.findById(member.id)).toBeNull();
			});
		});
	});
});
