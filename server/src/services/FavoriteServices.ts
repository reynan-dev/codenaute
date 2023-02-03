import BaseServices from 'services/base/BaseServices';
import Favorite from 'entities/Favorite';

class FavoriteServices extends BaseServices {
	constructor() {
		super(Favorite);
	}
}

export default new FavoriteServices();
