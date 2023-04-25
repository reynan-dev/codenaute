import { UUID } from 'utils/types/Uuid';
import { ErrorMessages } from 'utils/enums/ErrorMessages';
import { Project } from 'models/Project';
import { Member } from 'models/Member';
import { BaseServices } from 'services/base/BaseServices';
import { MemberServices } from 'services/MemberServices';

export class ProjectServices extends BaseServices {
	MemberServices: MemberServices = new MemberServices();

	constructor() {
		super(Project);
	}

	async findAllPublic(): Promise<Project[]> {
		return this.repository.find({
			where: { isPublic: true },
			relations: ['owner', 'editors', 'favoritedBy', 'files']
		});
	}

	async findAllByOwner(memberId: UUID): Promise<Project[]> {
		return this.repository.find({
			where: { owner: { id: memberId } },
			relations: ['owner', 'editors', 'favoritedBy', 'files']
		});
	}

	async findAllByEditorId(memberId: UUID): Promise<Project[]> {
		return this.repository.find({
			where: { editors: { id: memberId } },
			relations: ['owner', 'editors', 'favoritedBy', 'files']
		});
	}

	async findAllByFavorites(memberId: UUID): Promise<Project[]> {
		return this.repository.find({
			where: { favoritedBy: { id: memberId } },
			relations: ['owner', 'editors', 'favoritedBy', 'files']
		});
	}

	async findAllByTemplate(templateId: UUID): Promise<Project[]> {
		return this.repository.find({
			where: { template: { id: templateId } },
			relations: ['owner', 'editors', 'favoritedBy', 'files']
		});
	}

	async findAllByProgrammingLanguage(programmingLanguageId: UUID): Promise<Project[]> {
		return this.repository.find({
			where: { programmingLanguage: { id: programmingLanguageId } },
			relations: ['owner', 'editors', 'favoritedBy', 'files']
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
