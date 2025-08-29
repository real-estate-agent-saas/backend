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
      previewURL: null,
    },
    {
      name: 'modern',
      description: 'Template moderno com cores vibrantes',
      previewURL: null,
    },
    {
      name: 'classic',
      description: 'Template clássico e elegante',
      previewURL: null,
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

  //----------------------------------- Zones -----------------------------------

  const zones = ['Norte', 'Sul', 'Leste', 'Oeste', 'Centro'];

  for (const name of zones) {
    await prisma.zone.upsert({
      where: {
        name: name,
      },
      update: {},
      create: { name },
    });
  }

  console.log('Zonas criadas com sucesso');

  //----------------------------------- Leisure -----------------------------------
  const leisure = [
    'Academia',
    'Bar/Lounge',
    'Bicicletário',
    'Brinquedoteca',
    'Campo de Futebol',
    'Cat Place',
    'Churrasqueira',
    'Cinema',
    'Copa de Funcionários',
    'Coworking',
    'Crossfit',
    'Deck Molhado',
    'Elevador',
    'Escada Fitness',
    'Espaço Beauty',
    'Espaço Delivery',
    'Espaço gourmet',
    'Espaço Influencer',
    'Espaço kids',
    'Espaço para piqueniques',
    'Fire place',
    'Fitness Externo',
    'Forno de Pizza',
    'Garagem',
    'Hall de Entrada',
    'Horta',
    'Lavanderia',
    'Lounge',
    'Mercado 24hs',
    'Mini Mercado',
    'Mini Quadra',
    'Pet care',
    'Pet place',
    'Piscina',
    'Piscina adulto',
    'Piscina aquecida',
    'Piscina Coberta',
    'Piscina Infantil',
    'Playground',
    'Pomar',
    'Portaria',
    'Praça',
    'Praça de Leitura',
    'Praça do Fogo',
    'Private Pool House',
    'Quadra de Beach Tennis',
    'Quadra de Tênis',
    'Quadra Poliesportiva',
    'Quadra Recreativa',
    'Redário',
    'Rooftop',
    'Sala de leitura',
    'Sala de Massagem',
    'Sala de Reunião',
    'Salão de festas',
    'Salão de Jogos',
    'Salão de Jogos Adolescente',
    'Salão de Jogos Adulto',
    'Sauna',
    'Segurança',
    'Sky Lounge',
    'Solarium',
    'Spa',
    'Sports Bar',
    'Terraço',
    'Tomada para carro elétrico',
  ];

  for (const name of leisure) {
    await prisma.leisure.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log('Leisure criados com sucesso');

  //----------------------------------- States -----------------------------------
const states = [
  {
    name: "Acre",
    UF: "AC"
  },
  {
    name: "Alagoas",
    UF: "AL"
  },
  {
    name: "Amapá",
    UF: "AP"
  },
  {
    name: "Amazonas",
    UF: "AM"
  },
  {
    name: "Bahia",
    UF: "BA"
  },
  {
    name: "Ceará",
    UF: "CE"
  },
  {
    name: "Distrito Federal",
    UF: "DF"
  },
  {
    name: "Espírito Santo",
    UF: "ES"
  },
  {
    name: "Goiás",
    UF: "GO"
  },
  {
    name: "Maranhão",
    UF: "MA"
  },
  {
    name: "Mato Grosso",
    UF: "MT"
  },
  {
    name: "Mato Grosso do Sul",
    UF: "MS"
  },
  {
    name: "Minas Gerais",
    UF: "MG"
  },
  {
    name: "Pará",
    UF: "PA"
  },
  {
    name: "Paraíba",
    UF: "PB"
  },
  {
    name: "Paraná",
    UF: "PR"
  },
  {
    name: "Pernambuco",
    UF: "PE"
  },
  {
    name: "Piauí",
    UF: "PI"
  },
  {
    name: "Rio de Janeiro",
    UF: "RJ"
  },
  {
    name: "Rio Grande do Norte",
    UF: "RN"
  },
  {
    name: "Rio Grande do Sul",
    UF: "RS"
  },
  {
    name: "Rondônia",
    UF: "RO"
  },
  {
    name: "Roraima",
    UF: "RR"
  },
  {
    name: "Santa Catarina",
    UF: "SC"
  },
  {
    name: "São Paulo",
    UF: "SP"
  },
  {
    name: "Sergipe",
    UF: "SE"
  },
  {
    name: "Tocantins",
    UF: "TO"
  },
];

for(const state of states){
  await prisma.state.upsert({
    where: {name: state.name, UF: state.UF},
    update: {},
    create: state
  });
}

  console.log('States criados com sucesso');
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