import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authMiddleware } from './middleware/auth.middleware';
import { createOrder, getUserOrders } from './controllers/order.controller';
import { createTestProduct } from './controllers/product.controller';
import { register, login } from './controllers/user.controller';
import { Request, Response } from 'express';
import { RequestWithUser } from './types';

// Déclarer le type global pour Express
declare global {
  namespace Express {
    interface Request {
      user: {
        email: string;
        uid: string;
        [key: string]: any;
      };
    }
  }
}

// Ajouter les types pour les fonctions de contrôleur
type RequestHandler = (req: Request, res: Response) => Promise<void>;

// Créer des wrappers pour les fonctions de contrôleur
const registerHandler: RequestHandler = async (req: Request, res: Response) => {
  await register(req, res);
};

const loginHandler: RequestHandler = async (req: Request, res: Response) => {
  await login(req, res);
};

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes protégées par Firebase Auth
app.post('/api/auth/register', registerHandler);
app.post('/api/auth/login', loginHandler);

app.post('/api/orders', authMiddleware, createOrder);
app.get('/api/orders/:userId', authMiddleware, getUserOrders);

// Routes de test
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is running' });
});

// Route de test pour créer un produit
app.post('/api/products/test', createTestProduct);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
