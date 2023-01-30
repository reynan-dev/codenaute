import Button from 'components/button';
import Input from 'components/input';

interface SignUpFormProps {
	className?: string;
}

export default function SignUpForm({ className }: SignUpFormProps) {
	return (
		<div className={className}>
			<form className='full-center-col w-full space-y-8'>
				<Input placeholder='SuperCoder' label='Username' />
				<Input placeholder='john@doe.com' label='Email' />
				<Input placeholder='Password' label='Password' type='password' />
				<Input placeholder='Repeat password' label='Repeat password' type='password' />

				<Button onClick={() => alert('click')} isLoading className='my-8'>
					Se connecter
				</Button>
			</form>
		</div>
	);
}
