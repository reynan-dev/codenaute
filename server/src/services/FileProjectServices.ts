import { UUID } from 'utils/types/Uuid';
import { BaseServices } from 'services/base/BaseServices';
import { FileProject } from 'models/FileProject';

export class FileProjectServices extends BaseServices {
	constructor() {
		super(FileProject);
	}

	async findById(fileProjectId: UUID): Promise<FileProject> {
		return this.repository.findOne({ where: { id: fileProjectId }, relations: ['project'] });
	}

	async findAllByProjectId(projectId: UUID): Promise<FileProject[]> {
		return this.repository.find({
			where: { project: { id: projectId } },
			relations: { project: true }
		});
	}
}
