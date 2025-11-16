import { Request, Response } from 'express';
import { Member } from 'models/Member';

export type GlobalContext = {
	req: Request;
	res: Response;
	user: Member | null;
};
