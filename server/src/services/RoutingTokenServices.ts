import BaseServices from './base/BaseServices';
import RoutingToken from '../entities/RoutingToken';
import Member from '../entities/Member';

class RoutingTokenServices extends BaseServices {
	constructor() {
		super(RoutingToken);
	}

	async create(member: Member) {
		const session = new RoutingToken(member.email);
		return await this.repository.save(session);
	}

	async findByToken(token: string): Promise<RoutingToken | null> {
		return await this.findOneBy({ token });
	}
}

export default new RoutingTokenServices();
