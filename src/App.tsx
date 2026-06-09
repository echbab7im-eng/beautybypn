import React, { useState, useEffect } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { Promotions } from './components/Promotions';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutForm } from './components/CheckoutForm';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { OrdersHistory } from './components/OrdersHistory';
import { ProductCard } from './components/ProductCard';
import { AdminPanel } from './components/AdminPanel';
import { OrderTracking } from './components/OrderTracking';
import { SourcingSect } from './components/SourcingSect';
import { BlogSect } from './components/BlogSect';
import { PoliciesSect } from './components/PoliciesSect';

import { Sparkles, ArrowRight, Star, Heart, Check, X, ShieldAlert, Mail, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

/* Core Store View Router and Renderer */
const MainStoreContent: React.FC = () => {
  const { 
    activeView, 
    notification, 
    hideNotification, 
    products, 
    navigateTo 
  } = useShop();
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll listener to show/hide back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Auto hide notifications after 4 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        hideNotification();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notification, hideNotification]);

  // Filter 4 best sellers for the Homepage
  const bestSellers = products.filter(p => p.tag === 'Best Seller').slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col justify-between relative">
      
      {/* Universal Sticky Header */}
      <Header onOpenCart={() => setIsCartOpen(true)} />

      {/* Primary view content switcher router */}
      <main className="flex-grow">
        {activeView === 'home' && (
          <div className="animate-fadeIn">
            {/* Elegant Luxury Slider */}
            <Hero />

            {/* Curated Categories visual Grid */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <div className="text-center max-w-xl mx-auto mb-10">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-pink-700 mb-2">
                  Inspiration Élégante
                </p>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-pink-950">
                  Achetez par Catégorie
                </h2>
                <div className="h-[1.5px] w-10 bg-pink-600 mx-auto mt-3.5" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                
                {/* 1. Parfums category link */}
                <div 
                  onClick={() => navigateTo('shop', 'parfums')}
                  className="group relative h-72 sm:h-80 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-lg border border-white/40 bg-white/10 backdrop-blur-xs transition-all duration-300"
                  id="category-card-parfums"
                >
                  <div className="absolute inset-0 bg-pink-950/45 group-hover:bg-pink-950/35 transition-colors z-10" />
                  <img 
                    src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=400" 
                    alt="Parfums" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-5 inset-x-4 text-center z-20">
                    <h3 className="font-serif text-lg font-bold text-white tracking-wide">
                      Parfums Précieux
                    </h3>
                    <span className="text-[10px] text-pink-100 uppercase tracking-widest font-bold block mt-1 hover:underline">
                      Parcourir
                    </span>
                  </div>
                </div>

                {/* 2. Cosmétiques category link */}
                <div 
                  onClick={() => navigateTo('shop', 'cosmetiques')}
                  className="group relative h-72 sm:h-80 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-lg border border-white/40 bg-white/10 backdrop-blur-xs transition-all duration-300"
                  id="category-card-cosmétiques"
                >
                  <div className="absolute inset-0 bg-pink-950/45 group-hover:bg-pink-950/35 transition-colors z-10" />
                  <img 
                    src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=400" 
                    alt="Cosmétiques" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-5 inset-x-4 text-center z-20">
                    <h3 className="font-serif text-lg font-bold text-white tracking-wide">
                      Cosmétiques de Soin
                    </h3>
                    <span className="text-[10px] text-pink-100 uppercase tracking-widest font-bold block mt-1">
                      Parcourir
                    </span>
                  </div>
                </div>

                {/* 3. Vêtements category link */}
                <div 
                  onClick={() => navigateTo('shop', 'vetements')}
                  className="group relative h-72 sm:h-80 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-lg border border-white/40 bg-white/10 backdrop-blur-xs transition-all duration-300"
                  id="category-card-vetements"
                >
                  <div className="absolute inset-0 bg-pink-950/45 group-hover:bg-pink-950/35 transition-colors z-10" />
                  <img 
                    src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=400" 
                    alt="Vêtements" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-5 inset-x-4 text-center z-20">
                    <h3 className="font-serif text-lg font-bold text-white tracking-wide">
                      Vêtements Chics
                    </h3>
                    <span className="text-[10px] text-pink-100 uppercase tracking-widest font-bold block mt-1">
                      Parcourir
                    </span>
                  </div>
                </div>

                {/* 4. Sacs category link */}
                <div 
                  onClick={() => navigateTo('shop', 'sacs')}
                  className="group relative h-72 sm:h-80 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-lg border border-white/40 bg-white/10 backdrop-blur-xs transition-all duration-300"
                  id="category-card-sacs"
                >
                  <div className="absolute inset-0 bg-pink-950/45 group-hover:bg-pink-950/35 transition-colors z-10" />
                  <img 
                    src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=400" 
                    alt="Sacs" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-5 inset-x-4 text-center z-20">
                    <h3 className="font-serif text-lg font-bold text-white tracking-wide">
                      Sacs & Pouches
                    </h3>
                    <span className="text-[10px] text-pink-100 uppercase tracking-widest font-bold block mt-1">
                      Parcourir
                    </span>
                  </div>
                </div>

                {/* 5. Montres category link */}
                <div 
                  onClick={() => navigateTo('shop', 'montres')}
                  className="group relative h-72 sm:h-80 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-lg border border-white/40 bg-white/10 backdrop-blur-xs transition-all duration-300"
                  id="category-card-montres"
                >
                  <div className="absolute inset-0 bg-pink-950/45 group-hover:bg-pink-950/35 transition-colors z-10" />
                  <img 
                    src="https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=400" 
                    alt="Montres" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-5 inset-x-4 text-center z-20">
                    <h3 className="font-serif text-lg font-bold text-white tracking-wide">
                      Montres d'Élite
                    </h3>
                    <span className="text-[10px] text-pink-100 uppercase tracking-widest font-bold block mt-1">
                      Parcourir
                    </span>
                  </div>
                </div>

              </div>
            </section>

            {/* Quick Promo Callout section (Floating glass curved widget border border-white/80) */}
            <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
              <div className="bg-white/50 backdrop-blur-xl border border-white/80 rounded-3xl shadow-xl shadow-pink-950/5 py-12 px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white shadow-md max-h-[350px]">
                  <img 
                    src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800" 
                    alt="Boutique cosmétique signature" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-white/85 backdrop-blur-md px-3.5 py-1 text-[10px] font-bold tracking-widest uppercase text-pink-700 rounded-lg shadow-sm border border-white/60">
                    Élaboré avec Amour
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-pink-700 mb-2">
                    L'Art de se Révéler
                  </p>
                  <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-pink-950 leading-tight mb-4">
                    Parfums Envoûtants & Cosmétiques d'exception
                  </h3>
                  <p className="text-sm font-normal leading-relaxed text-gray-700 mb-6.5">
                    Trouvez son sillage chez <em className="not-italic font-semibold text-pink-800">beautybypnd</em>. Nous collaborons avec des laboratoires renommés pour vous proposer des sérums éclatants, fards veloutés, rouges hydratants et des flacons de parfum uniques. Payez sereinement à la livraison de vos colis !
                  </p>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => navigateTo('shop', 'parfums')}
                      className="px-6 py-3 bg-pink-900 hover:bg-pink-800 text-white text-xs font-bold tracking-widest uppercase rounded-xl shadow-md shadow-pink-950/20 hover:scale-[1.02] active:translate-y-0.5 transition-all cursor-pointer"
                    >
                      Acheter nos Parfums
                    </button>
                    <button 
                      onClick={() => navigateTo('promotions')}
                      className="px-6 py-3 bg-white/40 backdrop-blur-sm border border-pink-200 hover:bg-white text-pink-900 text-xs font-bold tracking-widest uppercase rounded-xl hover:scale-[1.02] transition-all cursor-pointer"
                    >
                      Nos Promotions
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Curated Best Sellers Grid */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 border-b border-pink-200/50 pb-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-pink-700 mb-1">
                    Les Préférés du Moment
                  </p>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-pink-950">
                    Nos Best Sellers d'exception
                  </h2>
                </div>
                <button
                  onClick={() => navigateTo('shop', 'all')}
                  className="text-xs font-bold text-pink-700 hover:text-pink-900 uppercase tracking-widest flex items-center gap-1.5 mt-3 sm:mt-0 transition-colors"
                >
                  Voir toute la collection <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {bestSellers.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            {/* Newsletter Subscription input Section */}
            <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
              <div className="bg-white/30 backdrop-blur-xl border border-white/60 rounded-3xl shadow-xl shadow-pink-950/5 py-16 px-4 text-center">
                <div className="w-12 h-12 bg-white/60 border border-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 text-pink-700 shadow-sm">
                  <Mail className="w-5.5 h-5.5" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-pink-950 mb-2.5">
                  Inscrivez-vous à notre Newsletter
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal mb-6 max-w-md mx-auto">
                  Soyez la première à recevoir des alertes de réapprovisionnement de parfums, invitations VIP et promotions privées de BeautyByPnd.
                </p>
                
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    // Custom trigger
                    (e.target as any).reset();
                    alert('Merci pour votre inscription ! À très vite sur BeautyByPnd.');
                  }}
                  className="bg-white/60 backdrop-blur-md p-1.5 rounded-xl border border-pink-100/85 flex flex-col sm:flex-row shadow-sm max-w-md mx-auto"
                >
                  <input 
                    type="email" 
                    required
                    placeholder="Votre adresse e-mail" 
                    className="flex-grow px-4 py-3 text-sm focus:outline-none placeholder-pink-400 bg-transparent text-pink-950" 
                  />
                  <button 
                    type="submit"
                    className="px-6 py-3 bg-pink-950 hover:bg-pink-900 text-white font-bold text-xs uppercase tracking-widest rounded-lg shrink-0 transition-all cursor-pointer shadow-md shadow-pink-950/10 active:translate-y-0.5"
                  >
                    S'abonner
                  </button>
                </form>
              </div>
            </section>

          </div>
        )}

        {activeView === 'shop' && <ProductCatalog />}
        {activeView === 'promotions' && <Promotions />}
        {activeView === 'contact' && <Contact />}
        {activeView === 'checkout' && <CheckoutForm />}
        {activeView === 'orders' && <OrdersHistory />}
        {activeView === 'admin' && <AdminPanel />}
        {activeView === 'tracking' && <OrderTracking />}
        {activeView === 'custom-request' && <SourcingSect />}
        {activeView === 'blog' && <BlogSect />}
        {activeView === 'policies' && <PoliciesSect />}
      </main>

      {/* Primary Floating Footer element */}
      <Footer />

      {/* Floating detail quick view modal if any is selected */}
      <ProductDetailModal />

      {/* Multi-feature Cart slide Drawer block */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />

      {/* Slide Toast notification banner alerts */}
      {notification && (
        <div 
          className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-pink-950/95 backdrop-blur-md shadow-xl text-white flex items-center justify-between gap-5 border border-white/20 max-w-sm animate-slideUp font-sans"
          id="global-toast-notification"
        >
          <div className="flex items-center gap-2.5 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping" />
            <span>{notification.message}</span>
          </div>
          <button 
            onClick={hideNotification}
            className="p-1 -mr-1 hover:text-pink-300 rounded transition-colors focus:outline-none"
            title="Fermer la notification"
            id="toast-close-btn"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Floating Back to Top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={scrollToTop}
            className="fixed bottom-24 right-6 z-40 p-3 bg-pink-950 text-white hover:bg-pink-900 shadow-xl border border-white/10 rounded-full hover:scale-110 active:scale-95 transition-all duration-305 cursor-pointer flex items-center justify-center group"
            title="Retour en haut"
            id="back-to-top-btn"
          >
            <ChevronUp className="w-5.25 h-5.25 group-hover:-translate-y-0.75 transition-transform duration-300" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainStoreContent />
    </ShopProvider>
  );
}
