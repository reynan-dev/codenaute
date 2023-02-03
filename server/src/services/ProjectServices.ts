import BaseServices from 'services/base/BaseServices';
import Project from 'entities/Project';
import { ErrorMessages } from 'utils/enums/ErrorMessages';

class ProjectServices extends BaseServices {
	constructor() {
		super(Project);
	}

	async findAllPublic(): Promise<Project[]> {
		return this.repository.find({ where: { isPublic: true } });
	}

	async findByMemberId(memberId: string): Promise<Project[]> {
		return this.repository.find({ where: { members: { id: memberId } } });
	}

	async share(id: string, members: string[]): Promise<Project> {
		const project = await this.repository.findOne(id);

		if (!project) throw new Error(ErrorMessages.PROJECT_NOT_FOUND);

		project.members = [...project.members, ...members];

		return this.repository.save(project);
	}

	async addFile(id: string, files: string[]): Promise<Project> {
		const project = await this.repository.findOne(id);

		if (!project) throw new Error(ErrorMessages.PROJECT_NOT_FOUND);

		project.files = [...project.files, ...files];

		return this.repository.save(project);
	}
}

export default new ProjectServices();
