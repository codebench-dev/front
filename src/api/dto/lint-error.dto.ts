export interface LintErrorDTO {
  message: string;

  line: number | null;

  column: number | null;

  offset: number | null;
}
