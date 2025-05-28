import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { RequestWithUser } from '../types';

const prisma = new PrismaClient();

export const createTestProduct = async (req: Request, res: Response) => {
  try {
    // Créer une catégorie de test
    const category = await prisma.category.create({
      data: {
        name: 'Test Category',
        description: 'A test category for testing purposes'
      }
    });

    // Créer le produit avec la catégorie créée
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

    res.json(product);
  } catch (error) {
    console.error('Error creating test product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
