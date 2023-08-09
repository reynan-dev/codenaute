import { UUID } from 'utils/types/Uuid';
import { Project } from 'models/Project';
import { BaseServices } from 'services/base/BaseServices';
import { MemberServices } from 'services/MemberServices';

export class ProjectServices extends BaseServices {
	MemberServices: MemberServices = new MemberServices();

	constructor() {
		super(Project);
	}

	async findAllByOwner(memberId: UUID): Promise<Project[]> {
		return this.repository.find({
			where: { owner: { id: memberId } },
			relations: ['owner']
		});
	}

	async findAllPublic(): Promise<Project[]> {
		return this.repository.find({
			where: { isPublic: true },
			relations: ['owner']
		});
	}
}
