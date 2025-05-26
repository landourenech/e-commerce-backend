import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Creating test data...');
  
  // Créer une catégorie de test
  const category = await prisma.category.create({
    data: {
      name: 'Test Category',
      description: 'A test category for testing purposes'
    }
  });
  
  console.log('Created category:', category);
  
  // Créer un produit de test
  const product = await prisma.product.create({
    data: {
      name: 'Test Product',
      description: 'A test product for testing purposes',
      price: 100,
      imageUrl: 'https://example.com/test-product.jpg',
      category: {
        connect: {
          id: category.id
        }
      }
    }
  });
  
  console.log('Created product:', product);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
