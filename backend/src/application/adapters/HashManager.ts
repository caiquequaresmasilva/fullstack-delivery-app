export interface HashManager {
  generate(str: string): Promise<string>;
  compare(str: string, hash: string): Promise<boolean>;
}
