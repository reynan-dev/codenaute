import { hashSync } from 'bcryptjs';
import { closeDatabase, dataSource, startDatabase } from '@/db';
import MemberServices from '@/services/MemberServices';

describe.skip('Create integration test', () => {
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

	describe('when try create an user with valid data', () => {
		describe('when trying to create an element that already exists', () => {
			it('throw an error not created', async () => {
				await MemberServices.signUp('usertest', 'user@test.com', 'password');

				const hashedPassword = hashSync('password', 10);

				const data = {
					username: 'usertest',
					email: 'user@test.com',
					password: hashedPassword
				};

				expect(() => MemberServices.create(data)).rejects.toThrowError();
			});
		});

		describe('when trying create a new element', () => {
			it('returns an element', async () => {
				const hashedPassword = hashSync('password', 10);

				const data = {
					username: 'usertest',
					email: 'user@test.com',
					password: hashedPassword
				};

				const created = await MemberServices.create(data);

				expect(created.username).toEqual(data.username);
				expect(created.email).toEqual(data.email);
				expect(created.password).not.toEqual(data.password);
			});
		});
	});
});
