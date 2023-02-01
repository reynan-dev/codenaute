import { ExpressContext } from 'apollo-server-express';
import { parse } from 'cookie';
import { Validations } from 'utils/enums/Validations';

export abstract class Cookie {
	public static getSessionToken = (ctx: ExpressContext): string | undefined => {
		const rawCookies = ctx.req.headers.cookie;

		if (!rawCookies) return undefined;

		const cookies = parse(rawCookies);

		return cookies.session;
	};

	public static setSessionToken = (ctx: ExpressContext, token: string) => {
		ctx.res.cookie('session', token, {
			httpOnly: true,
			secure: true,
			sameSite: true,
			maxAge: 1000 * 60 * 60 * 24 * Validations.MAX_AGE_DAYS
		});
	};
}
