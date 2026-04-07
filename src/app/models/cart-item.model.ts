export interface CartItem {
  productId: {
    _id: string;
    title: string;
    price: number;
    imageUrl?: string;
  };
  quantity: number;
}