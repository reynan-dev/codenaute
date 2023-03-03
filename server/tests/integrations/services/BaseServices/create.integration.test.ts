import { hashSync } from 'bcryptjs';
import { Database } from 'db';
import { MemberServices } from 'services/MemberServices';

describe('Create integration test', () => {
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

	describe('when try create an user with valid data', () => {
		describe('when trying to create an element that already exists', () => {
			beforeEach(() => {
				jest.spyOn(console, 'log').mockImplementation(() => {});
			});

			it('throw an error not created', async () => {
				const hashedPassword = hashSync('password', 10);

				const data = {
					username: 'usertest',
					email: 'user@test.com',
					hashedPassword: hashedPassword
				};

				await MemberService.signUp(data.username, data.email, data.hashedPassword);

				expect(() => MemberService.create(data)).rejects.toThrowError();
			});
		});

		describe('when trying create a new element', () => {
			it('returns an element', async () => {
				const hashedPassword = hashSync('password', 10);

				const data = {
					username: 'usertest',
					email: 'user@test.com',
					hashedPassword: hashedPassword
				};

				const created = await MemberService.create(data);

				expect(created.username).toEqual(data.username);
				expect(created.email).toEqual(data.email);
				expect(created.password).not.toEqual(data.hashedPassword);
			});
		});
	});
});
