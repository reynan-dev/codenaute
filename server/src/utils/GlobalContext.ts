import { ExpressContext } from 'apollo-server-express';
import Member from '../entities/Member.js';

export type GlobalContext = ExpressContext & {
	user: Member | null;
};
