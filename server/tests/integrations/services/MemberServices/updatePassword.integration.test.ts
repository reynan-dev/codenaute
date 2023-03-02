import { MemberServices } from 'services/MemberServices';

import { Database } from 'db';
import { compareSync } from 'bcryptjs';
import { ErrorMessages } from 'utils/enums/ErrorMessages';

describe('Update a Member password integration test', () => {
	const MemberService = new MemberServices();

	describe('when update password with invalid email', () => {
		it('throw an invalid email error', async () => {
			const username = 'username';
			const email = 'email@email.com';
			const password = 'password';

			await MemberService.signUp(username, email, password);

			const wrong_email = 'unknown@email.com';
			const newPassword = 'newPassword';

			expect(() =>
				MemberService.updatePassword(wrong_email, newPassword, newPassword)
			).rejects.toThrowError(ErrorMessages.INVALID_EMAIL_ERROR_MESSAGE);
		});
	});

	describe('when update password with valid email but passwords dont match', () => {
		it('throw an passwords do not matchs error', async () => {
			const username = 'username';
			const email = 'email@email.com';
			const password = 'password';

			const member = await MemberService.signUp(username, email, password);

			const newPassword = 'newPassword';

			expect(() =>
				MemberService.updatePassword(member.email, newPassword, password)
			).rejects.toThrowError(ErrorMessages.PASSWORDS_DO_NOT_MATCH_ERROR_MESSAGE);
		});
	});

	describe('when update password with valid email and passwords match', () => {
		it('return an member', async () => {
			const username = 'username';
			const email = 'email@email.com';
			const password = 'password';

			const member = await MemberService.signUp(username, email, password);

			const newPassword = 'newPassword';

			const updated = await MemberService.updatePassword(member.email, newPassword, newPassword);

			expect(compareSync(newPassword, updated.hashedPassword)).toBeTruthy();
		});
	});
});
