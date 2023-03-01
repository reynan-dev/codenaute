import {Args, Authorized, Mutation, Query, Resolver} from 'type-graphql';

import SandpackTemplate from 'entities/SandpackTemplate';
import SandpackTemplateServices from 'services/SandpackTemplateServices';

import {ErrorMessages} from 'utils/enums/ErrorMessages';
import { createSandpackTemplateArgs, deleteSandpackTemplateArgs, getSandpackTemplateByIdArgs, updateSandpackTemplateArgs } from 'resolvers/args/SandpackTemplateArgs';

@Resolver(SandpackTemplate)
export default class SandpackTemplateResolver {

    @Authorized()
    @Query(() => SandpackTemplate)
    async getAllSandpackTemplates(): Promise<SandpackTemplate[]> {
        return SandpackTemplateServices.find();
    }

    @Authorized()
    @Query(() => SandpackTemplate)
    async getSandpackTemplateById(@Args() {sandpackTemplateId}: getSandpackTemplateByIdArgs): Promise<SandpackTemplate> {
        return SandpackTemplateServices.findById(sandpackTemplateId);
    }

    @Authorized()
    @Mutation(() => SandpackTemplate)
    async createSandpackTemplate(@Args() {slug}: createSandpackTemplateArgs): Promise<SandpackTemplate> {
        const sandpackTemplate = await SandpackTemplateServices.findBySlug(slug);

        if (sandpackTemplate) throw new Error(ErrorMessages.SANDPACK_TEMPLATE_ALREADY_EXISTS);

        return SandpackTemplateServices.create({slug});
    }

    @Authorized()
    @Mutation(() => SandpackTemplate)
    async updateSandpackTemplate(
        @Args() {sandpackTemplateId, slug}: updateSandpackTemplateArgs
    ): Promise<SandpackTemplate> {
        const sandpackTemplate = await SandpackTemplateServices.findById(sandpackTemplateId);

        if (!sandpackTemplate) throw new Error(ErrorMessages.SANDPACK_TEMPLATE_NOT_FOUND);

        return SandpackTemplateServices.update(sandpackTemplateId, {slug});
    }

    @Authorized()
    @Mutation(() => SandpackTemplate)
    async deleteSandpackTemplate(@Args() {sandpackTemplateId}: deleteSandpackTemplateArgs): Promise<SandpackTemplate> {
        return SandpackTemplateServices.delete(sandpackTemplateId);
    }
}


