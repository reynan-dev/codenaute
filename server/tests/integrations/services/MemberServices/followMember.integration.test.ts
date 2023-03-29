import { MemberServices } from 'services/MemberServices';
import { ErrorMessages } from 'utils/enums/ErrorMessages';
import { v4 as uuid } from 'uuid';

describe('Follow Member integration test', () => {
	const MemberService = new MemberServices();

	const data = {
		username: 'data',
		email: 'data@email.com',
		password: 'password'
	};

	const dataToFollow = {
		username: 'dataToFollow',
		email: 'dataToFollow@email.com',
		password: 'password'
	};

	describe('when member or memberToFollow is not valid', () => {
		it('throw a Member Not Found error', async () => {
			const member = await MemberService.signUp(data.username, data.email, data.password);

			expect(() => MemberService.followMember(member.id, uuid())).rejects.toThrowError(
				ErrorMessages.MEMBER_NOT_FOUND
			);
		});
	});

	describe('when memberToFollow and member is valid', () => {
		describe.skip('when member is already following memberToFollow', () => {
		    it("throw a Already Following Member error", async () => {
		        const member = await MemberService.signUp(data.username, data.email, data.password);

		        const memberToFollow = await MemberService.signUp(dataToFollow.username, dataToFollow.email, dataToFollow.password);

		        await MemberService.followMember(member.id, memberToFollow.id);

		        expect(() => MemberService.followMember(member.id, memberToFollow.id)).rejects.toThrowError(
		            ErrorMessages.ALREADY_FOLLOWING_MEMBER_ERROR_MESSAGE
		            );
		        });
		    });

		describe('when member and memberToFollow are the same', () => {
			it('throw a Cannot Follow Self error', async () => {
				const member = await MemberService.signUp(data.username, data.email, data.password);

				expect(() => MemberService.followMember(member.id, member.id)).rejects.toThrowError(
					ErrorMessages.CANNOT_FOLLOW_SELF_ERROR_MESSAGE
				);
			});
		});

		describe('when member and memberToFollow are not the same', () => {
			it('return the member', async () => {
				const member = await MemberService.signUp(data.username, data.email, data.password);

				const memberToFollow = await MemberService.signUp(
					dataToFollow.username,
					dataToFollow.email,
					dataToFollow.password
				);

				const follow = await MemberService.followMember(member.id, memberToFollow.id);

				expect(follow.following).toHaveLength(1);
				expect(follow.following[0].id).toEqual(memberToFollow.id);
			});
		});
	});
});
