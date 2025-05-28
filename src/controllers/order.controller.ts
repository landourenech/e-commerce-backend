import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { PaymentService } from '../services/payment.service';
import { OrderInput, OrderItemInput } from '../types/order';

const prisma = new PrismaClient();
const paymentService = new PaymentService();

export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderData = req.body as OrderInput;

    console.log('Received order data:', orderData);

    // Vérification des champs obligatoires pour les commandes anonymes
    const isAnonymous =
      !orderData.userId &&
      (!orderData.guestEmail || !orderData.guestName || !orderData.guestPhone);

    if (isAnonymous) {
      res.status(400).json({
        error:
          'Pour les commandes anonymes, les informations du client (email, nom, téléphone) sont obligatoires',
      });
      return;
    }

    // Si l'utilisateur est authentifié via authMiddleware, utiliser son ID
    const userId = req.user?.uid || orderData.userId;

    // Calcul du total
    const total = orderData.items.reduce(
      (acc: number, item: OrderItemInput) =>
        acc + item.price * item.quantity,
      0
    );

    // Création de la commande
    const order = await prisma.order.create({
      data: {
        ...(userId ? { userId } : {}),
        ...(orderData.guestEmail ? { guestEmail: orderData.guestEmail } : {}),
        ...(orderData.guestName ? { guestName: orderData.guestName } : {}),
        ...(orderData.guestPhone ? { guestPhone: orderData.guestPhone } : {}),
        total,
        orderItems: {
          create: orderData.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      } as any,
      include: {
        orderItems: true,
      },
    });

    console.log('Commande créée avec succès:', order);

    res.status(201).json({
      message: 'Commande créée avec succès',
      order,
    });
    return;
  } catch (error) {
    console.error('Erreur lors de la création de la commande:', error);
    return res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};

export const getUserOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({ error: 'userId est requis dans les paramètres' });
      return;
    }

    const orders = await prisma.order.findMany({
      where: { userId },
      include: { orderItems: true },
    });

    res.json(orders);
    return;
  } catch (error) {
    console.error('Erreur lors de la récupération des commandes:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
    return;
  }
};
