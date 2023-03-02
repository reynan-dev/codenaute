import { MemberServices } from 'services/MemberServices';

import { dataSource, closeDatabase, startDatabase } from 'db';
import { randomBytes } from 'crypto';

describe('Find a Member by session token integration test', () => {
	const MemberService = new MemberServices();

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

	describe('when session does not exists', () => {
		it('return an element nullable', async () => {
			expect(await MemberService.findBySessionToken(randomBytes(16).toString('hex'))).toBeNull();
		});
	});

	describe('when session exists', () => {
		it('return an member', async () => {
			const username = 'username';
			const email = 'unknown@email.com';
			const password = 'password';

			const member = await MemberService.signUp(username, email, password);

			const login = await MemberService.signIn(email, password);

			const searchResult = await MemberService.findOneById(member.id);

			expect(await MemberService.findBySessionToken(login.session.token)).toEqual(searchResult);
		});
	});
});
