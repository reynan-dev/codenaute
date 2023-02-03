import BaseServices from 'services/base/BaseServices';
import Favorite from 'entities/Favorite';

class FavoriteServices extends BaseServices {
	constructor() {
		super(Favorite);
	}

	async findAllByMemberId(memberId: string): Promise<Favorite[]> {
		return this.repository.find({ where: { member: { id: memberId } } });
	}
}

export default new FavoriteServices();
