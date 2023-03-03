import { Args, Authorized, Mutation, Query, Resolver } from 'type-graphql';

import { ProgrammingLanguage } from 'models/ProgrammingLanguage';
import { ProgrammingLanguageServices } from 'services/ProgrammingLanguageServices';

import { ErrorMessages } from 'utils/enums/ErrorMessages';
import {
	createProgrammingLanguageArgs,
	deleteProgrammingLanguageArgs,
	getProgrammingLanguageByIdArgs,
	updateProgrammingLanguageArgs
} from 'resolvers/args/ProgramingLanguageArgs';

@Resolver(ProgramingLanguage)
export class ProgramingLanguageResolver {
	ProgrammingLanguageServices: ProgramingLanguageServices = new ProgramingLanguageServices();
	@Authorized()
	@Query(() => ProgramingLanguage)
	async getAllProgrammingLanguages(): Promise<ProgramingLanguage[]> {
		return this.ProgrammingLanguageServices.find();
	}

	@Authorized()
	@Query(() => ProgramingLanguage)
	async getProgrammingLanguageById(
		@Args() { languageId }: getProgrammingLanguageByIdArgs
	): Promise<ProgramingLanguage> {
		return this.ProgrammingLanguageServices.findById(languageId);
	}

	@Authorized()
	@Mutation(() => ProgramingLanguage)
	async createProgrammingLanguage(
		@Args() { name, version }: createProgrammingLanguageArgs
	): Promise<ProgramingLanguage> {
		const language = await this.ProgrammingLanguageServices.findByName(name);

		if (language) throw new Error(ErrorMessages.LANGUAGE_ALREADY_EXISTS);

		return this.ProgrammingLanguageServices.create({ name, version });
	}

	@Authorized()
	@Mutation(() => ProgramingLanguage)
	async updateProgrammingLanguage(
		@Args() { languageId, name, version }: updateProgrammingLanguageArgs
	): Promise<ProgramingLanguage> {
		const language = await this.ProgrammingLanguageServices.findById(languageId);

		if (!language) throw new Error(ErrorMessages.LANGUAGE_NOT_FOUND);

		return this.ProgrammingLanguageServices.update(languageId, { name, version });
	}

	@Authorized()
	@Mutation(() => ProgramingLanguage)
	async deleteProgrammingLanguage(
		@Args() { languageId }: deleteProgrammingLanguageArgs
	): Promise<ProgramingLanguage> {
		return this.ProgrammingLanguageServices.delete(languageId);
	}
}
