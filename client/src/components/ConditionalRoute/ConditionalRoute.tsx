import AuthContext from 'context/auth.context';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ConditionalRouteProps {
	children: JSX.Element;
	type: 'unauth' | 'private';
}

export const ConditionalRoute = ({ children, type }: ConditionalRouteProps) => {
	const location = useLocation();

	const { isAuthenticated } = useContext(AuthContext);

	if (isAuthenticated && type === 'unauth') {
		return <Navigate to='/account' state={{ from: location }} replace />;
	}

	if (!isAuthenticated && type === 'private') {
		return <Navigate to='/sign-in' state={{ from: location }} replace />;
	}

	return children;
};
