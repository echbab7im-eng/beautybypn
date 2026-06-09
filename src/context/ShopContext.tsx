import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, CartItem, OrderDetails, CategoryType, 
  CustomRequest, Coupon, CityFee, ProductReview, BlogPost 
} from '../types';
import { PRODUCTS } from '../data/products';

export type ActiveView = 
  | 'home' 
  | 'shop' 
  | 'promotions' 
  | 'contact' 
  | 'checkout' 
  | 'orders' 
  | 'admin' 
  | 'tracking' 
  | 'custom-request' 
  | 'blog' 
  | 'policies';

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  orders: OrderDetails[];
  activeView: ActiveView;
  selectedCategory: string;
  searchQuery: string;
  sortBy: string;
  selectedProduct: Product | null;
  notification: { message: string; type: 'success' | 'info' } | null;
  
  // Sourcing Custom Requests
  customRequests: CustomRequest[];
  addCustomRequest: (request: Omit<CustomRequest, 'id' | 'timestamp' | 'status'>) => CustomRequest;
  updateCustomRequestStatus: (id: string, status: CustomRequest['status']) => void;
  deleteCustomRequest: (id: string) => void;

  // Coupon management
  coupons: Coupon[];
  addCoupon: (coupon: Coupon) => void;
  toggleCouponStatus: (code: string) => void;
  deleteCoupon: (code: string) => void;

  // Shipping & City Fees
  cityFees: CityFee[];
  freeShippingThreshold: number;
  updateCityFee: (city: string, fee: number) => void;
  addCityFee: (cityFee: CityFee) => void;
  deleteCityFee: (city: string) => void;
  updateFreeShippingThreshold: (value: number) => void;

  // Reviews System
  productReviews: ProductReview[];
  addReview: (review: Omit<ProductReview, 'id' | 'timestamp' | 'approved'>) => void;
  approveReview: (reviewId: string) => void;
  deleteReview: (reviewId: string) => void;

  // Blog System
  blogPosts: BlogPost[];
  addBlogPost: (post: Omit<BlogPost, 'id' | 'date' | 'likes'>) => void;
  likeBlogPost: (postId: string) => void;
  deleteBlogPost: (postId: string) => void;

  // Categories list
  categories: string[];
  addCategory: (categoryName: string) => void;
  deleteCategory: (categoryName: string) => void;

  // Navigation actions
  navigateTo: (view: ActiveView, category?: string) => void;
  setSelectedCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sort: string) => void;
  setSelectedProduct: (product: Product | null) => void;
  
  // Cart actions
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  
  // Wishlist actions
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // Order actions
  placeOrder: (orderDetails: Omit<OrderDetails, 'id' | 'status' | 'items' | 'timestamp'>) => OrderDetails;
  updateOrderStatus: (orderId: string, status: OrderDetails['status']) => void;
  
  // Notification actions
  showNotification: (message: string, type?: 'success' | 'info') => void;
  hideNotification: () => void;

  // Admin and Product management actions
  addProduct: (product: Omit<Product, 'id' | 'rating' | 'reviewsCount'>) => void;
  updateProductStock: (productId: string, inStock: boolean) => void;
  updateProduct: (productId: string, updatedProduct: Partial<Product>) => void;
  deleteProduct: (productId: string) => void;
  resetProducts: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

// Initial Categories
const DEFAULT_CATEGORIES = ['parfums', 'cosmetiques', 'vetements', 'sacs', 'montres'];

// Initial City Fees for Morocco
const DEFAULT_CITY_FEES: CityFee[] = [
  { city: 'Casablanca', fee: 20 },
  { city: 'Rabat', fee: 35 },
  { city: 'Marrakech', fee: 35 },
  { city: 'Fès', fee: 35 },
  { city: 'Tanger', fee: 40 },
  { city: 'Meknès', fee: 35 },
  { city: 'Agadir', fee: 40 },
  { city: 'Oujda', fee: 45 },
  { city: 'Kénitra', fee: 35 },
  { city: 'Tétouan', fee: 40 },
  { city: 'Autre Ville...', fee: 45 }
];

// Initial Coupons
const DEFAULT_COUPONS: Coupon[] = [
  { code: 'PND10', discount: 10, type: 'percent', minOrder: 150, active: true },
  { code: 'BIENVENUE50', discount: 50, type: 'fixed', minOrder: 350, active: true },
  { code: 'VIP15', discount: 15, type: 'percent', minOrder: 500, active: true }
];

