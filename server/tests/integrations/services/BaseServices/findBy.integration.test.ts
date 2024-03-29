import { MemberServices } from 'services/MemberServices';

describe('FindBy integration test', () => {
	const MemberService = new MemberServices();

	describe('when no records exist', () => {
		it('returns an empty array', async () => {
			const email = 'unknow@test.com';

			expect(await MemberService.findBy({ email })).toEqual([]);
		});
	});

	describe('when records exist', () => {
		it('returns an array of records', async () => {
			const email = 'unknow@test.com';

			const member = await MemberService.signUp('usertest', email, 'password');

			expect(await MemberService.findBy({ email })).toEqual([member]);
		});
	});

	describe('when params is empty', () => {
		it('returns an empty array', async () => {
			expect(await MemberService.findBy()).toEqual([]);
		});
	});
});
