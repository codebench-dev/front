import axios, { AxiosResponse } from 'axios';

const login = async (username: string, password: string): Promise<string> => {
  const res: AxiosResponse<{ access_token: string }> = await axios.post(
    'http://localhost:3000/auth/login',
    {
      username,
      password,
    }
  );

  return res.data.access_token;
};

export default login;
