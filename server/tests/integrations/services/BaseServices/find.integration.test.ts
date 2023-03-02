import { Database } from 'db';
import { MemberServices } from 'services/MemberServices';

describe('Find integration test', () => {
	const MemberService = new MemberServices();

	describe('when no records exist', () => {
		it('returns an empty array', async () => {
			expect(await MemberService.find()).toEqual([]);
		});
	});

	describe('when records exist', () => {
		it('returns an array of records', async () => {
			const member = await MemberService.signUp('usertest', 'user@test.com', 'password');

			expect(await MemberService.find()).toEqual([member]);
		});
	});
});
