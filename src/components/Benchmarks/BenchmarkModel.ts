export default class benchmarkModel {
  id: string | undefined;
  title: string | undefined;
  subject: string | undefined;
  gitUrl: null | undefined;
  createdAt: string | undefined;
  difficulty: string | undefined;
  creator:
    | {
        id: string | undefined;
        name: string | undefined;
        username: string | undefined;
        email: string | undefined;
        createdAt: string | undefined;
        updatedAt: string | undefined;
      }
    | undefined;
}
