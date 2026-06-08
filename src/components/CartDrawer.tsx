import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowRight, Truck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const {
    cart,
    cartTotal,
    updateQuantity,
    removeFromCart,
    navigateTo
  } = useShop();

  if (!isOpen) return null;

  // Let's set the free shipping threshold at 600 DH
  const FREE_SHIPPING_THRESHOLD = 600;
  const progressToFreeShipping = Math.min((cartTotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remainingForFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - cartTotal, 0);

  const handleCheckoutClick = () => {
    navigateTo('checkout');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" id="cart-drawer-overlay">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#1a0510]/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white/75 backdrop-blur-xl border-l border-white/50 shadow-2xl flex flex-col h-full transform transition-transform duration-500">
          
          {/* Drawer Header */}
          <div className="px-5 py-6 bg-white/40 border-b border-pink-100/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-pink-700 animate-pulse" />
              <h2 className="font-serif text-lg font-bold text-pink-950">Votre Panier</h2>
              <span className="bg-pink-700 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                {cart.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 -mr-2 text-pink-700 hover:text-pink-950 rounded-full hover:bg-pink-100/50 transition-colors cursor-pointer"
              title="Fermer le panier"
              id="close-cart-drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Core Body */}
          <div className="flex-1 overflow-y-auto py-6 px-5" id="cart-drawer-body">
            
            {cart.length > 0 ? (
              <>
                {/* Free Shipping Tracker */}
                <div className="p-4 bg-white/55 border border-pink-100/80 rounded-2xl mb-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-pink-950 uppercase tracking-wide mb-2">
                    <Truck className="w-4 h-4 text-pink-700" />
                    {remainingForFreeShipping > 0 ? (
                      <span>Plus que <span className="text-pink-700 font-bold">{remainingForFreeShipping} DH</span> pour la livraison gratuite !</span>
                    ) : (
                      <span className="text-emerald-700 font-bold flex items-center gap-1">Félicitations ! Livraison Gratuite activée <span className="text-base">🎉</span></span>
                    )}
                  </div>
                  <div className="w-full bg-pink-100/60 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-pink-600 h-full rounded-full transition-all duration-500" 
                      style={{ width: `${progressToFreeShipping}%` }}
                    />
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-5 divide-y divide-pink-100/50">
                  {cart.map((item, idx) => (
                    <div key={item.product.id} className={`flex items-start gap-4 ${idx > 0 ? 'pt-5' : ''}`} id={`cart-item-row-${item.product.id}`}>
                      {/* Thumbnail */}
                      <div className="w-20 h-24 bg-white/40 border border-pink-100/60 rounded-xl overflow-hidden shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover object-center"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Info and quantity modifiers */}
                      <div className="flex-1 flex flex-col justify-between h-24">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-pink-700">
                            {item.product.category}
                          </p>
                          <h4 className="text-xs font-bold text-pink-950 line-clamp-1 hover:text-pink-700 cursor-pointer">
                            {item.product.name}
                          </h4>
                          <span className="text-xs font-bold text-pink-950 mt-1 block">
                            {item.product.price} DH <span className="text-[10px] text-gray-400 font-normal">/ unité</span>
                          </span>
                        </div>

                        {/* Counter Row */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-pink-100 rounded-lg bg-white/75">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="px-2 py-1 text-xs hover:bg-pink-100/40 text-pink-700 font-bold transition-colors cursor-pointer"
                              id={`cart-minus-${item.product.id}`}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 text-xs font-bold text-pink-950" id={`cart-qty-${item.product.id}`}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="px-2 py-1 text-xs hover:bg-pink-100/40 text-pink-700 font-bold transition-colors cursor-pointer"
                              id={`cart-plus-${item.product.id}`}
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-1 px-1.5 text-pink-450 hover:text-rose-650 rounded-lg hover:bg-rose-50 transition-colors flex items-center justify-center cursor-pointer"
                            title="Retirer l'article"
                            id={`cart-remove-${item.product.id}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              </>
            ) : (
              /* Gorgeous Empty Shopping bag screen */
              <div className="text-center py-20 px-4 max-w-sm mx-auto" id="cart-empty-state">
                <div className="w-16 h-16 bg-white/60 rounded-full border border-pink-100 flex items-center justify-center mx-auto mb-4 text-pink-600 shadow-sm">
                  <ShoppingBag className="w-6 h-6 shrink-0" />
                </div>
                <h3 className="font-serif text-lg font-bold text-pink-950 mb-2">Votre panier est vide</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-6 font-normal">
                  Découvrez nos nouveautés exclusives et ajoutez de superbes articles à votre collection BeautyByPnd.
                </p>
                <button
                  onClick={() => {
                    navigateTo('shop', 'all');
                    onClose();
                  }}
                  className="w-full py-3 bg-pink-900 text-white text-xs font-bold tracking-widest uppercase hover:bg-pink-800 transition-all rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  id="cart-empty-cta"
                >
                  Découvrir le Catalogue
                </button>
              </div>
            )}

          </div>

          {/* Drawer Footer summary block */}
          {cart.length > 0 && (
            <div className="px-5 py-6 bg-white/60 backdrop-blur-md border-t border-pink-100/70 space-y-4">
              <div className="space-y-1.5 text-xs text-gray-700">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span className="font-semibold text-black">{cartTotal.toFixed(0)} DH</span>
                </div>
                <div className="flex justify-between">
                  <span>Frais de livraison</span>
                  <span className="font-bold text-emerald-700">
                    {remainingForFreeShipping > 0 ? '30 DH' : 'GRATUIT'}
                  </span>
                </div>
                <div className="pt-2 border-t border-pink-100/50 flex justify-between text-sm text-pink-950 font-bold font-sans">
                  <span>Total estimé</span>
                  <span className="text-pink-800 font-serif text-base font-bold">
                    {(cartTotal + (remainingForFreeShipping > 0 ? 30 : 0)).toFixed(0)} DH
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleCheckoutClick}
                  className="w-full py-4 bg-pink-900 hover:bg-pink-800 text-white text-xs font-bold tracking-widest uppercase transition-all rounded-xl shadow-md shadow-pink-950/20 flex items-center justify-center gap-2 group cursor-pointer"
                  id="cart-drawer-checkout-btn"
                >
                  Passer la Commande
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={onClose}
                  className="w-full mt-2.5 text-center text-xs font-bold uppercase tracking-widest text-pink-700 hover:text-pink-950 transition-colors py-1.5 focus:outline-none cursor-pointer"
                  id="cart-drawer-continue-shopping"
                >
                  Continuer mes achats
                </button>
              </div>

              <p className="text-[10px] text-center text-pink-900/60 font-semibold italic">
                * Validation instantanée par WhatsApp après la commande
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
