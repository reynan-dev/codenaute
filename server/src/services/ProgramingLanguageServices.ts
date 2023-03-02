import { BaseServices } from 'services/base/BaseServices';
import { ProgramingLanguage } from 'entities/ProgramingLanguage';

export class ProgramingLanguageServices extends BaseServices {
	constructor() {
		super(ProgramingLanguage);
	}

	async findByName(name: string): Promise<ProgramingLanguage> {
		return this.repository.findOne({ where: { name } });
	}
}
