import { MemberServices } from 'services/MemberServices';

describe('FindOneBy integration test', () => {
	const MemberService = new MemberServices();

	describe('when no records exist', () => {
		it('returns an nullable element', async () => {
			const email = 'unknow@test.com';

			expect(await MemberService.findOneBy({ email })).toBeNull();
		});
	});

	describe('when records exist', () => {
		it('returns a element', async () => {
			const email = 'unknow@test.com';

			const member = await MemberService.signUp('usertest', email, 'password');

			expect(await MemberService.findOneBy({ email })).toEqual(member);
		});
	});

	describe('when params is empty', () => {
		it('returns an array empty', async () => {
			expect(await MemberService.findOneBy()).toEqual([]);
		});
	});
});
