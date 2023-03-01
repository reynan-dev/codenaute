import {MemberServices} from 'services/MemberServices';

import { dataSource, closeDatabase, startDatabase } from 'db';

describe('Update a Member email integration test', () => {

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

	describe('when update email', () => {
		it('return an member', async () => {
			const username = 'username';
			const email = 'unknown@email.com';
			const password = 'password';

			const member = await MemberService.signUp(username, email, password);

			const newEmail = 'newemail@test.com';

			const updated = await MemberService.updateEmail(member.id, newEmail);

			expect(updated.email).toEqual(newEmail);
		});
	});
});
