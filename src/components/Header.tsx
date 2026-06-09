import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, Heart, Menu, X, MessageSquare, History, Sparkles, Package, Lock } from 'lucide-react';
import { CONTACT_WHATSAPP_NUMBER } from '../data/products';

interface HeaderProps {
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCart }) => {
  const { 
    cartCount, 
    wishlist, 
    activeView, 
    navigateTo,
    orders
  } = useShop();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Accueil', view: 'home' as const },
    { label: 'Catalogue', view: 'shop' as const },
    { label: 'Sourcing Perso', view: 'custom-request' as const },
    { label: 'Blog Beauté', view: 'blog' as const },
    { label: 'Politiques', view: 'policies' as const },
    { label: 'Contact', view: 'contact' as const }
  ];

  const handleNavClick = (view: typeof activeView, category?: string) => {
    navigateTo(view, category);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/40 backdrop-blur-md border-b border-white/20 shadow-sm transition-all duration-300">
      {/* Top Banner with promo announcements */}
      <div className="bg-pink-900/80 backdrop-blur-sm text-pink-50 py-1.5 px-4 text-center text-xs font-medium tracking-widest uppercase flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-pink-300 animate-pulse" />
        Livraison rapide à domicile & Paiement à la livraison dans tout le pays !
        <Sparkles className="w-3.5 h-3.5 text-pink-300 animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -ml-2 text-pink-900 hover:text-pink-600 focus:outline-none transition-colors"
               id="mobile-menu-btn"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 animate-pulse" />}
            </button>
          </div>

          {/* Elegant Feminine Logo */}
          <div className="flex-1 md:flex-initial flex justify-center md:justify-start">
            <button 
              onClick={() => handleNavClick('home')}
              className="group flex flex-col items-center md:items-start text-left focus:outline-none"
              id="header-logo-btn"
            >
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight italic text-pink-900 group-hover:text-pink-700 transition-colors">
                beautybypnd
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] font-semibold text-pink-700 -mt-1 group-hover:tracking-[0.35em] transition-all duration-300">
                L'Élégance au Féminin
              </span>
            </button>
          </div>

          {/* Desktop Navigation Link Block */}
          <nav className="hidden md:flex space-x-8 lg:space-x-10 text-sm font-medium tracking-wider uppercase">
            {navItems.map((item) => {
              const isActive = activeView === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => handleNavClick(item.view)}
                  className={`relative py-2 text-xs font-semibold focus:outline-none transition-all duration-300 ${
                    isActive
                      ? 'text-pink-900 scale-105'
                      : 'text-gray-600 hover:text-pink-700'
                  }`}
                  id={`nav-desktop-${item.view}`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/4 right-1/4 h-[1.5px] bg-pink-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Icons Panel */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            
            {/* Admin Management Panel */}
            <button
              onClick={() => handleNavClick('admin')}
              className={`p-2 rounded-full hover:bg-pink-100/40 relative transition-all duration-300 ${
                activeView === 'admin' ? 'text-pink-700 bg-pink-100/30' : 'text-gray-600 hover:text-pink-700'
              }`}
              title="Espace Administrateur"
              id="header-admin-btn"
            >
              <Lock className="w-5 h-5" />
            </button>

            {/* Wishlist Icon */}
            <button
              onClick={() => handleNavClick('shop', 'all')}
              className={`p-2 rounded-full hover:bg-pink-100/40 relative transition-all duration-300 ${
                activeView === 'shop' && wishlist.length > 0 ? 'text-pink-700' : 'text-gray-600 hover:text-pink-700'
              }`}
              title="Mes Favoris"
              id="header-wishlist"
            >
              <Heart className={`w-5.5 h-5.5 ${wishlist.length > 0 ? 'fill-pink-500 text-pink-500' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white animate-bounce">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart button */}
            <button
              onClick={onOpenCart}
              className="p-2 rounded-full hover:bg-pink-100/40 text-gray-600 hover:text-pink-700 relative transition-all duration-300 focus:outline-none"
              title="Afficher le panier"
              id="header-cart-btn"
            >
              <ShoppingBag className="w-5.5 h-5.5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center border border-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Responsive Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/80 backdrop-blur-lg border-t border-white/20 divide-y divide-[#FAF4F2] transition-all duration-300">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => {
              const isActive = activeView === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => handleNavClick(item.view)}
                  className={`w-full text-left px-3 py-3 rounded-lg text-sm font-medium tracking-wide transition-all ${
                    isActive
                      ? 'text-pink-700 bg-pink-100/40 font-semibold'
                      : 'text-gray-600 hover:text-pink-700 hover:bg-pink-50/50'
                  }`}
                  id={`nav-mobile-${item.view}`}
                >
                  {item.label}
                </button>
              );
            })}
            
            {/* Mobile-only Admin Dashboard Access */}
            <button
              onClick={() => handleNavClick('admin')}
              className={`w-full text-left px-3 py-3 rounded-lg text-sm font-bold tracking-wide transition-all flex items-center gap-2 border border-pink-100/60 mt-2 ${
                activeView === 'admin'
                  ? 'text-pink-750 bg-pink-150/40 font-bold'
                  : 'text-pink-900 bg-pink-50/50 hover:bg-pink-100/55'
              }`}
              id="nav-mobile-admin"
            >
              <Lock className="w-4 h-4 text-pink-700" />
              <span>Espace Administrateur</span>
            </button>
            
            {/* Quick WhatsApp contact on Mobile Menu */}
            <a
              href={`https://wa.me/${CONTACT_WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-4 py-3 text-sm text-[#25D366] font-medium hover:bg-[#F2FCF5] rounded-lg transition-colors"
            >
              <MessageSquare className="w-4.5 h-4.5 fill-[#25D366] text-white" />
              Service Client WhatsApp Direct
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
