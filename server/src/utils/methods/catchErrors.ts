import { Response } from 'express';
import { getErrorMessage } from 'utils/methods/getErrorMessage';

export function catchError(err: unknown, res: Response) {
	const error = getErrorMessage(err);

	return res.status(500).json({ error });
}
