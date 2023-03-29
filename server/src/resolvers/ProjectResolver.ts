import { Args, Mutation, Ctx, Query, Resolver, Authorized } from 'type-graphql';

import { Project } from 'models/Project';
import { ProjectServices } from 'services/ProjectServices';

import { GlobalContext } from 'utils/types/GlobalContext';
import {
	createProjectArgs,
	deleteProjectArgs,
	favoriteProjectArgs,
	getAllProjectsByProgrammingLanguageArgs,
	getAllProjectsByTemplateArgs,
	getProjectByIdArgs,
	getAllProjectsByMemberArgs,
	shareProjectArgs,
	updateProjectActiveFileArgs,
	updateProjectIsPublic,
	updateProjectIsTemplateArgs,
	updateProjectNameArgs
} from 'resolvers/args/ProjectArgs';

import { ErrorMessages } from 'utils/enums/ErrorMessages';
import { ProgrammingLanguageServices } from 'services/ProgrammingLanguageServices';
import { FileProjectServices } from 'services/FileProjectServices';
import { MemberServices } from 'services/MemberServices';
import { Member } from 'models/Member';

@Resolver(Project)
export class ProjectResolver {
	ProjectServices: ProjectServices = new ProjectServices();
	LanguageServices: ProgrammingLanguageServices = new ProgrammingLanguageServices();
	FileProjectServices: FileProjectServices = new FileProjectServices();
	MemberServices: MemberServices = new MemberServices();
	@Authorized()
	@Query(() => Project)
	async getAllProjectsPublicProjects(): Promise<Project[]> {
		// TODO: Need include pagination here
		return this.ProjectServices.findAllPublic();
	}

	@Authorized()
	@Query(() => Project)
	async getAllProjectsByOwner(@Ctx() context: GlobalContext): Promise<Project[]> {
		// TODO: Need to add pagination here
		return this.ProjectServices.findAllByOwner(context.user?.id as string);
	}

	@Authorized()
	@Query(() => Project)
	async getAllProjectsByEditor(@Ctx() context: GlobalContext): Promise<Project[]> {
		// TODO: Need to add pagination here
		return this.ProjectServices.findAllByEditorId(context.user?.id as string);
	}

	@Authorized()
	@Query(() => Project)
	async getAllFavoritedProjectsByMember(
		@Args() { memberId }: getAllProjectsByMemberArgs
	): Promise<Project[]> {
		// TODO: Need to add pagination here
		return this.ProjectServices.findAllByFavorites(memberId);
	}

	@Authorized()
	@Query(() => Project)
	async getAllProjectsByTemplate(
		@Args() { templateId }: getAllProjectsByTemplateArgs
	): Promise<Project[]> {
		// TODO: Need to add pagination here
		return this.ProjectServices.findAllByTemplate(templateId);
	}

	@Authorized()
	@Query(() => Project)
	async getAllProjectsByProgrammingLanguage(
		@Args() { languageId }: getAllProjectsByProgrammingLanguageArgs
	): Promise<Project[]> {
		// TODO: Need to add pagination here
		return this.ProjectServices.findAllByProgrammingLanguage(languageId);
	}

	@Authorized()
	@Query(() => Project)
	async getProjectsById(@Args() { projectId }: getProjectByIdArgs): Promise<Project> {
		return this.ProjectServices.findById(projectId);
	}

	@Authorized()
	@Mutation(() => Project)
	async createProjects(
		@Args() { name, languageId, templateId, activeFileId, isTemplate, isPublic }: createProjectArgs,
		@Ctx() context: GlobalContext
	): Promise<Project> {
		const member = await this.MemberServices.findById(context.user?.id as string);

		const language = await this.LanguageServices.findById(languageId);

		if (!language) throw Error(ErrorMessages.LANGUAGE_NOT_FOUND);

		const template = await this.ProjectServices.findById(templateId);

		const file = await this.FileProjectServices.findById(activeFileId);

		return this.ProjectServices.create({
			name: name,
			owner: member,
			programmingLanguage: language,
			template: template,
			activeFile: file,
			isTemplate: isTemplate,
			isPublic: isPublic
		});
	}

	@Authorized()
	@Query(() => Project)
	async favoriteProject(
		@Args() { projectId }: favoriteProjectArgs,
		@Ctx() context: GlobalContext
	): Promise<Project> {
		const member = await this.MemberServices.findById(context.user?.id as string);
		const project = await this.ProjectServices.findById(projectId);

		if (!member) throw new Error(ErrorMessages.MEMBER_NOT_FOUND);

		if(project.favoritedBy.includes(member))
			throw new Error(ErrorMessages.MEMBER_ALREADY_ADDED);

		return this.ProjectServices.addToFavorite(member, projectId);
	}

	@Authorized()
	@Mutation(() => Project)
	async shareProjects(@Args() { projectId, membersId }: shareProjectArgs): Promise<Project> {
		const members = new Array();
		membersId.map(async (id) => {
			const member = (await this.MemberServices.findById(id)) as Member;
			if (!member) throw Error(ErrorMessages.MEMBER_NOT_FOUND);
			const project = await this.ProjectServices.findById(projectId);
			if(project.editors.includes(...members))
			throw new Error(ErrorMessages.MEMBER_ALREADY_ADDED);
			members.push(member);
		});

		return this.ProjectServices.share(projectId, members);
	}

	@Authorized()
	@Mutation(() => Project)
	async updateProjectsName(@Args() { projectId, name }: updateProjectNameArgs): Promise<Project> {
		const project = await this.ProjectServices.findById(projectId);

		if (!project) throw Error(ErrorMessages.PROJECT_NOT_FOUND);

		return this.ProjectServices.update(project.id, { name });
	}

	@Authorized()
	@Mutation(() => Project)
	async updateProjectsActiveFile(
		@Args() { projectId, activeFile }: updateProjectActiveFileArgs
	): Promise<Project> {
		const project = await this.ProjectServices.findById(projectId);

		if (!project) throw Error(ErrorMessages.PROJECT_NOT_FOUND);

		return this.ProjectServices.update(project.id, { activeFile });
	}

	@Authorized()
	@Mutation(() => Project)
	async updateProjectsIsTemplate(
		@Args() { projectId, isTemplate }: updateProjectIsTemplateArgs
	): Promise<Project> {
		const project = await this.ProjectServices.findById(projectId);

		if (!project) throw Error(ErrorMessages.PROJECT_NOT_FOUND);

		return this.ProjectServices.update(project.id, { isTemplate });
	}

	@Authorized()
	@Mutation(() => Project)
	async updateProjectsIsPublic(
		@Args() { projectId, isPublic }: updateProjectIsPublic
	): Promise<Project> {
		const project = await this.ProjectServices.findById(projectId);

		if (!project) throw Error(ErrorMessages.PROJECT_NOT_FOUND);

		return this.ProjectServices.update(project.id, { isPublic });
	}

	@Authorized()
	@Mutation(() => Project)
	async deleteProjects(@Args() { projectId }: deleteProjectArgs): Promise<Project> {
		const project = await this.ProjectServices.findById(projectId);

		if (!project) throw Error(ErrorMessages.PROJECT_NOT_FOUND);

		return this.ProjectServices.delete(projectId);
	}
}
