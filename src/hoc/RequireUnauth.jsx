import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

function RequireUnauth({ children }) {
  const { isAuth } = useContext(UserContext);

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return children;
}

export default RequireUnauth;
