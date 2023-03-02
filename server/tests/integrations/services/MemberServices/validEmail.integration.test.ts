import { MemberServices } from 'services/MemberServices';

import { Database } from 'db';

describe('Validate a Member email integration test', () => {
	const MemberService = new MemberServices();

	beforeAll(async () => {
		jest.spyOn(console, 'info').mockImplementation(() => {});
		await Database.start();
	});

	afterAll(async () => {
		await Database.stop();
	});

	beforeEach(async () => {
		for (const entity of Database.entityMetadatas()) {
			const repository = Database.repository(entity.name);
			await repository.query(`TRUNCATE ${entity.tableName} RESTART IDENTITY CASCADE;`);
		}
	});

	describe('when valid email', () => {
		it('return an member', async () => {
			const username = 'username';
			const email = 'unknown@email.com';
			const password = 'password';

			const member = await MemberService.signUp(username, email, password);

			await MemberService.validEmail(member.id);

			const updated = await MemberService.findOneBy({ id: member.id });

			expect(updated.isValidEmail).toBeTruthy();
		});
	});
});
