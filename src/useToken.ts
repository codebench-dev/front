import { useState } from 'react';

export default function useToken() {
  function getToken(): any {
    const tokenString = localStorage.getItem('access_token');
    if (tokenString) {
      return tokenString;
    }
  }

  function saveToken(userToken: string) {
    localStorage.setItem('access_token', userToken);
  }
  const [token] = useState(getToken());

  return {
    setToken: saveToken,
    token,
  };
}
