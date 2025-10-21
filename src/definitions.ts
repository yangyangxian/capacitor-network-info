export interface NetworkInfoPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
