import { Args, Authorized, Mutation, Query, Resolver } from 'type-graphql';

import { ProgramingLanguage } from 'entities/ProgramingLanguage';
import { ProgramingLanguageServices } from 'services/ProgramingLanguageServices';

import { ErrorMessages } from 'utils/enums/ErrorMessages';
import {
	createLanguageArgs,
	deleteLanguageArgs,
	getLanguageByIdArgs,
	updateLanguageArgs
} from 'resolvers/args/ProgramingLanguageArgs';

@Resolver(ProgramingLanguage)
export class ProgramingLanguageResolver {
	LanguageServices: ProgramingLanguageServices = new ProgramingLanguageServices();
	@Authorized()
	@Query(() => ProgramingLanguage)
	async getAllLanguages(): Promise<ProgramingLanguage[]> {
		return this.LanguageServices.find();
	}

	@Authorized()
	@Query(() => ProgramingLanguage)
	async getLanguageById(@Args() { languageId }: getLanguageByIdArgs): Promise<ProgramingLanguage> {
		return this.LanguageServices.findById(languageId);
	}

	@Authorized()
	@Mutation(() => ProgramingLanguage)
	async createLanguage(@Args() { name, version }: createLanguageArgs): Promise<ProgramingLanguage> {
		const language = await this.LanguageServices.findByName(name);

		if (language) throw new Error(ErrorMessages.LANGUAGE_ALREADY_EXISTS);

		return this.LanguageServices.create({ name, version });
	}

	@Authorized()
	@Mutation(() => ProgramingLanguage)
	async updateLanguage(
		@Args() { languageId, name, version }: updateLanguageArgs
	): Promise<ProgramingLanguage> {
		const language = await this.LanguageServices.findById(languageId);

		if (!language) throw new Error(ErrorMessages.LANGUAGE_NOT_FOUND);

		return this.LanguageServices.update(languageId, { name, version });
	}

	@Authorized()
	@Mutation(() => ProgramingLanguage)
	async deleteLanguage(@Args() { languageId }: deleteLanguageArgs): Promise<ProgramingLanguage> {
		return this.LanguageServices.delete(languageId);
	}
}
