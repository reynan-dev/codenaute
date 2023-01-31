import MemberServices from 'services/MemberServices';

import { dataSource, closeDatabase, startDatabase } from 'db';
import { compareSync } from 'bcryptjs';
import { ErrorMessages } from 'utils/enums/ErrorMessages';

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
			const username = 'username';
			const email = 'email@email.com';
			const password = 'password';

			await MemberServices.signUp(username, email, password);

			const wrong_email = 'unknown@email.com';
			const newPassword = 'newPassword';

			expect(() =>
				MemberServices.updatePassword(wrong_email, newPassword, newPassword, password)
			).rejects.toThrowError(ErrorMessages.INVALID_EMAIL_ERROR_MESSAGE);
		});
	});

	describe('when update password with valid email but passwords dont match', () => {
		it('throw an passwords do not matchs error', async () => {
			const username = 'username';
			const email = 'email@email.com';
			const password = 'password';

			const member = await MemberServices.signUp(username, email, password);

			const newPassword = 'newPassword';

			expect(() =>
				MemberServices.updatePassword(member.email, newPassword, password, password)
			).rejects.toThrowError(ErrorMessages.PASSWORDS_DO_NOT_MATCH_ERROR_MESSAGE);
		});
	});

	describe('when update password with valid email but the old password is invalid', () => {
		it('throw an invalid password error', async () => {
			const username = 'username';
			const email = 'email@email.com';
			const password = 'password';

			const member = await MemberServices.signUp(username, email, password);

			const newPassword = 'newPassword';

			expect(() =>
				MemberServices.updatePassword(member.email, newPassword, newPassword, newPassword)
			).rejects.toThrowError(ErrorMessages.INVALID_PASSWORD_ERROR_MESSAGE);
		});
	});

	describe('when update password with valid email and passwords match', () => {
		it('return an member', async () => {
			const username = 'username';
			const email = 'email@email.com';
			const password = 'password';

			const member = await MemberServices.signUp(username, email, password);

			const newPassword = 'newPassword';

			const updated = await MemberServices.updatePassword(
				member.email,
				newPassword,
				newPassword,
				password
			);

			expect(compareSync(newPassword, updated.hashedPassword)).toBeTruthy();
		});
	});
});
