import BaseServices from 'services/base/BaseServices';
import FileProject from 'entities/FileProject';

class FileProjectServices extends BaseServices {
	constructor() {
		super(FileProject);
	}

	async findAllByProjectId(projectId: string): Promise<FileProject[]> {
		return this.findBy({ where: { project: { id: projectId } } });
	}
}

export default new FileProjectServices();
