import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { Sparkles, Hourglass, Percent, ShoppingBag } from 'lucide-react';

export const Promotions: React.FC = () => {
  const { products, navigateTo } = useShop();

  // Simulated countdown timer (18 hours, 45 minutes)
  const [timeLeft, setTimeLeft] = useState({ hours: 18, minutes: 45, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset timer to keep demo fresh
          return { hours: 24, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Filter only items in promo
  const promoProducts = products.filter((product) => product.originalPrice !== undefined || product.tag === 'Promo');

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="bg-transparent py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="promotion-section">
      
      {/* Promotion Hero Banner */}
      <div className="bg-gradient-to-br from-pink-900 via-pink-950 to-purple-950 rounded-3xl overflow-hidden relative shadow-xl mb-12 flex flex-col md:flex-row items-center justify-between p-8 md:p-12 border border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,63,94,0.25),transparent_40%)]" />
        
        <div className="max-w-xl text-white relative z-10 mb-8 md:mb-0 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-500/20 border border-pink-400/30 rounded-full text-xs font-bold text-pink-300 tracking-widest uppercase mb-4 animate-pulse">
            <Percent className="w-3.5 h-3.5" />
            Ventes Flash de la Semaine
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide mb-3">
            Offres Irrésistibles
          </h2>
          <p className="text-pink-100/90 font-light text-sm sm:text-base leading-relaxed mb-6">
            Profitez de réductions exclusives allant jusqu'à -40% sur nos parfums de prestige, vêtements de créateurs, sacs iconiques, montres haut de gamme et cosmétiques phares.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <span className="text-xs text-pink-200">Code promo automatique :</span>
            <span className="px-4 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg font-mono text-sm text-pink-300 tracking-wider font-semibold">
              BEAUTYGLAM20
            </span>
          </div>
        </div>

        {/* Real-time Countdown Timer Block */}
        <div className="relative z-10 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 flex flex-col items-center justify-center text-center w-full max-w-[280px] self-center">
          <p className="text-pink-100 text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Hourglass className="w-4 h-4 text-pink-400 animate-spin" />
            Temps Restant
          </p>

          <div className="flex gap-3 text-white">
            <div className="flex flex-col">
              <span className="font-serif text-3xl font-bold bg-pink-950/60 px-3 py-2 rounded-xl shadow text-pink-200 border border-white/5" id="promo-hours">
                {formatNumber(timeLeft.hours)}
              </span>
              <span className="text-[10px] text-pink-200 uppercase tracking-wider font-semibold mt-1">h</span>
            </div>
            <span className="text-2xl font-bold self-center text-white/50 -mt-4">:</span>
            <div className="flex flex-col">
              <span className="font-serif text-3xl font-bold bg-pink-950/60 px-3 py-2 rounded-xl shadow text-pink-200 border border-white/5" id="promo-minutes">
                {formatNumber(timeLeft.minutes)}
              </span>
              <span className="text-[10px] text-pink-200 uppercase tracking-wider font-semibold mt-1">m</span>
            </div>
            <span className="text-2xl font-bold self-center text-white/50 -mt-4">:</span>
            <div className="flex flex-col">
              <span className="font-serif text-3xl font-bold bg-pink-950/60 px-3 py-2 rounded-xl shadow text-pink-200 border border-white/5" id="promo-seconds">
                {formatNumber(timeLeft.seconds)}
              </span>
              <span className="text-[10px] text-pink-200 uppercase tracking-wider font-semibold mt-1">s</span>
            </div>
          </div>

          <div className="mt-5 w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div className="bg-pink-500 h-full rounded-full transition-all duration-1000" style={{ width: '75%' }}></div>
          </div>
          <span className="text-[9px] text-pink-200 uppercase tracking-wider mt-2">Plus que 15 articles restants</span>
        </div>

      </div>

      {/* Grid Header and Products */}
      <h3 className="font-serif text-2xl font-bold text-pink-950 mb-8 flex items-center gap-2">
        <Sparkles className="w-5.5 h-5.5 text-pink-600 animate-bounce" />
        Articles en Promotion
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
        {promoProducts.map((product) => (
          <div key={product.id} className="h-full">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Beautiful Marketing Card Banner with Frosted Glass styling */}
      <div className="mt-16 bg-white/35 backdrop-blur-xl border border-white/80 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm shadow-pink-950/5">
        <div className="max-w-lg">
          <h4 className="font-serif text-lg sm:text-xl font-bold text-pink-950 mb-2">
            La Livraison est Gratuite ce weekend !
          </h4>
          <p className="text-sm text-gray-700 leading-relaxed font-normal">
            Pour fêter le lancement de notre nouvelle gamme de montres en Or Rose, profitez de la livraison gratuite de colis à domicile sans minimum d'achat dans toute la région. Payez facilement à la réception de votre colis.
          </p>
        </div>
        <button
          onClick={() => navigateTo('shop', 'montres')}
          className="px-6 py-3 bg-pink-900 hover:bg-pink-800 text-white text-xs font-bold tracking-widest uppercase transition-all rounded-xl shadow-md shadow-pink-950/20 hover:scale-[1.02] active:translate-y-0.5 flex items-center gap-2 shrink-0 cursor-pointer"
          id="promo-explore-watches"
        >
          <ShoppingBag className="w-4 h-4" />
          Découvrir les Montres
        </button>
      </div>

    </div>
  );
};
