import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { RequestWithUser } from '../types';

const prisma = new PrismaClient();

export const createTestProduct = async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.create({
      data: {
        name: 'Test Product',
        description: 'A test product for testing purposes',
        price: 100,
        imageUrl: 'https://example.com/test-product.jpg',
        categoryId: 'test-category-id'
      }
    });
    res.json(product);
  } catch (error) {
    console.error('Error creating test product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
