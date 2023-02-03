import BaseServices from 'services/base/BaseServices';
import SandpackTemplate from 'entities/SandpackTemplate';

class SandpackTemplateServices extends BaseServices {
	constructor() {
		super(SandpackTemplate);
	}
}

export default new SandpackTemplateServices();
