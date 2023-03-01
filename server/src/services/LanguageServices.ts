import BaseServices from 'services/base/BaseServices';
import Language from 'entities/Language';

class LanguageServices extends BaseServices {
	constructor() {
		super(Language);
	}

	async findByName(name: string): Promise<Language> {
		return this.repository.findOne({ where: { name } });
	}
}

export default new LanguageServices();
