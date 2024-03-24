export interface TokenValidator {
  validate(token: string): TokenPayload
}