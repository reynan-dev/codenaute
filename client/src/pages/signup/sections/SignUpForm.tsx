import React from 'react';
import { Button } from '../../../components/Button/Button';
import { Input } from '../../../components/Input/Input';

interface SignUpFormProps {
	className?: string;
}

export default function SignUpForm({ className }: SignUpFormProps) {
	return (
		<div className={className}>
			<Input placeholder='SuperCoder' label='Username' className='py-4' />
			<Input placeholder='john@doe.com' label='Email' className='py-4' />
			<Input placeholder='Password' label='Password' type='password' className='py-4' />
			<Input
				placeholder='Repeat password'
				label='Repeat password'
				type='password'
				className='py-4'
			/>

			<Button onClick={() => alert('click')} isLoading className='my-8'>
				Se connecter
			</Button>
		</div>
	);
}
