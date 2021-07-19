import { useQuery } from 'react-query';
import authenticatedRequest from '../components/utils/request';
import LeaderboardModel from '../components/leaderboard/LeaderboardModel';

export function useLeaderboardList(benchmarkId: string) {
  return useQuery<LeaderboardModel[], Error>(
    `leaderboard-${benchmarkId}`,
    async () => {
      if (benchmarkId) {
        const { data } = await authenticatedRequest({
          url: `benchmarks/${benchmarkId}/leaderboard`,
        });
        return data;
      }
    },
    {
      retry: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  );
}
