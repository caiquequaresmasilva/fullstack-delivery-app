import { PrismaClient } from '@prisma/client';
export const prismaClient = new PrismaClient();

// CREATE ORDER
// async function create() {
//   console.log("CREATING...")
//   const order = await prismaClient.deliveryOrder.create({
//     data: {
//       customerId: '01c46e59-b2aa-40ba-b0f8-63e6b3773cea',
//       sellerId: '3a0d0fec-d114-4d1d-9018-edd0befd18a4',
//       deliveryAddress: 'Rua 24 de fevereiro',
//       deliveryNumber: '204',
//       totalPrice: 29.47,
//       products: {
//         createMany: {
//           data: [
//             {
//               productId: '4db4a6bf-27ef-430c-89fc-d04e7193f54e',
//               quantity: 2,
//             },
//             {
//               productId: 'c108160e-37ce-4c43-b50f-4e44d9178d53',
//               quantity: 4,
//             },
//             {
//               productId: '853072dd-3324-4203-9193-bf42cf14e852',
//               quantity: 6,
//             },
//           ],
//         },
//       },
//     },
//     include: {
//       products: true,
//       customer: true,
//       seller: true,
//     },
//   });
//   console.log("CREATED")
//   console.log(order)
// }

// create()
//   .then(async () => {
//     await prismaClient.$disconnect();
//   })
//   .catch(async e => {
//     console.error(e);
//     await prismaClient.$disconnect();
//     process.exit(1);
//   });

// GET ORDERS
// async function getOrders() {
//   console.log('SEARCHING...');
//   const order = await prismaClient.deliveryOrder.findMany({
//     where: {
//       customerId: '01c46e59-b2aa-40ba-b0f8-63e6b3773cea',
//     },
//     select: {
//       id: true,
//       totalPrice: true,
//       deliveryAddress: true,
//       deliveryNumber: true,
//       saleDate: true,
//       status: true,
//     },
//   });
//   console.log('FOUND');
//   console.log(order);
// }

// getOrders()
//   .then(async () => {
//     await prismaClient.$disconnect();
//   })
//   .catch(async e => {
//     console.error(e);
//     await prismaClient.$disconnect();
//     process.exit(1);
//   });

// GET ORDER
// async function getOrder() {
//   console.log('SEARCHING...');
//   const order = await prismaClient.deliveryOrder.findUnique({
//     where: {
//       id: 1,
//       sellerId: "sfsdfaf"
//     },
//     select: {
//       totalPrice: true,
//       saleDate: true,
//       status: true,
//       products: {
//         select: {
//           quantity: true,
//           product: {
//             select: {
//               name: true,
//               price: true,
//             },
//           },
//         },
//       },
//       customer: {
//         select: {
//           name: true,
//         },
//       },
//       seller: {
//         select: {
//           name: true,
//         },
//       },
//     },
//   });
//   console.log('FOUND');
//   console.log(order[0].products);
// }

// getOrder()
//   .then(async () => {
//     await prismaClient.$disconnect();
//   })
//   .catch(async e => {
//     console.error(e);
//     await prismaClient.$disconnect();
//     process.exit(1);
//   });

// UPDATE STATUS

// async function updateStatus() {
//   console.log('UPDATING...');
//   const order = await prismaClient.deliveryOrder.update({
//     where: {
//       id: '96e54b03-1cc8-41b1-82ba-a1600c485288',
//     },
//     data: {
//       status: 'Preparing'
//     }
//   });
//   console.log('UPDATED');
//   console.log(order);
// }

// updateStatus()
//   .then(async () => {
//     await prismaClient.$disconnect();
//   })
//   .catch(async e => {
//     console.error(e);
//     await prismaClient.$disconnect();
//     process.exit(1);
//   });
