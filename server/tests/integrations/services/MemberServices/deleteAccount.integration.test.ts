import { MemberServices } from 'services/MemberServices';

describe('Delete a Member account integration test', () => {
	const MemberService = new MemberServices();

	describe('when delete account with valid email', () => {
		it('return an member', async () => {
			const username = 'username';
			const email = 'unknown@email.com';
			const password = 'password';

			const member = await MemberService.signUp(username, email, password);
			await MemberService.deleteAccount(member);

			expect(await MemberService.findById(member.id)).toBeNull();
		});
	});
});
