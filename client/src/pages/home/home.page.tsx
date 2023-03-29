import Button from 'components/Button';
import { ACCOUNT_PATH, SIGN_IN_PATH, SIGN_UP_PATH } from 'constants/paths';
import { ProfileQuery } from 'graphql/__generated__/graphql';
import { LogOutButton } from 'pages/home/components/LogOutButton';
import { Link } from 'react-router-dom';

export interface HomePageProps {
	isAuthenticated: boolean;
	profileData?: ProfileQuery | null;
}

export const HomePage = ({ isAuthenticated, profileData }: HomePageProps) => {
	return (
		<div className='flex py-3 px-5'>
			{isAuthenticated ? (
				<>
					<p>
						Hello <span className='font-bold text-primary'>{profileData?.profile.username}</span>
						&nbsp;&nbsp;|&nbsp;&nbsp;
					</p>
					<Link to={ACCOUNT_PATH}>ACCOUNT</Link>
					&nbsp;&nbsp;|&nbsp;&nbsp;
					<LogOutButton />
				</>
			) : (
				<>
					<Link to={SIGN_UP_PATH}>SIGN UP</Link>
					&nbsp;&nbsp;|&nbsp;&nbsp;
					<Link to={SIGN_IN_PATH}>SIGN IN</Link>
				</>
			)}
		</div>
	);
};
