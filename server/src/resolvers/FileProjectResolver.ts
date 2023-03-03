import { Args, Authorized, Mutation, Query, Resolver } from 'type-graphql';

import { FileProject } from 'models/FileProject';
import { FileProjectServices } from 'services/FileProjectServices';

import { ErrorMessages } from 'utils/enums/ErrorMessages';
import {
	createFileProjectArgs,
	getAllFilesByProjectIdArgs,
	getFileProjectByIdArgs,
	updateFileProjectCodeArgs,
	updateFileProjectHiddenArgs,
	updateFileProjectPathArgs
} from 'resolvers/args/FileProjectArgs';

import { ProjectServices } from 'services/ProjectServices';

@Resolver(FileProject)
export class FileProjectResolver {
	FileProjectServices: FileProjectServices = new FileProjectServices();
	ProjectServices: ProjectServices = new ProjectServices();

	@Authorized()
	@Query(() => FileProject)
	async getAllFilesProjectByProjectId(
		@Args() { projectId }: getAllFilesByProjectIdArgs
	): Promise<FileProject[]> {
		return this.FileProjectServices.findAllByProjectId(projectId);
	}

	@Authorized()
	@Query(() => FileProject)
	async getFileProjectById(@Args() { fileId }: getFileProjectByIdArgs): Promise<FileProject> {
		return this.FileProjectServices.findById(fileId);
	}

	@Authorized()
	@Mutation(() => FileProject)
	async createFileProject(
		@Args() { path, content, projectId, isHidden }: createFileProjectArgs
	): Promise<FileProject> {
		const project = await this.ProjectServices.findById(projectId);

		if (!project) throw new Error(ErrorMessages.PROJECT_NOT_FOUND);

		return this.FileProjectServices.create({
			path: path,
			content: content,
			project: project,
			isHidden: isHidden
		});
	}

	@Authorized()
	@Mutation(() => FileProject)
	async updateFileProjectPath(
		@Args() { fileId, path }: updateFileProjectPathArgs
	): Promise<FileProject> {
		const file = this.FileProjectServices.findById(fileId);

		if (!file) throw new Error(ErrorMessages.FILE_NOT_FOUND);

		return this.FileProjectServices.update(fileId, { path });
	}

	@Authorized()
	@Mutation(() => FileProject)
	async updateFileProjectCode(
		@Args() { fileId, content }: updateFileProjectCodeArgs
	): Promise<FileProject> {
		const file = this.FileProjectServices.findById(fileId);

		if (!file) throw new Error(ErrorMessages.FILE_NOT_FOUND);

		return this.FileProjectServices.update(fileId, { content });
	}

	@Authorized()
	@Mutation(() => FileProject)
	async updateFileProjectHidden(
		@Args() { fileId, isHidden }: updateFileProjectHiddenArgs
	): Promise<FileProject> {
		const file = this.FileProjectServices.findById(fileId);

		if (!file) throw new Error(ErrorMessages.FILE_NOT_FOUND);

		return this.FileProjectServices.update(fileId, { isHidden });
	}

	@Authorized()
	@Mutation(() => FileProject)
	async deleteFileProject(@Args() { fileId }: updateFileProjectCodeArgs): Promise<FileProject> {
		const file = this.FileProjectServices.findById(fileId);

		if (!file) throw new Error(ErrorMessages.FILE_NOT_FOUND);

		return this.FileProjectServices.delete(fileId);
	}
}
