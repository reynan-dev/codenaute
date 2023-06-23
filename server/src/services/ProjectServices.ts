import { UUID } from 'utils/types/Uuid';
import { ErrorMessages } from 'utils/enums/ErrorMessages';
import { Project } from 'models/Project';
import { Member } from 'models/Member';
import { BaseServices } from 'services/base/BaseServices';
import { MemberServices } from 'services/MemberServices';
import { SandpackTemplates } from 'utils/enums/SandpackTemplates';

export class ProjectServices extends BaseServices {
	MemberServices: MemberServices = new MemberServices();

	constructor() {
		super(Project);
	}

	async findAllPublic(): Promise<Project[]> {
		return this.repository.find({
			where: { isPublic: true },
			relations: ['owner', 'editors', 'favoritedBy']
		});
	}

	async findAllByOwner(memberId: UUID): Promise<Project[]> {
		return this.repository.find({
			where: { owner: { id: memberId } },
			relations: ['owner', 'editors', 'favoritedBy']
		});
	}

	async findAllByEditorId(memberId: UUID): Promise<Project[]> {
		return this.repository.find({
			where: { editors: { id: memberId } },
			relations: ['owner', 'editors', 'favoritedBy']
		});
	}

	async findAllByFavorites(memberId: UUID): Promise<Project[]> {
		return this.repository.find({
			where: { favoritedBy: { id: memberId } },
			relations: ['owner', 'editors', 'favoritedBy']
		});
	}

	async findAllByTemplate(template: SandpackTemplates): Promise<Project[]> {
		return this.repository.find({
			where: { sandpackTemplate: template },
			relations: ['owner', 'editors', 'favoritedBy']
		});
	}

	async addToFavorite(member: Member, project: Project): Promise<Project> {
		project.favoritedBy.push(member);

		return this.repository.save(project);
	}

	async share(project: Project, members: Member[]): Promise<Project> {
		project.editors = [...members];

		return this.repository.save(project);
	}
}
