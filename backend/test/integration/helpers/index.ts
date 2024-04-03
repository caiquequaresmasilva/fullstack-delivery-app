import { app } from '../../../src/infra/App';
import request from 'supertest';
import { Role } from '../../mocks/users';

const makeHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
});

type MakeRequestParams = {
  endpoint: string;
  body?: any;
  token?: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
};

export async function makePostRequest({
  token,
  endpoint,
  body,
}: MakeRequestParams) {
  return request(app)
    .post(endpoint)
    .set(makeHeaders(token || ''))
    .send(body);
}

export async function makeGetRequest({ token, endpoint }: MakeRequestParams) {
  return request(app)
    .get(endpoint)
    .set(makeHeaders(token || ''));
}

export async function makeDeleteRequest({
  token,
  endpoint,
}: MakeRequestParams) {
  return request(app)
    .delete(endpoint)
    .set(makeHeaders(token || ''));
}

export async function makePatchRequest({
  token,
  endpoint,
  body,
}: MakeRequestParams) {
  return request(app)
    .patch(endpoint)
    .set(makeHeaders(token || ''))
    .send(body);
}

export const USER_NAME_ERRORS = [
  {
    name: 'i',
    error: '"Name" length must be at least 3 characters long',
  },
  {
    name: 42,
    error: '"Name" should be a string',
  },
  {
    name: undefined,
    error: '"Name" is required',
  },
];

export const USER_EMAIL_ERRORS = [
  {
    email: 42,
    error: '"Email" should be a string',
  },
  {
    email: undefined,
    error: '"Email" is required',
  },
  {
    email: 'invalidEmail@',
    error: '"Email" must be a valid email',
  },
];

export const USER_PASSWORD_ERRORS = [
  {
    password: 42,
    error: '"Password" should be a string',
  },
  {
    password: undefined,
    error: '"Password" is required',
  },
  {
    password: 'invalidpassword',
    error: '"Password" must be a valid password',
  },
];

export const USER_ROLE_ERRORS = [
  {
    role: 'nothing',
    error: '"role" must be one of [customer, seller, admin]',
  },
  {
    role: 42,
    error:
      '"role" must be one of [customer, seller, admin]. "Role" should be a string',
  },
  {
    role: undefined,
    error: '"Role" is required',
  },
];

export function getIdsToDelete(users: User[]) {
  const { id: customerId } = users.find(
    ({ email }) => email === `customer.test@test.com`,
  ) as User;
  const { id: sellerId } = users.find(
    ({ email }) => email === `seller.test@test.com`,
  ) as User;
  return { customerId, sellerId };
}
