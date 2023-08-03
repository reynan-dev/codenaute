// Taken from https://usehooks.com/useWindowSize/

import { useEffect, useState } from 'react';

export const useWindowSize = () => {
	const [windowSize, setWindowSize] = useState<{
		width: number | undefined;
		height: number | undefined;
	}>({
		width: undefined,
		height: undefined
	});

	useEffect(() => {
		const handleResize = () => {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight
			});
		};
		window.addEventListener('resize', handleResize);
		// Call handler right away so state gets updated with initial window size
		handleResize();
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return windowSize;
};
