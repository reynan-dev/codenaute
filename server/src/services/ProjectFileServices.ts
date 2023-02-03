import BaseServices from 'services/base/BaseServices';
import ProjectFile from 'entities/ProjectFile';

class ProjectFileServices extends BaseServices {
	constructor() {
		super(ProjectFile);
	}
}

export default new ProjectFileServices();
