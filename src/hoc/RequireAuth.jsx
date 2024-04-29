import { useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

function RequireAuth({ children }) {
  const location = useLocation();
  const { isAuth } = useContext(UserContext);

  if (!isAuth) {
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  return children;
}

export default RequireAuth;
