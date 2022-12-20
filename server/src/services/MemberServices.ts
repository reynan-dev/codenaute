import { compareSync, hashSync } from 'bcryptjs';

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

		let user = await this.repository.findOne({ email: email });

		if (!user || !compareSync(password, user.hashedPassword)) {
			throw Error('Member not found');
		}

		const session = await SessionServices.create(user);

		return { user, session };
	}

	async signUp(username: string, email: string, password: string) {
		if (!email || !password) {
			throw Error('Empty email or password');
		}

		let user = await this.repository.findBy({ email: email });

		if (user) {
			throw Error('Member already exists');
		}

		const hashedPassword = hashSync(password, 10);

		user = await this.repository.create({
			username: username,
			email: email,
			hashedPassword: hashedPassword
		});

		const session = await SessionServices.create(user);

		return { user, session };
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
