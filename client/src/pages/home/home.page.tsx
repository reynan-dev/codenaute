import { SIGN_UP_PATH } from 'constants/paths';
import { Link } from 'react-router-dom';

export default function HomePage() {
	return <Link to={SIGN_UP_PATH}>SIGN UP</Link>;
}