// Initial custom product sourcing requests (simulated logs)
const DEFAULT_CUSTOM_REQUESTS: CustomRequest[] = [
  {
    id: 'REQ-481923',
    customerName: 'Samira Alami',
    customerPhone: '0661985472',
    productName: 'Sac Cabas Dior Book Tote brodé',
    productUrl: 'https://www.dior.com/fr_fr/fashion/products/M1286ZRIW_M928',
    description: 'Une réplique de très haute couture avec broderie bleue, couleur beige de préférence.',
    colorSize: 'Moyen (Taille M)',
    quantity: 1,
    imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=600',
    timestamp: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(),
    status: 'searching'
  },
  {
    id: 'REQ-104928',
    customerName: 'Kenza Benjelloun',
    customerPhone: '0654871239',
    productName: 'Mascara Maybelline Lash Sensational Sky High',
    description: 'Le mascara de couleur noire waterproof très viral sur TikTok. Impossible à trouver en parapharmacie locale.',
    colorSize: 'Noir Intense - Waterproof',
    quantity: 2,
    imageUrl: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=600',
    timestamp: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    status: 'pending'
  }
];

// Initial reviews
const DEFAULT_REVIEWS: ProductReview[] = [
  {
    id: 'REV-01',
    productId: 'parfum-01',
    customerName: 'Amina El Mansouri',
    comment: 'L\'odeur est tout simplement céleste et tient toute la journée ! Tout le monde me demande ce que je porte. Je recommande vivement !! 😍',
    rating: 5,
    timestamp: new Date(Date.now() - 4 * 24 * 3600 * 1000).toISOString(),
    approved: true
  },
  {
    id: 'REV-02',
    productId: 'cosme-01',
    customerName: 'Layla S.',
    comment: 'Je l’applique tous les soirs, ma peau est visiblement plus hydratée et douce au réveil. Une pépite !',
    rating: 5,
    timestamp: new Date(Date.now() - 6 * 24 * 3600 * 1000).toISOString(),
    approved: true
  },
  {
    id: 'REV-03',
    productId: 'sac-01',
    customerName: 'Merieme B.',
    comment: 'Très joli sac, finitions soignées. Le service client m\'a même appelée sur WhatsApp avant la livraison. Au top !',
    rating: 4,
    timestamp: new Date(Date.now() - 10 * 24 * 3600 * 1000).toISOString(),
    approved: true
  }
];

