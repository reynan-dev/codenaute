import { closeDatabase, dataSource, startDatabase } from 'db';
import { MemberServices } from 'services/MemberServices';
import { ErrorMessages } from 'utils/enums/ErrorMessages';
import { v4 as uuid } from 'uuid';

describe('Update integration test', () => {
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

	describe('when update a invalid element', () => {
		describe('when data is empty', () => {
			it('throw an error empty field', async () => {
				const member = await MemberService.signUp('usertest', 'unknow@test.com', 'password');

				expect(() => MemberService.update(member.id, {})).rejects.toThrowError(
					ErrorMessages.EMPTY_FIELD_ERROR_MESSAGE
				);
			});
		});
		describe('when id is invalid', () => {
			it('throw an error not found', async () => {
				expect(() => MemberService.update(uuid(), { username: 'tested' })).rejects.toThrowError(
					ErrorMessages.NOT_FOUND_ERROR_MESSAGE
				);
			});
		});
	});

	describe('when update a valid element', () => {
		describe('when update is successful', () => {
			it('returns an element', async () => {
				const member = await MemberService.signUp('usertest', 'unknow@test.com', 'password');

				const update = await MemberService.update(member.id, { username: 'tested' });

				const updated = await MemberService.findById(member.id);

				expect(update).toEqual(updated);
			});
		});
	});
});
