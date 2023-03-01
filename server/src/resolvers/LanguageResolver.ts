import { Args, Authorized, Mutation, Query, Resolver } from 'type-graphql';

import Language from 'entities/Language';
import LanguageServices from 'services/LanguageServices';

import { ErrorMessages } from 'utils/enums/ErrorMessages';
import {
	createLanguageArgs,
	deleteLanguageArgs,
	getLanguageByIdArgs,
	updateLanguageArgs
} from 'resolvers/args/LanguageArgs';

@Resolver(Language)
export default class LanguageResolver {
	@Authorized()
	@Query(() => Language)
	async getAllLanguages(): Promise<Language[]> {
		return LanguageServices.find();
	}

	@Authorized()
	@Query(() => Language)
	async getLanguageById(@Args() { languageId }: getLanguageByIdArgs): Promise<Language> {
		return LanguageServices.findById(languageId);
	}

	@Authorized()
	@Mutation(() => Language)
	async createLanguage(@Args() { name, version }: createLanguageArgs): Promise<Language> {
		const language = await LanguageServices.findByName(name);

		if (language) throw new Error(ErrorMessages.LANGUAGE_ALREADY_EXISTS);

		return LanguageServices.create({ name, version });
	}

	@Authorized()
	@Mutation(() => Language)
	async updateLanguage(
		@Args() { languageId, name, version }: updateLanguageArgs
	): Promise<Language> {
		const language = await LanguageServices.findById(languageId);

		if (!language) throw new Error(ErrorMessages.LANGUAGE_NOT_FOUND);

		return LanguageServices.update(languageId, { name, version });
	}

	@Authorized()
	@Mutation(() => Language)
	async deleteLanguage(@Args() { languageId }: deleteLanguageArgs): Promise<Language> {
		return LanguageServices.delete(languageId);
	}
}
