import { MemberServices } from 'services/MemberServices';

import { Database } from 'db';

describe('Update a Member email integration test', () => {
	const MemberService = new MemberServices();

	describe('when update email', () => {
		it('return an member', async () => {
			const username = 'username';
			const email = 'unknown@email.com';
			const password = 'password';

			const member = await MemberService.signUp(username, email, password);

			const newEmail = 'newemail@test.com';

			const updated = await MemberService.updateEmail(member.id, newEmail);

			expect(updated.email).toEqual(newEmail);
		});
	});
});
