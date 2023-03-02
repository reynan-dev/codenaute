import { MemberServices } from 'services/MemberServices';
import { SessionServices } from 'services/SessionServices';

import { Database } from 'db';
import { ErrorMessages } from 'utils/enums/ErrorMessages';
import { randomBytes } from 'crypto';

describe('Authentication integration test', () => {
	const MemberService = new MemberServices();
	const SessionService = new SessionServices();

	beforeAll(async () => {
		jest.spyOn(console, 'info').mockImplementation(() => {});
		await Database.start();
	});

	afterAll(async () => {
		await Database.stop();
	});

	beforeEach(async () => {
		for (const entity of Database.entityMetadatas) {
			const repository = Database.repository(entity.name);
			await repository.query(`TRUNCATE ${entity.tableName} RESTART IDENTITY CASCADE;`);
		}
	});

	describe("when email address doesn't belong to existing user", () => {
		it('throws invalid credentials error', async () => {
			const email = 'unknown@email.com';

			expect(() => MemberService.signIn(email, 'password')).rejects.toThrowError(
				ErrorMessages.INVALID_CREDENTIALS_ERROR_MESSAGE
			);
		});
	});

	describe('when email address belongs to existing user', () => {
		const email = 'email@test.com';
		describe('when password is invalid', () => {
			it('throws invalid credentials error', async () => {
				await MemberService.signUp('username', email, 'password');

				expect(() => MemberService.signIn(email, 'incorrect')).rejects.toThrowError(
					ErrorMessages.INVALID_CREDENTIALS_ERROR_MESSAGE
				);
			});
		});

		describe('when password is valid', () => {
			it('creates session in database', async () => {
				await MemberService.signUp('username', email, 'password');

				const { session } = await MemberService.signIn(email, 'password');

				const sessions = await SessionService.findByToken(session.token);

				expect(sessions?.member.email).toEqual(email);
			});

			it('returns user and session', async () => {
				await MemberService.signUp('username', email, 'password');

				const login = await MemberService.signIn(email, 'password');

				expect(login).toHaveProperty('user');
				expect(login).toHaveProperty('session');
				expect(login.user.email).toEqual(email);
			});
		});
	});

	describe('when signing out', () => {
		describe('when session token is invalid', () => {
			it('throw a session not found error', async () => {
				expect(() => SessionService.delete(randomBytes(16).toString('hex'))).rejects.toThrowError(
					ErrorMessages.SESSION_NOT_FOUND_ERROR_MESSAGE
				);
			});
		});

		describe('when session token is valid', () => {
			it('deletes session from database', async () => {
				await MemberService.signUp('username', 'user@test.com', 'password');

				const { session } = await MemberService.signIn('user@test.com', 'password');

				await MemberService.signOut(session.token);

				expect(await SessionService.findByToken(session.token)).toBeNull();
			});
		});
	});
});
