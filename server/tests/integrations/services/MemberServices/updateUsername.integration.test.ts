import { MemberServices } from 'services/MemberServices';

import { Database } from 'db';

describe('Update a Member username integration test', () => {
	const MemberService = new MemberServices();

	describe('when update username', () => {
		it('return an member', async () => {
			const username = 'username';
			const email = 'unknown@email.com';
			const password = 'password';

			const member = await MemberService.signUp(username, email, password);

			const newUsername = 'newUsername';

			const updated = await MemberService.updateUsername(member.id, newUsername);

			expect(updated.username).toEqual(newUsername);
		});
	});
});
