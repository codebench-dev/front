import axios from 'axios';
import { useQuery } from 'react-query';
import useToken from './token';

function useProfile() {
  const { token } = useToken();

  function parseJwt(token: string): {
    username: string;
    sub: string;
    iat: string;
  } {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

  return useQuery<{ email: string }, Error>('profile', async () => {
    if (token) {
      const username = parseJwt(token).username;
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/users/${username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return data;
    }
  });
}

export default useProfile;
