import { Project } from 'models/Project';
import {
	createProjectArgs,
	getProjectByIdArgs,
	updateProjectArgs
} from 'resolvers/args/ProjectArgs';
import { MemberServices } from 'services/MemberServices';
import { ProjectServices } from 'services/ProjectServices';
import { Args, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { ErrorMessages } from 'utils/enums/ErrorMessages';
import { GlobalContext } from 'utils/types/GlobalContext';
import { UUID } from 'utils/types/Uuid';

@Resolver(Project)
export class ProjectResolver {
	private ProjectServices: ProjectServices = new ProjectServices();
	private MemberServices: MemberServices = new MemberServices();

	@Authorized()
	@Mutation(() => Project)
	async createProject(
		@Args()
		{ name, isPublic, sandpackTemplate, files, environment, mainFile }: createProjectArgs,
		@Ctx() context: GlobalContext
	): Promise<Project> {
		const member = await this.MemberServices.findById(context.user?.id as UUID);

		return this.ProjectServices.create({
			name: name,
			owner: member,
			isPublic: isPublic,
			sandpackTemplate: sandpackTemplate,
			environment: environment,
			mainFile: mainFile,
			files: files
		});
	}

	@Authorized()
	@Query(() => [Project])
	async getAllProjectsByOwner(@Ctx() context: GlobalContext): Promise<Project[]> {
		// TODO: Need to add pagination here
		return this.ProjectServices.findAllByOwner(context.user?.id as UUID);
	}

	@Query(() => [Project])
	async getAllPublicProjects(): Promise<Project[]> {
		// TODO: Need include pagination here
		return this.ProjectServices.findAllPublic();
	}

	@Authorized()
	@Query(() => Project)
	async getProjectById(
		@Args() { projectId }: getProjectByIdArgs,
		@Ctx() context: GlobalContext
	): Promise<Project> {
		const project = await this.ProjectServices.findById(projectId);

		if (project.owner.id !== context.user?.id) throw Error(ErrorMessages.PROJECT_NOT_FOUND);

		return project;
	}

	@Authorized()
	@Mutation(() => Project)
	async updateProject(
		@Args()
		{
			name,
			isPublic,
			sandpackTemplate,
			files,
			projectId,
			environment,
			mainFile
		}: updateProjectArgs,
		@Ctx() context: GlobalContext
	): Promise<Project> {
		return this.ProjectServices.update(projectId, {
			name: name,
			isPublic: isPublic,
			sandpackTemplate: sandpackTemplate,
			files: files,
			mainFile: mainFile,
			environment: environment
		});
	}
}
