import { MemberServices } from 'services/MemberServices';
import { RoutingTokenServices } from 'services/RoutingTokenServices';

import { Database } from 'db';

describe('Find a RoutingToken ByToken integration test', () => {
	const MemberService = new MemberServices();
	const RoutingTokenService = new RoutingTokenServices();

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

	describe('when find a routing token by the token', () => {
		it('return an member', async () => {
			const username = 'username';
			const email = 'unknown@email.com';
			const password = 'password';

			const member = await MemberService.signUp(username, email, password);

			const routingToken = await RoutingTokenService.create(member);

			expect(await RoutingTokenService.findByToken(routingToken.token)).toEqual(routingToken);
		});
	});
});
