import { MemberServices } from 'services/MemberServices';
import { compareSync } from 'bcryptjs';

describe('Update a Member password integration test', () => {
	const MemberService = new MemberServices();

	describe('when update password with valid email and passwords match', () => {
		it('return an member', async () => {
			const username = 'username';
			const email = 'email@email.com';
			const password = 'password';

			const member = await MemberService.signUp(username, email, password);

			const newPassword = 'newPassword';

			const updated = await MemberService.updatePassword(member, newPassword);

			expect(compareSync(newPassword, updated.hashedPassword)).toBeTruthy();
		});
	});
});
