import { Decimal } from "@prisma/client/runtime/library";

export const DB_PRODUCTS = [
  {
    id: "uuid1",
    name: 'Skol Lata 250ml',
    price: new Decimal(2.2),
    imagePath: '/images/skol_lata_350ml.jpg',
  },
  {
    id: "uuid2",
    name: 'Heineken 600ml',
    price: new Decimal(7.5),
    imagePath: '/images/heineken_600ml.jpg',
  },
  {
    id: "uuid3",
    name: 'Antarctica Pilsen 300ml',
    price: new Decimal(2.49),
    imagePath: '/images/antarctica_pilsen_300ml.jpg',
  },
  {
    id: "uuid4",
    name: 'Brahma 600ml',
    price: new Decimal(7.5),
    imagePath: '/images/brahma_600ml.jpg',
  },
  {
    id: "uuid5",
    name: 'Skol 269ml',
    price: new Decimal(2.19),
    imagePath: '/images/skol_269ml.jpg',
  },
  {
    id: "uuid6",
    name: 'Skol Beats Senses 313ml',
    price: new Decimal(4.49),
    imagePath: '/images/skol_beats_senses_313ml.jpg',
  },
  {
    id: "uuid7",
    name: 'Becks 330ml',
    price: new Decimal(4.99),
    imagePath: '/images/becks_330ml.jpg',
  },
  {
    id: "uuid8",
    name: 'Brahma Duplo Malte 350ml',
    price: new Decimal( 2.79),
    imagePath: '/images/brahma_duplo_malte_350ml.jpg',
  },
  {
    id: "uuid9",
    name: 'Becks 600ml',
    price: new Decimal(8.89),
    imagePath: '/images/becks_600ml.jpg',
  },
  {
    id: "uuid10",
    name: 'Skol Beats Senses 269ml',
    price: new Decimal(3.57),
    imagePath: '/images/skol_beats_senses_269ml.jpg',
  },
  {
    id: "uuid11",
    name: 'Stella Artois 275ml',
    price: new Decimal(3.57),
    imagePath: '/images/stella_artois_275ml.jpg',
  },
];
