import { Database } from 'utils/configs/database';

beforeAll(async () => {
	jest.spyOn(console, 'info').mockImplementation(() => {});
	jest.spyOn(console, 'log').mockImplementation(() => {});
	await Database.start();

	setTimeout(() => {}, 3000);
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
