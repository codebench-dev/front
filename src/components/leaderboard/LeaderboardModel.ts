export default class LeaderboardModel {
  id: string | undefined;
  language: string | undefined;
  lintScore: string | undefined;
  qualityScore: string | undefined;
  memUsage: number | undefined;
  execDuration: number | undefined;
  createdAt: string | undefined;
  cyclomaticComplexity: number | undefined;
  duplicatedSubmissions: [] | undefined;
  user:
    | {
        id: string | undefined;
        name: string | undefined;
        username: string | undefined;
        email: string | undefined;
      }
    | undefined;
}
