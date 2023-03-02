import { BaseServices } from 'services/base/BaseServices';
import { ProgramingLanguage } from 'models/ProgramingLanguage';

export class ProgramingLanguageServices extends BaseServices {
	constructor() {
		super(ProgramingLanguage);
	}

	async findByName(name: string): Promise<ProgramingLanguage> {
		return this.repository.findOne({ where: { name } });
	}
}
