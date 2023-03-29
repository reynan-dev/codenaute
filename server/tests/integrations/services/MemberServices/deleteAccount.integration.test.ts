import { MemberServices } from 'services/MemberServices';
import { ErrorMessages } from 'utils/enums/ErrorMessages';

describe('Delete a Member account integration test', () => {
	const MemberService = new MemberServices();

	describe('when delete account with invalid password', () => {
		it('throw an invalid password error', async () => {
			const username = 'username';
			const email = 'unknown@email.com';
			const password = 'password';

			const member = await MemberService.signUp(username, email, password);

			expect(() => MemberService.deleteAccount(member.id, 'invalidPassword')).rejects.toThrowError(
				ErrorMessages.INVALID_PASSWORD_ERROR_MESSAGE
			);
		});
	});

	describe('when delete account with valid email', () => {
		it('return an member', async () => {
			const username = 'username';
			const email = 'unknown@email.com';
			const password = 'password';

			const member = await MemberService.signUp(username, email, password);
			await MemberService.deleteAccount(member.id, password);

			expect(await MemberService.findById(member.id)).toBeNull();
		});
	});
});
