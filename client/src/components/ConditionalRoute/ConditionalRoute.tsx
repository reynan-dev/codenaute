import { Navigate, useLocation } from 'react-router-dom';

interface ConditionalRouteProps {
  children: JSX.Element
  isAuthenticated: boolean
  type: "unauth" | "private";
}

export const ConditionalRoute = ({ children, isAuthenticated, type }: ConditionalRouteProps) => {
  const location = useLocation();

  if (isAuthenticated && type === "unauth") {
    return <Navigate to="/account" state={{ from: location }} replace />;
  }

  if (!isAuthenticated && type === "private") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

