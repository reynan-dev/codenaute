const browsers = [
	{ keywords: ['Firefox'], name: 'firefox' },
	{ keywords: ['SamsungBrowser'], name: 'samsung' },
	{ keywords: ['Opera', 'OPR'], name: 'opera' },
	{ keywords: ['Trident'], name: 'internet explorer' },
	{ keywords: ['Edge'], name: 'edge legacy' },
	{ keywords: ['Edg'], name: 'edge chromium' },
	{ keywords: ['Chrome'], name: 'chrome' },
	{ keywords: ['Safari'], name: 'safari' }
];

const getBrowserName = () => {
	const matchingBrowsers = browsers.filter((browser) => {
		return browser.keywords.some((keyword) => navigator.userAgent.includes(keyword));
	});

	return matchingBrowsers.length ? matchingBrowsers[0].name : 'unknown';
};

export default getBrowserName;
