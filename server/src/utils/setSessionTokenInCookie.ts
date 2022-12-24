import { ExpressContext } from 'apollo-server-express';

const MAX_AGE_DAYS = 365;

export const setSessionTokenInCookie = (ctx: ExpressContext, token: string) => {
	ctx.res.cookie('SessionToken', token, {
		httpOnly: true,
		secure: true,
		sameSite: true,
		maxAge: 1000 * 60 * 60 * 24 * MAX_AGE_DAYS
	});
};
