import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Product, CategoryType } from '../types';
import { 
  Plus, Search, Trash2, Edit3, RefreshCw, AlertCircle, 
  Package, LayoutGrid, CheckCircle2, XCircle, Tag, 
  Save, Eye, ArrowLeft, Image as ImageIcon, Sparkles, PlusCircle
} from 'lucide-react';

const PRESET_IMAGES = [
  { label: 'Parfum Floral', url: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600' },
  { label: 'Sérum Cosmétique', url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600' },
  { label: 'Soin Visage Rose', url: 'https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&q=80&w=600' },
  { label: 'Rouge à Lèvres', url: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=600' },
  { label: 'Robe en Lin Blanc', url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600' },
  { label: 'Sac en Cuir Crème', url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=600' },
  { label: 'Montre Or Rose Luxe', url: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=600' },
  { label: 'Montre Bracelet Cuir', url: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=600' }
];

export const AdminPanel: React.FC = () => {
  const { 
    products, 
    addProduct, 
    updateProductStock, 
    updateProduct, 
    deleteProduct, 
    resetProducts,
    navigateTo,
    orders,
    updateOrderStatus
  } = useShop();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [originalPrice, setOriginalPrice] = useState<number | undefined>(undefined);
  const [category, setCategory] = useState<CategoryType>('parfums');
  const [image, setImage] = useState('');
  const [inStock, setInStock] = useState(true);
  const [tag, setTag] = useState<'Nouveau' | 'Promo' | 'Best Seller' | 'Exclusif' | undefined>(undefined);
  const [detailsText, setDetailsText] = useState('');

  // Editing state fields
  const [editFields, setEditFields] = useState<Partial<Product>>({});

  // Filter products
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.id.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Calculate statistics
  const totalProducts = products.length;
  const availableCount = products.filter(p => p.inStock).length;
  const outOfStockCount = totalProducts - availableCount;

  const handleStockToggle = (productId: string, currentStatus: boolean) => {
    updateProductStock(productId, !currentStatus);
  };

  const startEditProduct = (p: Product) => {
    setEditingId(p.id);
    setEditFields({
      name: p.name,
      price: p.price,
      originalPrice: p.originalPrice,
      inStock: p.inStock,
      tag: p.tag
    });
  };

  const saveEditProduct = (productId: string) => {
    updateProduct(productId, editFields);
    setEditingId(null);
    setEditFields({});
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || price <= 0 || !image) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const detailsArray = detailsText
      ? detailsText.split('\n').map(d => d.trim()).filter(Boolean)
      : [];

    addProduct({
      name,
      description,
      price,
      originalPrice: originalPrice && originalPrice > 0 ? originalPrice : undefined,
      category,
      image,
      inStock,
      tag,
      details: detailsArray.length > 0 ? detailsArray : undefined
    });

    // Reset Form
    setName('');
    setDescription('');
    setPrice(0);
    setOriginalPrice(undefined);
    setCategory('parfums');
    setImage('');
    setInStock(true);
    setTag(undefined);
    setDetailsText('');
    setIsAdding(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8" id="admin-panel-view">
      
      {/* Upper Navigation & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-pink-100/50 pb-6 mb-8">
        <div>
          <button 
            onClick={() => navigateTo('home')}
            className="inline-flex items-center gap-1 text-xs text-pink-700 hover:text-pink-900 font-bold uppercase tracking-wider mb-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Retour à la boutique
          </button>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-pink-950 flex items-center gap-2">
            <Package className="w-7 h-7 text-pink-700" /> Gestion du Catalogue & Stocks
          </h2>
          <p className="text-xs text-gray-500 font-medium leading-relaxed mt-1">
            Ajoutez de nouveaux articles ou mettez à jour leur disponibilité en temps réel.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="px-5 py-2.5 bg-pink-900 hover:bg-pink-850 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md cursor-pointer flex items-center gap-2 transition-all"
            id="admin-add-product-toggle"
          >
            <PlusCircle className="w-4.5 h-4.5" />
            {isAdding ? 'Fermer le formulaire' : 'Ajouter un Produit'}
          </button>
          
          <button
            onClick={() => {
              if (confirm('Êtes-vous sûr de vouloir réinitialiser le catalogue par défaut ? Vos nouveaux produits seront effacés.')) {
                resetProducts();
              }
            }}
            className="px-4 py-2.5 border border-pink-200 hover:bg-pink-100/50 text-pink-850 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
            title="Restaurer la liste d'origine"
            id="admin-reset-products"
          >
            <RefreshCw className="w-4 h-4" /> Restaurer
          </button>
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <div className="bg-white/40 border border-pink-100/50 rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center text-pink-700 font-bold text-lg">
            {totalProducts}
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-pink-950">Total Produits</h4>
            <p className="text-[10px] text-gray-500 font-medium leading-none mt-1">dans votre catalogue local</p>
          </div>
        </div>
        
        <div className="bg-white/40 border border-pink-100/50 rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-lg">
            {availableCount}
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-pink-950">Disponibles (En Stock)</h4>
            <p className="text-[10px] text-gray-500 font-medium leading-none mt-1">visibles et achetables</p>
          </div>
        </div>

        <div className="bg-white/40 border border-pink-100/50 rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center text-rose-750 font-bold text-lg">
            {outOfStockCount}
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-pink-950">Rupture de Stock</h4>
            <p className="text-[10px] text-gray-500 font-medium leading-none mt-1">marqués comme indisponibles</p>
          </div>
        </div>
      </div>

      {/* FORM: Create Product (Collapsible panel) */}
      {isAdding && (
        <div className="bg-white/50 backdrop-blur-md border border-pink-100/50 rounded-2xl p-6 sm:p-8 mb-8 shadow-lg animate-fadeIn">
          <h3 className="font-serif text-lg font-bold text-pink-950 mb-5 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-pink-700" /> Nouveau Produit
          </h3>

          <form onSubmit={handleCreateProduct} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Product Name */}
              <div className="flex flex-col">
                <label className="text-xs font-bold uppercase tracking-wider text-pink-950 mb-1.5">
                  Nom du Produit <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Palette Rose Satinée Premium"
                  className="w-full px-4 py-3 bg-white border border-pink-150 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-pink-500 placeholder-pink-300"
                />
              </div>

              {/* Category selector */}
              <div className="flex flex-col">
                <label className="text-xs font-bold uppercase tracking-wider text-pink-950 mb-1.5">
                  Catégorie de l'article <span className="text-rose-500">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as CategoryType)}
                  className="w-full px-4 py-3 bg-white border border-pink-150 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-pink-500 text-pink-950 cursor-pointer"
                >
                  <option value="parfums">Parfums</option>
                  <option value="cosmetiques">Cosmétiques</option>
                  <option value="vetements">Vêtements</option>
                  <option value="sacs">Sacs</option>
                  <option value="montres">Montres</option>
                </select>
              </div>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              
              {/* Price */}
              <div className="flex flex-col">
                <label className="text-xs font-bold uppercase tracking-wider text-pink-950 mb-1.5">
                  Prix de Vente (DH) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={price || ''}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  placeholder="Ex: 340"
                  className="w-full px-4 py-3 bg-white border border-pink-150 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-pink-500"
                />
              </div>

              {/* Original Price */}
              <div className="flex flex-col">
                <label className="text-xs font-bold uppercase tracking-wider text-pink-950 mb-1.5">
                  Prix d'origine (DH) <span className="text-gray-400 font-normal">(Optionnel pour Promo)</span>
                </label>
                <input
                  type="number"
                  min="0"
                  value={originalPrice || ''}
                  onChange={(e) => setOriginalPrice(e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="Ex: 480"
                  className="w-full px-4 py-3 bg-white border border-pink-150 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-pink-500"
                />
              </div>

              {/* Label/Tag */}
              <div className="flex flex-col">
                <label className="text-xs font-bold uppercase tracking-wider text-pink-950 mb-1.5">
                  Badge de mise en valeur
                </label>
                <select
                  value={tag || ''}
                  onChange={(e) => setTag(e.target.value ? e.target.value as any : undefined)}
                  className="w-full px-4 py-3 bg-white border border-pink-150 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-pink-500 text-pink-950 cursor-pointer"
                >
                  <option value="">Aucun badge</option>
                  <option value="Nouveau">Nouveau</option>
                  <option value="Promo">Promo</option>
                  <option value="Best Seller">Best Seller</option>
                  <option value="Exclusif">Exclusif</option>
                </select>
              </div>

            </div>

            {/* Product description */}
            <div className="flex flex-col col-span-2">
              <label className="text-xs font-bold uppercase tracking-wider text-pink-950 mb-1.5">
                Description de l'article <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Décrivez l'article avec passion pour donner envie d'acheter..."
                className="w-full px-4 py-3 bg-white border border-pink-150 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-pink-500 resize-none"
              />
            </div>

            {/* Optional Specifications */}
            <div className="flex flex-col">
              <label className="text-xs font-bold uppercase tracking-wider text-pink-950 mb-1.5">
                Détails ou caractéristiques <span className="text-gray-400 font-normal">(Une ligne par détail)</span>
              </label>
              <textarea
                rows={3}
                value={detailsText}
                onChange={(e) => setDetailsText(e.target.value)}
                placeholder="Exemple :&#10;Inclus un flacon élégant 100ml&#10;Tenu longue durée assurée de 24h&#10;Composition bio et naturelle à 98%"
                className="w-full px-4 py-3 bg-white border border-pink-150 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-pink-500 resize-none placeholder-gray-400"
              />
            </div>

            {/* Image link selection with dynamic shortcuts */}
            <div className="space-y-2 border-t border-pink-100/40 pt-4">
              <div className="flex flex-col">
                <label className="text-xs font-bold uppercase tracking-wider text-pink-950 mb-1.5">
                  Lien URL de l'image <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-pink-400">
                    <ImageIcon className="w-4 h-4" />
                  </span>
                  <input
                    type="url"
                    required
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="Saisissez l'URL d'une image ou cliquez sur un modèle ci-dessous..."
                    className="w-full pl-11 pr-4 py-3 bg-white border border-pink-150 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-pink-500 placeholder-pink-300"
                  />
                </div>
              </div>

              {/* Fast Visual Presets selection */}
              <div>
                <p className="text-[10px] uppercase tracking-wider font-bold text-pink-850 mb-2">
                  Idée : Choix rapide d'images de modèle (Unsplash de haute qualité) :
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {PRESET_IMAGES.map((preset, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setImage(preset.url)}
                      className={`px-3 py-1.5 text-[10px] font-semibold tracking-wider rounded-lg border transition-all cursor-pointer ${
                        image === preset.url
                          ? 'bg-pink-100 border-pink-500 text-pink-900 font-bold scale-105'
                          : 'bg-white/80 border-pink-100 hover:bg-pink-50/50 text-pink-850'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Form actions submit / dismiss */}
            <div className="flex justify-end gap-3 border-t border-pink-100/40 pt-5">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-5 py-3 border border-pink-150 text-pink-850 font-semibold uppercase text-xs tracking-wider rounded-xl hover:bg-pink-50/50 transition-all cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-pink-900 hover:bg-pink-800 text-white font-bold uppercase text-xs tracking-wider rounded-xl shadow-md cursor-pointer flex items-center gap-1.5 hover:scale-[1.01] active:translate-y-0.5"
              >
                <Plus className="w-4 h-4" /> Enregistrer le produit
              </button>
            </div>

          </form>
        </div>
      )}

      {/* FILTER BAR FOR CATOLOG DATA */}
      <div className="bg-white/40 border border-pink-100/50 rounded-2xl p-4 mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-pink-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher par nom ou référence de produit..."
            className="w-full pl-11 pr-4 py-2.5 bg-white border border-pink-150 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-pink-500"
          />
        </div>

        {/* Category filter pills */}
        <div className="flex flex-wrap gap-2">
          {['all', 'parfums', 'cosmetiques', 'vetements', 'sacs', 'montres'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl border transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-pink-950 border-pink-950 text-white shadow-sm shadow-pink-950/20'
                  : 'bg-white/80 border-pink-100 text-pink-900 hover:bg-pink-100/30'
              }`}
            >
              {cat === 'all' ? 'Toutes catégories' : cat}
            </button>
          ))}
        </div>

      </div>

      {/* TABLE/LIST CATALOG CONTENT */}
      <div className="bg-white/30 border border-pink-100/50 rounded-3xl overflow-hidden shadow-lg backdrop-blur-md">
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-pink-100/50 bg-white/40 text-[10px] font-extrabold uppercase tracking-widest text-pink-950">
                <th className="p-4 text-center w-16">Visuel</th>
                <th className="p-4">Identifiant / Détails</th>
                <th className="p-4">Catégorie</th>
                <th className="p-4">Prix de Vente</th>
                <th className="p-4 text-center w-36">État du Stock</th>
                <th className="p-4 text-center w-32">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-100/30">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((p) => {
                  const isEditing = editingId === p.id;
                  
                  return (
                    <tr 
                      key={p.id} 
                      className="hover:bg-white/50 transition-colors text-xs text-pink-950 font-normal"
                      id={`admin-table-row-${p.id}`}
                    >
                      {/* Image Preview Column */}
                      <td className="p-4 text-center">
                        <div className="w-11 h-14 bg-white/50 border border-pink-100 rounded-lg overflow-hidden mx-auto shadow-xs">
                          <img 
                            src={p.image} 
                            alt={p.name} 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </td>

                      {/* Info Details */}
                      <td className="p-4">
                        {isEditing ? (
                          <div className="space-y-1">
                            <input
                              type="text"
                              value={editFields.name || ''}
                              onChange={(e) => setEditFields(prev => ({ ...prev, name: e.target.value }))}
                              className="w-full px-3 py-1.5 bg-white border border-pink-150 rounded-xl font-semibold outline-none focus:ring-1 focus:ring-pink-500 shrink-0"
                            />
                            <div className="flex gap-2">
                              <select
                                value={editFields.tag || ''}
                                onChange={(e) => setEditFields(prev => ({ ...prev, tag: e.target.value ? e.target.value as any : undefined }))}
                                className="px-2 py-1 bg-white border border-pink-150 rounded-lg text-[10px] font-bold cursor-pointer"
                              >
                                <option value="">Pas de badge</option>
                                <option value="Nouveau">Nouveau</option>
                                <option value="Promo">Promo</option>
                                <option value="Best Seller">Best Seller</option>
                                <option value="Exclusif">Exclusif</option>
                              </select>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-serif text-sm font-bold text-pink-950 tracking-wide leading-snug">
                                {p.name}
                              </span>
                              {p.tag && (
                                <span className="inline-flex px-1.5 py-0.5 text-[8px] font-extrabold uppercase tracking-wider bg-pink-100 text-pink-700 rounded-md shadow-xs">
                                  {p.tag}
                                </span>
                              )}
                            </div>
                            <span className="font-mono text-[9px] text-pink-650 tracking-wider">REF: {p.id}</span>
                          </div>
                        )}
                      </td>

                      {/* Category field */}
                      <td className="p-4 font-bold uppercase tracking-widest text-[#C49A45] text-[10px]">
                        {p.category}
                      </td>

                      {/* Prices column */}
                      <td className="p-4">
                        {isEditing ? (
                          <div className="flex flex-col gap-1.5 max-w-[120px]">
                            <div className="flex items-center gap-1">
                              <span className="text-[10px] font-bold italic w-8 text-pink-700">Prix:</span>
                              <input
                                type="number"
                                min="0"
                                value={editFields.price || 0}
                                onChange={(e) => setEditFields(prev => ({ ...prev, price: Number(e.target.value) }))}
                                className="w-16 px-1.5 py-1 bg-white border border-pink-150 rounded-lg text-center"
                              />
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-[10px] font-bold italic w-8 text-gray-500">Orig:</span>
                              <input
                                type="number"
                                min="0"
                                value={editFields.originalPrice || ''}
                                onChange={(e) => setEditFields(prev => ({ ...prev, originalPrice: e.target.value ? Number(e.target.value) : undefined }))}
                                className="w-16 px-1.5 py-1 bg-white border border-pink-150 rounded-lg text-center"
                                placeholder="-"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col">
                            <span className="font-serif font-bold text-pink-950 text-sm">
                              {p.price} DH
                            </span>
                            {p.originalPrice && (
                              <span className="text-[10px] text-gray-400 font-semibold line-through">
                                {p.originalPrice} DH
                              </span>
                            )}
                          </div>
                        )}
                      </td>

                      {/* Stock Status Selector Column */}
                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleStockToggle(p.id, p.inStock)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest border transition-all cursor-pointer shadow-xs ${
                            p.inStock 
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100/50' 
                              : 'bg-rose-50 border-rose-200 text-rose-800 hover:bg-rose-100/50'
                          }`}
                          title={p.inStock ? 'Passer en rupture' : 'Rendre disponible'}
                        >
                          {p.inStock ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                              En stock
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3.5 h-3.5 text-rose-600" />
                              Rupture
                            </>
                          )}
                        </button>
                      </td>

                      {/* Row Actions Editor Panel */}
                      <td className="p-4 text-center">
                        {isEditing ? (
                          <div className="flex justify-center gap-1.5">
                            <button
                              onClick={() => saveEditProduct(p.id)}
                              className="p-1 px-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold transition-colors cursor-pointer flex items-center gap-1 text-[10px] uppercase shadow-xs"
                              title="Enregistrer"
                            >
                              <Save className="w-3 h-3" /> Sauver
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="p-1 px-2.5 border border-pink-200 hover:bg-pink-100 text-pink-800 rounded-lg font-semibold transition-colors cursor-pointer text-[10px] uppercase"
                              title="Annuler"
                            >
                              Annuler
                            </button>
                          </div>
                        ) : (
                          <div className="flex justify-center gap-1.5">
                            <button
                              onClick={() => startEditProduct(p)}
                              className="p-2 border border-pink-100 hover:bg-pink-150 text-pink-850 rounded-xl transition-all cursor-pointer shadow-xs bg-white"
                              title="Modifier les prix et info rapides"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Êtes-vous sûr de vouloir supprimer définitivement "${p.name}" du catalogue ?`)) {
                                  deleteProduct(p.id);
                                }
                              }}
                              className="p-2 border border-rose-100 hover:bg-rose-100 text-rose-700 rounded-xl transition-all cursor-pointer shadow-xs bg-white"
                              title="Supprimer ce produit"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-gray-500 font-medium">
                    <AlertCircle className="w-10 h-10 text-pink-700/60 mx-auto mb-3" />
                    Aucun article ne correspond à votre recherche ou catégorie sélectionnée.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* Order Management Tracker Section */}
      <div className="mt-12 bg-white/45 backdrop-blur-md border border-pink-100/60 p-6 rounded-3xl shadow-xl">
        <div className="border-b border-pink-100 pb-4 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-pink-950 flex items-center gap-2">
              <RefreshCw className="w-5.5 h-5.5 text-pink-700 animate-spin-slow" />
              Suivi & Traitement des Commandes clients (Admin)
            </h3>
            <p className="text-xs text-gray-500 font-medium leading-relaxed mt-1">
              Modifiez l'état de livraison de vos commandes. Cela mettra à jour en direct le "Suivi de Commande" de vos acheteurs.
            </p>
          </div>
        </div>

        {orders.length > 0 ? (
          <div className="overflow-x-auto rounded-xl border border-pink-100 bg-white/50">
            <table className="w-full text-left text-xs text-gray-700 border-collapse">
              <thead>
                <tr className="bg-pink-100/40 border-b border-pink-100 font-bold text-pink-950 uppercase tracking-widest text-[9px] text-center">
                  <th className="p-4 text-left">Référence No. & Date</th>
                  <th className="p-4 text-left">Client & Téléphone</th>
                  <th className="p-4 text-left">Ville & Adresse de dépôt</th>
                  <th className="p-4">Détails articles</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Statut livraison</th>
                  <th className="p-4">Actions de transition</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-pink-100/35">
                {orders.map((o) => {
                  const itemsCount = o.items.reduce((sum, i) => sum + i.quantity, 0);
                  const formattedDate = new Date(o.timestamp).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit'
                  });

                  return (
                    <tr key={o.id} className="hover:bg-white/40 transition-colors">
                      {/* Ref No. */}
                      <td className="p-4 text-center">
                        <div className="text-left font-serif text-[11px] font-bold text-pink-900 border border-pink-100 bg-white/80 p-1 px-2 rounded-lg inline-block select-all cursor-copy">#{o.id}</div>
                        <div className="text-[10px] text-pink-300 font-medium text-left mt-1">{formattedDate}</div>
                      </td>

                      {/* Client */}
                      <td className="p-4 text-left">
                        <p className="font-bold text-pink-950">{o.fullName}</p>
                        <p className="text-gray-500 text-[10px] select-all font-mono italic">{o.phone}</p>
                      </td>

                      {/* Ville & Adresse */}
                      <td className="p-4 text-left max-w-[180px]">
                        <p className="font-extrabold text-pink-900 select-all">{o.city}</p>
                        <p className="text-gray-500 font-normal leading-relaxed text-[10px] truncate" title={o.address}>{o.address}</p>
                      </td>

                      {/* Detail Panier */}
                      <td className="p-4 max-w-[190px]">
                        <div className="space-y-1 max-h-[85px] overflow-y-auto pr-1">
                          {o.items.map((item, idx) => (
                            <div key={idx} className="text-[10px] text-gray-700 leading-none">
                              • <span className="font-bold">{item.quantity}x</span> {item.product.name}
                            </div>
                          ))}
                        </div>
                      </td>

                      {/* Total */}
                      <td className="p-4 text-center font-bold text-pink-900 text-xs">
                        {o.total} DH
                      </td>

                      {/* Statut actuel */}
                      <td className="p-4 text-center">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-[9px] font-extrabold rounded-full border tracking-wide uppercase ${
                          o.status === 'pending'
                            ? 'bg-pink-50 border-pink-200 text-pink-850'
                            : o.status === 'preparation'
                            ? 'bg-amber-50 border-amber-200 text-amber-800'
                            : o.status === 'shipped'
                            ? 'bg-blue-50 border-blue-200 text-blue-800'
                            : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        }`}>
                          {o.status === 'pending' && 'Validation'}
                          {o.status === 'preparation' && 'Préparation'}
                          {o.status === 'shipped' && 'Expédié'}
                          {o.status === 'delivered' && 'Livré'}
                        </span>
                      </td>

                      {/* Live changes */}
                      <td className="p-4 text-center">
                        <div className="flex flex-wrap gap-1 items-center justify-center">
                          <button
                            onClick={() => updateOrderStatus(o.id, 'preparation')}
                            className={`p-1.5 px-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-[9px] font-bold uppercase cursor-pointer hover:-translate-y-0.5 transition-all ${o.status === 'preparation' ? 'opacity-40 pointer-events-none' : ''}`}
                            title="Passer en Préparation"
                          >
                            Préparer
                          </button>
                          <button
                            onClick={() => updateOrderStatus(o.id, 'shipped')}
                            className={`p-1.5 px-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-[9px] font-bold uppercase cursor-pointer hover:-translate-y-0.5 transition-all ${o.status === 'shipped' ? 'opacity-40 pointer-events-none' : ''}`}
                            title="Marquer comme Expédié"
                          >
                            Expédier
                          </button>
                          <button
                            onClick={() => updateOrderStatus(o.id, 'delivered')}
                            className={`p-1.5 px-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-[9px] font-bold uppercase cursor-pointer hover:-translate-y-0.5 transition-all ${o.status === 'delivered' ? 'opacity-40 pointer-events-none' : ''}`}
                            title="Confirmer la Livraison"
                          >
                            Livrer
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 font-medium">
            Aucune commande reçue à ce jour.
          </div>
        )}
      </div>

    </div>
  );
};
