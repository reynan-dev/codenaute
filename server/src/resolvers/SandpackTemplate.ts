import { Args, Authorized, Mutation, Query, Resolver } from 'type-graphql';

import { SandpackTemplate } from 'models/SandpackTemplate';
import { SandpackTemplateServices } from 'services/SandpackTemplateServices';

import { ErrorMessages } from 'utils/enums/ErrorMessages';
import {
	createSandpackTemplateArgs,
	deleteSandpackTemplateArgs,
	getSandpackTemplateByIdArgs,
	updateSandpackTemplateArgs
} from 'resolvers/args/SandpackTemplateArgs';

@Resolver(SandpackTemplate)
export class SandpackTemplateResolver {
	SandpackTemplateServices: SandpackTemplateServices = new SandpackTemplateServices();

	@Authorized()
	@Query(() => SandpackTemplate)
	async getAllSandpackTemplates(): Promise<SandpackTemplate[]> {
		return this.SandpackTemplateServices.find();
	}

	@Authorized()
	@Query(() => SandpackTemplate)
	async getSandpackTemplateById(
		@Args() { sandpackTemplateId }: getSandpackTemplateByIdArgs
	): Promise<SandpackTemplate> {
		return this.SandpackTemplateServices.findById(sandpackTemplateId);
	}

	@Authorized()
	@Mutation(() => SandpackTemplate)
	async createSandpackTemplate(
		@Args() { slug }: createSandpackTemplateArgs
	): Promise<SandpackTemplate> {
		const sandpackTemplate = await this.SandpackTemplateServices.findBySlug(slug);

		if (sandpackTemplate) throw new Error(ErrorMessages.SANDPACK_TEMPLATE_ALREADY_EXISTS);

		return this.SandpackTemplateServices.create({ slug });
	}

	@Authorized()
	@Mutation(() => SandpackTemplate)
	async updateSandpackTemplate(
		@Args() { sandpackTemplateId, slug }: updateSandpackTemplateArgs
	): Promise<SandpackTemplate> {
		const sandpackTemplate = await this.SandpackTemplateServices.findById(sandpackTemplateId);

		if (!sandpackTemplate) throw new Error(ErrorMessages.SANDPACK_TEMPLATE_NOT_FOUND);

		return this.SandpackTemplateServices.update(sandpackTemplateId, { slug });
	}

	@Authorized()
	@Mutation(() => SandpackTemplate)
	async deleteSandpackTemplate(
		@Args() { sandpackTemplateId }: deleteSandpackTemplateArgs
	): Promise<SandpackTemplate> {
		return this.SandpackTemplateServices.delete(sandpackTemplateId);
	}
}
