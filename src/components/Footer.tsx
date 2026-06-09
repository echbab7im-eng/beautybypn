import React from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, MessageSquare, Heart, ShieldCheck, Truck, RefreshCw, Smartphone } from 'lucide-react';
import { INSTAGRAM_LINK, FACEBOOK_LINK } from '../data/products';

export const Footer: React.FC = () => {
  const { navigateTo } = useShop();

  const handleCategoryNav = (catId: string) => {
    navigateTo('shop', catId);
  };

  const guarantees = [
    {
      icon: <Truck className="w-6 h-6 text-pink-400" />,
      title: 'Livraison Express',
      desc: 'Livré chez vous rapidement sous 24h/48h avec suivi complet.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-pink-400" />,
      title: '100% Authentique',
      desc: 'Parfums originaux importés directement et certifiés conformes.'
    },
    {
      icon: <Smartphone className="w-6 h-6 text-pink-400" />,
      title: 'Paiement à la livraison',
      desc: 'Zéro risque, payez en espèces une fois votre colis inspecté.'
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-pink-400" />,
      title: 'Aide & Échanges',
      desc: 'Service client disponible 24h/7j sur WhatsApp pour vos retours.'
    }
  ];

  return (
    <footer className="bg-pink-950/95 backdrop-blur-md text-pink-100 pt-16 pb-8 border-t border-white/10" id="global-footer">
      
      {/* Guarantees Ribbon Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 mb-12 border-b border-white/10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {guarantees.map((g, idx) => (
            <div key={idx} className="flex gap-4 items-start" id={`footer-guarantee-${idx}`}>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 shrink-0">
                {g.icon}
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-1.5 flex items-center gap-1.5">
                  {g.title}
                </h4>
                <p className="text-[11px] text-pink-200/75 leading-relaxed font-normal">
                  {g.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer Links & Content row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-10 mb-12 text-sm">
        
        {/* Brand visual statement */}
        <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left">
          <span className="font-serif text-2xl sm:text-3xl font-bold tracking-widest text-white">
            Beauty<span className="text-pink-400 font-light italic">ByPnd</span>
          </span>
          <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-pink-300 mt-1">
            L'Élégance au Féminin
          </span>
          <p className="text-xs text-pink-100/70 font-normal leading-relaxed mt-4 max-w-sm">
            Boutique en ligne moderne d'inspiration parisienne et orientale. Nous sélectionnons avec passion nos parfums hauts de gamme, cosmétiques de pointe, vêtements chics, sacs de luxe et montres subtiles.
          </p>
          
          {/* Social icons */}
          <div className="flex gap-4 mt-6">
            <a 
              href={INSTAGRAM_LINK} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-pink-500 hover:text-white transition-colors cursor-pointer"
              title="Instagram BeautyByPnd"
              id="footer-insta-link"
            >
              <Heart className="w-4.5 h-4.5" />
            </a>
            <a 
              href={FACEBOOK_LINK} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-pink-500 hover:text-white transition-colors cursor-pointer"
              title="Facebook BeautyByPnd"
              id="footer-fb-link"
            >
              <MessageSquare className="w-4.5 h-4.5" />
            </a>
          </div>
        </div>

        {/* Categories helper links */}
        <div className="md:col-span-3 text-center md:text-left">
          <h4 className="text-xs font-bold uppercase tracking-widest text-pink-400 mb-4.5">
            Nos Collections
          </h4>
          <ul className="space-y-2.5 text-xs text-pink-200/90 font-medium">
            <li>
              <button onClick={() => handleCategoryNav('parfums')} className="hover:text-pink-400 hover:underline transition-colors focus:outline-none cursor-pointer">
                Parfums Féminins
              </button>
            </li>
            <li>
              <button onClick={() => handleCategoryNav('cosmetiques')} className="hover:text-pink-400 hover:underline transition-colors focus:outline-none cursor-pointer">
                Cosmétiques de Soin
              </button>
            </li>
            <li>
              <button onClick={() => handleCategoryNav('vetements')} className="hover:text-pink-400 hover:underline transition-colors focus:outline-none cursor-pointer">
                Maison & Prêt-à-Porter
              </button>
            </li>
            <li>
              <button onClick={() => handleCategoryNav('sacs')} className="hover:text-pink-400 hover:underline transition-colors focus:outline-none cursor-pointer">
                Sacs & Accessoires de Luxe
              </button>
            </li>
            <li>
              <button onClick={() => handleCategoryNav('montres')} className="hover:text-pink-400 hover:underline transition-colors focus:outline-none cursor-pointer">
                Montres de Prestige
              </button>
            </li>
          </ul>
        </div>

        {/* Navigation shortcut links */}
        <div className="md:col-span-2 text-center md:text-left">
          <h4 className="text-xs font-bold uppercase tracking-widest text-pink-400 mb-4.5">
            Liens Utiles
          </h4>
          <ul className="space-y-2.5 text-xs text-pink-200/90 font-medium">
            <li>
              <button onClick={() => navigateTo('home')} className="hover:text-pink-400 hover:underline transition-colors focus:outline-none cursor-pointer">
                Page d’accueil
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('shop', 'all')} className="hover:text-pink-400 hover:underline transition-colors focus:outline-none cursor-pointer">
                Tous nos produits
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('promotions')} className="hover:text-pink-400 hover:underline transition-all focus:outline-none flex items-center gap-1 justify-center md:justify-start cursor-pointer">
                Promotions
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('contact')} className="hover:text-pink-400 hover:underline transition-colors focus:outline-none cursor-pointer">
                Contact & Support FAQ
              </button>
            </li>
            <li className="pt-2 border-t border-white/10 mt-2">
              <button 
                onClick={() => navigateTo('admin')} 
                className="text-pink-350 hover:text-white transition-colors focus:outline-none flex items-center gap-1 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg justify-center md:justify-start cursor-pointer hover:bg-white/10"
              >
                <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
                <span className="font-bold">Espace Administrateur</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Direct physical address showroom details */}
        <div className="md:col-span-2 text-center md:text-left">
          <h4 className="text-xs font-bold uppercase tracking-widest text-pink-400 mb-4.5">
            Showroom
          </h4>
          <p className="text-xs text-pink-200/90 font-medium leading-relaxed">
            Maarif, Casablanca<br />
            Maroc
          </p>
          <div className="mt-4 pt-4 border-t border-white/10 text-[11px] text-pink-300/80">
            Besoin d’aide ?<br />
            <span className="text-pink-300 font-bold">service@beautybypnd.com</span>
          </div>
        </div>

      </div>

      {/* Copyright row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/10 pt-8 mt-8 text-center text-[10px] text-pink-300/50 font-normal">
        <p>© {new Date().getFullYear()} BeautyByPnd Boutique en Ligne. Tous droits réservés.</p>
        <p className="mt-1">Conçu avec amour pour l'élégance moderne et le commerce de proximité.</p>
      </div>

    </footer>
  );
};
