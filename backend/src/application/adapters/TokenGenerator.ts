export interface TokenGenerator {
  generate(payload: TokenPayload): string;
}
