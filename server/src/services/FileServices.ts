import BaseServices from 'services/base/BaseServices';
import File from 'entities/File';

class FileServices extends BaseServices {
	constructor() {
		super(File);
	}
}

export default new FileServices();
