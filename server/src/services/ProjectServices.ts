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
			relations: ['owner']
		});
	}

	// async getWilders(
	// 	pageSize: number,
	// 	pageNumber: number
	//   ): Promise<PageOfWilders> {
	// 	const [wilders, totalCount] = await this.repository.findAndCount({
	// 	  take: pageSize,
	// 	  skip: (pageNumber - 1) * pageSize,
	// 	  order: { firstName: "ASC" },
	// 	});

	// 	const numberOfRemainingItems = totalCount - pageSize * pageNumber;
	// 	return {
	// 	  totalCount,
	// 	  nextPageNumber: numberOfRemainingItems > 0 ? pageNumber + 1 : null,
	// 	  wilders,
	// 	};
	//   }

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

	async addToFavorite(member: Member, projectId: UUID): Promise<Project> {
		const project = await this.findById(projectId);

		if (!project) throw new Error(ErrorMessages.PROJECT_NOT_FOUND);

		if (project.favoritedBy.includes(member)) throw new Error(ErrorMessages.MEMBER_ALREADY_ADDED);

		project.favoritedBy.push(member);

		return this.repository.save(project);
	}

	async share(memberId: UUID, members: Member[]): Promise<Project> {
		const project = await this.findById(memberId);

		if (!project) throw new Error(ErrorMessages.PROJECT_NOT_FOUND);

		project.editors = [...members];

		return this.repository.save(project);
	}
}
