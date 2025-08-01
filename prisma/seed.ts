import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Semente para criar especialidades no banco de dados
async function seed() {
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

  // Verifica se as especialidades já existem e as cria se não existirem
  for (const name of specialties) {
    await prisma.specialty.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log('Specialties criadas com sucesso!');
}

// Executa a função principal e captura possíveis erros
seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
