import Member from 'entities/Member';
import Session from 'entities/Session';
import BaseServices from 'services/base/BaseServices';

import { ErrorMessages } from 'utils/enums/ErrorMessages';
import { SessionType } from 'utils/types/EntitiesTypes';

class SessionServices extends BaseServices {
	constructor() {
		super(Session);
	}

	async create(member: Member) {
		const session = new Session(member);
		return await this.repository.save(session);
	}

	async findByToken(token: string): Promise<SessionType | null> {
		return await this.findOneBy({ token });
	}

	async delete(token: string) {
		const session = await this.findByToken(token);
		if (!session) throw Error(ErrorMessages.SESSION_NOT_FOUND_ERROR_MESSAGE);

		return await this.repository.remove(session);
	}
}

export default new SessionServices();
