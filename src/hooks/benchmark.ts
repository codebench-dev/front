import { useQuery } from 'react-query';
import axios from 'axios';
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
      console.log(data);
      return data;
    }
  });
}
