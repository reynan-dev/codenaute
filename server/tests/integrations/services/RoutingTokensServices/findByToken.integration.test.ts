import MemberServices from '../../../../src/services/MemberServices';
import RoutingTokenServices from '../../../../src/services/RoutingTokenServices';

import { dataSource, closeDatabase, startDatabase } from '../../../../src/db';

describe('Find a RoutingToken ByToken integration test', () => {
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

	describe('when find a routing token by the token', () => {
		it('return an member', async () => {
			const username = 'username';
			const email = 'unknown@email.com';
			const password = 'password';

			const member = await MemberServices.signUp(username, email, password);

			const routingToken = await RoutingTokenServices.create(member.id);

			expect(await RoutingTokenServices.findByToken(routingToken.token)).toEqual(routingToken);
		});
	});
});
