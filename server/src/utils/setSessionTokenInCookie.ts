import { ExpressContext } from 'apollo-server-express';
import { Validations } from './enums/Validations';

const MAX_AGE_DAYS = Validations.MAX_AGE_DAYS;

export const setSessionTokenInCookie = (ctx: ExpressContext, token: string) => {
	ctx.res.cookie('SessionToken', token, {
		httpOnly: true,
		secure: true,
		sameSite: true,
		maxAge: 1000 * 60 * 60 * 24 * MAX_AGE_DAYS
	});
};
