import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Seed to populate database
async function seed() {
  //----------------------------------- Delivery Status -----------------------------------
  const deliveryStatus = [
    'Pronto',
    'Vendido',
    'Em Obras',
    'Lançamento',
    'Breve Lançamento',
    'Futuro Lançamento',
  ];

  for (const name of deliveryStatus) {
    await prisma.deliveryStatus.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }
  console.log('Status de entrega criados com sucesso!');

  //----------------------------------- Property Type -----------------------------------
  const propertyType = [
    'Apartamento',
    'Casa',
    'Sobrado',
    'Terreno',
    'Comercial',
    'Industrial',
  ];

  for (const name of propertyType) {
    await prisma.propertyType.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }
  console.log('Tipos de propriedade criados com sucesso!');

  //----------------------------------- Property Purpose -----------------------------------
  const propertyPurpose = [
    'Venda',
    'Locação',
    'Arrendamento',
    'Temporada',
    'Permuta',
    'Leilão',
  ];

  for (const name of propertyPurpose) {
    await prisma.propertyPurpose.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log('Finalidades de propriedade criadas com sucesso!');

  //----------------------------------- Property Standing -----------------------------------
  const propertyStanding = [
    'Popular',
    'Médio Padrão',
    'Alto Padrão',
    'Altíssimo Padrão',
  ];

  for (const name of propertyStanding) {
    await prisma.propertyStanding.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log('Porte de propriedade criadas com sucesso!');

  //----------------------------------- Property Typology -----------------------------------
  const propertyTypology = [
    'Studio',
    'Garden',
    'Duplex',
    'Triplex',
    'Cobertura',
    'Kitnet',
    'Penthouse',
    'Loft',
    'Flat',
    'Townhouse',
    'Casa Térrea',
    'Sobrado',
    'Chalet',
    'Vila',
    'Bangalo',
    'Casa de Campo',
    'Fazenda',
    'Sitio',
    'Chacara',
    'Galpão',
    'Sala Comercial',
    'Loja',
    'Andar Corporativo',
    'Terreno',
    'Loteamento',
  ];

  for (const name of propertyTypology) {
    await prisma.propertyTypology.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log('Tipologias de propriedade criadas com sucesso!');

  //----------------------------------- Specialties -----------------------------------
  const specialties = [
    'Residencial',
    'Comercial',
    'Imóveis Alto Padrão',
    'Investimentos Imobiliários',
    'Avaliação de Imóveis',
    'Captação de Imóveis',
    'Prospecção de Área',
    'Gestão de Fundos Imobiliários',
    'Administrador de Imóveis',
    'Imóveis Rurais',
    'Lançamento de Empreendimentos',
    'Mercado Internacional',
  ];

  for (const name of specialties) {
    await prisma.specialty.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log('Especialidades criadas com sucesso!');

  //----------------------------------- Templates -----------------------------------
  const templates = [
    {
      name: 'default',
      description:
        'Template padrão para novos usuários no estilo Diana Imóveis',
      previewUrl: null,
    },
    {
      name: 'modern',
      description: 'Template moderno com cores vibrantes',
      previewUrl: null,
    },
    {
      name: 'classic',
      description: 'Template clássico e elegante',
      previewUrl: null,
    },
  ];

  for (const template of templates) {
    await prisma.template.upsert({
      where: { name: template.name, description: template.description },
      update: {},
      create: template,
    });
  }

  console.log('Templates criados com sucesso!');

  //----------------------------------- Templates -----------------------------------

  const zones = ['Norte', 'Sul', 'Leste', 'Oeste', 'Centro'];

  for (const name of zones) {
    await prisma.zone.upsert({
      where: {
        name: name
      },
      update: {},
      create: { name }
    });
  }

  console.log("Zonas criadas com sucesso")
}

// Executes the seed (Terminal command: npx prisma db seed)
seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
