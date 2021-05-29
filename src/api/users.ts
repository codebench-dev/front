import axios from 'axios';
import { useQuery } from 'react-query';
import useToken from '../utils/useToken';

function useProfile() {
  const { token } = useToken();

  return useQuery<{ email: string }, Error>('profile', async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/users/stan`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return data;
  });
}

export default useProfile;
