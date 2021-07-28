export interface SubmissionDTO {
  id: string;
  language: string;
  code: string;
  codeHash: string;
  status: string;
  stdout?: string;
  stderr?: string;
  message?: string;
  error?: string;
  execDuration: number;
  memUsage: number;
  createdAt: Date;
  updatedAt: Date;
  lintScore: number;
  qualityScore: number;
  cyclomaticComplexity: number;
  user: User;
  duplicatedSubmissions?: SubmissionDTO[];
}

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
