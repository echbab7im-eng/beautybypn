import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { HERO_SLIDES } from '../data/products';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  const { navigateTo } = useShop();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto play slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <div className="relative h-[480px] sm:h-[580px] md:h-[650px] bg-stone-900 overflow-hidden" id="hero-carousel">
      
      {/* Background slide items */}
      {HERO_SLIDES.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              isActive ? 'opacity-80 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
          >
            {/* Image Overlay with a deep pink/rose gloss gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-950/90 via-pink-900/60 to-transparent z-10" />
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center animate-fadeIn"
              referrerPolicy="no-referrer"
            />
          </div>
        );
      })}

      {/* Hero Slide Content Wrapper */}
      <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-xl text-white">
          
          {/* Subtle Promotion Tags */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xs font-semibold text-pink-50 tracking-widest uppercase mb-6 animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-pink-300" />
            Nouveauté Exclusive
          </div>

          <p className="text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase text-rose-200 mb-2">
            {HERO_SLIDES[currentSlide].subtitle}
          </p>
          
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal leading-tight tracking-wide text-white mb-4">
            {HERO_SLIDES[currentSlide].title}
          </h1>

          <p className="text-pink-100/90 text-sm sm:text-base leading-relaxed font-light mb-8 max-w-md">
            {HERO_SLIDES[currentSlide].description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigateTo('shop', HERO_SLIDES[currentSlide].actionCategory)}
              className="px-8 py-3.5 bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold tracking-widest uppercase rounded-xl shadow-lg shadow-pink-900/30 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group-hover:scale-105 cursor-pointer"
              id={`hero-cta-btn-${currentSlide}`}
            >
              {HERO_SLIDES[currentSlide].buttonText}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => navigateTo('promotions')}
              className="px-8 py-3.5 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 hover:border-white/50 text-white text-xs font-bold tracking-widest uppercase rounded-xl transition-all duration-300 flex items-center justify-center cursor-pointer"
              id={`hero-promo-btn-${currentSlide}`}
            >
              Voir les Bonnes Affaires
            </button>
          </div>

        </div>
      </div>

      {/* Carousel control arrows - Desktop only */}
      <button
        onClick={handlePrev}
        className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full border border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white items-center justify-center transition-all focus:outline-none"
        title="Précédent"
        id="hero-arrow-prev"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={handleNext}
        className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full border border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white items-center justify-center transition-all focus:outline-none"
        title="Suivant"
        id="hero-arrow-next"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Bottom slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 transition-all duration-500 rounded-full ${
              index === currentSlide ? 'w-8 bg-pink-500' : 'w-2 bg-white/45 hover:bg-white'
            }`}
            title={`Diapositive ${index + 1}`}
            id={`hero-dot-${index}`}
          />
        ))}
      </div>
    </div>
  );
};
