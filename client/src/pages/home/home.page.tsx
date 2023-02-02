import { LOGIN_PATH, SIGN_UP_PATH } from 'constants/paths';
import { Link } from 'react-router-dom';

export default function HomePage() {
	return (
		<div>
			<Link to={SIGN_UP_PATH}>SIGN UP</Link>&nbsp;&nbsp;|&nbsp;&nbsp;<Link to={LOGIN_PATH}>LOGIN</Link>
		</div>
	);
}
