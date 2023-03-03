import { Args, Authorized, Mutation, Query, Resolver } from 'type-graphql';

import { ProgrammingLanguage } from 'models/ProgrammingLanguage';
import { ProgrammingLanguageServices } from 'services/ProgrammingLanguageServices';

import { ErrorMessages } from 'utils/enums/ErrorMessages';
import {
	createLanguageArgs,
	deleteLanguageArgs,
	getLanguageByIdArgs,
	updateLanguageArgs
} from 'resolvers/args/ProgrammingLanguageArgs';

@Resolver(ProgrammingLanguage)
export class ProgrammingLanguageResolver {
	LanguageServices: ProgrammingLanguageServices = new ProgrammingLanguageServices();
	@Authorized()
	@Query(() => ProgrammingLanguage)
	async getAllLanguages(): Promise<ProgrammingLanguage[]> {
		return this.LanguageServices.find();
	}

	@Authorized()
	@Query(() => ProgrammingLanguage)
	async getLanguageById(@Args() { languageId }: getLanguageByIdArgs): Promise<ProgrammingLanguage> {
		return this.LanguageServices.findById(languageId);
	}

	@Authorized()
	@Mutation(() => ProgrammingLanguage)
	async createLanguage(@Args() { name, version }: createLanguageArgs): Promise<ProgrammingLanguage> {
		const language = await this.LanguageServices.findByName(name);

		if (language) throw new Error(ErrorMessages.LANGUAGE_ALREADY_EXISTS);

		return this.LanguageServices.create({ name, version });
	}

	@Authorized()
	@Mutation(() => ProgrammingLanguage)
	async updateLanguage(
		@Args() { languageId, name, version }: updateLanguageArgs
	): Promise<ProgrammingLanguage> {
		const language = await this.LanguageServices.findById(languageId);

		if (!language) throw new Error(ErrorMessages.LANGUAGE_NOT_FOUND);

		return this.LanguageServices.update(languageId, { name, version });
	}

	@Authorized()
	@Mutation(() => ProgrammingLanguage)
	async deleteLanguage(@Args() { languageId }: deleteLanguageArgs): Promise<ProgrammingLanguage> {
		return this.LanguageServices.delete(languageId);
	}
}
