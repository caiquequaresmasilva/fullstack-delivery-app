import { randomUUID } from 'crypto';
import { User } from '../../../src/domain';

export type Role = 'customer' | 'seller' | 'admin';
type UserWithoutPassword = {
  id: string;
  name: string;
  email: string;
  role: Role;
  password: string;
};

export const EXPIRED_TOKEN =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIiLCJpYXQiOjE3MTE1NTY2NjIsImV4cCI6MTcxMTY0MzA2MiwiYXVkIjoiIiwic3ViIjoiIiwiaWQiOiJpZCIsIm5hbWUiOiJjdXN0b21lciIsImVtYWlsIjoiY3VzdG9tZXJAY3VzdG9tZXIuY29tIiwicm9sZSI6ImN1c3RvbWVyIn0.e9wC2lTAe-AEIQC94pNIMOHvlc4SDqWOspt5qvPlZf0';
export function generateId() {
  return randomUUID().toString();
}
export function makeUserProps(role: Role, id?: boolean) {
  return {
    id: id ? generateId() : '',
    name: role,
    email: `${role}@${role}.com`,
    password: `${role}${role.toUpperCase()}42`,
    role,
  };
}
export function makeTestUserBody(role: Role) {
  return {
    name: `Test ${role}`,
    email: `${role}.test@test.com`,
    password: `${role}TEST42`,
    role,
  };
}
export function makeUser(role: Role) {
  return {
    USER: new User(makeUserProps(role)),
    ID: {
      id: generateId(),
    },
  };
}

export function getLoginUserProps(role:Role){
  return {
    name: role[0].toUpperCase() + role.slice(1),
    email: `${role}@${role}.com`,
    password: `${role}${role.toUpperCase()}42`,
    role,
  };
}

export const USERS_NO_PASSWORD: UserWithoutPassword[] = [
  {
    id: generateId(),
    name: 'Customer',
    email: 'customer@customer.com',
    role: 'customer',
    password: '',
  },
  {
    id: generateId(),
    name: 'Seller',
    email: 'seller@seller.com',
    role: 'seller',
    password: '',
  },
];
