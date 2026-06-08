import React from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { Star, Heart, ShoppingBag, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isWishlisted, setSelectedProduct } = useShop();

  const isFavorite = isWishlisted(product.id);
  
  // Calculate discount percentage
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="group bg-white/40 backdrop-blur-sm rounded-2xl border border-white/50 overflow-hidden hover:shadow-xl hover:shadow-pink-900/5 hover:border-white/80 transition-all duration-300 flex flex-col justify-between h-full relative" id={`product-card-${product.id}`}>
      
      {/* Product Image Area with Badges & Actions */}
      <div className="relative aspect-[4/5] bg-gradient-to-tr from-pink-100/30 to-pink-50/20 overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />

        {/* Dynamic Badge Overlays */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.tag && (
            <span className={`px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-lg shadow-sm ${
              product.tag === 'Promo' 
                ? 'bg-pink-600 text-white shadow-pink-200' 
                : product.tag === 'Best Seller'
                ? 'bg-pink-900 text-white'
                : product.tag === 'Exclusif'
                ? 'bg-pink-800 text-white'
                : 'bg-stone-800 text-stone-200'
            }`}>
              {product.tag}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2 py-0.5 text-[9px] font-black bg-pink-600 text-white rounded-lg self-start shadow-sm shadow-pink-200">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Floating Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/60 backdrop-blur-md hover:bg-white text-pink-800 hover:text-pink-600 shadow-md transition-all scale-90 group-hover:scale-100 cursor-pointer"
          title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          id={`wishlist-btn-${product.id}`}
        >
          <Heart className={`w-4 h-4 transition-all ${isFavorite ? 'fill-pink-600 text-pink-600 scale-110' : ''}`} />
        </button>

        {/* Hover Quick Actions Modal Overlay */}
        <div className="absolute inset-0 bg-pink-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
            }}
            className="p-3 bg-white/90 text-pink-900 hover:bg-pink-600 hover:text-white backdrop-blur-md rounded-full shadow-lg transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 cursor-pointer"
            title="Aperçu rapide"
            id={`quickview-btn-${product.id}`}
          >
            <Eye className="w-5 h-5 animate-pulse" />
          </button>
        </div>
      </div>

      {/* Product Metadata & Price Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div className="mb-2">
          {/* Category Tag */}
          <p className="text-[10px] font-bold uppercase tracking-widest text-pink-700 mb-1">
            {product.category}
          </p>

          {/* Product Name */}
          <h3 
            onClick={() => setSelectedProduct(product)}
            className="font-serif text-pink-950 hover:text-pink-700 font-bold text-sm sm:text-base leading-tight mb-2 cursor-pointer line-clamp-1 transition-colors"
          >
            {product.name}
          </h3>

          {/* Reviews Star count */}
          <div className="flex items-center gap-1 mb-3">
            <div className="flex items-center text-rose-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 fill-current ${
                    i < Math.floor(product.rating) ? 'text-rose-400' : 'text-stone-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] font-semibold text-gray-500 ml-1">
              {product.rating} ({product.reviewsCount})
            </span>
          </div>

          {/* Short description */}
          <p className="text-xs text-gray-600 font-normal line-clamp-2 mb-3">
            {product.description}
          </p>
        </div>

        {/* Price & Cart Trigger row */}
        <div className="border-t border-pink-100/50 pt-4 flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-xs text-rose-500/80 line-through font-light leading-none mb-1">
                {product.originalPrice} DH
              </span>
            )}
            <span className="font-serif text-base sm:text-lg font-bold text-pink-900 leading-none">
              {product.price} <span className="text-xs font-sans text-pink-700 font-semibold">DH</span>
            </span>
          </div>

          <button
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
            className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
              product.inStock 
                ? 'bg-pink-900 hover:bg-pink-800 text-white shadow-md shadow-pink-950/15' 
                : 'bg-stone-100 text-stone-400 cursor-not-allowed'
            }`}
            id={`addtocart-btn-${product.id}`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{product.inStock ? 'Ajouter' : 'Épuisé'}</span>
          </button>
        </div>
      </div>

    </div>
  );
};
