import { ExpressContext } from 'apollo-server-express';
import { Validations } from 'utils/enums/Validations';

export abstract class Cookie {
	private static _cookieOptions(token: string) {
		return {
			validation: 1000 * 60 * 60 * 24 * Validations.MAX_AGE_DAYS,
			token: token
		};
	}

	public static getSessionToken(ctx: ExpressContext): string | undefined {
		const rawCookies = ctx.req.headers.authorization;

		if (!rawCookies) return undefined;

		const cookies = JSON.parse(rawCookies);

		if (cookies.validation < Date.now()) return undefined;

		return cookies.token;
	}

	public static setSessionToken(token: string) {
		return JSON.stringify(this._cookieOptions(token));
	}
}
