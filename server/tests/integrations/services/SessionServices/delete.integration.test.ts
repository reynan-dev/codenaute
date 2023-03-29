import { MemberServices } from 'services/MemberServices';
import { SessionServices } from 'services/SessionServices';
import { ErrorMessages } from 'utils/enums/ErrorMessages';
import { randomBytes } from 'crypto';

describe('Delete Session integration test', () => {
	const MemberService = new MemberServices();
	const SessionService = new SessionServices();

	describe('when deleting a session by a invalid token', () => {
		it('throw an session not found error', async () => {
			expect(() => SessionService.delete(randomBytes(16).toString('hex'))).rejects.toThrowError(
				ErrorMessages.SESSION_NOT_FOUND_ERROR_MESSAGE
			);
		});
	});

	describe('when deleting a session by a valid token', () => {
		it('delete item', async () => {
			const username = 'username';
			const email = 'unknown@email.com';
			const password = 'password';

			const member = await MemberService.signUp(username, email, password);

			const session = await SessionService.create(member);

			await SessionService.delete(session.token);

			expect(await SessionService.findByToken(session.token)).toBeNull();
		});
	});
});
