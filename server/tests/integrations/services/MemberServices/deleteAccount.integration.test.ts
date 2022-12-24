import MemberServices from '../../../../src/services/MemberServices';

import { dataSource, closeDatabase, startDatabase } from '../../../../src/db';
import { compareSync } from 'bcryptjs';
import { ErrorMessages } from '../../../../src/utils/enums/ErrorMessages';

describe('Delete a Member account integration test', () => {
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

	describe('when delete account with invalid password', () => {
		it('throw an invalid password error', async () => {
			const username = 'username';
			const email = 'unknown@email.com';
			const password = 'password';

			const member = await MemberServices.signUp(username, email, password);

			expect(() => MemberServices.deleteAccount(member.id, 'invalidPassword')).rejects.toThrowError(
				ErrorMessages.INVALID_PASSWORD_ERROR_MESSAGE
			);
		});
	});

	describe('when delete account with valid email', () => {
		it('return an member', async () => {
			const username = 'username';
			const email = 'unknown@email.com';
			const password = 'password';

			const member = await MemberServices.signUp(username, email, password);
			await MemberServices.deleteAccount(member.id, password);

			expect(await MemberServices.findById(member.id)).toBeNull();
		});
	});
});
