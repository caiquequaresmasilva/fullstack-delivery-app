import { JwtGenerator, JwtValidator } from '../../../src/infra/adapters';
import {
  ExpiredTokenError,
  UnauthorizedError,
} from '../../../src/infra/errors';
import { EXPIRED_TOKEN, makeUserProps } from '../../mocks';
describe('Token Manager', () => {
  const tokenGenerator = new JwtGenerator();
  const tokenValidator = new JwtValidator();
  const { password, ...PAYLOAD } = makeUserProps('customer', true);
  describe('JwtTokenGenerator', () => {
    describe('# generate', () => {
      it('Should receive the payload and return a jwt token', () => {
        const token = tokenGenerator.generate(PAYLOAD);
        expect(typeof token).toBe('string');
        expect(token.length > 0).toBeTruthy();
      });
    });

    describe('# validate', () => {
      it('Should return the payload when the token is valid', () => {
        const token = tokenGenerator.generate(PAYLOAD);
        const payload = tokenValidator.validate(token);
        expect(payload.id).toBe(PAYLOAD.id);
        expect(payload.name).toBe(PAYLOAD.name);
        expect(payload.email).toBe(PAYLOAD.email);
        expect(payload.role).toBe(PAYLOAD.role);
      });
      it('Should throw "ExpiredTokenError" when the token has expired', () => {
        expect(() => tokenValidator.validate(EXPIRED_TOKEN)).toThrow(
          ExpiredTokenError,
        );
      });
      it('Should throw "UnauthorizedError" when the token is not valid', () => {
        expect(() => tokenValidator.validate('asda')).toThrow(
          UnauthorizedError,
        );
      });
    });
  });
});
