import { Member } from 'models/Member';
import { Project } from 'models/Project';
import {
	createProjectArgs,
	deleteProjectArgs,
	favoriteProjectArgs,
	getAllProjectsByMemberArgs,
	getAllProjectsByTemplateArgs,
	shareProjectArgs,
	updateProjectArgs,
	updateProjectNameArgs
} from 'resolvers/args/ProjectArgs';
import { MemberServices } from 'services/MemberServices';
import { ProjectServices } from 'services/ProjectServices';
import { Arg, Args, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { ErrorMessages } from 'utils/enums/ErrorMessages';
import { GlobalContext } from 'utils/types/GlobalContext';
import { UUID } from 'utils/types/Uuid';

@Resolver(Project)
export class ProjectResolver {
	ProjectServices: ProjectServices = new ProjectServices();
	MemberServices: MemberServices = new MemberServices();
	@Authorized()
	@Query(() => Project)
	async getAllProjectsPublicProjects(): Promise<Project[]> {
		// TODO: Need include pagination here
		return this.ProjectServices.findAllPublic();
	}

	@Authorized()
	@Query(() => [Project])
	async getAllProjectsByOwner(@Ctx() context: GlobalContext): Promise<Project[]> {
		// TODO: Need to add pagination here

		const projects = await this.ProjectServices.findAllByOwner(context.user?.id as UUID);
		return projects;
	}

	@Authorized()
	@Query(() => Project)
	async getAllProjectsByEditor(@Ctx() context: GlobalContext): Promise<Project[]> {
		// TODO: Need to add pagination here
		return this.ProjectServices.findAllByEditorId(context.user?.id as UUID);
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
		@Args() { template }: getAllProjectsByTemplateArgs
	): Promise<Project[]> {
		// TODO: Need to add pagination here
		return this.ProjectServices.findAllByTemplate(template);
	}

	@Authorized()
	@Query(() => Project)
	async getProjectById(
		@Arg('projectId') projectId: string,
		@Ctx() context: GlobalContext
	): Promise<Project> {
		const project = await this.ProjectServices.findById(projectId);
		const member = await this.MemberServices.findById(context.user?.id as UUID);

		if (project.owner.id !== member.id) throw Error(ErrorMessages.PROJECT_NOT_FOUND);

		return project;
	}

	@Authorized()
	@Mutation(() => Project)
	async createProject(
		@Args()
		{ name, isTemplate, isPublic, sandpackTemplate, files, environment, main }: createProjectArgs,
		@Ctx() context: GlobalContext
	): Promise<Project> {
		const member = await this.MemberServices.findById(context.user?.id as UUID);

		return this.ProjectServices.create({
			name: name,
			owner: member,
			isTemplate: isTemplate,
			isPublic: isPublic,
			sandpackTemplate: sandpackTemplate,
			environment: environment,
			main: main,
			files: files
		});
	}

	@Authorized()
	@Mutation(() => Project)
	async updateProject(
		@Args()
		{
			name,
			isTemplate,
			isPublic,
			sandpackTemplate,
			files,
			projectId,
			environment,
			main
		}: updateProjectArgs,
		@Ctx() context: GlobalContext
	): Promise<Project> {
		return this.ProjectServices.update(projectId, {
			name: name,
			isTemplate: isTemplate,
			isPublic: isPublic,
			sandpackTemplate: sandpackTemplate,
			files: files,
			main: main,
			environment: environment
		});
	}

	@Authorized()
	@Mutation(() => Project)
	async favoriteProject(
		@Args() { projectId }: favoriteProjectArgs,
		@Ctx() context: GlobalContext
	): Promise<Project> {
		const member = await this.MemberServices.findById(context.user?.id as UUID);

		return this.ProjectServices.addToFavorite(member, projectId);
	}

	@Authorized()
	@Mutation(() => Project)
	async shareProject(@Args() { projectId, membersId }: shareProjectArgs): Promise<Project> {
		const members = new Array();
		membersId.map(async (id) => {
			const member = (await this.MemberServices.findById(id)) as Member;
			if (!member) throw Error(ErrorMessages.MEMBER_NOT_FOUND);
			const project = await this.ProjectServices.findById(projectId);
			if (project.editors.includes(...members)) throw new Error(ErrorMessages.MEMBER_ALREADY_ADDED);
			members.push(member);
		});

		return this.ProjectServices.share(projectId, members);
	}

	@Authorized()
	@Mutation(() => Project)
	async updateProjectName(@Args() { projectId, name }: updateProjectNameArgs): Promise<Project> {
		const project = await this.ProjectServices.findById(projectId);

		if (!project) throw Error(ErrorMessages.PROJECT_NOT_FOUND);

		return this.ProjectServices.update(project.id, { name });
	}

	@Authorized()
	@Mutation(() => Project)
	async updateProjectIsTemplate(
		@Arg('projectId') projectId: string,
		@Arg('isTemplate') isTemplate: boolean
	): Promise<Project> {
		const project = await this.ProjectServices.findById(projectId);

		if (!project) throw Error(ErrorMessages.PROJECT_NOT_FOUND);

		return this.ProjectServices.update(project.id, { isTemplate });
	}

	@Authorized()
	@Mutation(() => Project)
	async updateProjectIsPublic(
		@Arg('projectId') projectId: string,
		@Arg('isPublic') isPublic: boolean
	): Promise<Project> {
		const project = await this.ProjectServices.findById(projectId);

		if (!project) throw Error(ErrorMessages.PROJECT_NOT_FOUND);

		return this.ProjectServices.update(project.id, { isPublic });
	}

	@Authorized()
	@Mutation(() => Project)
	async deleteProject(@Args() { projectId }: deleteProjectArgs): Promise<Project> {
		const project = await this.ProjectServices.findById(projectId);

		if (!project) throw Error(ErrorMessages.PROJECT_NOT_FOUND);

		return this.ProjectServices.delete(projectId);
	}
}
