import MemberServices from 'services/MemberServices';

import { dataSource, closeDatabase, startDatabase } from 'db';
import { ErrorMessages } from 'utils/enums/ErrorMessages';

describe('Singup a Member integration test', () => {
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

	describe('when email address belongs to existing user', () => {
		it('throws an member already exists error', async () => {
			const username = 'username';
			const email = 'unknown@email.com';
			const password = 'password';

			await MemberServices.signUp(username, email, password);

			expect(() => MemberServices.signUp(username, email, password)).rejects.toThrowError(
				ErrorMessages.MEMBER_ALREADY_EXISTS_ERROR_MESSAGE
			);
		});
	});
	describe("when email address doesn't belong to existing user", () => {
		it('return an member', async () => {
			const username = 'username';
			const email = 'unknown@email.com';
			const password = 'password';

			const user = await MemberServices.signUp(username, email, password);

			expect(user.username).toEqual(username);
			expect(user.email).toEqual(email);
		});
	});
});
