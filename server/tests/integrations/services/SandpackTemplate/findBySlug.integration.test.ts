import { SandpackTemplateServices } from 'services/SandpackTemplateServices';

describe('Find SandpackTemplate by slug integration test', () => {
	const SandpackTemplateService = new SandpackTemplateServices();

	describe('when slug is not valid', () => {
		it('throw an null object', async () => {
			expect(await SandpackTemplateService.findBySlug('invalid')).toBeNull();
		});
	});

	describe('when slug is valid', () => {
		it('return the slug', async () => {
			const slug = 'valid';

			const SandpackTemplate = await SandpackTemplateService.create({ slug: slug });

			expect(await SandpackTemplateService.findBySlug(slug)).toEqual(SandpackTemplate);
		});
	});
});
