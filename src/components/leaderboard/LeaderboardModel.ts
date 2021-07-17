export default class LeaderboardModel {
  id: string | undefined;
  language: string | undefined;
  lintScore: string | undefined;
  qualityScore: string | undefined;
  createdAt: string | undefined;
  user:
    | {
        id: string | undefined;
        name: string | undefined;
        username: string | undefined;
        email: string | undefined;
      }
    | undefined;
}
