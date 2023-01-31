import MemberServices from 'services/MemberServices';
import SessionServices from 'services/SessionServices';

import { dataSource, closeDatabase, startDatabase } from 'db';
import { ErrorMessages } from 'utils/enums/ErrorMessages';
import { randomBytes } from 'crypto';

describe('Authentication integration test', () => {
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

	describe("when email address doesn't belong to existing user", () => {
		it('throws invalid credentials error', async () => {
			const email = 'unknown@email.com';

			expect(() => MemberServices.signIn(email, 'password')).rejects.toThrowError(
				ErrorMessages.INVALID_CREDENTIALS_ERROR_MESSAGE
			);
		});
	});

	describe('when email address belongs to existing user', () => {
		const email = 'email@test.com';
		describe('when password is invalid', () => {
			it('throws invalid credentials error', async () => {
				await MemberServices.signUp('username', email, 'password');

				expect(() => MemberServices.signIn(email, 'incorrect')).rejects.toThrowError(
					ErrorMessages.INVALID_CREDENTIALS_ERROR_MESSAGE
				);
			});
		});

		describe('when password is valid', () => {
			it('creates session in database', async () => {
				await MemberServices.signUp('username', email, 'password');

				const { session } = await MemberServices.signIn(email, 'password');

				const sessions = await SessionServices.findByToken(session.token);

				expect(sessions?.member.email).toEqual(email);
			});

			it('returns user and session', async () => {
				await MemberServices.signUp('username', email, 'password');

				const login = await MemberServices.signIn(email, 'password');

				expect(login).toHaveProperty('user');
				expect(login).toHaveProperty('session');
				expect(login.user.email).toEqual(email);
			});
		});
	});

	describe('when signing out', () => {
		describe('when session token is invalid', () => {
			it('throw a session not found error', async () => {
				expect(() => SessionServices.delete(randomBytes(16).toString('hex'))).rejects.toThrowError(
					ErrorMessages.SESSION_NOT_FOUND_ERROR_MESSAGE
				);
			});
		});

		describe.skip('when session token is valid', () => {
			it('deletes session from database', async () => {
				await MemberServices.signUp('username', 'user@test.com', 'password');

				const { session } = await MemberServices.signIn('user@test.com', 'password');

				await MemberServices.signOut(session.token);

				expect(await SessionServices.findByToken(session.token)).toBeNull();
			});
		});
	});
});
