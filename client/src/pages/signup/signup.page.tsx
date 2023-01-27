import clsx from 'clsx';
import Container from '../../components/Container';
import SignUpForm from './sections/SignUpForm';

export default function SignUpPage() {
	return (
		<Container>
			<div className='flex h-full w-full flex-col items-center justify-center'>
				<div className='full-center-col mt-8 mb-16 space-y-5'>
					<h1 className=''>Sign-up</h1>
					<h4 className=''>Enter your informations</h4>
				</div>
				<SignUpForm className={clsx('w-full', 'sm:w-3/4', 'md:w-3/5', 'lg:w-1/2', 'xl:max-w-md')} />
			</div>
		</Container>
	);
}
