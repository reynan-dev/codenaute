import { BaseServices } from 'services/base/BaseServices';
import { ProgrammingLanguage } from 'models/ProgrammingLanguage';

export class ProgrammingLanguageServices extends BaseServices {
	constructor() {
		super(ProgrammingLanguage);
	}

	async findByName(name: string): Promise<ProgrammingLanguage> {
		return this.repository.findOne({ where: { name } });
	}
}
