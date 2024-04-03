import prismaClient from '../../src/infra/database/prisma/prismaClient';
import {
  ORDER_ADDRESS_ERRORS,
  ORDER_NUMBER_ERRORS,
  ORDER_PRICE_ERRORS,
  ORDER_PRODUCTS_ERRORS,
  ORDER_SELLER_ERRORS,
  Status,
  makeStatus,
  makeTestOrder,
} from '../mocks/orders';
import {
  EXPIRED_TOKEN,
  getLoginUserProps,
  makeTestUserBody,
} from '../mocks/users';
import { makeGetRequest, makePatchRequest, makePostRequest } from './helpers';

describe('Order routes', () => {
  const ENDPOINT = '/order';
  const CUSTOMER_LOGIN = getLoginUserProps('customer');
  const ADMIN_LOGIN = getLoginUserProps('admin');
  const SELLER_LOGIN = getLoginUserProps('seller');

  let CUSTOMER_TOKEN: string;
  let ADMIN_TOKEN: string;
  let SELLER_TOKEN: string;
  let SELLER_ID: string;
  let ORDER_ID: number;
  let NEW_ORDER: any;
  beforeAll(async () => {
    const {
      body: { token: customerToken },
    } = await makePostRequest({
      endpoint: '/user/login',
      body: CUSTOMER_LOGIN,
    });
    const {
      body: { token: sellerToken },
    } = await makePostRequest({
      endpoint: '/user/login',
      body: SELLER_LOGIN,
    });
    const {
      body: { token: adminToken },
    } = await makePostRequest({
      endpoint: '/user/login',
      body: ADMIN_LOGIN,
    });
    CUSTOMER_TOKEN = customerToken;
    SELLER_TOKEN = sellerToken;
    ADMIN_TOKEN = adminToken;
    const seller = await prismaClient.deliveryUser.findUnique({
      where: {
        email: SELLER_LOGIN.email,
      },
    });
    SELLER_ID = seller?.id || '';
  });
  describe('POST /order', () => {
    beforeAll(async () => {
      const { body: products } = await makeGetRequest({
        endpoint: '/product',
        token: CUSTOMER_TOKEN,
      });
      NEW_ORDER = await makeTestOrder(SELLER_ID, products);
    });
    it('Should allow a customer to create a new order', async () => {
      const { status, body } = await makePostRequest({
        endpoint: ENDPOINT,
        token: CUSTOMER_TOKEN,
        body: NEW_ORDER,
      });
      expect(status).toBe(201);
      expect(body).toHaveProperty('id');
      ORDER_ID = body.id;
    });

    it('Should not allow a customer to create a new order with incorrect sellerId format', async () => {
      ORDER_SELLER_ERRORS.forEach(async ({ sellerId, error }) => {
        const { status, body } = await makePostRequest({
          endpoint: ENDPOINT,
          token: CUSTOMER_TOKEN,
          body: { ...NEW_ORDER, sellerId },
        });
        expect(status).toBe(400);
        expect(body.error).toBe(error);
      });
    });

    it('Should not allow a customer to create a new order with incorrect address format', async () => {
      ORDER_ADDRESS_ERRORS.forEach(async ({ deliveryAddress, error }) => {
        const { status, body } = await makePostRequest({
          endpoint: ENDPOINT,
          token: CUSTOMER_TOKEN,
          body: { ...NEW_ORDER, deliveryAddress },
        });
        expect(status).toBe(400);
        expect(body.error).toBe(error);
      });
    });

    it('Should not allow a customer to create a new order with incorrect address number format', async () => {
      ORDER_NUMBER_ERRORS.forEach(async ({ deliveryNumber, error }) => {
        const { status, body } = await makePostRequest({
          endpoint: ENDPOINT,
          token: CUSTOMER_TOKEN,
          body: { ...NEW_ORDER, deliveryNumber },
        });
        expect(status).toBe(400);
        expect(body.error).toBe(error);
      });
    });

    it('Should not allow a customer to create a new order with incorrect price format', async () => {
      ORDER_PRICE_ERRORS.forEach(async ({ totalPrice, error }) => {
        const { status, body } = await makePostRequest({
          endpoint: ENDPOINT,
          token: CUSTOMER_TOKEN,
          body: { ...NEW_ORDER, totalPrice },
        });
        expect(status).toBe(400);
        expect(body.error).toBe(error);
      });
    });

    it('Should not allow a customer to create a new order with incorrect products format', async () => {
      ORDER_PRODUCTS_ERRORS.forEach(async ({ products, error }) => {
        const { status, body } = await makePostRequest({
          endpoint: ENDPOINT,
          token: CUSTOMER_TOKEN,
          body: { ...NEW_ORDER, products },
        });
        expect(status).toBe(400);
        expect(body.error).toBe(error);
      });
    });

    it('Should not allow a seller to create a new order', async () => {
      const { status, body } = await makePostRequest({
        endpoint: ENDPOINT,
        token: SELLER_TOKEN,
        body: NEW_ORDER,
      });
      expect(status).toBe(403);
      expect(body.error).toBe('You are not allowed to perform this action');
    });

    it('Should not allow an admin to create a new order', async () => {
      const { status, body } = await makePostRequest({
        endpoint: ENDPOINT,
        token: ADMIN_TOKEN,
        body: NEW_ORDER,
      });
      expect(status).toBe(403);
      expect(body.error).toBe('You are not allowed to perform this action');
    });

    it('Should not allow access without an authentication token', async () => {
      const { status, body } = await makePostRequest({
        endpoint: ENDPOINT,
        body: NEW_ORDER,
      });
      expect(status).toBe(401);
      expect(body.error).toBe('Invalid authentication token');
    });

    it('Should not allow access with an expired authentication token', async () => {
      const { status, body } = await makePostRequest({
        endpoint: ENDPOINT,
        body: NEW_ORDER,
        token: EXPIRED_TOKEN,
      });
      expect(status).toBe(401);
      expect(body.error).toBe('Your token has expired. Login again.');
    });
  });

  describe('GET /order', () => {
    let NEW_SELLER_2: any;
    let NEW_CUSTOMER_2: any;
    let customerToken2: string;
    let sellerToken2: string;
    beforeAll(async () => {
      NEW_CUSTOMER_2 = makeTestUserBody('customer');
      NEW_SELLER_2 = makeTestUserBody('seller');
      const customer = await makePostRequest({
        endpoint: '/user',
        body: NEW_CUSTOMER_2,
      });
      const seller = await makePostRequest({
        endpoint: '/user',
        body: NEW_SELLER_2,
        token: ADMIN_TOKEN,
      });

      customerToken2 = customer.body.token;
      sellerToken2 = seller.body.token;
    });
    afterAll(async () => {
      await Promise.all([
        prismaClient.deliveryUser.delete({
          where: { email: NEW_CUSTOMER_2.email },
        }),
        prismaClient.deliveryUser.delete({
          where: { email: NEW_SELLER_2.email },
        }),
      ]);
    });

    it('Should be able to return the orders from the specified customer', async () => {
      [
        [CUSTOMER_TOKEN, 1],
        [customerToken2, 0],
      ].forEach(async data => {
        const { status, body } = await makeGetRequest({
          endpoint: ENDPOINT,
          token: data[0] as string,
        });
        expect(status).toBe(200);
        expect(body.length).toBe(data[1]);
      });
    });

    it('Should be able to return the orders from the specified seller', async () => {
      [
        [SELLER_TOKEN, 1],
        [sellerToken2, 0],
      ].forEach(async data => {
        const { status, body } = await makeGetRequest({
          endpoint: ENDPOINT,
          token: data[0] as string,
        });
        expect(status).toBe(200);
        expect(body.length).toBe(data[1]);
      });
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

  describe('GET /order/:id', () => {
    it('Should be able to return a customer order', async () => {
      const { status, body } = await makeGetRequest({
        endpoint: `${ENDPOINT}/${ORDER_ID}`,
        token: CUSTOMER_TOKEN,
      });
      expect(status).toBe(200);
      expect(body.status).toBe('Pending');
      expect(body.customer).toBe(CUSTOMER_LOGIN.name);
      expect(body.seller).toBe(SELLER_LOGIN.name);
      expect(body.products.length).toBe(NEW_ORDER.products.length);
      expect(body).toHaveProperty('saleDate');
      expect(body).toHaveProperty('totalPrice');
    });

    it('Should be able to return a seller order', async () => {
      const { status, body } = await makeGetRequest({
        endpoint: `${ENDPOINT}/${ORDER_ID}`,
        token: SELLER_TOKEN,
      });
      expect(status).toBe(200);
      expect(body.status).toBe('Pending');
      expect(body.customer).toBe(CUSTOMER_LOGIN.name);
      expect(body.seller).toBe(SELLER_LOGIN.name);
      expect(body.products.length).toBe(NEW_ORDER.products.length);
      expect(body).toHaveProperty('saleDate');
      expect(body).toHaveProperty('totalPrice');
    });

    it('Should not allow access without an authentication token', async () => {
      const { status, body } = await makeGetRequest({
        endpoint: `${ENDPOINT}/${ORDER_ID}`,
      });
      expect(status).toBe(401);
      expect(body.error).toBe('Invalid authentication token');
    });

    it('Should not allow access with an expired authentication token', async () => {
      const { status, body } = await makeGetRequest({
        endpoint: `${ENDPOINT}/${ORDER_ID}`,
        token: EXPIRED_TOKEN,
      });
      expect(status).toBe(401);
      expect(body.error).toBe('Your token has expired. Login again.');
    });
  });

  describe('PATCH /order/:id', () => {
    it('Should not allow access without an authentication token', async () => {
      const { status, body } = await makePatchRequest({
        endpoint: `${ENDPOINT}/${ORDER_ID}`,
      });
      expect(status).toBe(401);
      expect(body.error).toBe('Invalid authentication token');
    });

    it('Should not allow access with an expired authentication token', async () => {
      const { status, body } = await makePatchRequest({
        endpoint: `${ENDPOINT}/${ORDER_ID}`,
        token: EXPIRED_TOKEN,
      });
      expect(status).toBe(401);
      expect(body.error).toBe('Your token has expired. Login again.');
    });

    it('Should not be able to update status if order not found"', async () => {
      const { status, body } = await makePatchRequest({
        endpoint: `${ENDPOINT}/99`,
        token: SELLER_TOKEN,
        body: makeStatus('Preparing'),
      });
      console.log(body)
      expect(status).toBe(404);
      expect(body.error).toBe('Order not found');
    });

    it('Should not allow a customer to update the status for other than "Delivered"', async () => {
      ['Pending', 'Preparing', 'Moving'].forEach(async stat => {
        const { status, body } = await makePatchRequest({
          endpoint: `${ENDPOINT}/${ORDER_ID}`,
          token: CUSTOMER_TOKEN,
          body: makeStatus(stat as Status),
        });
        expect(status).toBe(403);
        expect(body.error).toBe('You are not allowed to perform this action');
      });
    });

    it('Should not allow a seller to update the status for "Delivered"', async () => {
      const { status, body } = await makePatchRequest({
        endpoint: `${ENDPOINT}/${ORDER_ID}`,
        token: SELLER_TOKEN,
        body: makeStatus('Delivered'),
      });
      expect(status).toBe(403);
      expect(body.error).toBe('You are not allowed to perform this action');
    });

    it('Should not be able to update the status out of the sequence "Pending"->"Preparing"->"Moving"->"Delivered"', async () => {
      [
        [SELLER_TOKEN, 'Moving'],
        [CUSTOMER_TOKEN, 'Delivered'],
      ].forEach(async data => {
        const { status, body } = await makePatchRequest({
          endpoint: `${ENDPOINT}/${ORDER_ID}`,
          token: data[0],
          body: makeStatus(data[1] as Status),
        });
        expect(status).toBe(400);
        expect(body.error).toBe('Incorrect status update attempt');
      });
    });

    it('Should allow a seller to update the status following the sequence "Pending"->"Preparing"->"Moving"', async () => {
      for (const stat of ['Preparing', 'Moving']) {
        const { status, body } = await makePatchRequest({
          endpoint: `${ENDPOINT}/${ORDER_ID}`,
          token: SELLER_TOKEN,
          body: makeStatus(stat as Status),
        });
        expect(status).toBe(200);
        expect(body.message).toBe('Order updated');

        const {
          body: { status: newStatus },
        } = await makeGetRequest({
          endpoint: `${ENDPOINT}/${ORDER_ID}`,
          token: SELLER_TOKEN,
        });
        expect(newStatus).toBe(stat);
      }
    });

    it('Should allow a customer to update the status for "Delivered"', async () => {
      const { status, body } = await makePatchRequest({
        endpoint: `${ENDPOINT}/${ORDER_ID}`,
        token: CUSTOMER_TOKEN,
        body: makeStatus('Delivered'),
      });
      expect(status).toBe(200);
      expect(body.message).toBe('Order updated');

      const {
        body: { status: newStatus },
      } = await makeGetRequest({
        endpoint: `${ENDPOINT}/${ORDER_ID}`,
        token: SELLER_TOKEN,
      });
      expect(newStatus).toBe('Delivered');
    });
  });
});
