import { Args, Mutation, Ctx, Query, Resolver, Authorized } from 'type-graphql';

import Project from 'entities/Project';
import ProjectServices from 'services/ProjectServices';

import { GlobalContext } from 'utils/types/GlobalContext';
import {
	addFileArgs,
	createArgs,
	deleteArgs,
	favoriteProjectArgs,
	getAllByLanguageArgs,
	getAllByTemplateArgs,
	getByIdArgs,
	getByNameArgs,
	shareProjectArgs,
	updateActiveFileArgs,
	updateIsPublic,
	updateIsTemplateArgs,
	updateNameArgs
} from 'resolvers/args/ProjectArgs';

import { ErrorMessages } from 'utils/enums/ErrorMessages';

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
	async getAllByMember(@Ctx() context: GlobalContext): Promise<Project[]> {
		// TODO: Need to add pagination here
		return ProjectServices.findByMemberId(context.user?.id as string);
	}

	@Authorized()
	@Query(() => Project)
	async getAllByFavorites(@Ctx() context: GlobalContext): Promise<Project[]> {
		// TODO: Need to add pagination here
		return ProjectServices.findByFavorites(context.user?.id as string);
	}

	@Authorized()
	@Query(() => Project)
	async getAllByTemplate(
		@Args() { template }: getAllByTemplateArgs,
		@Ctx() context: GlobalContext
	): Promise<Project[]> {
		// TODO: Need to add pagination here
		return ProjectServices.findByTemplate(template);
	}

	@Authorized()
	@Query(() => Project)
	async getAllByLanguage(
		@Args() { language }: getAllByLanguageArgs,
		@Ctx() context: GlobalContext
	): Promise<Project[]> {
		// TODO: Need to add pagination here
		return ProjectServices.findByLanguage(language);
	}

	@Authorized()
	@Query(() => Project)
	async getById(@Args() { id }: getByIdArgs): Promise<Project> {
		return ProjectServices.findById(id);
	}

	@Authorized()
	@Query(() => Project)
	async getByName(@Args() { name }: getByNameArgs): Promise<Project> {
		return ProjectServices.findOneBy({ name });
	}

	@Authorized()
	@Mutation(() => Project)
	async create(
		@Args() { name, files, language, template, activeFile, isTemplate, isPublic }: createArgs,
		@Ctx() context: GlobalContext
	): Promise<Project> {
		return ProjectServices.create({
			name: name,
			members: [context.user?.id as string],
			files: [...files],
			language: language,
			template: template,
			activeFile: activeFile,
			isTemplate: isTemplate,
			isPublic: isPublic
		});
	}

	@Authorized()
	@Query(() => Project)
	async favoriteProject(
		@Args() { id }: favoriteProjectArgs,
		@Ctx() context: GlobalContext
	): Promise<Project> {
		return ProjectServices.favorite(context.user?.id as string, id);
	}

	@Authorized()
	@Mutation(() => Project)
	async shareProject(@Args() { id, members }: shareProjectArgs): Promise<Project> {
		return ProjectServices.share(id, members);
	}

	@Authorized()
	@Mutation(() => Project)
	async addFile(@Args() { id, files }: addFileArgs): Promise<Project> {
		return ProjectServices.addFile(id, files);
	}

	@Authorized()
	@Mutation(() => Project)
	async updateName(@Args() { id, name }: updateNameArgs): Promise<Project> {
		const project = await ProjectServices.findById(id);

		if (!project) throw Error(ErrorMessages.PROJECT_NOT_FOUND);

		return ProjectServices.update(project.id, { name });
	}

	@Authorized()
	@Mutation(() => Project)
	async updateActiveFile(@Args() { id, activeFile }: updateActiveFileArgs): Promise<Project> {
		const project = await ProjectServices.findById(id);

		if (!project) throw Error(ErrorMessages.PROJECT_NOT_FOUND);

		return ProjectServices.update(project.id, { activeFile });
	}

	@Authorized()
	@Mutation(() => Project)
	async updateIsTemplate(@Args() { id, isTemplate }: updateIsTemplateArgs): Promise<Project> {
		const project = await ProjectServices.findById(id);

		if (!project) throw Error(ErrorMessages.PROJECT_NOT_FOUND);

		return ProjectServices.update(project.id, { isTemplate });
	}

	@Authorized()
	@Mutation(() => Project)
	async updateIsPublic(@Args() { id, isPublic }: updateIsPublic): Promise<Project> {
		const project = await ProjectServices.findById(id);

		if (!project) throw Error(ErrorMessages.PROJECT_NOT_FOUND);

		return ProjectServices.update(project.id, { isPublic });
	}

	@Authorized()
	@Mutation(() => Project)
	async delete(@Args() { id }: deleteArgs): Promise<Project> {
		return ProjectServices.delete(id);
	}
}
