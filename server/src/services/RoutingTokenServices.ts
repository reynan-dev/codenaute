import { BaseServices } from 'services/base/BaseServices';
import { RoutingToken } from 'models/RoutingToken';
import { Member } from 'models/Member';

export class RoutingTokenServices extends BaseServices {
	constructor() {
		super(RoutingToken);
	}

	async create(member: Member) {
		const routingToken = new RoutingToken(member.email);

		return await this.repository.save(routingToken);
	}

	async findByToken(token: string): Promise<RoutingToken | null> {
		return await this.findOneBy({ token });
	}
}
