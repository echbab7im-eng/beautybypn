import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, OrderDetails, CategoryType } from '../types';
import { PRODUCTS } from '../data/products';

export type ActiveView = 'home' | 'shop' | 'promotions' | 'contact' | 'checkout' | 'orders' | 'admin' | 'tracking';

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
  placeOrder: (orderDetails: Omit<OrderDetails, 'id' | 'status' | 'items' | 'total' | 'timestamp'>) => OrderDetails;
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

  // Save changes to localStorage
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

  const placeOrder = (orderDetails: Omit<OrderDetails, 'id' | 'status' | 'items' | 'total' | 'timestamp'>): OrderDetails => {
    const generatedId = 'PND-' + Math.floor(100000 + Math.random() * 900000);
    const newOrder: OrderDetails = {
      ...orderDetails,
      id: generatedId,
      status: 'pending',
      items: [...cart],
      total: cartTotal,
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
