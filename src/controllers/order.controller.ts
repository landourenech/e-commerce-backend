import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { PaymentService } from '../services/payment.service';
import { RequestWithUser, OrderItemInput } from '../types';

let prisma: PrismaClient;

try {
  prisma = new PrismaClient();
  console.log('Prisma client initialized successfully');
} catch (error) {
  console.error('Error initializing Prisma client:', error);
  throw error;
}

const paymentService = new PaymentService();

export const createOrder = async (req: RequestWithUser, res: Response) => {
  try {
    console.log('Request body:', req.body);
    console.log('User:', req.user);
    
    const { items } = req.body as { items: OrderItemInput[] };
    const userId = req.user.uid;
    
    console.log('Creating order with userId:', userId);
    console.log('Items:', items);
    
    // Calculer le total
    const total = items.reduce((acc: number, item: OrderItemInput) => acc + (item.price * item.quantity), 0);

    // Créer la commande dans la base de données
    const order = await prisma.order.create({
      data: {
        userId,
        total,
        orderItems: {
          create: items.map((item: OrderItemInput) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
          }))
        }
      }
    });

    console.log('Order created successfully:', order);
    res.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orders = await prisma.order.findMany({
      where: { userId }
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
