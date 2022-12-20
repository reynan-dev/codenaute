import { ExpressContext } from 'apollo-server-express';

const MAX_AGE_DAYS = 365;

export const setSessionIdInCookie = (ctx: ExpressContext, sessionId: string) => {
	ctx.res.cookie('sessionId', sessionId, {
		httpOnly: true,
		secure: true,
		sameSite: true,
		maxAge: 1000 * 60 * 60 * 24 * MAX_AGE_DAYS
	});
};
