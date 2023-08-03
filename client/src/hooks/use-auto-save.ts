import { useEffect } from 'react';

const ONE_MINUTE_IN_MILLISECONDS = 10000;

export const useAutoSave = async (
	callback: ((data: any) => Promise<() => any>) | ((data: any) => any),
	data: any
) => {
	useEffect(() => {
		// setInterval(callback, ONE_MINUTE_IN_MILLISECONDS, data);
	}, [callback, data]);
};
