import { Decimal } from '@prisma/client/runtime/library';
import { generateId } from '../users';
import { DeliveryStatus } from '@prisma/client';

type Status = 'Pending' | 'Preparing' | 'Moving' | 'Delivered';
type Product = {
  id: string;
  name: string;
  imagePath: string;
  price: string;
};
type RawProduct = {
  id: string;
  quantity: number;
};
export function makeOrder() {
  const details = {
    customerId: generateId(),
    sellerId: generateId(),
    deliveryAddress: 'Rua delivery address',
    deliveryNumber: '42',
    saleDate: new Date(),
    status: DeliveryStatus.Pending,
  };
  return {
    RAW_ORDER: {
      ...details,
      totalPrice: 19.99,
    },
    DB_ORDER: {
      ...details,
      totalPrice: new Decimal(19.99),
    },
    RAW_PRODUCTS: [
      {
        id: generateId(),
        quantity: 1,
      },
      {
        id: generateId(),
        quantity: 2,
      },
      {
        id: generateId(),
        quantity: 3,
      },
    ],
    ID: {
      id: 1,
    },
  };
}

export const DB_ORDERS = [
  {
    id: 1,
    customerId: generateId(),
    sellerId: generateId(),
    status: DeliveryStatus.Pending,
    saleDate: new Date(),
    deliveryAddress: 'Delivery address 1',
    deliveryNumber: '42',
    totalPrice: new Decimal(19.99),
  },
  {
    id: 2,
    customerId: generateId(),
    sellerId: generateId(),
    status: DeliveryStatus.Pending,
    saleDate: new Date(),
    deliveryAddress: 'Delivery address 2',
    deliveryNumber: '42',
    totalPrice: new Decimal(29.99),
  },
  {
    id: 3,
    customerId: generateId(),
    sellerId: generateId(),
    status: DeliveryStatus.Pending,
    saleDate: new Date(),
    deliveryAddress: 'Delivery address 3',
    deliveryNumber: '42',
    totalPrice: new Decimal(9.99),
  },
];

export const DB_FULL_ORDER = {
  id: 1,
  customerId: generateId(),
  sellerId: generateId(),
  totalPrice: new Decimal(19.99),
  saleDate: new Date(),
  status: DeliveryStatus.Pending,
  deliveryAddress: 'Delivery address 1',
  deliveryNumber: '42',
  customer: {
    name: 'Customer',
  },
  seller: {
    name: 'Seller',
  },
  products: [
    {
      quantity: 1,
      product: {
        name: 'Skol Lata 250ml',
        price: new Decimal(2.2),
      },
    },
    {
      quantity: 2,
      product: {
        name: 'Heineken 600ml',
        price: new Decimal(7.5),
      },
    },
    {
      quantity: 3,
      product: {
        name: 'Antarctica Pilsen 300ml',
        price: new Decimal(2.49),
      },
    },
  ],
};

export const DOMAIN_FULL_ORDER = {
  totalPrice: DB_FULL_ORDER.totalPrice,
  saleDate: DB_FULL_ORDER.saleDate,
  status: DB_FULL_ORDER.status,
  customer: 'Customer',
  seller: 'Seller',
  products: DB_FULL_ORDER.products.map(
    ({ quantity, product: { name, price } }) => ({
      name,
      price,
      quantity,
    }),
  ),
};

const makeProductsArray = async (products: Product[]) => {
  const rawProducts: RawProduct[] = [];
  const n = products.length;
  let totalPrice = 0;
  let previousIndex = -1;
  let index = 1;
  while (index <= 3) {
    const randomIndex = Math.floor(Math.random() * n);
    if (randomIndex !== previousIndex) {
      rawProducts.push({
        id: products[randomIndex].id,
        quantity: index,
      });
      totalPrice += Number(products[randomIndex].price) * index;
      previousIndex = randomIndex;
      index++;
    }
  }
  return {
    products: rawProducts,
    totalPrice,
  };
};

export async function makeTestOrder(sellerId: string, dbProducts: Product[]) {
  const { products, totalPrice } = await makeProductsArray(dbProducts);
  return {
    sellerId,
    deliveryAddress: 'Rua Integration Test',
    deliveryNumber: '42',
    totalPrice,
    products,
  };
}

export const ORDER_SELLER_ERRORS = [
  {
    sellerId: 42,
    error: '"sellerId" should be a string',
  },
  {
    sellerId: undefined,
    error: '"sellerId" is required',
  },
  {
    sellerId: 'notUUID',
    error: '"sellerId" must be a valid uuid',
  },
];

export const ORDER_ADDRESS_ERRORS = [
  {
    deliveryAddress: 42,
    error: '"deliveryAddress" should be a string',
  },
  {
    deliveryAddress: undefined,
    error: '"deliveryAddress" is required',
  },
];

export const ORDER_NUMBER_ERRORS = [
  {
    deliveryNumber: 42,
    error: '"deliveryNumber" should be a string',
  },
  {
    deliveryNumber: undefined,
    error: '"deliveryNumber" is required',
  },
];

export const ORDER_PRICE_ERRORS = [
  {
    totalPrice: 'NotNumber',
    error: '"totalPrice" should be a number',
  },
  {
    totalPrice: -1,
    error: '"totalPrice" must be positive',
  },
  {
    totalPrice: undefined,
    error: '"totalPrice" is required',
  },
];

export const ORDER_PRODUCTS_ERRORS = [
  {
    products: undefined,
    error: '"products" is required',
  },
  {
    products: 42,
    error: '"products" must be an array',
  },
  {
    products: ['error'],
    error: '"products[0]" must be of type object',
  },
  {
    products: [],
    error: 'The list of products is empty',
  },
];
