import { ExpressContext } from 'apollo-server-express';
import { parse } from 'cookie';

export const getSessionTokenInCookie = (ctx: ExpressContext): string | undefined => {
	const rawCookies = ctx.req.headers.cookie;
	if (!rawCookies) return undefined;

	const parsedCookies = parse(rawCookies);
	return parsedCookies.token;
};
