import BaseServices from 'services/base/BaseServices';
import RoutingToken from 'entities/RoutingToken';
import Member from 'entities/Member';
import { RoutingTokenType } from 'utils/types/EntitiesTypes';

class RoutingTokenServices extends BaseServices {
	constructor() {
		super(RoutingToken);
	}

	async create(member: Member) {
		const routingToken = new RoutingToken(member.email);

		return await this.repository.save(routingToken);
	}

	async findByToken(token: string): Promise<RoutingTokenType | null> {
		return await this.findOneBy({ token });
	}
}

export default new RoutingTokenServices();
