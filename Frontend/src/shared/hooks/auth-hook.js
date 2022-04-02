import { useState, useCallback, useEffect } from 'react';

let logoutTimer;

export const useAuth = () => {
  const prevToken = localStorage.getItem('userData');

  const initialToken = prevToken ? JSON.parse(prevToken).token : null;
  const initialIsAdmin = prevToken ? JSON.parse(prevToken).isAdmin : null;

  const [token, setToken] = useState(initialToken);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [isAdmin, setIsAdmin] = useState(initialIsAdmin);

  const login = useCallback((isadmin, token, expirationDate) => {
    setToken(token);
    setIsAdmin(isadmin);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60 * 3);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        isAdmin: isadmin,
        token: token,

        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setIsAdmin(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.isAdmin,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  return { token, login, logout, isAdmin };
};
