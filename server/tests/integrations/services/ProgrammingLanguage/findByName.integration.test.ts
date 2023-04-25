import { ProgrammingLanguageServices } from 'services/ProgrammingLanguageServices';
import { ErrorMessages } from 'utils/enums/ErrorMessages';

describe('Find Programming Language by name integration test', () => {
	const ProgrammingLanguageService = new ProgrammingLanguageServices();

	const data = {
		name: 'data',
		version: 'version'
	};

	describe('when programming language is valid', () => {
		it('returns the programming language', async () => {
			const programmingLanguage = await ProgrammingLanguageService.create(data);

			expect(await ProgrammingLanguageService.findByName(data.name)).toEqual(programmingLanguage);
		});
	});
});
