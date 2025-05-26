import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { RequestWithUser } from '../types';

const prisma = new PrismaClient();

export const register = async (req: Request<{}, {}, { email: string; password: string }>, res: Response) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Créer l'utilisateur dans la base de données
    const user = await prisma.user.create({
      data: {
        email,
        role: 'CLIENT',
        id: 'test-user-id'
      }
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const login = async (req: Request<{}, {}, { email: string; password: string }>, res: Response) => {
  try {
    const { email, password } = req.body;

    // Générer un token de test
    const token = 'test-token';

    res.json({
      token,
      user: {
        email,
        uid: 'test-user-id'
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(401).json({ error: 'Invalid credentials' });
  }
};
