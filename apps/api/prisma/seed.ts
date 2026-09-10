import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const perfumes = [
  { sku: 'FR-001', name: 'Bruma de Azahar', family: 'Floral', fam: 'floral',
    topNotes: 'Bergamota, pera', heartNotes: 'Azahar, jazmín', baseNotes: 'Almizcle blanco, cedro',
    description: 'Una apertura luminosa que se abre en flor de azahar y se asienta en un fondo cálido y limpio.',
    price: 18500, offerPrice: 15900, stock: 14, maxStock: 40 },
  { sku: 'FR-002', name: 'Cedro Imperial', family: 'Amaderado', fam: 'amaderado',
    topNotes: 'Pimienta rosa, cardamomo', heartNotes: 'Cedro, vetiver', baseNotes: 'Ámbar, cuero',
    description: 'Madera seca y especiada, pensada para uso de noche. Carácter sobrio y duradero.',
    price: 22000, offerPrice: null, stock: 6, maxStock: 30 },
  { sku: 'FR-003', name: 'Sal & Cítrico', family: 'Cítrico', fam: 'citrico',
    topNotes: 'Limón, mandarina', heartNotes: 'Albahaca, sal marina', baseNotes: 'Almizcle, madera de cachemira',
    description: 'Fresco y salino, ideal para el día. Estela liviana con un final amaderado sutil.',
    price: 16800, offerPrice: null, stock: 28, maxStock: 40 },
  { sku: 'FR-004', name: 'Ámbar Nocturno', family: 'Oriental', fam: 'oriental',
    topNotes: 'Canela, azafrán', heartNotes: 'Rosa turca, incienso', baseNotes: 'Ámbar, vainilla, pachulí',
    description: 'Denso y envolvente, con especias cálidas sobre un fondo ambarado profundo.',
    price: 24500, offerPrice: 19900, stock: 3, maxStock: 25 },
  { sku: 'FR-005', name: 'Vetiver Salvaje', family: 'Amaderado', fam: 'amaderado',
    topNotes: 'Pomelo, enebro', heartNotes: 'Vetiver, salvia', baseNotes: 'Musgo de roble, almizcle',
    description: 'Verde y terroso, con un vetiver protagonista de principio a fin.',
    price: 19900, offerPrice: null, stock: 19, maxStock: 35 },
  { sku: 'FR-006', name: 'Flor Blanca', family: 'Floral', fam: 'floral',
    topNotes: 'Mandarina', heartNotes: 'Tuberosa, jazmín sambac', baseNotes: 'Sándalo, almizcle',
    description: 'Floral blanco intenso y cremoso. Uno de los más buscados de la casa.',
    price: 21300, offerPrice: null, stock: 0, maxStock: 30 },
  { sku: 'FR-007', name: 'Brisa Marina', family: 'Fresco / Acuático', fam: 'fresco',
    topNotes: 'Notas acuáticas, mandarina', heartNotes: 'Geranio, lavanda', baseNotes: 'Cedro, ámbar gris',
    description: 'Acuático clásico, versátil para uso diario en cualquier estación.',
    price: 17400, offerPrice: null, stock: 24, maxStock: 40 },
  { sku: 'FR-008', name: 'Oud Real', family: 'Oriental', fam: 'oriental',
    topNotes: 'Azafrán, ciruela', heartNotes: 'Rosa, oud', baseNotes: 'Sándalo, cuero, incienso',
    description: 'Oud auténtico con rosa, para quienes buscan una fragancia de autor.',
    price: 27900, offerPrice: null, stock: 9, maxStock: 20 },
  { sku: 'FR-009', name: 'Pomelo & Vetiver', family: 'Cítrico', fam: 'citrico',
    topNotes: 'Pomelo, mandarina', heartNotes: 'Vetiver, romero', baseNotes: 'Musgo, ámbar',
    description: 'Cítrico seco con base amaderada. Ideal para climas cálidos.',
    price: 15900, offerPrice: 13500, stock: 31, maxStock: 40 },
  { sku: 'FR-010', name: 'Iris Terciopelo', family: 'Floral', fam: 'floral',
    topNotes: 'Bergamota', heartNotes: 'Iris, violeta', baseNotes: 'Almizcle, haba tonka',
    description: 'Polvoroso y elegante, con un iris aterciopelado de fondo.',
    price: 23600, offerPrice: null, stock: 12, maxStock: 30 },
];

const ingresos = [
  { name: 'Vainilla Bourbon', family: 'Oriental', fam: 'oriental', eta: 'Mediados de agosto',
    description: 'Vainilla cálida sobre una base ambarada, con un toque de ron añejo.' },
  { name: 'Higo & Musgo', family: 'Fresco / Acuático', fam: 'fresco', eta: 'Fin de agosto',
    description: 'Higo verde y musgo de roble, fresco pero con cuerpo.' },
  { name: 'Tabaco Dulce', family: 'Amaderado', fam: 'amaderado', eta: 'Principios de septiembre',
    description: 'Tabaco y miel sobre una base amaderada profunda, para uso de noche.' },
];

async function main() {
  console.log('Sembrando perfumes...');
  for (const p of perfumes) {
    await prisma.perfume.upsert({
      where: { sku: p.sku },
      update: p,
      create: p,
    });
  }

  console.log('Sembrando próximos ingresos...');
  await prisma.proximoIngreso.deleteMany();
  await prisma.proximoIngreso.createMany({ data: ingresos });

  console.log('Listo ✔');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
