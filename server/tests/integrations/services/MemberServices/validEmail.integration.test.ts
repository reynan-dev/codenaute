import { MemberServices } from 'services/MemberServices';

describe('Validate a Member email integration test', () => {
	const MemberService = new MemberServices();

	describe('when valid email', () => {
		it('return an member', async () => {
			const username = 'username';
			const email = 'unknown@email.com';
			const password = 'password';

			const member = await MemberService.signUp(username, email, password);

			await MemberService.validEmail(member.id);

			const updated = await MemberService.findOneBy({ id: member.id });

			expect(updated.isValidEmail).toBeTruthy();
		});
	});
});
