import { Member } from 'entities/Member';
import { Session } from 'entities/Session';
import { BaseServices } from 'services/base/BaseServices';

import { ErrorMessages } from 'utils/enums/ErrorMessages';

export class SessionServices extends BaseServices {
	constructor() {
		super(Session);
	}

	async create(member: Member) {
		const session = new Session(member);
		return await this.repository.save(session);
	}

	async findByToken(token: string): Promise<Session | null> {
		return await this.findOneBy({ token });
	}

	async delete(token: string) {
		const session = await this.findByToken(token);
		if (!session) throw Error(ErrorMessages.SESSION_NOT_FOUND_ERROR_MESSAGE);

		return await this.repository.remove(session);
	}
}
