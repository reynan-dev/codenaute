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
		return this.repository.find({ where: { isPublic: true }, relations: ['members', 'favorites', 'files'] });
	}

	async findByMemberId(memberId: string): Promise<Project[]> {
		return this.repository.find({ where: { members: { id: memberId } }, relations: ['members', 'favorites', 'files']  });
	}

	async findByFavorites(memberId: string): Promise<Project[]> {
		return this.repository.find({ where: { favorites: { id: memberId } }, relations: ['members', 'favorites', 'files']  });
	}

	async findByTemplate(templateId: string): Promise<Project[]> {
		return this.repository.find({ where: { template: { id: templateId } }, relations: ['members', 'favorites', 'files']  });
	}

	async findByLanguage(languageId: string): Promise<Project[]> {
		return this.repository.find({ where: { language: { id: languageId } }, relations: ['members', 'favorites', 'files']  });
	}

	async favorite(memberId: string, projectId: string): Promise<Project> {
		const project = await this.findById(projectId);

		if (!project) throw new Error(ErrorMessages.PROJECT_NOT_FOUND);

		const member = await this.MemberServices.findById(memberId);

		project.favorites = [...project.members, ...member];

		return this.repository.save(project);
	}

	async share(id: string, members: Member[]): Promise<Project> {
		const project = await this.findById(id);

		if (!project) throw new Error(ErrorMessages.PROJECT_NOT_FOUND);

		project.members = [...project.members, ...members];

		return this.repository.save(project);
	}
}
