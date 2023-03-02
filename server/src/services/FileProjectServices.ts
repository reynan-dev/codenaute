import { BaseServices } from 'services/base/BaseServices';
import { FileProject } from 'entities/FileProject';

export class FileProjectServices extends BaseServices {
	constructor() {
		super(FileProject);
	}

	async findById(id: string): Promise<FileProject> {
		return this.repository.findOne({ where: { id }, relations: ['project'] });
	}

	async findAllByProjectId(projectId: string): Promise<FileProject[]> {
		return this.repository.find({
			where: { project: { id: projectId } },
			relations: { project: true }
		});
	}
}
