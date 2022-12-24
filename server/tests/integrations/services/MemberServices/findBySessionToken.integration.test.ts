import MemberServices from '../../../../src/services/MemberServices';

import { dataSource, closeDatabase, startDatabase } from '../../../../src/db';
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

	describe('when session does not exists', () => {
		it('return an element nullable', async () => {
			expect(await MemberServices.findBySessionToken(randomBytes(16).toString('hex'))).toBeNull();
		});
	});

	describe('when session exists', () => {
		it('return an member', async () => {
			const username = 'username';
			const email = 'unknown@email.com';
			const password = 'password';

			const member = await MemberServices.signUp(username, email, password);

			const login = await MemberServices.signIn(email, password);

			expect(await MemberServices.findBySessionToken(login.session.token)).toEqual(member);
		});
	});
});
