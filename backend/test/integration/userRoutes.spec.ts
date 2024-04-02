import {
  EXPIRED_TOKEN,
  getLoginUserProps,
  makeTestUserBody,
} from '../mocks/users';
import {
  USER_EMAIL_ERRORS,
  USER_NAME_ERRORS,
  USER_PASSWORD_ERRORS,
  USER_ROLE_ERRORS,
  getIdsToDelete,
  makeGetRequest,
  makePostRequest,
} from './helpers';

describe('User routes', () => {
  const ENDPOINT = '/user';
  let CUSTOMER_TOKEN: string;
  let ADMIN_TOKEN: string;
  let SELLER_TOKEN: string;
  let customerToDelete: string;
  let sellerToDelete: string;

  describe('POST /user/login', () => {
    const CUSTOMER_LOGIN = getLoginUserProps('customer');
    const ADMIN_LOGIN = getLoginUserProps('admin');
    const SELLER_LOGIN = getLoginUserProps('seller');

    it('Should allow a customer to login and get their new token', async () => {
      const { status, body } = await makePostRequest({
        endpoint: `${ENDPOINT}/login`,
        body: CUSTOMER_LOGIN,
      });
      expect(status).toBe(200);
      expect(body.name).toBe(CUSTOMER_LOGIN.name);
      expect(body.role).toBe(CUSTOMER_LOGIN.role);
      expect(body).toHaveProperty('token');
      expect(body.token.length > 0).toBeTruthy();

      CUSTOMER_TOKEN = body.token;
    });

    it('Should allow a seller to login and get their new token', async () => {
      const { status, body } = await makePostRequest({
        endpoint: `${ENDPOINT}/login`,
        body: SELLER_LOGIN,
      });
      expect(status).toBe(200);
      expect(body.name).toBe(SELLER_LOGIN.name);
      expect(body.role).toBe(SELLER_LOGIN.role);
      expect(body).toHaveProperty('token');
      expect(body.token.length > 0).toBeTruthy();

      SELLER_TOKEN = body.token;
    });

    it('Should allow an admin to login and get their new token', async () => {
      const { status, body } = await makePostRequest({
        endpoint: `${ENDPOINT}/login`,
        body: ADMIN_LOGIN,
      });
      expect(status).toBe(200);
      expect(body.name).toBe(ADMIN_LOGIN.name);
      expect(body.role).toBe(ADMIN_LOGIN.role);
      expect(body).toHaveProperty('token');
      expect(body.token.length > 0).toBeTruthy();

      ADMIN_TOKEN = body.token;
    });

    it('Should not allow to login with incorrect email', async () => {
      const { status, body } = await makePostRequest({
        endpoint: `${ENDPOINT}/login`,
        body: { email: 'null@null.com', password: 'nothing' },
      });
      expect(status).toBe(400);
      expect(body.error).toBe('Password or email incorrect');
    });

    it('Should not allow to login with incorrect password', async () => {
      const { status, body } = await makePostRequest({
        endpoint: `${ENDPOINT}/login`,
        body: { email: CUSTOMER_LOGIN.email, password: 'wrongPassword' },
      });
      expect(status).toBe(400);
      expect(body.error).toBe('Password or email incorrect');
    });
  });

  describe('POST /user', () => {
    const NEW_CUSTOMER = makeTestUserBody('customer');
    const NEW_SELLER = makeTestUserBody('seller');
    const NEW_ADMIN = makeTestUserBody('admin');

    it('Should be able to create a customer user', async () => {
      const { status, body } = await makePostRequest({
        endpoint: ENDPOINT,
        body: NEW_CUSTOMER,
      });
      expect(status).toBe(201);
      expect(body.name).toBe(NEW_CUSTOMER.name);
      expect(body.role).toBe('customer');
      expect(body).toHaveProperty('token');
      expect(body.token.length > 0).toBeTruthy();
    });

    it('Should allow an admin to create a new seller', async () => {
      const { status, body } = await makePostRequest({
        endpoint: ENDPOINT,
        body: NEW_SELLER,
        token: ADMIN_TOKEN,
      });
      expect(status).toBe(201);
      expect(body.name).toBe(NEW_SELLER.name);
      expect(body.role).toBe('seller');
      expect(body).toHaveProperty('token');
      expect(body.token.length > 0).toBeTruthy();
    });

    it('Should not allow to create an admin user', async () => {
      const { status, body } = await makePostRequest({
        endpoint: ENDPOINT,
        body: NEW_ADMIN,
      });
      expect(status).toBe(403);
      expect(body.error).toBe('You are not allowed to perform this action');
    });

    it('Should not allow a customer to create a seller user', async () => {
      const { status, body } = await makePostRequest({
        endpoint: ENDPOINT,
        body: NEW_SELLER,
        token: CUSTOMER_TOKEN,
      });
      expect(status).toBe(403);
      expect(body.error).toBe('You are not allowed to perform this action');
    });

    it('Should not allow a seller to create a seller user', async () => {
      const { status, body } = await makePostRequest({
        endpoint: ENDPOINT,
        body: NEW_SELLER,
        token: SELLER_TOKEN,
      });
      expect(status).toBe(403);
      expect(body.error).toBe('You are not allowed to perform this action');
    });

    it('Should not allow to create a new user with incorrect "name" format', async () => {
      USER_NAME_ERRORS.forEach(async ({ name, error }) => {
        const { status, body } = await makePostRequest({
          endpoint: ENDPOINT,
          body: { ...NEW_CUSTOMER, name },
        });
        expect(status).toBe(400);
        expect(body.error).toBe(error);
      });
    });

    it('Should not allow to create a new user with incorrect "email" format', async () => {
      USER_EMAIL_ERRORS.forEach(async ({ email, error }) => {
        const { status, body } = await makePostRequest({
          endpoint: ENDPOINT,
          body: { ...NEW_CUSTOMER, email },
        });
        expect(status).toBe(400);
        expect(body.error).toBe(error);
      });
    });

    it('Should not allow to create a new user with incorrect "password" format', async () => {
      USER_PASSWORD_ERRORS.forEach(async ({ password, error }) => {
        const { status, body } = await makePostRequest({
          endpoint: ENDPOINT,
          body: { ...NEW_CUSTOMER, password },
        });
        expect(status).toBe(400);
        expect(body.error).toBe(error);
      });
    });

    it('Should not allow to create a new user with incorrect "role" format', async () => {
      USER_ROLE_ERRORS.forEach(async ({ role, error }) => {
        const { status, body } = await makePostRequest({
          endpoint: ENDPOINT,
          body: { ...NEW_CUSTOMER, role },
        });
        expect(status).toBe(400);
        expect(body.error).toBe(error);
      });
    });
  });

  describe('GET /user', () => {
    it('Should allow an admin to get the list of customers and sellers', async () => {
      const { status, body } = await makeGetRequest({
        endpoint: ENDPOINT,
        token: ADMIN_TOKEN,
      });

      expect(status).toBe(200);
      expect(Array.isArray(body)).toBeTruthy();
      expect(body.length).toBe(4);
      expect(body[0]).toHaveProperty('id');
      expect(body[0]).toHaveProperty('name');
      expect(body[0]).toHaveProperty('role');
      expect(body[0]).toHaveProperty('email');

      const { customerId, sellerId } = getIdsToDelete(body);
      customerToDelete = customerId;
      sellerToDelete = sellerId;
    });

    it('Should not allow a customer to get the list of users', async () => {
      const { status, body } = await makeGetRequest({
        endpoint: ENDPOINT,
        token: CUSTOMER_TOKEN,
      });
      expect(status).toBe(403);
      expect(body.error).toBe('You are not allowed to perform this action');
    });

    it('Should not allow a seller to get the list of users', async () => {
      const { status, body } = await makeGetRequest({
        endpoint: ENDPOINT,
        token: SELLER_TOKEN,
      });
      expect(status).toBe(403);
      expect(body.error).toBe('You are not allowed to perform this action');
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
