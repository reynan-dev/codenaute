import { hashSync } from 'bcryptjs';
import { Member } from 'models/Member';
import { define } from 'typeorm-seeding';

define(Member, () => {
	const member = new Member();
	member.username = 'admin';
	member.email = 'admin@codenaute.com';
	member.hashedPassword = hashSync('Admin1234!', 10);
	return member;
});
