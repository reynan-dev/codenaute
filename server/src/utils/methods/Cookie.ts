import { ExpressContext } from 'apollo-server-express';
import { parse } from 'cookie';
import { Validations } from '@/utils/enums/Validations';

export abstract class Cookie {
	public static getSessionToken = (ctx: ExpressContext): string | undefined => {
		const rawCookies = ctx.req.headers.cookie;
		if (!rawCookies) return undefined;

		const parsedCookies = parse(rawCookies);
		return parsedCookies.token;
	};

	public static setSessionToken = (ctx: ExpressContext, token: string) => {
		const MAX_AGE_DAYS = Validations.MAX_AGE_DAYS;

		ctx.res.cookie('SessionToken', token, {
			httpOnly: true,
			secure: true,
			sameSite: true,
			maxAge: 1000 * 60 * 60 * 24 * MAX_AGE_DAYS
		});
	};
}
