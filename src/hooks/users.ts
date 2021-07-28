import { useQuery } from 'react-query';
import authenticatedRequest from '../components/utils/request';
import { useToken } from './token';

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

  return useQuery<{ email: string; name: string; username: string }, Error>(
    'profile',
    async () => {
      if (token) {
        const username = parseJwt(token).username;
        const { data } = await authenticatedRequest({
          url: `users/${username}`,
        });
        return data;
      }
    },
  );
}

function useUser(username: string) {
  const { token } = useToken();

  return useQuery<{ email: string; name: string; username: string }, Error>(
    'profile',
    async () => {
      if (token) {
        const { data } = await authenticatedRequest({
          url: `users/${username}`,
        });
        return data;
      }
    },
  );
}

export { useProfile, useUser };
