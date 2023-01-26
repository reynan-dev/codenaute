import clsx from 'clsx';
import Container from '../../components/Container';
import SignUpForm from './sections/SignUpForm';

export default function SignUpPage() {
	// Page is for all UI
	return (
		<Container>
			<div className='flex h-full w-full flex-col items-center justify-center'>
				<h1>Sign-up</h1>
				<h4>Enter your informations</h4>
				<SignUpForm
					className={clsx(
						'flex w-full flex-col items-center justify-center',
						'sm:w-3/4',
						'md:w-3/5',
						'lg:w-1/2',
						'xl:max-w-md'
					)}
				/>
			</div>
		</Container>
	);
}
