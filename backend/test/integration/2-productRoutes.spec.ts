import { EXPIRED_TOKEN, getLoginUserProps } from '../mocks/users';
import { makeGetRequest, makePostRequest } from './helpers';

describe('Product routes', () => {
  const ENDPOINT = '/product';
  describe('GET /product', () => {
    it('Should be able to return a list of products', async () => {
      const CUSTOMER_LOGIN = getLoginUserProps('customer');
      const { body } = await makePostRequest({
        endpoint: '/user/login',
        body: CUSTOMER_LOGIN,
      });
      const { status, body: products } = await makeGetRequest({
        endpoint: ENDPOINT,
        token: body.token,
      });
      expect(status).toBe(200);
      expect(Array.isArray(products)).toBeTruthy();
      expect(products.length).toBe(11);
    });

    it('Should not allow access without an authentication token', async () => {
      const { status, body } = await makeGetRequest({
        endpoint: ENDPOINT,
      });
      expect(status).toBe(401);
      expect(body.error).toBe('Invalid authentication token');
    });

    it('Should not allow access with an expired authentication token', async () => {
      const { status, body } = await makeGetRequest({
        endpoint: ENDPOINT,
        token: EXPIRED_TOKEN,
      });
      expect(status).toBe(401);
      expect(body.error).toBe('Your token has expired. Login again.');
    });
  });
});
