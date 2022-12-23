import Member from '../entities/Member';
import Session from '../entities/Session';
import BaseServices from './base/BaseServices';

import { SESSION_NOT_FOUND_ERROR_MESSAGE } from '../utils/errorMessage';

class SessionServices extends BaseServices {
	constructor() {
		super(Session);
	}

	async create(member: Member) {
		const session = new Session(member);
		return this.repository.save(session);
	}

	async findByToken(token: string): Promise<Session | null> {
		return await this.findOneBy({ token });
	}
}

export default new SessionServices();
