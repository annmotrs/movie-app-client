import { createContext, useState } from 'react';

export const UserContext = createContext({});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isAuth, setAuth] = useState(false);
  const [favoritesByUser, setFavoritesByUser] = useState([]);

  const value = {
    user,
    isAuth,
    favoritesByUser,
    setUser,
    setAuth,
    setFavoritesByUser,
    logOut,
  };

  function logOut() {
    setUser({});
    setAuth(false);
    setFavoritesByUser([]);
    localStorage.removeItem('token');
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
