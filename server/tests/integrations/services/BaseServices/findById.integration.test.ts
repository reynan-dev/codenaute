import { Member } from 'models/Member';
import { MemberServices } from 'services/MemberServices';
import { v4 as uuid } from 'uuid';

describe('FindById integration test', () => {
	const MemberService = new MemberServices();

	describe('when no records exist', () => {
		it('returns an nullable element', async () => {
			expect(await MemberService.findById(uuid())).toBeNull();
		});
	});

	describe('when records exist', () => {
		it('returns a element', async () => {
			const email = 'unknow@test.com';

			const member = await MemberService.signUp('usertest', email, 'password');

			const find = await MemberService.findById(member.id) as Member;

			console.log(find)

			expect(find.id).toEqual(member.id);
		});
	});
});
