import { app } from '../../../src/infra/App';
import request from 'supertest';

const makeHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
});

type MakeRequestParams = {
  endpoint: string;
  body: any;
  token?: string;
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
    role:"nothing" ,
    error: "\"role\" must be one of [customer, seller, admin]",
  },
  {
    role: 42,
    error: "\"role\" must be one of [customer, seller, admin]. \"Role\" should be a string",
  },
  {
    role: undefined,
    error: '"Role" is required',
  },
];

