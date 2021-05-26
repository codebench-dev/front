import axios from 'axios';
import { useQuery } from 'react-query';
import useToken from '../utils/useToken';

function useProfile() {
  const { token } = useToken();

  return useQuery<{ email: string }, Error>('profile', async () => {
    const { data } = await axios.get('http://localhost:3000/users/stan', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  });
}

export default useProfile;
