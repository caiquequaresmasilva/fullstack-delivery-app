import prismaClient from '../../src/infra/database/prisma/prismaClient';
import {
  ORDER_ADDRESS_ERRORS,
  ORDER_NUMBER_ERRORS,
  ORDER_PRICE_ERRORS,
  ORDER_PRODUCTS_ERRORS,
  ORDER_SELLER_ERRORS,
  makeTestOrder,
} from '../mocks/orders';
import { EXPIRED_TOKEN, getLoginUserProps } from '../mocks/users';
import { makeGetRequest, makePostRequest } from './helpers';

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
    let NEW_ORDER: any;
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
        token: EXPIRED_TOKEN  
      });
      expect(status).toBe(401);
      expect(body.error).toBe('Your token has expired. Login again.');
    });
  });
});
