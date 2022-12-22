import { compareSync, hashSync } from 'bcryptjs';

import Member from '../entities/Member';
import BaseServices from './base/BaseServices';
import SessionServices from './SessionServices';

import {
	INVALID_CREDENTIALS_ERROR_MESSAGE,
	MEMBER_ALREADY_EXISTS_ERROR_MESSAGE
} from '../utils/errorMessage.js';

class MemberServices extends BaseServices {
	constructor() {
		super(Member);
	}

	async signIn(email: string, password: string) {
		const user = await this.repository.findBy({ email: email });

		if (!user || !compareSync(password, user.hashedPassword)) {
			throw Error(INVALID_CREDENTIALS_ERROR_MESSAGE);
		}

		const session = await SessionServices.create(user);

		return { user, session };
	}

	async signUp(username: string, email: string, password: string) {
		let user = await this.repository.findBy({ email: email });

		if (user) {
			throw Error(MEMBER_ALREADY_EXISTS_ERROR_MESSAGE);
		}

		const hashedPassword = hashSync(password, 10);

		return await this.repository.create({
			username: username,
			email: email,
			hashedPassword: hashedPassword
		});
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
