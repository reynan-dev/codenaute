import BaseServices from 'services/base/BaseServices';
import Language from 'entities/Language';

class LanguageServices extends BaseServices {
	constructor() {
		super(Language);
	}
}

export default new LanguageServices();
