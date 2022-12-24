import { ExpressContext } from 'apollo-server-express';
import { Validations } from './enums/Validations';

const MAX_AGE_DAYS = Validations.MAX_AGE_DAYS;

export const setSessionIdInCookie = (ctx: ExpressContext, sessionId: string) => {
	ctx.res.cookie('sessionId', sessionId, {
		httpOnly: true,
		secure: true,
		sameSite: true,
		maxAge: 1000 * 60 * 60 * 24 * MAX_AGE_DAYS
	});
};
