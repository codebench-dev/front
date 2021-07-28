import { useQuery } from 'react-query';
import benchmarkModel from '../components/Benchmarks/BenchmarkModel';
import authenticatedRequest from '../components/utils/request';

export default function useBenchmarkDetail(id: string) {
  return useQuery<benchmarkModel, Error>(`benchmark-${id}`, async () => {
    if (id) {
      const { data } = await authenticatedRequest({
        url: `benchmarks/${id}`,
      });
      return data;
    }
  });
}

export function useBenchmarkSList() {
  return useQuery<benchmarkModel[], Error>(`benchmark`, async () => {
    const { data } = await authenticatedRequest({
      url: `benchmarks`,
    });
    return data;
  });
}

export function useBenchmarksForUser(username: string) {
  return useQuery<benchmarkModel[], Error>(`benchmark`, async () => {
    const { data } = await authenticatedRequest({
      url: `users/${username}/benchmarks`,
    });
    return data;
  });
}

export async function createBenchmark(bench: {
  title: string;
  subject: string;
  difficulty: string;
  maxCyclomaticComplexity: number;
}): Promise<benchmarkModel> {
  const { data } = await authenticatedRequest({
    url: `/benchmarks`,
    method: 'POST',
    data: bench,
  });
  return data;
}
