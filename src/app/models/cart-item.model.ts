export interface CartItem {
  _id: string;
  productId: {
    _id: string;
    title: string;
    price: number;
    imageUrl?: string;
  } | null;
  quantity: number;
}