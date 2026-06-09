import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Heart, Search, Calendar, User, ArrowLeft, ThumbsUp, Sparkles, BookOpen } from 'lucide-react';
import { BlogPost } from '../types';

export const BlogSect: React.FC = () => {
  const { blogPosts, likeBlogPost } = useShop();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  // Categories present in articles
  const blogCategories = ['Tous', 'Parfumerie', 'Cosmétiques', 'Mode & Tendance'];

  // Filter logic
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Tous' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Prevent opening card
    likeBlogPost(id);
    if (selectedPost && selectedPost.id === id) {
      setSelectedPost((prev) => prev ? { ...prev, likes: prev.likes + 1 } : null);
    }
  };

  return (
    <div className="bg-[#FCF9F7] min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans" id="blog-sect-root">
      
      {selectedPost ? (
        /* Blog Detail Expanded View */
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-gray-150 shadow-xl overflow-hidden transition-all duration-300">
          <div className="p-4 sm:p-6 bg-white border-b border-gray-50 flex items-center justify-between">
            <button 
              onClick={() => setSelectedPost(null)}
              className="group flex items-center gap-2 text-pink-900 hover:text-pink-700 text-xs font-bold uppercase tracking-widest focus:outline-none transition"
              id="blog-back-btn"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Retour aux articles
            </button>
            <span className="px-3 py-1 bg-pink-100 text-pink-850 font-bold text-[10px] rounded-full uppercase tracking-wider">
              {selectedPost.category}
            </span>
          </div>

          <img 
            src={selectedPost.image} 
            alt={selectedPost.title} 
            referrerPolicy="no-referrer"
            className="w-full h-64 sm:h-[400px] object-cover" 
          />

          <div className="px-6 py-8 sm:px-10 sm:py-12">
            
            {/* Meta Tags container */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 mb-6 border-b border-gray-100 pb-5">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-pink-700" />
                {new Date(selectedPost.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-1">
                <User className="w-4 h-4 text-pink-700" />
                Par {selectedPost.author}
              </span>
              <span className="ml-auto flex items-center gap-1 bg-pink-50 text-pink-900 font-bold px-3 py-1.5 rounded-xl cursor-default border border-pink-100/60 shadow-sm">
                <Heart className="w-3.5 h-3.5 fill-pink-600 text-pink-650" />
                {selectedPost.likes} cœurs
              </span>
            </div>

            {/* Title display */}
            <h1 className="font-serif text-2xl sm:text-3.5xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
              {selectedPost.title}
            </h1>

            {/* Markdown styled content (or simple stylized paragraph splits) */}
            <div className="prose prose-pink max-w-none text-gray-700 text-sm sm:text-base leading-relaxed space-y-6 font-sans">
              {selectedPost.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('###')) {
                  return (
                    <h3 key={index} className="font-serif text-lg sm:text-xl font-bold text-pink-950 pt-3">
                      {paragraph.replace('###', '').trim()}
                    </h3>
                  );
                }
                if (paragraph.startsWith('1.') || paragraph.startsWith('2.') || paragraph.startsWith('-')) {
                  return (
                    <div key={index} className="pl-4 border-l-2 border-pink-850 py-1 bg-pink-50/20 italic">
                      {paragraph.split('\n').map((li, i) => (
                        <p key={i} className="text-sm text-gray-700 mb-1">{li}</p>
                      ))}
                    </div>
                  );
                }
                return (
                  <p key={index} className="whitespace-pre-line">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Footer like container */}
            <div className="flex items-center justify-center border-t border-gray-100 mt-12 pt-8">
              <button
                onClick={(e) => handleLike(e, selectedPost.id)}
                className="group flex items-center gap-2.5 px-6 py-3 bg-pink-900 text-white font-bold rounded-xl text-xs uppercase tracking-widest hover:bg-pink-800 transition shadow hover:shadow-lg focus:outline-none"
              >
                <ThumbsUp className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:scale-110 transition-transform" />
                Aimer cet article ({selectedPost.likes})
              </button>
            </div>

          </div>
        </div>
      ) : (
        /* Blog List View Grid */
        <div className="max-w-7xl mx-auto">
          
          {/* Header Intro */}
          <div className="text-center mb-10">
            <span className="text-pink-850 font-bold uppercase tracking-wider text-xs bg-pink-100 px-3 py-1 rounded-full inline-flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" /> Le Secret Skin & Scenterie
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mt-2 tracking-tight">
              Blog Beauté & Lifestyle Conseils
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm mt-3 max-w-lg mx-auto leading-relaxed">
              Astuces parfums, routines pour peau magique avec nos sélections Deliplus d'Espagne, tendances de mode Shein et pépites Action à dégoter.
            </p>
          </div>

          {/* Search and Filters Bar */}
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
            {/* Horizontal Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto scrollbar-none py-1">
              {blogCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-pink-900 text-white shadow-sm'
                      : 'bg-pink-50/50 text-gray-650 hover:bg-pink-100/30'
                  }`}
                  id={`blog-filter-${cat}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Simple Searching Field */}
            <div className="relative w-full md:w-80">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </span>
              <input
                type="text"
                placeholder="Rechercher des conseils..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-pink-800 focus:border-pink-800 bg-gray-55/40"
              />
            </div>
          </div>

          {/* Core Grid cards layout */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20 bg-white border border-gray-100 rounded-3xl" id="blog-empty-board">
              <p className="text-gray-400 text-sm">Aucun article ne correspond à votre recherche.</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('Tous'); }}
                className="mt-4 px-4 py-1.5 bg-pink-100 text-pink-900 text-xs font-semibold rounded-lg hover:bg-pink-200 transition"
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article 
                  key={post.id} 
                  onClick={() => setSelectedPost(post)}
                  className="bg-white rounded-2.5xl border border-gray-100 shadow-md hover:shadow-xl overflow-hidden cursor-pointer group flex flex-col justify-between transition-all duration-350"
                  id={`blog-card-${post.id}`}
                >
                  <div>
                    {/* Header Image */}
                    <div className="relative overflow-hidden aspect-video">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <span className="absolute top-4 left-4 px-2.5 py-1 bg-white/90 backdrop-blur-md text-pink-900 font-bold text-[9px] rounded-lg tracking-wider uppercase shadow-sm">
                        {post.category}
                      </span>
                    </div>

                    {/* Content segment */}
                    <div className="p-5">
                      <div className="flex items-center gap-3 text-[11px] text-gray-450 mb-2.5 font-medium">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-pink-700" />
                          {new Date(post.date).toLocaleDateString('fr-FR')}
                        </span>
                        <span>•</span>
                        <span>Par {post.author.split(' ')[0]}</span>
                      </div>
                      <h3 className="font-serif text-lg font-bold text-gray-900 group-hover:text-pink-950 transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-gray-500 text-xs mt-2 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Metadata and interactions footer */}
                  <div className="px-5 py-4 border-t border-gray-50 flex items-center justify-between mt-auto">
                    <span className="text-xs text-pink-900 hover:text-pink-700 font-bold uppercase tracking-widest inline-flex items-center gap-1 group-hover:translate-x-1.5 transition-transform duration-300">
                      Lire la suite <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-pulse" />
                    </span>
                    <button 
                      onClick={(e) => handleLike(e, post.id)}
                      className="flex items-center gap-1.5 py-1.5 px-3 bg-pink-50/50 hover:bg-pink-100/30 rounded-xl transition text-xs font-semibold text-pink-850"
                      title="Soutenir cet article de conseils"
                    >
                      <Heart className="w-3.5 h-3.5 text-pink-600 fill-pink-600" />
                      <span>{post.likes}</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

        </div>
      )}

    </div>
  );
};
