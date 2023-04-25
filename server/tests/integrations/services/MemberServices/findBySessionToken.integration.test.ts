import { MemberServices } from 'services/MemberServices';
import { randomBytes } from 'crypto';

describe('Find a Member by session token integration test', () => {
	const MemberService = new MemberServices();

	describe('when session does not exists', () => {
		it('return an element nullable', async () => {
			expect(await MemberService.findOneBySessionToken(randomBytes(16).toString('hex'))).toBeNull();
		});
	});

	describe('when session exists', () => {
		it('return an member', async () => {
			const username = 'username';
			const email = 'unknown@email.com';
			const password = 'password';

			const member = await MemberService.signUp(username, email, password);

			const login = await MemberService.signIn(email, password);

			const search = await MemberService.findOneBySessionToken(login.session.token);

			const searchedResult = await MemberService.findById(member.id);

			expect(search?.id).toEqual(searchedResult.id);
		});
	});
});
