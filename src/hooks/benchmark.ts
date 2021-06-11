import axios, { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import benchmarkModel from '../components/Benchmarks/BenchmarkModel';
import useToken from './token';

export default function useBenchmarkDetail(id: string) {
  const { token } = useToken();

  return useQuery<benchmarkModel, Error>(`benchmark-${id}`, async () => {
    if (id) {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/benchmarks/${id}`,
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

export function useBenchmarkSList() {
  const { token } = useToken();

  return useQuery<benchmarkModel[], Error>(`benchmark`, async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/benchmarks`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return data;
  });
}

export async function createBenchmark(bench: {
  title: string;
  subject: string;
  difficulty: string;
}): Promise<benchmarkModel> {
  const res: AxiosResponse<benchmarkModel> = await axios.post(
    `${process.env.REACT_APP_API_ENDPOINT}/benchmarks`,
    bench,
    {
      timeout: 5000,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token'), // FIX ME
      },
    },
  );
  return res.data;
}
