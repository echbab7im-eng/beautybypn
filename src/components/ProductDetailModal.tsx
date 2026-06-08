import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Star, Heart, ShoppingBag, Check, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { selectedProduct, setSelectedProduct, addToCart, toggleWishlist, isWishlisted } = useShop();
  const [quantity, setQuantity] = useState(1);

  if (!selectedProduct) return null;

  const isFavorite = isWishlisted(selectedProduct.id);
  const discountPercent = selectedProduct.originalPrice
    ? Math.round(((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100)
    : 0;

  const handleQtyChange = (val: number) => {
    if (val < 1) return;
    setQuantity(val);
  };

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity);
    setSelectedProduct(null);
    setQuantity(1);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-pink-950/20 backdrop-blur-md transition-opacity duration-300" id="product-detail-modal">
      <div 
        className="relative bg-white/70 backdrop-blur-xl w-full max-w-4xl rounded-3xl shadow-2xl border border-white/60 overflow-hidden grid grid-cols-1 md:grid-cols-2 max-h-[90vh] md:max-h-none overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button top-right */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/80 hover:bg-white text-pink-900 border border-pink-100 shadow-md transition-colors cursor-pointer"
          title="Fermer"
          id="close-modal-btn"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image Panel */}
        <div className="relative aspect-square md:aspect-auto md:h-full bg-white/10 overflow-hidden min-h-[300px]">
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          {selectedProduct.tag && (
            <span className="absolute top-4 left-4 z-10 px-3 py-1.5 text-xs font-bold tracking-widest uppercase bg-pink-900 text-white rounded-xl shadow-md">
              {selectedProduct.tag}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="absolute top-4 left-24 z-10 px-3 py-1.5 text-xs font-bold bg-[#E05B5B] text-white rounded-xl shadow-md">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Product Details Panel */}
        <div className="p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Category tag */}
            <p className="text-xs font-bold uppercase tracking-widest text-pink-700 mb-2">
              {selectedProduct.category}
            </p>

            {/* Title */}
            <h2 className="font-serif text-pink-950 font-bold text-2xl sm:text-3xl leading-snug mb-3">
              {selectedProduct.name}
            </h2>

            {/* Stars & Reviews stats */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 fill-current ${
                      i < Math.floor(selectedProduct.rating) ? 'text-amber-400' : 'text-stone-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-gray-700">
                {selectedProduct.rating} ({selectedProduct.reviewsCount} avis vérifiés)
              </span>
            </div>

            {/* Price display panel */}
            <div className="p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-pink-100 flex items-baseline gap-3 mb-5">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-pink-950">
                {selectedProduct.price} DH
              </span>
              {selectedProduct.originalPrice && (
                <span className="text-sm font-semibold text-gray-400 line-through">
                  {selectedProduct.originalPrice} DH
                </span>
              )}
              {selectedProduct.inStock ? (
                <span className="ml-auto px-3 py-1.5 text-[10px] bg-emerald-100 border border-emerald-250 text-emerald-800 font-bold rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
                  <Check className="w-3 h-3" /> En Stock
                </span>
              ) : (
                <span className="ml-auto px-3 py-1.5 text-[10px] bg-pink-50 border border-pink-100 text-pink-750 font-bold rounded-full uppercase tracking-wider shadow-sm">
                  Rupture de Stock
                </span>
              )}
            </div>

            {/* Short Decription */}
            <p className="text-sm text-gray-700 leading-relaxed mb-5 font-normal">
              {selectedProduct.description}
            </p>

            {/* Bullet Point Specifications */}
            {selectedProduct.details && selectedProduct.details.length > 0 && (
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-widest text-pink-950 mb-2.5">
                  Spécifications & Détails :
                </h4>
                <ul className="space-y-1.5">
                  {selectedProduct.details.map((detail, index) => (
                    <li key={index} className="text-xs text-gray-700 font-normal flex items-start gap-2">
                      <span className="text-pink-700 mt-1">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div>
            {/* Purchase Row */}
            <div className="flex flex-col sm:flex-row gap-3 pt-5 border-t border-pink-100/40">
              
              {/* Quantity Picker */}
              <div className="flex items-center border border-pink-150 rounded-xl bg-white/60 backdrop-blur-xs shadow-sm self-center sm:self-auto overflow-hidden">
                <button
                  onClick={() => handleQtyChange(quantity - 1)}
                  className="px-3.5 py-2 hover:bg-pink-100/40 text-pink-900 font-extrabold transition-colors cursor-pointer"
                  id="modal-qty-minus"
                >
                  -
                </button>
                <span className="px-4 py-2 text-sm font-bold text-pink-950" id="modal-qty-val">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQtyChange(quantity + 1)}
                  className="px-3.5 py-2 hover:bg-pink-100/40 text-pink-900 font-extrabold transition-colors cursor-pointer"
                  id="modal-qty-plus"
                >
                  +
                </button>
              </div>

              {/* Add to Cart button */}
              <button
                onClick={handleAddToCart}
                disabled={!selectedProduct.inStock}
                className={`flex-1 px-8 py-3 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
                  selectedProduct.inStock
                    ? 'bg-pink-900 hover:bg-pink-800 text-white cursor-pointer active:translate-y-0.5 hover:scale-[1.01] shadow-lg shadow-pink-950/20'
                    : 'bg-pink-100 text-pink-300 cursor-not-allowed'
                }`}
                id="modal-add-to-cart"
              >
                <ShoppingBag className="w-4.5 h-4.5" />
                Ajouter au Panier {quantity > 1 ? `(${quantity})` : ''} - {(selectedProduct.price * quantity).toFixed(0)} DH
              </button>

              {/* Favorite Shortcut icon next to custom add button */}
              <button
                onClick={() => toggleWishlist(selectedProduct.id)}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  isFavorite 
                    ? 'border-rose-400 bg-rose-50 text-rose-500 shadow-sm' 
                    : 'border-pink-150 bg-white/60 hover:bg-pink-100/30 text-pink-700 shadow-sm hover:scale-105 active:scale-95'
                }`}
                title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                id="modal-wishlist-toggle"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-500' : ''}`} />
              </button>
            </div>

            {/* Quality badge assurances */}
            <div className="grid grid-cols-3 gap-2.5 mt-5 pt-4 text-center border-t border-pink-100/40">
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-4.5 h-4.5 text-pink-700" />
                <span className="text-[10px] font-bold text-pink-950 uppercase tracking-wider">Livraison Gratuite</span>
                <span className="text-[9px] text-pink-800/70 font-semibold">Sous 24h/48h</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-4.5 h-4.5 text-pink-700" />
                <span className="text-[10px] font-bold text-pink-950 uppercase tracking-wider">Authentique</span>
                <span className="text-[9px] text-pink-800/70 font-semibold">100% Original</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RefreshCw className="w-4.5 h-4.5 text-pink-700" />
                <span className="text-[10px] font-bold text-pink-950 uppercase tracking-wider">Échange Facile</span>
                <span className="text-[9px] text-pink-800/70 font-semibold">Garantie retour</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
