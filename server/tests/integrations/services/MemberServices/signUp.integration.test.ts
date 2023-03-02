import { MemberServices } from 'services/MemberServices';

import { Database } from 'db';
import { ErrorMessages } from 'utils/enums/ErrorMessages';

describe('Singup a Member integration test', () => {
	const MemberService = new MemberServices();

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
		it('return an member', async () => {
			const data = {
				username: 'username',
				email: 'unknown@email.com',
				password: 'password'
			};

			const user = await MemberService.signUp(data.username, data.email, data.password);

			expect(user.username).toEqual(data.username);
			expect(user.email).toEqual(data.email);
		});
	});

	describe('when email address belongs to existing user', () => {
		beforeEach(() => {
			jest.spyOn(console, 'log').mockImplementation(() => {});
		});

		it('throws an member already exists error', async () => {
			const data = {
				username: 'username',
				email: 'unknown@email.com',
				password: 'password'
			};

			await MemberService.signUp(data.username, data.email, data.password);

			expect(() =>
				MemberService.signUp(data.username, data.email, data.password)
			).rejects.toThrowError(ErrorMessages.MEMBER_ALREADY_EXISTS_ERROR_MESSAGE);
		});
	});
});
