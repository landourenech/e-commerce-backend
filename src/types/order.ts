export interface OrderItemInput {
  productId: string;
  quantity: number;
  price: number;
}

export interface OrderInput {
  items: OrderItemInput[];
  userId?: string;
  guestEmail?: string;
  guestName?: string;
  guestPhone?: string;
}
