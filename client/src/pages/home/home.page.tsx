import { ACCOUNT_PATH, LOGIN_PATH, SIGN_UP_PATH } from 'constants/paths';
import { HomeContainerProps } from 'pages/home/home.container';
import { Link } from 'react-router-dom';

export interface HomePageProps extends HomeContainerProps {}

export const HomePage = ({ isAuthenticated, profileData }: HomePageProps) => {
	return (
		<div className='flex py-3 px-5'>
			{isAuthenticated ? (
				<>
					<p>
						Hello{' '}
						<span className='font-bold text-primary'>{profileData?.profile.username}</span>
						&nbsp;&nbsp;|&nbsp;&nbsp;
					</p>
					<Link to={ACCOUNT_PATH}>ACCOUNT</Link>
				</>
			) : (
				<>
					<Link to={SIGN_UP_PATH}>SIGN UP</Link>
					&nbsp;&nbsp;|&nbsp;&nbsp;
					<Link to={LOGIN_PATH}>LOGIN</Link>
				</>
			)}
		</div>
	);
};
