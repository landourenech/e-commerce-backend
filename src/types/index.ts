import { Request, Response } from 'express';

export interface AuthenticatedRequest extends Request {
  user: {
    email: string;
    uid: string;
    [key: string]: any;
  };
}

export interface RequestWithUser extends Request {
  user: {
    email: string;
    uid: string;
    [key: string]: any;
  };
}

export interface OrderItemInput {
  productId: string;
  quantity: number;
  price: number;
}

export interface CreateOrderRequest {
  userId: string;
  items: OrderItemInput[];
}
