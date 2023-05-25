beforeAll(async () => {
	jest.spyOn(console, 'info').mockImplementation(() => {});
	jest.spyOn(console, 'log').mockImplementation(() => {});
});
