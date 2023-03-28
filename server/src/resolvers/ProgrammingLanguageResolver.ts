import { Args, Authorized, Mutation, Query, Resolver } from 'type-graphql';

import { ProgrammingLanguageServices } from 'services/ProgrammingLanguageServices';
import { ProgrammingLanguage } from 'models/ProgrammingLanguage';

import { ErrorMessages } from 'utils/enums/ErrorMessages';
import {
	createProgrammingLanguageArgs,
	deleteProgrammingLanguageArgs,
	getProgrammingLanguageByIdArgs,
	updateProgrammingLanguageArgs
} from 'resolvers/args/ProgrammingLanguageArgs';

@Resolver(ProgrammingLanguage)
export class ProgrammingLanguageResolver {
	ProgrammingLanguageServices: ProgrammingLanguageServices = new ProgrammingLanguageServices();
	@Authorized()
	@Query(() => ProgrammingLanguage)
	async getAllProgrammingLanguages(): Promise<ProgrammingLanguage[]> {
		return this.ProgrammingLanguageServices.find();
	}

	@Authorized()
	@Query(() => ProgrammingLanguage)
	async getProgrammingLanguageById(
		@Args() { languageId }: getProgrammingLanguageByIdArgs
	): Promise<ProgrammingLanguage> {
		return this.ProgrammingLanguageServices.findById(languageId);
	}

	@Authorized()
	@Mutation(() => ProgrammingLanguage)
	async createProgrammingLanguage(
		@Args() { name, version }: createProgrammingLanguageArgs
	): Promise<ProgrammingLanguage> {
		const language = await this.ProgrammingLanguageServices.findByName(name);

		if (language) throw new Error(ErrorMessages.LANGUAGE_ALREADY_EXISTS);

		return this.ProgrammingLanguageServices.create({ name, version });
	}

	@Authorized()
	@Mutation(() => ProgrammingLanguage)
	async updateProgrammingLanguage(
		@Args() { languageId, name, version }: updateProgrammingLanguageArgs
	): Promise<ProgrammingLanguage> {
		const language = await this.ProgrammingLanguageServices.findById(languageId);

		if (!language) throw new Error(ErrorMessages.LANGUAGE_NOT_FOUND);

		return this.ProgrammingLanguageServices.update(languageId, { name, version });
	}

	@Authorized()
	@Mutation(() => ProgrammingLanguage)
	async deleteProgrammingLanguage(
		@Args() { languageId }: deleteProgrammingLanguageArgs
	): Promise<ProgrammingLanguage> {
		return this.ProgrammingLanguageServices.delete(languageId);
	}
}