// Initial Blog posts
const DEFAULT_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: '5 Conseils d\'Experts pour Faire Tenir votre Parfum Toute la Journée',
    excerpt: 'Optimisez la longévité de vos parfums haut de gamme grâce à ces rituels simples d\'application sur les zones de pulsation.',
    content: `Un parfum de luxe est un investissement personnel. Pourtant, il nous arrive souvent de ne plus le sentir après seulement quelques heures. Voici 5 méthodes scientifiquement prouvées pour maximiser son sillage :

1. **Hydratez votre peau au préalable** : Les parfums adhèrent beaucoup mieux sur une peau hydratée. Appliquez une lotion de corps neutre ou de la vaseline sur vos zones cibles (poignets, cou) avant de vaporiser.
2. **Vaporisez sur les points de pulsation** : Là où la barrière cutanée est la plus chaude (derrière les oreilles, à la base du cou, à l'intérieur des coudes, et sur les poignets). La chaleur corporelle aide à diffuser l'arôme naturellement tout au long de la journée.
3. **Ne frottez jamais vos poignets** : Le frottement crée des frictions thermiques qui dénaturent les molécules délicates des notes de tête (notamment les agrumes et les fleurs légères) et raccourcit la durée globale de vie du parfum.
4. **Parfumez vos vêtements et vos cheveux** : Les fibres textiles et capillaires retiennent extrêmement bien les essences. Vaporisez votre brume sur votre brosse à cheveux ou directement sur votre veste pour un effet sillage enivrant.
5. **Conservez vos flacons à l'abri** : L'humidité de la salle de bain et la lumière directe du soleil détruisent les huiles essentielles parfumées. Rangez vos flacons préférés dans votre dressing ou dans leur boîte d'origine. `,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600',
    category: 'Parfumerie',
    date: '2026-06-05',
    author: 'Equipe BeautyByPND',
    likes: 42
  },
  {
    id: 'blog-2',
    title: 'La Routine Soins Minimaliste Anti-Imperfections pour l\'Été',
    excerpt: 'Décryptage de la routine secrète avec l\'incroyable sélection Deliplus de Mercadona et des astuces régénératrices.',
    content: `En été, sous l'effet de la chaleur et de l'humidité, la peau produit plus de sébum. Superposer des dizaines de cosmétiques lourds bouche les pores et provoque des imperfections. Adoptez cette routine minimaliste en 3 étapes clefs :

### Étape 1 : Le Double Nettoyage Doux
Utilisez d'abord une huile ou un baume nettoyant pour dissoudre le sébum oxydé et les filtres solaires, puis terminez avec un gel moussant doux au pH neutre. Un bon nettoyage constitue 80% de l'éclat de votre peau.

### Étape 2 : L'Huile de Rose Musquée Deliplus (Mercadona)
Véritable star cutanée espagnole, l'huile de Rose Musquée est un régénérant tissulaire magique. Appliquez quelques gouttes le soir. Elle va unifier le teint, atténuer les taches de soleil et réguler naturellement la barrière hydrolipidique.

### Étape 3 : L'Hydratation scellante légère
Une crème fluide à base d'acide hyaluronique ou d'extraits d'olive vierge pour retenir l'eau cutanée sans obstruer. N'oubliez jamais votre protection SPF 50 en journée, c'est le meilleur anti-âge au monde !`,
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=600',
    category: 'Cosmétiques',
    date: '2026-06-08',
    author: 'Yasmine Bensouda',
    likes: 56
  },
  {
    id: 'blog-3',
    title: 'Inspirations Mode SHEIN : Comment s\'habiller chic à petit prix ?',
    excerpt: 'Découvrez nos pièces coups de cœur et techniques d\'assemblage pour un rendu haute-couture digne des défilés.',
    content: `S'habiller de manière somptueuse et élégante ne requiert pas un budget exorbitant. La collection SHEIN regorge de pépites intemporelles qui, lorsqu'elles sont bien sélectionnées et agencées, offrent un look chic et sophistiqué.

### 1. Privilégiez les Matières Nobles
Recherchez le lin, le coton lourd et le satin. Évitez les matières synthétiques trop brillantes. Un chemisier en viscose mélangée blanche ou une robe longue fluide imprimée fleurs sauvages aura instantanément un drapé luxueux.

### 2. Misez sur le Monochrome et les Tons Pastels
Les tenues unies ou jouant sur les camaïeux de couleurs (crème, beige, vert sauge, marine) élèvent instantanément la stature. Un top côtelé fin blanc sur un pantalon fluide beige produit une harmonie visuelle élégante.

### 3. Les Accessoires Structurés font toute la Différence
Associez vos basiques avec des accessoires rigides : un sac à main structuré en simili cuir grainé, une montre dorée brillante, de fines perles d'oreilles. Ce sont ces détails métalliques et de textures qui apportent de la crédibilité à votre style.`,
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=600',
    category: 'Mode & Tendance',
    date: '2026-06-09',
    author: 'Hind El Idrissi',
    likes: 89
  },
  {
    id: 'blog-4',
    title: 'Décoration & Beauté : Les Pépites Action à s\'offrir absolument',
    excerpt: 'Lumière sur les organisateurs cosmétiques, pinceaux doux, miroirs LED et accessoires indispensables du géant européen.',
    content: `Chez Action, on trouve de véritables merveilles pour organiser sa coiffeuse ou sublimer sa routine beauté sans se ruiner. Zoom sur nos indispensables :

### 1. Les Organisateurs en Acrylique
Les rangements cosmétiques rotatifs ou à compartiment d'Action sont ultra-robustes. Ils vous permettent de ranger tous vos rouges à lèvres et flacons de parfums de manière esthétique. Votre coiffeuse devient digne d'une Loge de défilé !

### 2. Le Set de Pinceaux Maquillage Doux
Action propose régulièrement des sets de pinceaux aux poils synthétiques d'une douceur extraordinaire. Ils répartissent parfaitement la poudre et estompent les fards à joues de manière impeccable.

### 3. Les Bougies Parfumées Relaxantes
Rien de mieux pour accompagner son bain ou sa routine de soin du soir qu'une bougie parfumée ambrée Action. Une ambiance sensorielle zen et chaleureuse à prix tout doux !`,
    image: 'https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&q=80&w=600',
    category: 'Cosmétiques',
    date: '2026-06-10',
    author: 'Khoudia Ndiaye',
    likes: 31
  }
];

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('beautybypnd_products');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return PRODUCTS;
  });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<OrderDetails[]>(() => {
    const savedOrders = localStorage.getItem('beautybypnd_orders');
    if (savedOrders) {
      try {
        const parsed = JSON.parse(savedOrders);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error(e);
      }
    }
    return [
      {
        id: 'PND-782415',
        fullName: 'Hind El Idrissi',
        phone: '0612345678',
        city: 'Casablanca',
        address: '24, Rue Racine, Gauthier',
        notes: 'Laisser à la concierge si absent',
        items: [
          {
            product: PRODUCTS[0],
            quantity: 1
          }
        ],
        total: PRODUCTS[0].price,
        shippingFee: 20,
        discountApplied: 0,
        paymentMethod: 'Paiement à la livraison',
        timestamp: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
        status: 'shipped' as const
      },
      {
        id: 'PND-910482',
        fullName: 'Yasmine Bensouda',
        phone: '0698765432',
        city: 'Rabat',
        address: '15, Avenue de France, Agdal',
        notes: "SVP m'appeler 1h avant la livraison",
        items: [
          {
            product: PRODUCTS[2],
            quantity: 2
          }
        ],
        total: PRODUCTS[2].price * 2,
        shippingFee: 35,
        discountApplied: 0,
        paymentMethod: 'Paiement à la livraison',
        timestamp: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
        status: 'preparation' as const
      }
    ];
  });
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  // --- NEW STATES FOR FULL APPLICATION INSTRUCTIONS ---
  const [customRequests, setCustomRequests] = useState<CustomRequest[]>(() => {
    const saved = localStorage.getItem('beautybypnd_custom_requests');
    return saved ? JSON.parse(saved) : DEFAULT_CUSTOM_REQUESTS;
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('beautybypnd_coupons');
    return saved ? JSON.parse(saved) : DEFAULT_COUPONS;
  });

  const [cityFees, setCityFees] = useState<CityFee[]>(() => {
    const saved = localStorage.getItem('beautybypnd_city_fees');
    return saved ? JSON.parse(saved) : DEFAULT_CITY_FEES;
  });

  const [freeShippingThreshold, setFreeShippingThreshold] = useState<number>(() => {
    const saved = localStorage.getItem('beautybypnd_free_shipping');
    return saved ? Number(saved) : 500;
  });

  const [productReviews, setProductReviews] = useState<ProductReview[]>(() => {
    const saved = localStorage.getItem('beautybypnd_reviews');
    return saved ? JSON.parse(saved) : DEFAULT_REVIEWS;
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('beautybypnd_blog_posts');
    return saved ? JSON.parse(saved) : DEFAULT_BLOG_POSTS;
  });

  const [categories, setCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem('beautybypnd_categories');
    return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
  });

  // Load cart and wishlist from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('beautybypnd_cart');
    const savedWishlist = localStorage.getItem('beautybypnd_wishlist');

    if (savedCart) {
      try { setCart(JSON.parse(savedCart)); } catch (e) { console.error(e); }
    }
    if (savedWishlist) {
      try { setWishlist(JSON.parse(savedWishlist)); } catch (e) { console.error(e); }
    }
  }, []);

  // Save changes to localStorage on updates
  useEffect(() => {
    localStorage.setItem('beautybypnd_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('beautybypnd_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('beautybypnd_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('beautybypnd_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('beautybypnd_custom_requests', JSON.stringify(customRequests));
  }, [customRequests]);

  useEffect(() => {
    localStorage.setItem('beautybypnd_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('beautybypnd_city_fees', JSON.stringify(cityFees));
  }, [cityFees]);

  useEffect(() => {
    localStorage.setItem('beautybypnd_free_shipping', freeShippingThreshold.toString());
  }, [freeShippingThreshold]);

  useEffect(() => {
    localStorage.setItem('beautybypnd_reviews', JSON.stringify(productReviews));
  }, [productReviews]);

  useEffect(() => {
    localStorage.setItem('beautybypnd_blog_posts', JSON.stringify(blogPosts));
  }, [blogPosts]);

  useEffect(() => {
    localStorage.setItem('beautybypnd_categories', JSON.stringify(categories));
  }, [categories]);

  const navigateTo = (view: ActiveView, category?: string) => {
    setActiveView(view);
    if (category) {
      setSelectedCategory(category);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        showNotification(`Quantité mise à jour pour : ${product.name}`, 'success');
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      showNotification(`${product.name} ajouté au panier !`, 'success');
      return [...prevCart, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    const item = cart.find(i => i.product.id === productId);
    if (item) {
      showNotification(`${item.product.name} retiré du panier`, 'info');
    }
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const isExist = prev.includes(productId);
      const product = products.find(p => p.id === productId);
      if (isExist) {
        showNotification(`${product?.name || 'Produit'} retiré de vos favoris`, 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showNotification(`${product?.name || 'Produit'} ajouté à vos favoris ❤`, 'success');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const placeOrder = (orderDetails: Omit<OrderDetails, 'id' | 'status' | 'items' | 'timestamp'>): OrderDetails => {
    const generatedId = 'PND-' + Math.floor(100000 + Math.random() * 900000);
    const newOrder: OrderDetails = {
      ...orderDetails,
      id: generatedId,
      status: 'pending',
      items: [...cart],
      timestamp: new Date().toISOString()
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    navigateTo('tracking');
    showNotification('Votre commande a bien été reçue ! 😍', 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderDetails['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    showNotification(`Statut de la commande #${orderId} mis à jour`, 'info');
  };

  const showNotification = (message: string, type: 'success' | 'info' = 'success') => {
    setNotification({ message, type });
  };

  const hideNotification = () => {
    setNotification(null);
  };

  // --- ACTIONS PERSONNELLES / SOURCING ---

  const addCustomRequest = (reqData: Omit<CustomRequest, 'id' | 'timestamp' | 'status'>): CustomRequest => {
    const generatedId = 'REQ-' + Math.floor(100000 + Math.random() * 900000);
    const newRequest: CustomRequest = {
      ...reqData,
      id: generatedId,
      timestamp: new Date().toISOString(),
      status: 'pending'
    };
    setCustomRequests((prev) => [newRequest, ...prev]);
    showNotification('Votre demande de recherche a été envoyée ! ⏱️', 'success');
    return newRequest;
  };

  const updateCustomRequestStatus = (id: string, status: CustomRequest['status']) => {
    setCustomRequests((prev) => 
      prev.map((r) => r.id === id ? { ...r, status } : r)
    );
    showNotification(`Demande #${id} mise à jour.`, 'info');
  };

  const deleteCustomRequest = (id: string) => {
    setCustomRequests((prev) => prev.filter((r) => r.id !== id));
    showNotification('Demande supprimée.', 'info');
  };

  const addCoupon = (coupon: Coupon) => {
    setCoupons((prev) => {
      const filtered = prev.filter(c => c.code.toUpperCase() !== coupon.code.toUpperCase());
      return [...filtered, { ...coupon, code: coupon.code.toUpperCase() }];
    });
    showNotification(`Code promo "${coupon.code.toUpperCase()}" enregistré !`, 'success');
  };

  const toggleCouponStatus = (code: string) => {
    setCoupons((prev) => 
      prev.map((c) => c.code === code ? { ...c, active: !c.active } : c)
    );
    showNotification(`Code promo "${code}" mis à jour.`, 'info');
  };

  const deleteCoupon = (code: string) => {
    setCoupons((prev) => prev.filter((c) => c.code !== code));
    showNotification(`Code promo "${code}" supprimé.`, 'info');
  };

  const updateCityFee = (city: string, fee: number) => {
    setCityFees((prev) => 
      prev.map((cf) => cf.city === city ? { ...cf, fee } : cf)
    );
    showNotification(`Tarif de livraison pour ${city} mis à jour.`, 'success');
  };

  const addCityFee = (cityFee: CityFee) => {
    setCityFees((prev) => {
      const filtered = prev.filter(cf => cf.city.toLowerCase() !== cityFee.city.toLowerCase());
      return [...filtered, cityFee];
    });
    showNotification(`Tarif pour "${cityFee.city}" configuré.`, 'success');
  };

  const deleteCityFee = (city: string) => {
    setCityFees((prev) => prev.filter((cf) => cf.city !== city));
    showNotification(`Ville "${city}" supprimée`, 'info');
  };

  const updateFreeShippingThreshold = (value: number) => {
    setFreeShippingThreshold(value);
    showNotification(`Seuil de livraison gratuite : ${value} DH`, 'success');
  };

  const addReview = (review: Omit<ProductReview, 'id' | 'timestamp' | 'approved'>) => {
    const generatedId = 'REV-' + Date.now();
    const newReview: ProductReview = {
      ...review,
      id: generatedId,
      timestamp: new Date().toISOString(),
      approved: false
    };
    setProductReviews((prev) => [newReview, ...prev]);
    showNotification('Merci pour votre avis ! En attente de validation par l\'administrateur. ❤', 'success');
  };

  const approveReview = (reviewId: string) => {
    setProductReviews((prev) => 
      prev.map((r) => r.id === reviewId ? { ...r, approved: true } : r)
    );
    showNotification('Avis client approuvé et visible !', 'success');
  };

  const deleteReview = (reviewId: string) => {
    setProductReviews((prev) => prev.filter((r) => r.id !== reviewId));
    showNotification('Avis client retiré.', 'info');
  };

  const addBlogPost = (post: Omit<BlogPost, 'id' | 'date' | 'likes'>) => {
    const generatedId = 'blog-' + Date.now();
    const newPost: BlogPost = {
      ...post,
      id: generatedId,
      date: new Date().toISOString().substring(0, 10),
      likes: 0
    };
    setBlogPosts((prev) => [newPost, ...prev]);
    showNotification('Billet de blog mis en ligne !', 'success');
  };

  const likeBlogPost = (postId: string) => {
    setBlogPosts((prev) => 
      prev.map((p) => p.id === postId ? { ...p, likes: p.likes + 1 } : p)
    );
  };

  const deleteBlogPost = (postId: string) => {
    setBlogPosts((prev) => prev.filter((p) => p.id !== postId));
    showNotification('Article de blog archivé.', 'info');
  };

  const addCategory = (categoryName: string) => {
    const cleanName = categoryName.trim().toLowerCase();
    if (!cleanName) return;
    setCategories((prev) => {
      if (prev.includes(cleanName)) return prev;
      return [...prev, cleanName];
    });
    showNotification(`Catégorie "${categoryName}" configurée !`, 'success');
  };

  const deleteCategory = (categoryName: string) => {
    setCategories((prev) => prev.filter(c => c !== categoryName));
    showNotification(`Catégorie "${categoryName}" retirée.`, 'info');
  };

  // Admin and stock management
  const addProduct = (newProdFields: Omit<Product, 'id' | 'rating' | 'reviewsCount'>) => {
    const newProduct: Product = {
      ...newProdFields,
      id: `${newProdFields.category.substring(0, 3)}-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 1
    };
    setProducts((prev) => [newProduct, ...prev]);
    showNotification(`Produit "${newProduct.name}" créé avec succès !`, 'success');
  };

  const updateProductStock = (productId: string, inStock: boolean) => {
    setProducts((prev) => 
      prev.map((p) => p.id === productId ? { ...p, inStock } : p)
    );
    const prodName = products.find(p => p.id === productId)?.name || 'Produit';
    showNotification(`Stock : ${prodName} est maintenant ${inStock ? 'Disponible' : 'Indisponible'}`, 'info');
  };

  const updateProduct = (productId: string, updatedProduct: Partial<Product>) => {
    setProducts((prev) => 
      prev.map((p) => p.id === productId ? { ...p, ...updatedProduct } : p)
    );
    showNotification('Produit mis à jour avec succès', 'success');
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showNotification('Produit retiré du catalogue', 'info');
  };

  const resetProducts = () => {
    setProducts(PRODUCTS);
    localStorage.removeItem('beautybypnd_products');
    showNotification('Catalogue par défaut restauré !', 'success');
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        wishlist,
        orders,
        activeView,
        selectedCategory,
        searchQuery,
        sortBy,
        selectedProduct,
        notification,
        
        customRequests,
        addCustomRequest,
        updateCustomRequestStatus,
        deleteCustomRequest,
        
        coupons,
        addCoupon,
        toggleCouponStatus,
        deleteCoupon,
        
        cityFees,
        freeShippingThreshold,
        updateCityFee,
        addCityFee,
        deleteCityFee,
        updateFreeShippingThreshold,
        
        productReviews,
        addReview,
        approveReview,
        deleteReview,
        
        blogPosts,
        addBlogPost,
        likeBlogPost,
        deleteBlogPost,
        
        categories,
        addCategory,
        deleteCategory,

        navigateTo,
        setSelectedCategory,
        setSearchQuery,
        setSortBy,
        setSelectedProduct,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        toggleWishlist,
        isWishlisted,
        placeOrder,
        updateOrderStatus,
        showNotification,
        hideNotification,
        addProduct,
        updateProductStock,
        updateProduct,
        deleteProduct,
        resetProducts
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
