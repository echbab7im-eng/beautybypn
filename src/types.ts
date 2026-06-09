export type CategoryType = 'parfums' | 'cosmetiques' | 'vetements' | 'sacs' | 'montres';

export interface Product {
  id: string;
  name: string;
  description: string;
  details?: string[];
  price: number;
  originalPrice?: number; // Used for promos
  category: CategoryType | string; // Enable flexible categories
  image: string;
  inStock: boolean;
  rating: number;
  reviewsCount: number;
  tag?: 'Nouveau' | 'Promo' | 'Best Seller' | 'Exclusif' | 'Viral TikTok' | 'Selection Beauté' | 'Selection Mode' | 'Idée Cadeau' | 'Offre Flash';
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
  shippingFee: number;
  discountApplied: number;
  couponCode?: string;
  paymentMethod: 'Paiement à la livraison';
  timestamp: string;
  status: 'pending' | 'preparation' | 'shipped' | 'delivered';
}

export interface CustomRequest {
  id: string;
  customerName: string;
  customerPhone: string;
  productName: string;
  productUrl?: string;
  description: string;
  colorSize?: string;
  quantity: number;
  imageUrl?: string;
  timestamp: string;
  status: 'pending' | 'searching' | 'found' | 'not_available' | 'ordered';
}

export interface Coupon {
  code: string;
  discount: number;
  type: 'percent' | 'fixed';
  minOrder?: number;
  active: boolean;
}

export interface CityFee {
  city: string;
  fee: number;
}

export interface ProductReview {
  id: string;
  productId: string;
  customerName: string;
  comment: string;
  rating: number;
  timestamp: string;
  approved: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  date: string;
  author: string;
  likes: number;
}
