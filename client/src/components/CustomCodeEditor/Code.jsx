import React, { useRef } from 'react';

import CustomSandpack from './CustomSandpack';

const Code = () => {
	const previewRef = useRef(null);
	const consoleRef = useRef(null);

	return (
		<div className='h-full'>
			<CustomSandpack previewRef={previewRef} consoleRef={consoleRef} />
		</div>
	);
};

export default Code;
