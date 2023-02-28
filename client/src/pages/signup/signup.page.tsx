import clsx from 'clsx';
import Container from 'components/Container';
import Link from 'components/Link';
import LogoSvg from 'components/Svgs/LogoSvg';
import { BLACK, WHITE } from 'styles/colors';
import astronautImage from '../../assets/images/astronaut-auth.png';

interface SignUpPageProps {
	signUpForm: JSX.Element;
}

export default function SignUpPage({ signUpForm }: SignUpPageProps) {
	return (
		<div className='flex h-full'>
			<Container>
				<div className='flex h-full w-full flex-col items-center justify-center'>
					<div className='full-center-col mt-8 mb-16 space-y-5'>
						<div className='flex space-x-3'>
							<LogoSvg color={BLACK.DEFAULT} backgroundColor={WHITE.DEFAULT} size='50px' />
							<h1>Sign up</h1>
						</div>
						<h4>Enter your informations to register</h4>
					</div>
					<div className={clsx('w-full', 'sm:w-3/4', 'md:w-3/5', 'lg:w-4/5', 'xl:max-w-md')}>
						{signUpForm}
					</div>
					<Link to='/sign-in' color='primary'>
						I already have an account
					</Link>
				</div>
			</Container>
			<div className='w-full hidden lg:block'>
				<img src={astronautImage} className="object-cover h-full" alt='Astronaut illustration' />
			</div>
		</div>
	);
}
