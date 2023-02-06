import clsx from 'clsx';
import Container from 'components/Container';
import Link from 'components/Link';
import LogoSvg from 'components/Svgs/LogoSvg';
import { BLACK, WHITE } from 'styles/colors';

interface LoginPageProps {
	loginForm: JSX.Element;
}

export default function LoginPage({ loginForm }: LoginPageProps) {
	return (
		<Container>
			<div className='flex h-full w-full flex-col items-center justify-center'>
				<div className='full-center-col mt-8 mb-16 space-y-5'>
					<div className='flex space-x-3'>
						<LogoSvg color={BLACK.DEFAULT} backgroundColor={WHITE.DEFAULT} size='50px' />
						<h1>Login</h1>
					</div>
					<h4>Enter your credentials to sign-in</h4>
				</div>
				<div className={clsx('w-full', 'sm:w-3/4', 'md:w-3/5', 'lg:w-1/2', 'xl:max-w-md')}>
					{loginForm}
				</div>
				<Link to='/sign-up' color='primary'>
					I don't have an account
				</Link>
			</div>
		</Container>
	);
}
