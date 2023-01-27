import MemberServices from '@/services/MemberServices';

import { dataSource, closeDatabase, startDatabase } from '@/db';
import { compareSync } from 'bcryptjs';
import { ErrorMessages } from '@/utils/enums/ErrorMessages';

describe('Update a Member password integration test', () => {
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

	describe('when update password with invalid email', () => {
		it('throw an invalid email error', async () => {
			const email = 'unknown@email.com';
			const newPassword = 'newPassword';

			expect(() => MemberServices.updatePassword(email, newPassword)).rejects.toThrowError(
				ErrorMessages.INVALID_EMAIL_ERROR_MESSAGE
			);
		});
	});

	describe('when update password with valid email', () => {
		it('return an member', async () => {
			const username = 'username';
			const email = 'unknown@email.com';
			const password = 'password';

			const member = await MemberServices.signUp(username, email, password);

			const newPassword = 'newPassword';

			const updated = await MemberServices.updatePassword(member.email, newPassword);

			expect(compareSync(newPassword, updated.hashedPassword)).toBeTruthy();
		});
	});
});
