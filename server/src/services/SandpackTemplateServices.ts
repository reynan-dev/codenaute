import { BaseServices } from 'services/base/BaseServices';
import { SandpackTemplate } from 'entities/SandpackTemplate';

export class SandpackTemplateServices extends BaseServices {
	constructor() {
		super(SandpackTemplate);
	}

	async findBySlug(slug: string): Promise<SandpackTemplate> {
		return this.repository.findOne({ where: { slug } });
	}
}
