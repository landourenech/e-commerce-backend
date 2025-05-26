import { Request, Response, NextFunction } from 'express';
import { RequestWithUser } from '../types';

export const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  // Pour les tests, on simule un utilisateur
  if (!req.user) {
    req.user = {
      email: 'test@example.com',
      uid: 'test-user-id'
    };
  }
  next();
};
