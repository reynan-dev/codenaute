import React from 'react';
import { Button } from './button/Button';
import { Input } from './input/Input';

// just a sandbox to test components

export default function ComponentTester() {
	return (
		<div className='flex h-full w-full items-center justify-center'>
			<div className='flex w-1/4 flex-col items-center justify-center'>
				<Input
					placeholder='SuperCoder'
					label='Username'
					error='Username unavailable'
					className='py-4'
				/>
				<Input placeholder='john@doe.com' label='Email' className='py-4' />
				<Input placeholder='Password' label='Password' type='password' className='py-4' />
				<Button onClick={() => alert('click')} isLoading className='my-8'>
					Se connecter
				</Button>
			</div>
		</div>
	);
}
