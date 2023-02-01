import React from 'react';

export default function CrossDeviceBackground() {
	// Just a trick to have a fixed background on all devices and browsers
	return <div className='fixed z-[-1] h-screen w-screen bg-dark-900' />;
}
