import { randomUUID } from 'crypto';
import { User } from '../../../src/domain';

type Role = 'customer' | 'seller' | 'admin';
type UserWithoutPassword = {
  id: string,
  name: string,
  email: string,
  role: Role,
  password: string
}
export function generateId(){
  return randomUUID().toString()
}
export function makeUserProps(role: Role, id?: boolean){
  return {
    id: id ? generateId(): '',
    name: role,
    email: `${role}@${role}.com`,
    password: `${role}${role.toUpperCase()}42`,
    role,
  };
}
export function makeUser(role: Role){
  return {
    USER: new User(makeUserProps(role)),
    ID: {
      id: generateId(),
    },
  };
}

export const USERS_NO_PASSWORD: UserWithoutPassword[] = [
  {
    id: generateId(),
    name: 'Customer',
    email: 'customer@customer.com',
    role: 'customer',
    password: ''
  },
  {
    id: generateId(),
    name: 'Seller',
    email: 'seller@seller.com',
    role: 'seller',
    password: ''
  }
]