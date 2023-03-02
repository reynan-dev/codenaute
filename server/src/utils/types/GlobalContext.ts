import { ExpressContext } from 'apollo-server-express';
import { Member } from 'models/Member';

export type GlobalContext = ExpressContext & {
	user: Member | null;
};
