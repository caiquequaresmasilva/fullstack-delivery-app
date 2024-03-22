export interface HashManager {
  generate(str: string): string
  compare(str: string, hash: string): boolean
}