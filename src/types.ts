export type CategoryType = 'parfums' | 'cosmetiques' | 'vetements' | 'sacs' | 'montres';

export interface Product {
  id: string;
  name: string;
  description: string;
  details?: string[];
  price: number;
  originalPrice?: number; // Used for promos
  category: CategoryType;
  image: string;
  inStock: boolean;
  rating: number;
  reviewsCount: number;
  tag?: 'Nouveau' | 'Promo' | 'Best Seller' | 'Exclusif';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderDetails {
  id: string;
  fullName: string;
  phone: string;
  city: string;
  address: string;
  notes?: string;
  items: CartItem[];
  total: number;
  paymentMethod: 'Paiement à la livraison';
  timestamp: string;
  status: 'pending' | 'preparation' | 'shipped' | 'delivered';
}
