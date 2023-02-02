const browsers = [
	{ keyword: 'Firefox', name: 'firefox' },
	{ keyword: 'SamsungBrowser', name: 'samsung' },
	{ keyword: 'Opera', name: 'opera' },
	{ keyword: 'Trident', name: 'internet explorer' },
	{ keyword: 'Edge', name: 'edge legacy' },
	{ keyword: 'Edg', name: 'edge chromium' },
	{ keyword: 'Chrome', name: 'chrome' },
	{ keyword: 'Safari', name: 'safari' }
];

const getBrowserName = () => {
	const browser = browsers.filter((browser) => navigator.userAgent.includes(browser.keyword));
	return browser ? browser[0].name : 'unknown';
};

export default getBrowserName;
