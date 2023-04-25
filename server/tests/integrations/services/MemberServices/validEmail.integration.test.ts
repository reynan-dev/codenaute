import { MemberServices } from 'services/MemberServices';

describe('Validate a Member email integration test', () => {
	const MemberService = new MemberServices();

	describe('when valid email', () => {
		it('return an member', async () => {
			const memberData = {
				username: 'username',
				email: 'email',
				password: 'password'
			};

			const member = await MemberService.signUp(
				memberData.username,
				memberData.email,
				memberData.password
			);

			await MemberService.validEmail(member.email);

			const updated = await MemberService.findOneBy({ id: member.id });

			expect(updated.isValidEmail).toBeTruthy();
		});
	});
});
