export default class benchmarkModel {
  id: String | undefined;
  title: String | undefined;
  subject: String | undefined;
  gitUrl: null | undefined;
  createdAt: String | undefined;
  difficulty: String | undefined;
  creator:
    | {
        id: String | undefined;
        name: String | undefined;
        username: String | undefined;
        email: String | undefined;
        createdAt: String | undefined;
        updatedAt: String | undefined;
      }
    | undefined;
}
