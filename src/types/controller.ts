import { Request, Response } from 'express';
import { RequestWithUser } from './index';

export interface Controller {
  [key: string]: (req: RequestWithUser, res: Response) => Promise<void>;
}

export type OrderController = Controller;
