import { Args, Authorized, Mutation, Query, Resolver } from 'type-graphql';

import FileProject from 'entities/FileProject';
import FileProjectServices from 'services/FileProjectServices';

import { GlobalContext } from 'utils/types/GlobalContext';
import { ErrorMessages } from 'utils/enums/ErrorMessages';
import {
	createFileProjectArgs,
	getAllFilesByProjectArgs,
	getFileProjectByIdArgs,
	updateCodeFileProjectArgs,
	updateHiddenFileProjectArgs,
	updatePathFileProjectArgs
} from 'resolvers/args/FileProjectArgs';
import ProjectServices from 'services/ProjectServices';

@Resolver(FileProject)
export default class FileProjectResolver {
	@Authorized()
	@Query(() => FileProject)
	async getAllFilesByProject(
		@Args() { projectId }: getAllFilesByProjectArgs
	): Promise<FileProject[]> {
		return FileProjectServices.findAllByProjectId(projectId);
	}

	@Authorized()
	@Query(() => FileProject)
	async getFileProjectById(@Args() { fileId }: getFileProjectByIdArgs): Promise<FileProject> {
		return FileProjectServices.findById(fileId);
	}

	@Authorized()
	@Mutation(() => FileProject)
	async createFileProject(
		@Args() { path, code, projectId, isHidden }: createFileProjectArgs
	): Promise<FileProject> {
		const project = await ProjectServices.findById(projectId);

		if (!project) throw new Error(ErrorMessages.PROJECT_NOT_FOUND);

		return FileProjectServices.create({
			path: path,
			code: code,
			project: project,
			isHidden: isHidden
		});
	}

	@Authorized()
	@Mutation(() => FileProject)
	async updatePathFileProject(
		@Args() { fileId, path }: updatePathFileProjectArgs
	): Promise<FileProject> {
		const file = FileProjectServices.findById(fileId);

		if (!file) throw new Error(ErrorMessages.FILE_NOT_FOUND);

		return FileProjectServices.update(fileId, { path });
	}

	@Authorized()
	@Mutation(() => FileProject)
	async updateCodeFileProject(
		@Args() { fileId, code }: updateCodeFileProjectArgs
	): Promise<FileProject> {
		const file = FileProjectServices.findById(fileId);

		if (!file) throw new Error(ErrorMessages.FILE_NOT_FOUND);

		return FileProjectServices.update(fileId, { code });
	}

	@Authorized()
	@Mutation(() => FileProject)
	async updateHiddenFileProject(
		@Args() { fileId, isHidden }: updateHiddenFileProjectArgs
	): Promise<FileProject> {
		const file = FileProjectServices.findById(fileId);

		if (!file) throw new Error(ErrorMessages.FILE_NOT_FOUND);

		return FileProjectServices.update(fileId, { isHidden });
	}

	@Authorized()
	@Mutation(() => FileProject)
	async deleteFileProject(@Args() { fileId }: updateCodeFileProjectArgs): Promise<FileProject> {
		const file = FileProjectServices.findById(fileId);

		if (!file) throw new Error(ErrorMessages.FILE_NOT_FOUND);

		return FileProjectServices.delete(fileId);
	}
}
