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

	async findAllByOwner(memberId: string): Promise<Project[]> {
		return this.repository.find({
			where: { owner: { id: memberId } },
			relations: ['owner', 'editors', 'favoritedBy', 'files']
		});
	}

	async findAllByEditorId(memberId: string): Promise<Project[]> {
		return this.repository.find({
			where: { editors: { id: memberId } },
			relations: ['owner', 'editors', 'favoritedBy', 'files']
		});
	}

	async findAllByFavorites(memberId: string): Promise<Project[]> {
		return this.repository.find({
			where: { favoritedBy: { id: memberId } },
			relations: ['owner', 'editors', 'favoritedBy', 'files']
		});
	}

	async findAllByTemplate(templateId: string): Promise<Project[]> {
		return this.repository.find({
			where: { template: { id: templateId } },
			relations: ['owner', 'editors', 'favoritedBy', 'files']
		});
	}

	async findAllByProgrammingLanguage(programmingLanguageId: string): Promise<Project[]> {
		return this.repository.find({
			where: { programmingLanguage: { id: programmingLanguageId } },
			relations: ['owner', 'editors', 'favoritedBy', 'files']
		});
	}

	async addToFavorite(member: Member, projectId: string): Promise<Project> {
		const project = await this.findById(projectId);

		if (!project) throw new Error(ErrorMessages.PROJECT_NOT_FOUND);

		if(project.favoritedBy.includes(member))
			throw new Error(ErrorMessages.MEMBER_ALREADY_ADDED);

		project.favoritedBy.push(member);

		return this.repository.save(project);
	}

	async share(projectId: string, members: Member[]): Promise<Project> {
		const project = await this.findById(projectId);

		if (!project) throw new Error(ErrorMessages.PROJECT_NOT_FOUND);

		project.editors = [...members];

		return this.repository.save(project);
	}
}
