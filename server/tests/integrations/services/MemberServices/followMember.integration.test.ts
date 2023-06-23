import { Member } from 'models/Member';
import { MemberServices } from 'services/MemberServices';
import { ErrorMessages } from 'utils/enums/ErrorMessages';
import { v4 as uuid } from 'uuid';

describe('Follow Member integration test', () => {
	const MemberService = new MemberServices();

	const ownerData = {
		username: 'data',
		email: 'data@email.com',
		password: 'password'
	};

	const memberToFollowData = {
		username: 'dataToFollow',
		email: 'dataToFollow@email.com',
		hashedPassword: 'password'
	};

	describe.skip('when memberToFollow and member is valid and when member and memberToFollow are not the same', () => {
		it('return the member', async () => {
			const owner = await MemberService.signUp(
				ownerData.username,
				ownerData.email,
				ownerData.password
			);

			const memberToFollow = await MemberService.signUp(
				memberToFollowData.username,
				memberToFollowData.email,
				memberToFollowData.hashedPassword
			);

			const followingMember = await MemberService.followMember(owner, memberToFollow);

			const followedMember = (await MemberService.findById(memberToFollow.id)) as Member;

			expect(followingMember.following).toHaveLength(1);
			expect(followingMember.following[0].id).toEqual(memberToFollow.id);
			expect(followedMember.followers).toHaveLength(1);
			expect(followedMember.followers[0].id).toEqual(owner.id);
		});
	});
});
