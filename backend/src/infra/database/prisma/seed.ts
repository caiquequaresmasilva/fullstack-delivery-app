import { PrismaClient } from '@prisma/client';
import { BcryptHashManager } from '../../adapters';
const prisma = new PrismaClient()
const hash = new BcryptHashManager()

async function main() {
  await prisma.deliveryProduct.createMany({
    data: [
      {
        name: 'Skol Lata 250ml',
        price: 2.2,
        imagePath: '/images/skol_lata_350ml.jpg',
      },
      {
        name: 'Heineken 600ml',
        price: 7.5,
        imagePath: '/images/heineken_600ml.jpg',
      },
      {
        name: 'Antarctica Pilsen 300ml',
        price: 2.49,
        imagePath: '/images/antarctica_pilsen_300ml.jpg',
      },
      {
        name: 'Brahma 600ml',
        price: 7.5,
        imagePath: '/images/brahma_600ml.jpg',
      },
      {
        name: 'Skol 269ml',
        price: 2.19,
        imagePath: '/images/skol_269ml.jpg',
      },
      {
        name: 'Skol Beats Senses 313ml',
        price: 4.49,
        imagePath: '/images/skol_beats_senses_313ml.jpg',
      },
      {
        name: 'Becks 330ml',
        price: 4.99,
        imagePath: '/images/becks_330ml.jpg',
      },
      {
        name: 'Brahma Duplo Malte 350ml',
        price: 2.79,
        imagePath: '/images/brahma_duplo_malte_350ml.jpg',
      },
      {
        name: 'Becks 600ml',
        price: 8.89,
        imagePath: '/images/becks_600ml.jpg',
      },
      {
        name: 'Skol Beats Senses 269ml',
        price: 3.57,
        imagePath: '/images/skol_beats_senses_269ml.jpg',
      },
      {
        name: 'Stella Artois 275ml',
        price: 3.49,
        imagePath: '/images/stella_artois_275ml.jpg',
      },
    ],
  });

  await prisma.deliveryUser.createMany({
    data: [
      {
        name: 'Admin',
        email: 'admin@admin.com',
        role: 'admin',
        password: (await hash.generate("adminADMIN42"))
      },
      {
        name: 'Customer',
        email: 'customer@customer.com',
        role: 'customer',
        password: (await hash.generate("customerCUSTOMER42"))
      },
      {
        name: 'Seller',
        email: 'seller@seller.com',
        role: 'seller',
        password: (await hash.generate("sellerSELLER42"))
      }
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
