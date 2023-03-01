import { ObjectLiteral } from 'typeorm';

import { ErrorMessages } from 'utils/enums/ErrorMessages';

import Project from 'entities/Project';
import Member from 'entities/Member';

import BaseServices from 'services/base/BaseServices';
import MemberServices from 'services/MemberServices';
import Language from 'entities/Language';
import SandpackTemplate from 'entities/SandpackTemplate';

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

	async findByFavorites(memberId: string): Promise<Project[]> {
		return this.repository.find({ where: { favorites: { id: memberId } } });
	}

	async findByTemplate(templateId: string): Promise<Project[]> {
		return this.repository.find({ where: { template: { id: templateId } } });
	}

	async findByLanguage(languageId: string): Promise<Project[]> {
		return this.repository.find({ where: { language: { id: languageId } } });
	}

	async favorite(memberId: string, projectId: string): Promise<Project> {
		const project = await this.findById(projectId);

		if (!project) throw new Error(ErrorMessages.PROJECT_NOT_FOUND);

		const member = await MemberServices.findById(memberId);

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

export default new ProjectServices();
