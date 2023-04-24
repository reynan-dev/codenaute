import astronautImage from 'assets/images/astronaut-auth.png';
import Container from 'components/container';
import Link from 'components/link';
import LogoSvg from 'components/svgs/logo';
import { BLACK, WHITE } from 'styles/colors';
import { twJoin } from 'tailwind-merge';

interface SignInPageProps {
	signInForm: JSX.Element;
}

export const SignInPage = ({ signInForm }: SignInPageProps) => {
	return (
		<div className='flex h-full'>
			<Container>
				<div className='flex h-full w-full flex-col items-center justify-center'>
					<div className='full-center-col mt-8 mb-16 space-y-5'>
						<div className='flex space-x-3'>
							<LogoSvg color={BLACK.DEFAULT} backgroundColor={WHITE.DEFAULT} size='50px' />
							<h1>Sign in</h1>
						</div>
						<h4>Enter your credentials to sign-in</h4>
					</div>
					<div className={twJoin('w-full', 'sm:w-3/4', 'md:w-3/5', 'lg:w-4/5', 'xl:max-w-md')}>
						{signInForm}
					</div>
					<Link to='/sign-up' color='primary'>
						I don't have an account
					</Link>
				</div>
			</Container>
			<div className='hidden w-full lg:block'>
				<img src={astronautImage} className='h-full object-cover' alt='Astronaut illustration' />
			</div>
		</div>
	);
};
