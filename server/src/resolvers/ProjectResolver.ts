import { Args, Mutation, Ctx, Query, Resolver, Authorized } from 'type-graphql';

import Project from 'entities/Project';
import ProjectServices from 'services/ProjectServices';

import { GlobalContext } from 'utils/types/GlobalContext';
import {
	createArgs,
	deleteArgs,
	favoriteProjectArgs,
	getAllByLanguageArgs,
	getAllByTemplateArgs,
	getByIdArgs,
	getByMemberArgs,
	getByNameArgs,
	shareProjectArgs,
	updateActiveFileArgs,
	updateIsPublic,
	updateIsTemplateArgs,
	updateNameArgs
} from 'resolvers/args/ProjectArgs';

import { ErrorMessages } from 'utils/enums/ErrorMessages';
import LanguageServices from 'services/LanguageServices';
import FileProjectServices from 'services/FileProjectServices';
import MemberServices from 'services/MemberServices';

@Resolver(Project)
export default class ProjectResolver {
	@Authorized()
	@Query(() => Project)
	async getAllPublic(): Promise<Project[]> {
		// TODO: Need include pagination here
		return ProjectServices.findAllPublic();
	}

	@Authorized()
	@Query(() => Project)
	async getAllSelfProjects(@Ctx() context: GlobalContext): Promise<Project[]> {
		// TODO: Need to add pagination here
		return ProjectServices.findByMemberId(context.user?.id as string);
	}

	@Authorized()
	@Query(() => Project)
	async getAllByMember(@Ctx() context: GlobalContext): Promise<Project[]> {
		// TODO: Need to add pagination here
		return ProjectServices.findByMemberId(context.user?.id as string);
	}

	@Authorized()
	@Query(() => Project)
	async getAllByFavorites(@Args() { memberId }: getByMemberArgs): Promise<Project[]> {
		// TODO: Need to add pagination here
		return ProjectServices.findByFavorites(memberId);
	}

	@Authorized()
	@Query(() => Project)
	async getAllByTemplate(@Args() { templateId }: getAllByTemplateArgs): Promise<Project[]> {
		// TODO: Need to add pagination here
		return ProjectServices.findByTemplate(templateId);
	}

	@Authorized()
	@Query(() => Project)
	async getAllByLanguage(@Args() { languageId }: getAllByLanguageArgs): Promise<Project[]> {
		// TODO: Need to add pagination here
		return ProjectServices.findByLanguage(languageId);
	}

	@Authorized()
	@Query(() => Project)
	async getById(@Args() { projectId }: getByIdArgs): Promise<Project> {
		return ProjectServices.findById(projectId);
	}

	@Authorized()
	@Query(() => Project)
	async getByName(@Args() { projectName }: getByNameArgs): Promise<Project> {
		return ProjectServices.findOneBy({ projectName });
	}

	@Authorized()
	@Mutation(() => Project)
	async create(
		@Args() { name, languageId, templateId, activeFileId, isTemplate, isPublic }: createArgs,
		@Ctx() context: GlobalContext
	): Promise<Project> {
		const language = await LanguageServices.findById(languageId);

		if (!language) throw Error(ErrorMessages.LANGUAGE_NOT_FOUND);

		const template = await ProjectServices.findById(templateId);

		const file = await FileProjectServices.findById(activeFileId);

		return ProjectServices.create({
			name: name,
			members: [context.user?.id as string],
			language: language,
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
		return ProjectServices.favorite(context.user?.id as string, projectId);
	}

	@Authorized()
	@Mutation(() => Project)
	async shareProject(@Args() { projectId, membersId }: shareProjectArgs): Promise<Project> {
		const members = new Array();
		membersId.map((id) => {
			const member = MemberServices.findById(id);
			if (!member) throw Error(ErrorMessages.MEMBER_NOT_FOUND);
			members.push(member);
		});

		return ProjectServices.share(projectId, members);
	}

	@Authorized()
	@Mutation(() => Project)
	async updateName(@Args() { projectId, name }: updateNameArgs): Promise<Project> {
		const project = await ProjectServices.findById(projectId);

		if (!project) throw Error(ErrorMessages.PROJECT_NOT_FOUND);

		return ProjectServices.update(project.id, { name });
	}

	@Authorized()
	@Mutation(() => Project)
	async updateActiveFile(
		@Args() { projectId, activeFile }: updateActiveFileArgs
	): Promise<Project> {
		const project = await ProjectServices.findById(projectId);

		if (!project) throw Error(ErrorMessages.PROJECT_NOT_FOUND);

		return ProjectServices.update(project.id, { activeFile });
	}

	@Authorized()
	@Mutation(() => Project)
	async updateIsTemplate(
		@Args() { projectId, isTemplate }: updateIsTemplateArgs
	): Promise<Project> {
		const project = await ProjectServices.findById(projectId);

		if (!project) throw Error(ErrorMessages.PROJECT_NOT_FOUND);

		return ProjectServices.update(project.id, { isTemplate });
	}

	@Authorized()
	@Mutation(() => Project)
	async updateIsPublic(@Args() { projectId, isPublic }: updateIsPublic): Promise<Project> {
		const project = await ProjectServices.findById(projectId);

		if (!project) throw Error(ErrorMessages.PROJECT_NOT_FOUND);

		return ProjectServices.update(project.id, { isPublic });
	}

	@Authorized()
	@Mutation(() => Project)
	async delete(@Args() { projectId }: deleteArgs): Promise<Project> {
		return ProjectServices.delete(projectId);
	}
}
