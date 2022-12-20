import { compareSync } from 'bcryptjs';

import Member from '../entities/Member.js';
import BaseServices from './base/BaseServices.js';
import SessionServices from './SessionServices.js';

class MemberServices extends BaseServices {
	constructor() {
		super(Member);
	}

	async signIn(email: string, password: string) {
		if (!email || !password) {
			throw Error('Empty email or password');
		}

		let member = await this.repository.findOne({ email: email });

		if (!member || !compareSync(password, member.hashedPassword)) {
			throw Error('Member not found');
		}

		const session = await SessionServices.create(member);

		return { member, session };
	}

	async findBySessionToken(token: string): Promise<Member | null> {
		const session = await SessionServices.findByToken(token);
		if (!session) {
			return null;
		}
		return session.member;
	}
}

export default new MemberServices();
