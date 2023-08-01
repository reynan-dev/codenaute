import { ExpressContext } from 'apollo-server-express';
import { Session } from 'models/Session';
import { Validations } from 'utils/enums/Validations';

export abstract class Cookie {
	private static _cookieOptions(session: Session) {
		return {
			validation: Date.now() + 1000 * 60 * 60 * 24 * Validations.MAX_AGE_DAYS,
			token: session.token
		};
	}

	private static _rawCookieValidation(rawCookies: string) {
		const cookies = JSON.parse(rawCookies);

		return cookies.validation < Date.now() ? undefined : cookies;
	}

	public static getSessionToken(ctx: ExpressContext): string | undefined {
		const rawCookies = ctx.req.headers.authorization;

		if (!rawCookies) return undefined;

		const cookies = this._rawCookieValidation(rawCookies as string);

		return cookies.token;
	}

	public static setSessionToken(session: Session) {
		return JSON.stringify(this._cookieOptions(session));
	}
}
