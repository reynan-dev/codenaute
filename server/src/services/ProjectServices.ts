import BaseServices from 'services/base/BaseServices';
import Project from 'entities/Project';

class ProjectServices extends BaseServices {
	constructor() {
		super(Project);
	}
}

export default new ProjectServices();
