import { Database } from 'db';

beforeAll(async () => {
	jest.spyOn(console, 'info').mockImplementation(() => {});
	await Database.start();
});

afterAll(async () => {
	await Database.stop();
});

beforeEach(async () => {
	for (const entity of Database.entities()) {
		const repository = Database.repository(entity.name);
		await repository.query(`TRUNCATE ${entity.tableName} RESTART IDENTITY CASCADE;`);
	}
});
