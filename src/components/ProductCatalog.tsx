import React from 'react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/products';
import { ProductCard } from './ProductCard';
import { Search, SlidersHorizontal, Heart, ArrowUpDown, CornerDownLeft } from 'lucide-react';

export const ProductCatalog: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    wishlist
  } = useShop();

  const [showOnlyWishlist, setShowOnlyWishlist] = React.useState(false);

  // Filter & Sort Logic
  const filteredProducts = products
    .filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Search filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCat) return false;
      }
      // Wishlist filter
      if (showOnlyWishlist && !wishlist.includes(product.id)) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      
      // Default: Featured (promotions/bestsellers first)
      const aScore = (a.tag === 'Best Seller' ? 2 : 0) + (a.tag === 'Promo' ? 1.5 : 0);
      const bScore = (b.tag === 'Best Seller' ? 2 : 0) + (b.tag === 'Promo' ? 1.5 : 0);
      return bScore - aScore;
    });

  return (
    <section className="bg-transparent py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="shop-catalog-section">
      
      {/* Search and Filters Navigation Strip - styled with glass panel */}
      <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl p-5 mb-10 shadow-sm shadow-pink-950/5">
        
        {/* Core Quick Input fields */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* Text Search input */}
          <div className="relative md:col-span-5">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-pink-400">
              <Search className="w-5 h-5" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un parfum, robe, veste, sac, montre..."
              className="w-full pl-11 pr-4 py-3 bg-white/50 backdrop-blur-xs border border-pink-100 rounded-xl text-sm placeholder-pink-400 text-pink-950 focus:ring-1 focus:ring-pink-500 focus:border-pink-500 outline-none transition-all"
              id="catalog-search-input"
            />
          </div>

          {/* Quick Filter & Sort Selection row */}
          <div className="flex flex-col sm:flex-row gap-3 md:col-span-7 justify-end w-full">
            
            {/* Wishlist filter shortcut */}
            <button
              onClick={() => setShowOnlyWishlist(!showOnlyWishlist)}
              className={`px-5 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                showOnlyWishlist
                  ? 'bg-pink-600 border-pink-500 text-white font-bold shadow-md shadow-pink-200'
                  : 'bg-white/50 backdrop-blur-xs border-pink-100 text-gray-700 hover:bg-white/80'
              }`}
              id="wishlist-filter-toggle"
            >
              <Heart className={`w-4 h-4 ${showOnlyWishlist ? 'fill-current text-white' : 'text-pink-600'}`} />
              <span>Favoris ({wishlist.length})</span>
            </button>

            {/* Sort Dropdown */}
            <div className="relative flex-1 sm:max-w-[200px]">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-pink-400">
                <ArrowUpDown className="w-4 h-4" />
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/50 backdrop-blur-xs border border-pink-100 rounded-xl text-sm text-gray-700 focus:ring-1 focus:ring-pink-500 focus:border-pink-500 outline-none appearance-none cursor-pointer"
                id="catalog-sort"
              >
                <option value="featured">Populaire (Recommandé)</option>
                <option value="price-asc">Prix : croissant</option>
                <option value="price-desc">Prix : décroissant</option>
                <option value="rating">Mieux notés</option>
                <option value="name">Alphabétique (A-Z)</option>
              </select>
            </div>

          </div>
        </div>

        {/* Categories sliding filter strip */}
        <div className="mt-6 pt-5 border-t border-pink-100/50 flex flex-wrap gap-2 overflow-x-auto pb-1.5 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setShowOnlyWishlist(false);
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap focus:outline-none cursor-pointer ${
                selectedCategory === cat.id && !showOnlyWishlist
                  ? 'bg-pink-600 text-white shadow-md shadow-pink-200 scale-102'
                  : 'bg-white/50 hover:bg-white text-gray-700 hover:text-pink-700 border border-pink-100'
              }`}
              id={`cat-chip-${cat.id}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

      </div>

      {/* Catalog stats headers */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-pink-950">
            {showOnlyWishlist ? 'Vos Articles Favoris' : 'Collection ' + CATEGORIES.find(c => c.id === selectedCategory)?.name}
          </h2>
          <p className="text-xs text-gray-600 font-semibold tracking-wide">
            {filteredProducts.length} {filteredProducts.length > 1 ? 'articles trouvés' : 'article trouvé'}
          </p>
        </div>

        {/* Active searches reset helper */}
        {(searchQuery || selectedCategory !== 'all' || showOnlyWishlist) && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setShowOnlyWishlist(false);
            }}
            className="text-xs text-pink-700 hover:text-pink-900 font-bold underline flex items-center gap-1 cursor-pointer"
            id="reset-catalog-btn"
          >
            Réinitialiser les filtres
          </button>
        )}
      </div>

      {/* Grid of Product Cards */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="h-full">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        /* Gorgeous empty search results visual */
        <div className="text-center py-20 px-4 max-w-md mx-auto" id="empty-catalog-state">
          <div className="w-16 h-16 bg-white/60 border border-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 text-pink-600 shadow-sm animate-pulse">
            <SlidersHorizontal className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg font-bold text-pink-950 mb-2">
            Aucun produit ne correspond
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed mb-6 font-normal">
            Nous n'avons pas trouvé de résultats pour votre recherche. Essayez d'ajuster vos filtres, de vider votre recherche ou de changer de catégorie.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setShowOnlyWishlist(false);
            }}
            className="px-6 py-2.5 bg-pink-900 text-white text-xs font-bold tracking-widest uppercase hover:bg-pink-800 transition-all rounded-xl shadow-md shadow-pink-950/25 flex items-center justify-center gap-2 mx-auto cursor-pointer"
            id="catalog-empty-cta"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
            Tout Afficher
          </button>
        </div>
      )}

    </section>
  );
};
