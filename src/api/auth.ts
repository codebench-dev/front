import axios, { AxiosResponse } from 'axios';

const login = async (username: string, password: string): Promise<string> => {
  const res: AxiosResponse<{ access_token: string }> = await axios.post(
    `${process.env.REACT_APP_API_ENDPOINT}/auth/login`,
    {
      username,
      password,
    },
  );

  return res.data.access_token;
};

const register = async (
  name: string,
  email: string,
  username: string,
  password: string,
): Promise<{
  name: string;
  email: string;
  username: string;
  id: string;
}> => {
  const res: AxiosResponse<{
    name: string;
    email: string;
    username: string;
    id: string;
  }> = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/users`, {
    name,
    email,
    username,
    password,
  });

  return res.data;
};

export { login, register };
