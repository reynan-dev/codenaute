import BaseServices from 'services/base/BaseServices';
import FileProject from 'entities/FileProject';

class FileProjectServices extends BaseServices {
	constructor() {
		super(FileProject);
	}
}

export default new FileProjectServices();
