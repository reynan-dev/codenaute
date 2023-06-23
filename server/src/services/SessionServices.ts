import { Member } from 'models/Member';
import { Session } from 'models/Session';
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

	async delete(token: string) {
		const session = await this.findByToken(token);
		if (!session) throw Error(ErrorMessages.SESSION_NOT_FOUND_ERROR_MESSAGE);

		return Boolean(await this.repository.remove(session));
	}

	async findByToken(token: string): Promise<Session | null> {
		return await this.findOneBy({ token });
	}
}
