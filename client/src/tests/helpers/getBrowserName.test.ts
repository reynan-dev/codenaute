import { USER_AGENTS } from 'constants/userAgents';
import getBrowserName from 'helpers/getBrowserName';

let originalUserAgent: jest.SpyInstance<string, [], any>;

beforeEach(() => {
	originalUserAgent = jest.spyOn(window.navigator, 'userAgent', 'get');
});

describe('getBrowserName', () => {
	// Firefox
	it('should return firefox for Firefox user agent', () => {
		originalUserAgent.mockReturnValue(USER_AGENTS.FIREFOX);
		expect(getBrowserName()).toBe('firefox');
	});

	// Samsumsung Internet
	it('should return samsung for SamsungBrowser user agent', () => {
		originalUserAgent.mockReturnValue(USER_AGENTS.SAMSUNG);
		expect(getBrowserName()).toBe('samsung');
	});

	// Opera
	it('should return opera for Opera user agent', () => {
		originalUserAgent.mockReturnValue(USER_AGENTS.OPERA);
		expect(getBrowserName()).toBe('opera');
	});

	// Internet Explorer
	it('should return internet exploerer for Trident user agent', () => {
		originalUserAgent.mockReturnValue(USER_AGENTS.INTERNET_EXPLORER);
		expect(getBrowserName()).toBe('internet explorer');
	});

	// Edge legacy
	it('should return edge legacy for Edge user agent', () => {
		originalUserAgent.mockReturnValue(USER_AGENTS.EDGE_LEGACY);
		expect(getBrowserName()).toBe('edge legacy');
	});

	// Edge chromium
	it('should return edge chromium for Edg user agent', () => {
		originalUserAgent.mockReturnValue(USER_AGENTS.EDGE_CHROMIUM);
		expect(getBrowserName()).toBe('edge chromium');
	});

	// Chrome
	it('should return chrome for Chrome user agent', () => {
		originalUserAgent.mockReturnValue(USER_AGENTS.CHROME);
		expect(getBrowserName()).toBe('chrome');
	});

	// Safari
	it('should return safari for Safari user agent', () => {
		originalUserAgent.mockReturnValue(USER_AGENTS.SAFARI);
		expect(getBrowserName()).toBe('safari');
	});

	// Unknown
	it('should return unknown for any other unknown user agent', () => {
		originalUserAgent.mockReturnValue('any other user agent');
		expect(getBrowserName()).toBe('unknown');
	});
});
