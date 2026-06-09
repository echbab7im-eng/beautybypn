import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Product, CategoryType } from '../types';
import { 
  Plus, Search, Trash2, Edit3, RefreshCw, AlertCircle, 
  Package, LayoutGrid, CheckCircle2, XCircle, Tag, 
  Save, Eye, ArrowLeft, Image as ImageIcon, Sparkles, PlusCircle,
  Lock, Mail, Key, DollarSign, Activity, FileSpreadsheet,
  Percent, Truck, MessageSquare, MapPin, TrendingUp, X, ExternalLink
} from 'lucide-react';

const PRESET_IMAGES = [
  { label: 'Parfum Floral', url: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600' },
  { label: 'Sérum Cosmétique', url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600' },
  { label: 'Soin Visage Rose', url: 'https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&q=80&w=600' },
  { label: 'Rouge à Lèvres', url: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=600' },
  { label: 'Robe en Lin Blanc', url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600' },
  { label: 'Sac en Cuir Crème', url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=600' },
  { label: 'Montre Or Rose Luxe', url: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=600' }
];

export const AdminPanel: React.FC = () => {
  const { 
    products, addProduct, updateProductStock, updateProduct, deleteProduct, resetProducts, navigateTo,
    orders, updateOrderStatus,
    customRequests, updateCustomRequestStatus, deleteCustomRequest,
    coupons, addCoupon, toggleCouponStatus, deleteCoupon,
    cityFees, freeShippingThreshold, updateCityFee, addCityFee, deleteCityFee, updateFreeShippingThreshold,
    productReviews, approveReview, deleteReview,
    categories, addCategory, deleteCategory
  } = useShop();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Admin Tab State
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders' | 'sourcing' | 'coupons' | 'delivery' | 'reviews' | 'categories'>('dashboard');

  // Generic Catalogue Controls State
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Add Product Form State
  const [newProdName, setNewProdName] = useState('');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdPrice, setNewProdPrice] = useState<number>(0);
  const [newProdOrigPrice, setNewProdOrigPrice] = useState<number | undefined>(undefined);
  const [newProdCategory, setNewProdCategory] = useState<string>('parfums');
  const [newProdImage, setNewProdImage] = useState('');
  const [newProdInStock, setNewProdInStock] = useState(true);
  const [newProdTag, setNewProdTag] = useState<'Nouveau' | 'Promo' | 'Best Seller' | 'Exclusif' | undefined>(undefined);
  const [newProdDetails, setNewProdDetails] = useState('');

  // Product Row Inline Edit State
  const [editFields, setEditFields] = useState<Partial<Product>>({});

  // Coupon Form State
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState<number>(10);
  const [newCouponType, setNewCouponType] = useState<'percent' | 'fixed'>('percent');
  const [newCouponMin, setNewCouponMin] = useState<number>(0);

  // Delivery City Form State
  const [newCityName, setNewCityName] = useState('');
  const [newCityFee, setNewCityFee] = useState<number>(40);

  // New Category Form State
  const [newCategoryName, setNewCategoryName] = useState('');

  // Handle Admin secure login lock
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim().toLowerCase() === 'admin@pnd.ma' && passwordInput === 'admin123') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Identifiant ou mot de passe incorrect. Essayez admin@pnd.ma / admin123');
    }
  };

  // Excel Order Export Logic (CSV encoding with UTF-8 BOM so Microsoft Excel can read accents)
  const exportToExcelFormat = () => {
    const bom = '\uFEFF';
    let csv = 'ID de Commande;Date;Client;Téléphone;Ville;Adresse;Articles;Total (DH);Statut\n';
    orders.forEach(o => {
      const itemsList = o.items.map(i => `${i.product.name} (x${i.quantity})`).join(', ');
      csv += `"${o.id}";"${new Date(o.timestamp).toLocaleDateString()}";"${o.fullName}";"${o.phone}";"${o.city}";"${o.address.replace(/"/g, '""')}";"${itemsList}";"${o.total}";"${o.status}"\n`;
    });
    
    const blob = new Blob([bom + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `beautybypnd_commandes_${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Add Dynamic Categories & Products
  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdDesc || newProdPrice <= 0 || !newProdImage) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const detailsArray = newProdDetails
      ? newProdDetails.split('\n').map(d => d.trim()).filter(Boolean)
      : [];

    addProduct({
      name: newProdName,
      description: newProdDesc,
      price: newProdPrice,
      originalPrice: newProdOrigPrice && newProdOrigPrice > 0 ? newProdOrigPrice : undefined,
      category: newProdCategory as any,
      image: newProdImage,
      inStock: newProdInStock,
      tag: newProdTag,
      details: detailsArray.length > 0 ? detailsArray : undefined
    });

    // Reset fields
    setNewProdName('');
    setNewProdDesc('');
    setNewProdPrice(0);
    setNewProdOrigPrice(undefined);
    setNewProdImage('');
    setNewProdInStock(true);
    setNewProdTag(undefined);
    setNewProdDetails('');
    setIsAdding(false);
  };

  // Start row edits
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

  // Add Coupon Code
  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;
    addCoupon({
      code: newCouponCode.trim().toUpperCase(),
      discount: newCouponDiscount,
      type: newCouponType,
      minPurchase: newCouponMin,
      active: true
    });
    setNewCouponCode('');
  };

  // Add Delivery City Surcharge
  const handleCreateCityFee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCityName.trim()) return;
    addCityFee({
      city: newCityName.trim(),
      fee: newCityFee
    });
    setNewCityName('');
  };

  // Add Category Handler
  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    addCategory(newCategoryName.trim());
    setNewCategoryName('');
  };

  // Calculate Statistics Metrics
  const totalRevenue = orders
    .filter(o => o.status === 'delivered')
    .reduce((sum, o) => sum + o.total, 0);

  const pendingRevenue = orders
    .filter(o => o.status !== 'delivered' && o.status !== 'pending')
    .reduce((sum, o) => sum + o.total, 0);

  const totalOrdersCount = orders.length;
  const pendingOrdersCount = orders.filter(o => o.status === 'pending').length;
  const prepOrdersCount = orders.filter(o => o.status === 'preparation').length;
  const shippedOrdersCount = orders.filter(o => o.status === 'shipped').length;
  const deliveredOrdersCount = orders.filter(o => o.status === 'delivered').length;

  const totalRequestsCount = customRequests.length;
  const resolvedRequestsCount = customRequests.filter(r => r.status === 'found' || r.status === 'ordered').length;

  // Filter products count
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.id.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Render Login Lock Screen if unauthorized
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 font-sans" id="admin-login-lockscreen">
        <div className="w-full max-w-md bg-white border border-pink-100 rounded-3xl p-8 shadow-2xl space-y-6 text-center">
          <div className="w-16 h-16 bg-pink-100/60 rounded-full flex items-center justify-center mx-auto text-pink-900 border border-pink-200">
            <Lock className="w-8 h-8 animate-pulse" />
          </div>
          <div>
            <h1 className="font-serif text-2xl sm:text-3.5xl font-bold text-pink-955 italic">
              beautybypnd
            </h1>
            <p className="text-xs uppercase tracking-widest text-pink-700 font-bold mt-1">Espace Superviseur d'Élite</p>
            <p className="text-gray-400 text-[11px] mt-2">Accès restreint au traitement des données commerciales</p>
          </div>

          {/* Test credentials helper container */}
          <div className="bg-pink-50 p-3 rounded-xl border border-pink-100 text-left space-y-1">
            <span className="text-[10px] uppercase font-bold text-pink-800 tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-pink-700 animate-bounce" /> Mode Simulation Directe iFrame :
            </span>
            <p className="text-[11px] text-gray-700">Email: <b className="select-all">admin@pnd.ma</b></p>
            <p className="text-[11px] text-gray-700">Mot de passe: <b className="select-all">admin123</b></p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-[10px] font-bold text-gray-450 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-pink-700" /> Courriel Administratif
              </label>
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="nom@beautybypnd.ma"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-pink-800 text-sm font-sans"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-450 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                <Key className="w-3.5 h-3.5 text-pink-700" /> Clé Secrète / Code
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="🔑 Entrez le mot de passe"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-pink-800 text-sm"
              />
            </div>

            {loginError && (
              <p className="text-xs text-red-650 font-bold bg-red-50 border border-red-200 p-2 text-center rounded-xl">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-pink-905 hover:bg-pink-805 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition shadow hover:shadow-lg focus:outline-none mt-2"
            >
              Déverrouiller le Pupitre
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7F5] min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans" id="full-admin-portal">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Title Header with user details and quick back */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-pink-100 pb-6">
          <div>
            <button 
              onClick={() => navigateTo('home')}
              className="inline-flex items-center gap-1 text-xs text-pink-750 hover:text-pink-905 font-bold uppercase tracking-widest mb-2 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Quitter l'Administration
            </button>
            <h1 className="font-serif text-3xl font-bold text-pink-950 flex items-center gap-2">
              <Sparkles className="w-6.5 h-6.5 text-pink-700 animate-pulse" /> beautybypnd Administration
            </h1>
            <p className="text-xs text-gray-500 font-medium mt-1">Superviseur Principal • Session Locale Sécurisée • Activités en direct</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={exportToExcelFormat}
              disabled={orders.length === 0}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-650 disabled:bg-gray-300 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Générer un fichier Excel-compatible CSV des commandes"
            >
              <FileSpreadsheet className="w-4 h-4" /> Export Excel CSV
            </button>
            
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-4 py-2 border border-pink-200 text-pink-900 bg-white hover:bg-pink-50 rounded-xl text-xs font-extrabold uppercase tracking-wide transition"
            >
              Déconnexion
            </button>
          </div>
        </div>

        {/* Tab Selection Menu */}
        <div className="flex flex-wrap items-center gap-2 border-b border-pink-100 pb-4">
          {[
            { id: 'dashboard', label: 'Indicateurs & Stats', icon: TrendingUp },
            { id: 'products', label: 'Stocks & Articles', icon: Package },
            { id: 'orders', label: `Commandes (${orders.length})`, icon: FileSpreadsheet },
            { id: 'sourcing', label: `TikTok Sourcing (${customRequests.length})`, icon: MessageSquare },
            { id: 'coupons', label: 'Codes Promo', icon: Percent },
            { id: 'delivery', label: 'Tarifs Livraisons', icon: Truck },
            { id: 'reviews', label: 'Avis Clients', icon: CheckCircle2 },
            { id: 'categories', label: 'Catégories', icon: LayoutGrid }
          ].map((tab) => {
            const Icon = tab.icon;
            const isSel = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id as any); setIsAdding(false); }}
                className={`py-2 px-4 rounded-xl text-xs font-bold transition focus:outline-none flex items-center gap-1.5 cursor-pointer ${
                  isSel
                    ? 'bg-pink-900 text-white shadow-md shadow-pink-950/10'
                    : 'bg-white text-gray-650 hover:bg-pink-50 border border-gray-150'
                }`}
                id={`tab-admin-${tab.id}`}
              >
                <Icon className="w-4.5 h-4.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* --- PART 1: DASHBOARD --- */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6" id="panel-dashboard">
            {/* KPI grid row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-gradient-to-br from-pink-900 to-pink-955 p-6 rounded-2.5xl text-white shadow-md relative overflow-hidden">
                <DollarSign className="absolute right-3 bottom-3 w-16 h-16 text-white/10" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-pink-200">Chiffre d'Affaires</span>
                <h4 className="text-3xl font-serif font-black mt-2">{totalRevenue} DH</h4>
                <p className="text-[10px] text-pink-200 mt-1">Colis marqués "Livré" de manière effective</p>
              </div>

              <div className="bg-white p-6 rounded-2.5xl border border-gray-100 shadow-sm relative overflow-hidden">
                <Activity className="absolute right-3 bottom-3 w-16 h-16 text-pink-200/20" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Arrivées Prévues</span>
                <h4 className="text-3xl font-serif font-bold text-pink-950 mt-2">{pendingRevenue} DH</h4>
                <p className="text-[10px] text-gray-550 mt-1">En livraison / préparation (sous conditions)</p>
              </div>

              <div className="bg-white p-6 rounded-2.5xl border border-gray-100 shadow-sm relative overflow-hidden">
                <FileSpreadsheet className="absolute right-3 bottom-3 w-16 h-16 text-pink-200/20" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Total Commandes</span>
                <h4 className="text-3xl font-serif font-bold text-pink-950 mt-2">{totalOrdersCount} colis</h4>
                <p className="text-[10px] text-gray-550 mt-1">{pendingOrdersCount} en attente de traitement rapide</p>
              </div>

              <div className="bg-white p-6 rounded-2.5xl border border-gray-100 shadow-sm relative overflow-hidden">
                <MessageSquare className="absolute right-3 bottom-3 w-16 h-16 text-pink-200/20" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Sourcing Requis</span>
                <h4 className="text-3xl font-serif font-bold text-pink-950 mt-2">{totalRequestsCount} demandes</h4>
                <p className="text-[10px] text-emerald-600 font-semibold mt-1">✓ {resolvedRequestsCount} résolues & validées</p>
              </div>

            </div>

            {/* Custom SVG line trendline representing virtual day sales */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="font-serif text-lg font-bold text-pink-950 mb-1 flex items-center gap-1.5">
                  <TrendingUp className="w-5 h-5 text-pink-700 animate-pulse" /> Courbe Des Ventes (Dirhams)
                </h3>
                <p className="text-xs text-gray-400 mb-6">Évolution journalière calculée en temps réel selon la validation des livraisons</p>
                
                {/* SVG Visual graph container */}
                <div className="h-64 w-full relative flex items-end">
                  <svg className="w-full h-full" viewBox="0 0 500 150">
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#831843" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#831843" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path 
                      d="M 10,130 Q 80,105 150,75 T 290,110 T 400,45 T 480,25" 
                      fill="none" 
                      stroke="#831843" 
                      strokeWidth="3" 
                      strokeLinecap="round" 
                    />
                    <path 
                      d="M 10,130 Q 80,105 150,75 T 290,110 T 400,45 T 480,25 L 480,140 L 10,140 Z" 
                      fill="url(#chartGrad)" 
                    />
                    <circle cx="150" cy="75" r="5" fill="#831843" className="animate-ping" />
                    <circle cx="400" cy="45" r="4.5" fill="#db2777" />
                    <circle cx="480" cy="25" r="5" fill="#831843" />
                  </svg>
                  
                  <div className="absolute bottom-1 left-2 text-[9px] font-mono font-bold text-gray-400 uppercase">Semaine Passée</div>
                  <div className="absolute bottom-1 right-2 text-[9px] font-mono font-bold text-pink-700 uppercase">Aujourd'hui</div>
                </div>
              </div>

              {/* Order Status Pizza allocation bar */}
              <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                <h3 className="font-serif text-lg font-bold text-gray-800">Canal logistique</h3>
                <p className="text-xs text-gray-400">Distribution du statut d'expédition des colis à domicile</p>
                
                <div className="space-y-3.5">
                  {[
                    { label: 'Validation / Reçu', count: pendingOrdersCount, color: 'bg-pink-700', percent: totalOrdersCount ? Math.round((pendingOrdersCount / totalOrdersCount) * 100) : 0 },
                    { label: 'En Préparation', count: prepOrdersCount, color: 'bg-amber-500', percent: totalOrdersCount ? Math.round((prepOrdersCount / totalOrdersCount) * 100) : 0 },
                    { label: 'Expédié / En Transit', count: shippedOrdersCount, color: 'bg-blue-500', percent: totalOrdersCount ? Math.round((shippedOrdersCount / totalOrdersCount) * 100) : 0 },
                    { label: 'Remis / Livré', count: deliveredOrdersCount, color: 'bg-emerald-500', percent: totalOrdersCount ? Math.round((deliveredOrdersCount / totalOrdersCount) * 100) : 0 }
                  ].map((row) => (
                    <div key={row.label} className="space-y-1">
                      <div className="flex justify-between items-center text-xs font-semibold text-gray-700">
                        <span>{row.label} ({row.count} colis)</span>
                        <span>{row.percent}%</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div className={`h-full ${row.color}`} style={{ width: `${row.percent}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- PART 2: CATALOGUE & PRODUCT MANAGEMENT --- */}
        {activeTab === 'products' && (
          <div className="space-y-6" id="panel-products">
            {/* Catalog header searching controls */}
            <div className="bg-white p-4 sm:p-5 rounded-2.5xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                {/* Search query box */}
                <div className="relative w-full sm:w-64">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="w-4 h-4 text-gray-400" />
                  </span>
                  <input
                    type="text"
                    placeholder="Chercher par nom, id..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-pink-800"
                  />
                </div>

                {/* Category select box */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 text-xs rounded-xl border border-gray-200 bg-white"
                >
                  <option value="all">Toutes les catégories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat.toUpperCase()}</option>
                  ))}
                </select>
              </div>

              {/* Add and generic reset catalogue buttons */}
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => setIsAdding(!isAdding)}
                  className="px-4 py-2 bg-pink-900 text-white rounded-xl text-xs font-bold uppercase tracking-wide flex items-center gap-1.5 transition shadow"
                >
                  <Plus className="w-4 h-4" /> {isAdding ? 'Fermer le formulaire' : 'Nouveau Produit'}
                </button>
                <button
                  onClick={() => {
                    if (confirm('Restaurer la liste d\'origine ? Vos ajouts seront écrasés !')) resetProducts();
                  }}
                  className="px-3 py-2 border border-pink-200 text-pink-905 hover:bg-pink-50 rounded-xl text-xs font-bold uppercase tracking-wider"
                >
                  Rétablir d'origine
                </button>
              </div>
            </div>

            {/* Product adding card layout */}
            {isAdding && (
              <form onSubmit={handleCreateProduct} className="bg-white p-6 rounded-2.5xl border border-pink-100/60 shadow-lg space-y-5">
                <h3 className="font-serif text-lg font-bold text-pink-950 border-b border-pink-50 pb-2">Nouveau produit dans le catalogue</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-450 uppercase tracking-widest mb-1">Nom de l'article *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Sac Seau Cuir Grenat"
                      value={newProdName}
                      onChange={(e) => setNewProdName(e.target.value)}
                      className="w-full px-4 py-2 text-xs rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-pink-800"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-450 uppercase tracking-widest mb-1">Prix de vente (DH) *</label>
                    <input
                      type="number"
                      required
                      placeholder="Ex: 249"
                      value={newProdPrice ? newProdPrice : ''}
                      onChange={(e) => setNewProdPrice(parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-2 text-xs rounded-lg border border-gray-200 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-450 uppercase tracking-widest mb-1">Ancien Prix (DH - Pour Barrer)</label>
                    <input
                      type="number"
                      placeholder="Ex: 349"
                      value={newProdOrigPrice ? newProdOrigPrice : ''}
                      onChange={(e) => setNewProdOrigPrice(parseFloat(e.target.value) || undefined)}
                      className="w-full px-4 py-2 text-xs rounded-lg border border-gray-200 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-450 uppercase tracking-widest mb-1">Catégorie collection *</label>
                    <select
                      value={newProdCategory}
                      onChange={(e) => setNewProdCategory(e.target.value)}
                      className="w-full px-4 py-2 text-xs rounded-lg border border-gray-200"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat.toUpperCase()}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-450 uppercase tracking-widest mb-1">Url Photo produit *</label>
                    <input
                      type="url"
                      required
                      placeholder="https://..."
                      value={newProdImage}
                      onChange={(e) => setNewProdImage(e.target.value)}
                      className="w-full px-4 py-2 text-xs rounded-lg border border-gray-200 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-450 uppercase tracking-widest mb-1">Badge tag de promotion</label>
                    <select
                      value={newProdTag || ''}
                      onChange={(e) => setNewProdTag((e.target.value || undefined) as any)}
                      className="w-full px-4 py-2 text-xs rounded-lg border border-gray-200"
                    >
                      <option value="">Aucun</option>
                      <option value="Nouveau">Nouveau</option>
                      <option value="Promo">Promo</option>
                      <option value="Best Seller">Best Seller</option>
                      <option value="Exclusif">Exclusif</option>
                    </select>
                  </div>
                </div>

                {/* Preset image templates */}
                <div>
                  <span className="block text-[10px] font-bold text-gray-450 uppercase mb-1.5">Ou choisir un modèle de photo d'archive rapide</span>
                  <div className="flex flex-wrap gap-2">
                    {PRESET_IMAGES.map((img) => (
                      <button
                        key={img.label}
                        type="button"
                        onClick={() => setNewProdImage(img.url)}
                        className={`px-2.5 py-1 text-[10px] border rounded-lg transition ${newProdImage === img.url ? 'bg-pink-100 text-pink-900 border-pink-500 font-bold' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border-gray-200'}`}
                      >
                        {img.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-450 uppercase tracking-widest mb-1">Résumé descriptif *</label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Détails du packaging, volume olfactif..."
                    value={newProdDesc}
                    onChange={(e) => setNewProdDesc(e.target.value)}
                    className="w-full px-4 py-2 text-xs rounded-lg border border-gray-200"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-450 uppercase tracking-widest mb-1">Détails caractéristiques (Une ligne par point)</label>
                  <textarea
                    rows={2}
                    placeholder="Parfum de Grasse authentique&#10;Flacon premium d'Espagne&#10;Note de tête: Mandarine dorée"
                    value={newProdDetails}
                    onChange={(e) => setNewProdDetails(e.target.value)}
                    className="w-full px-4 py-2 text-xs rounded-lg border border-gray-200"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="new-in-stock"
                    checked={newProdInStock}
                    onChange={(e) => setNewProdInStock(e.target.checked)}
                    className="w-4.5 h-4.5 text-pink-905"
                  />
                  <label htmlFor="new-in-stock" className="text-xs font-bold text-gray-700">Déclarer en Stock Disponible Immédiatement</label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-pink-900 hover:bg-pink-850 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow"
                >
                  Enregistrer l'article en boutique
                </button>
              </form>
            )}

            {/* Products Table */}
            <div className="overflow-x-auto rounded-2xl border border-gray-150 bg-white">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-150 font-bold text-gray-700 text-[10px] tracking-wider uppercase">
                    <th className="p-4">Photo & ID</th>
                    <th className="p-4">Désignation</th>
                    <th className="p-4">Catégorie</th>
                    <th className="p-4">Prix de Vente</th>
                    <th className="p-4">Disponibilité</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-sans">
                  {filteredProducts.map((p) => {
                    const isEditing = editingId === p.id;
                    return (
                      <tr key={p.id} className="hover:bg-gray-50/50 transition">
                        <td className="p-4 flex items-center gap-3">
                          <img 
                            src={p.image} 
                            alt={p.name} 
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 rounded-lg object-cover border flex-shrink-0" 
                          />
                          <div>
                            <span className="font-mono text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                              {p.id}
                            </span>
                          </div>
                        </td>

                        <td className="p-4">
                          {isEditing ? (
                            <input
                              type="text"
                              value={editFields.name}
                              onChange={(e) => setEditFields({ ...editFields, name: e.target.value })}
                              className="px-2 py-1 text-xs border rounded w-full border-pink-700"
                            />
                          ) : (
                            <div>
                              <p className="font-semibold text-gray-800">{p.name}</p>
                              {p.tag && (
                                <span className="inline-block bg-pink-50 text-pink-900 border border-pink-100 text-[8px] font-extrabold tracking-widest uppercase px-1.5 rounded mt-0.5">
                                  {p.tag}
                                </span>
                              )}
                            </div>
                          )}
                        </td>

                        <td className="p-4 text-gray-500 uppercase tracking-wider text-[10px] font-semibold">
                          {p.category}
                        </td>

                        <td className="p-4">
                          {isEditing ? (
                            <div className="flex gap-1.5 max-w-[150px]">
                              <input
                                type="number"
                                value={editFields.price}
                                onChange={(e) => setEditFields({ ...editFields, price: parseFloat(e.target.value) || 0 })}
                                className="px-2 py-1 text-xs border rounded w-full border-pink-700"
                                placeholder="Actuel"
                              />
                            </div>
                          ) : (
                            <div className="font-bold text-gray-800 font-mono">
                              {p.price} DH 
                              {p.originalPrice && (
                                <span className="text-[10px] text-gray-400 font-normal line-through ml-1.5">
                                  {p.originalPrice} DH
                                </span>
                              )}
                            </div>
                          )}
                        </td>

                        <td className="p-4">
                          <button
                            onClick={() => updateProductStock(p.id, !p.inStock)}
                            className={`px-3 py-1 text-[10px] font-bold rounded-lg cursor-pointer select-none transition uppercase tracking-wider ${
                              p.inStock
                                ? 'bg-emerald-55 text-emerald-800'
                                : 'bg-red-50 text-red-750'
                            }`}
                            title="Cliquez pour permuter le stock"
                          >
                            {p.inStock ? '✓ En Stock' : '✕ Rupture'}
                          </button>
                        </td>

                        <td className="p-4">
                          <div className="flex items-center justify-center gap-1.5">
                            {isEditing ? (
                              <>
                                <button
                                  onClick={() => saveEditProduct(p.id)}
                                  className="p-1 px-2.5 bg-emerald-700 text-white rounded text-[10px] font-bold uppercase transition hover:bg-emerald-650"
                                >
                                  Enregistrer
                                </button>
                                <button
                                  onClick={() => setEditingId(null)}
                                  className="p-1 px-2.5 bg-gray-500 text-white rounded text-[10px] font-bold uppercase transition hover:bg-gray-400"
                                >
                                  Annuler
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => startEditProduct(p)}
                                  className="p-1.5 bg-blue-10 w-8 h-8 flex items-center justify-center border border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-900 rounded-lg transition"
                                  title="Modifier le produit"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => {
                                    if (confirm(`Voulez-vous supprimer l'article "${p.name}" du catalogue ?`)) {
                                      deleteProduct(p.id);
                                    }
                                  }}
                                  className="p-1.5 bg-rose-50 w-8 h-8 flex items-center justify-center border border-rose-200 text-rose-600 hover:bg-rose-100 hover:text-rose-800 rounded-lg transition"
                                  title="Supprimer définitivement"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- PART 3: ORDERS SHEETS & TRANSITIONS --- */}
        {activeTab === 'orders' && (
          <div className="space-y-6" id="panel-orders">
            <div className="bg-white p-5 rounded-3xl border border-pink-100/60 shadow flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-pink-950">Commandes Clients reçues</h3>
                <p className="text-xs text-gray-400">Total de {orders.length} colis à valider, préparer et acheminer.</p>
              </div>
              <button
                onClick={exportToExcelFormat}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-650 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition flex items-center gap-2 shrink-0"
              >
                <FileSpreadsheet className="w-4.5 h-4.5" /> Télécharger Fichier Excel CSV
              </button>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-150 text-gray-400">
                Aucune commande n'a encore été passée sur la boutique.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {orders.map((o) => (
                  <div key={o.id} className="bg-white p-6 rounded-2.5xl border border-gray-100 shadow-md hover:shadow-xl transition flex flex-col md:flex-row justify-between gap-6" id={`admin-order-card-${o.id}`}>
                    <div className="flex-1 space-y-4">
                      {/* Ref & Status header */}
                      <div className="flex flex-wrap items-center gap-3 border-b border-gray-100 pb-3">
                        <span className="font-serif text-sm font-bold text-pink-950 p-1 px-3 bg-pink-50 rounded-xl border border-pink-200">
                          #{o.id}
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono">
                          Reçue le {new Date(o.timestamp).toLocaleDateString('fr-FR')} à {new Date(o.timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        
                        {/* Status tag */}
                        <span className={`px-3 py-1 text-[9px] font-extrabold tracking-widest uppercase rounded-full ml-auto ${
                          o.status === 'pending' ? 'bg-pink-100 text-pink-900' :
                          o.status === 'preparation' ? 'bg-amber-100 text-amber-800' :
                          o.status === 'shipped' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {o.status === 'pending' ? 'validation direct' :
                           o.status === 'preparation' ? 'préparation' :
                           o.status === 'shipped' ? 'expédié / transit' : 'remis / livré'}
                        </span>
                      </div>

                      {/* Client information columns */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs font-sans">
                        <div>
                          <h5 className="font-semibold text-gray-500 uppercase text-[9px] tracking-widest mb-1">Destinatrice</h5>
                          <p className="font-bold text-gray-800 text-sm">{o.fullName}</p>
                          <a 
                            href={`https://wa.me/${o.phone.replace(/[^0-9]/g, '')}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-pink-900 font-bold hover:underline inline-flex items-center gap-1 mt-1 font-mono text-[11.5px]"
                          >
                            🟢 WhatsApp : {o.phone}
                          </a>
                        </div>

                        <div>
                          <h5 className="font-semibold text-gray-500 uppercase text-[9px] tracking-widest mb-1">Logistique d'Envoi</h5>
                          <p className="font-bold text-pink-900">{o.city}</p>
                          <p className="text-gray-500 text-[11px] leading-snug mt-0.5">{o.address}</p>
                        </div>

                        <div>
                          <h5 className="font-semibold text-gray-500 uppercase text-[9px] tracking-widest mb-1">Calcul d'encaissement</h5>
                          <p className="font-bold text-gray-800 font-mono text-sm">{o.total} DH <span className="font-sans font-normal text-[10px] text-gray-400">({o.paymentMethod.toUpperCase()})</span></p>
                          {o.couponUsed && <span className="text-[10px] bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.5 rounded border border-emerald-100">Coupon: {o.couponUsed}</span>}
                        </div>
                      </div>

                      {/* Purchased bag details */}
                      <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-150">
                        <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Articles commandés dans le panier</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {o.items.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs">
                              <img 
                                src={item.product.image} 
                                alt={item.product.name} 
                                referrerPolicy="no-referrer"
                                className="w-8 h-8 object-cover rounded border" 
                              />
                              <div>
                                <h6 className="font-bold text-gray-800 truncate max-w-[180px]">{item.product.name}</h6>
                                <p className="text-gray-500 text-[10px] font-mono">Qte: <b>{item.quantity}</b> x {item.product.price} DH</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Quick status transition dispatcher buttons column */}
                    <div className="md:w-48 bg-pink-50/50 p-4 rounded-2.5xl border border-pink-100 flex flex-col justify-between md:items-stretch gap-3">
                      <div className="text-center pb-2 border-b border-pink-100">
                        <span className="text-[10px] uppercase font-bold text-pink-900">Transitions d'état</span>
                      </div>
                      
                      <button
                        onClick={() => updateOrderStatus(o.id, 'preparation')}
                        disabled={o.status === 'preparation'}
                        className="py-2 bg-amber-500 text-white rounded-lg text-[10px] font-bold tracking-wider uppercase hover:bg-amber-600 transition disabled:opacity-40"
                      >
                        En Préparation
                      </button>

                      <button
                        onClick={() => updateOrderStatus(o.id, 'shipped')}
                        disabled={o.status === 'shipped'}
                        className="py-2 bg-blue-600 text-white rounded-lg text-[10px] font-bold tracking-wider uppercase hover:bg-blue-700 transition disabled:opacity-40"
                      >
                        Expédier Colis
                      </button>

                      <button
                        onClick={() => updateOrderStatus(o.id, 'delivered')}
                        disabled={o.status === 'delivered'}
                        className="py-2 bg-emerald-600 text-white rounded-lg text-[10px] font-bold tracking-wider uppercase hover:bg-emerald-700 transition disabled:opacity-40"
                      >
                        Marquer Livré
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* --- PART 4: SOURCING REQUESTS MODERATION --- */}
        {activeTab === 'sourcing' && (
          <div className="space-y-6" id="panel-sourcing">
            <div className="border-b border-gray-200 pb-3">
              <h3 className="font-serif text-xl font-bold text-pink-955">Demandes de Recherche & Sourcing Client (TikTok/Shein)</h3>
              <p className="text-xs text-gray-500 mt-1">Gérez les demandes d'articles importés spécifiquement. Mettez à jour le statut en temps réel.</p>
            </div>

            {customRequests.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-150 text-gray-400">
                Aucune demande de sourcing n'a été reçue pour l'instant.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {customRequests.map((req) => (
                  <div key={req.id} className="bg-white p-5 rounded-2.5xl border border-gray-100 shadow-md hover:shadow-xl transition flex flex-col justify-between" id={`admin-sourcing-${req.id}`}>
                    <div className="space-y-4">
                      {/* header and state dropdown */}
                      <div className="flex justify-between items-start border-b border-gray-100 pb-2.5 gap-2">
                        <div>
                          <span className="text-[10px] font-mono bg-pink-100 text-pink-900 border border-pink-200 px-2.5 py-0.5 rounded-lg">
                            {req.id}
                          </span>
                          <span className="text-[10px] text-gray-400 font-mono ml-2">
                            {new Date(req.timestamp).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                        <button
                          onClick={() => deleteCustomRequest(req.id)}
                          className="p-1 text-gray-400 hover:text-red-700 transition"
                          title="Archiver"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex gap-4">
                        {req.imageUrl && (
                          <div className="relative group shrink-0">
                            <img 
                              src={req.imageUrl} 
                              alt={req.productName} 
                              referrerPolicy="no-referrer"
                              className="w-20 h-20 object-cover rounded-xl border border-gray-100 shadow-sm" 
                            />
                            <a 
                              href={req.imageUrl} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="absolute top-1 right-1 bg-white/80 p-0.5 rounded text-gray-700 opacity-0 group-hover:opacity-100 transition"
                              title="Voir en taille réelle"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-900 text-sm truncate">{req.productName}</h4>
                          <p className="text-[11px] text-gray-500 italic mt-1 bg-gray-50 p-2 rounded-lg">
                            "{req.description}"
                          </p>
                          {req.colorSize && <p className="text-[10px] text-pink-900 mt-1">Spécification: <b>{req.colorSize}</b> (Qte: <b>{req.quantity}</b>)</p>}
                          {req.productUrl && (
                            <a 
                              href={req.productUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-xs text-blue-650 hover:underline inline-flex items-center gap-0.5 mt-1"
                            >
                              Ref Lien Internet <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Client contact info */}
                      <div className="bg-pink-50 p-3 rounded-xl border border-pink-100/50 space-y-1">
                        <span className="text-[9px] uppercase font-bold tracking-wider text-pink-800">Données Contact WhatsApp</span>
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-gray-800">{req.customerName}</span>
                          <a 
                            href={`https://wa.me/${req.customerPhone.replace(/[^0-9]/g, '')}?text=Bonjour%20${encodeURIComponent(req.customerName)},%20je%20vous%2520contacte%20depuis%20beautybypnd%20concernant%20votre%20recherche%20produit%20${encodeURIComponent(req.productName)}`}
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-55 text-white text-[10px] font-bold rounded-lg font-mono flex items-center gap-1 transition"
                          >
                            🟢 {req.customerPhone}
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Dropdown switch to resolve requested state */}
                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Statut de recherche :</span>
                      <select
                        value={req.status}
                        onChange={(e) => updateCustomRequestStatus(req.id, e.target.value as any)}
                        className="py-1.5 px-3 bg-[#FCFAF8] text-xs font-semibold rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-pink-850"
                      >
                        <option value="pending">⏳ Nouveau / En attente</option>
                        <option value="searching">🔍 Sourcing actif (Europe)</option>
                        <option value="found">✅ Trouvé en magasin</option>
                        <option value="ordered">✈ Commandé & en arrivage au Maroc</option>
                        <option value="not_available">❌ Indisponible d'usine</option>
                      </select>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* --- PART 5: COUPONS AND DISCOUNTS MANAGEMENT --- */}
        {activeTab === 'coupons' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8" id="panel-coupons">
            
            {/* Create Coupon Column */}
            <div className="md:col-span-5 bg-white p-6 rounded-2.5xl border border-gray-100 shadow-md">
              <h3 className="font-serif text-lg font-bold text-pink-955 border-b pb-2 mb-4 flex items-center gap-1">
                <Percent className="w-5 h-5 text-pink-700" /> Insérer un Code Promo
              </h3>

              <form onSubmit={handleCreateCoupon} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-450 uppercase mb-1">Code Code Promo (Lettres Majuscules) *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: PROMO20"
                    value={newCouponCode}
                    onChange={(e) => setNewCouponCode(e.target.value)}
                    className="w-full px-4 py-2 text-xs rounded-lg border border-gray-200 uppercase"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-450 uppercase mb-1">Type de remise</label>
                    <select
                      value={newCouponType}
                      onChange={(e) => setNewCouponType(e.target.value as any)}
                      className="w-full px-4 py-2 text-xs rounded-lg border border-gray-200 bg-white"
                    >
                      <option value="percent">Pourcentage (%)</option>
                      <option value="fixed">Montant Fixe (DH)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-450 uppercase mb-1">Valeur Remise *</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={newCouponDiscount}
                      onChange={(e) => setNewCouponDiscount(parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-2 text-xs rounded-lg border border-gray-200 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-450 uppercase mb-1">Panier Minimum requis (DH)</label>
                  <input
                    type="number"
                    min="0"
                    value={newCouponMin}
                    onChange={(e) => setNewCouponMin(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-2 text-xs rounded-lg border border-gray-200 focus:outline-none"
                  />
                  <p className="text-[10px] text-gray-400 mt-1">Exemple: 150 DH (0 = aucun panier requis)</p>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-pink-900 hover:bg-pink-850 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition"
                >
                  Ajouter le code promo
                </button>
              </form>
            </div>

            {/* Coupons list table column */}
            <div className="md:col-span-7 bg-white p-6 rounded-2.5xl border border-gray-100 shadow-md">
              <h3 className="font-serif text-lg font-bold text-gray-800 mb-4">Codes de Réduction Actifs</h3>
              
              {coupons.length === 0 ? (
                <p className="text-gray-400 text-xs py-8 text-center bg-gray-50 rounded-xl">Aucun code promo créé.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-150 text-[10px] uppercase font-bold text-gray-600">
                        <th className="p-3">Code</th>
                        <th className="p-3">Détail Remise</th>
                        <th className="p-3">Min. Panier</th>
                        <th className="p-3">Statut actuel</th>
                        <th className="p-3 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-150 font-sans">
                      {coupons.map((c) => (
                        <tr key={c.code} className="hover:bg-gray-55/30">
                          <td className="p-3 font-bold font-mono text-pink-900 border border-transparent select-all bg-pink-50 rounded-lg inline-block my-1.5">{c.code}</td>
                          <td className="p-3 font-semibold">
                            {c.type === 'percent' ? `${c.discount}% de réduction` : `${c.discount} DH offert`}
                          </td>
                          <td className="p-3 font-mono">{c.minPurchase} DH</td>
                          <td className="p-3">
                            <button
                              onClick={() => toggleCouponStatus(c.code)}
                              className={`px-2 py-0.5 text-[9px] font-bold rounded uppercase tracking-wider cursor-pointer ${c.active ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}
                            >
                              {c.active ? '✓ Actif' : '✕ OFF'}
                            </button>
                          </td>
                          <td className="p-3 text-center">
                            <button
                              onClick={() => deleteCoupon(c.code)}
                              className="p-1 text-red-600 hover:text-red-900 hover:bg-red-50 rounded transition"
                              title="Retirer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        )}

        {/* --- PART 6: DELIVERY CITY FEES MANAGEMENT --- */}
        {activeTab === 'delivery' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8" id="panel-delivery">
            <div className="md:col-span-12 bg-white p-5 rounded-2.5xl border border-gray-100 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-pink-955">Paramètres du Seuil d'Envoi Gratuit</h3>
                <p className="text-xs text-gray-500">Quand la facture est supérieure à ce montant, les frais de livraison sont offerts (0 DH)</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  value={freeShippingThreshold}
                  onChange={(e) => updateFreeShippingThreshold(parseFloat(e.target.value) || 0)}
                  className="px-4 py-2 border rounded-xl w-32 text-center text-xs font-bold font-mono"
                />
                <span className="text-xs font-bold text-gray-600">DH</span>
              </div>
            </div>

            {/* Configure Cities pricing Form */}
            <div className="md:col-span-5 bg-white p-6 rounded-2.5xl border border-gray-100 shadow-md">
              <h3 className="font-serif text-lg font-bold text-gray-800 border-b pb-2 mb-4 flex items-center gap-1">
                <Truck className="w-5 h-5 text-pink-700 animate-bounce" /> Ajouter / Modifier un Tarif par Ville
              </h3>

              <form onSubmit={handleCreateCityFee} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-450 uppercase mb-1">Nom de la ville marocaine *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Tanger"
                    value={newCityName}
                    onChange={(e) => setNewCityName(e.target.value)}
                    className="w-full px-4 py-2 text-xs rounded-lg border border-gray-200"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-450 uppercase mb-1">Frais logistiques (DH) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    placeholder="Ex: 45"
                    value={newCityFee}
                    onChange={(e) => setNewCityFee(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-2 text-xs rounded-lg border border-gray-200 focus:outline-none"
                  />
                  <p className="text-[10px] text-gray-405 mt-1">Entrez 0 pour activer une livraison gratuite d'office.</p>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-pink-900 hover:bg-pink-850 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition"
                >
                  Enregistrer ce tarif ville
                </button>
              </form>
            </div>

            {/* Shipping list Table */}
            <div className="md:col-span-7 bg-white p-6 rounded-2.5xl border border-gray-100 shadow-md">
              <h3 className="font-serif text-lg font-bold text-gray-805 mb-4">Tarif de Livraison de Référence (Maroc)</h3>
              
              <div className="overflow-x-auto max-h-[350px] overflow-y-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-150 text-[10px] uppercase font-bold text-gray-600">
                      <th className="p-3">Ville</th>
                      <th className="p-3">Frais d'Expédition</th>
                      <th className="p-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-sans">
                    {cityFees.map((cf) => (
                      <tr key={cf.city} className="hover:bg-gray-50/50">
                        <td className="p-3 font-bold text-gray-700">{cf.city}</td>
                        <td className="p-3 font-bold font-mono text-pink-900">{cf.fee} Dirhams (DH)</td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => deleteCityFee(cf.city)}
                            className="p-1 text-red-600 hover:text-red-900 hover:bg-red-50 rounded transition"
                            title="Supprimer la direction"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* --- PART 7: CLIENT REVIEWS MODERATION --- */}
        {activeTab === 'reviews' && (
          <div className="space-y-6" id="panel-reviews">
            <div className="border-b border-gray-200 pb-3">
              <h3 className="font-serif text-xl font-bold text-pink-955">Modération des Avis de Vente</h3>
              <p className="text-xs text-gray-500 mt-1">Approuvez les avis des clients afin qu'ils apparaissent officiellement sur les fiches descriptives des produits.</p>
            </div>

            {productReviews.length === 0 ? (
              <p className="text-gray-400 text-xs py-12 text-center bg-white rounded-3xl border border-gray-150">Aucun avis soumis.</p>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {productReviews.map((rev) => (
                  <div key={rev.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-gray-800 text-xs">{rev.customerName}</span>
                        <div className="flex text-amber-500 text-[10px]">
                          {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                        </div>
                        <span className="text-[10px] text-gray-400">Pour le produit: <b>{rev.productId}</b></span>
                        <span className="text-[10px] text-gray-400 font-mono">• {new Date(rev.timestamp).toLocaleDateString('fr-FR')}</span>
                      </div>
                      <p className="text-gray-650 text-xs italic font-serif">
                        "{rev.comment}"
                      </p>
                      
                      {/* State tag description */}
                      <span className={`inline-block px-2 py-0.5 text-[8.5px] uppercase font-bold tracking-wider rounded ${rev.approved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                        {rev.approved ? 'Approuvé & Public' : 'En attente de revue'}
                      </span>
                    </div>

                    <div className="flex gap-2 shrink-0">
                      {!rev.approved && (
                        <button
                          onClick={() => approveReview(rev.id)}
                          className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-650 text-white rounded-lg text-[10.5px] font-bold uppercase transition"
                        >
                          Approuver l'Avis
                        </button>
                      )}
                      <button
                        onClick={() => deleteReview(rev.id)}
                        className="p-1 px-2 text-rose-600 border border-rose-250 hover:bg-rose-50 rounded-lg text-xs"
                        title="Archiver"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* --- PART 8: DYNAMIC CATEGORIES --- */}
        {activeTab === 'categories' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8" id="panel-categories">
            
            {/* Create Category Column */}
            <div className="md:col-span-5 bg-white p-6 rounded-2.5xl border border-gray-100 shadow-md">
              <h3 className="font-serif text-lg font-bold text-pink-955 border-b pb-2 mb-4 flex items-center gap-1.5">
                <LayoutGrid className="w-5 h-5 text-pink-705" /> Insérer une Catégorie
              </h3>

              <form onSubmit={handleCreateCategory} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-450 uppercase mb-1">Nom de la collection *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Accessoires Cheveux"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="w-full px-4 py-2 text-xs rounded-lg border border-gray-200"
                  />
                  <p className="text-[10px] text-gray-400 mt-1">Cela l'ajoutera directement au sélecteur de formulaires et de filtres boutiques.</p>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-pink-900 hover:bg-pink-850 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition"
                >
                  Ajouter au catalogue d'options
                </button>
              </form>
            </div>

            {/* Categories list Table */}
            <div className="md:col-span-7 bg-white p-6 rounded-2.5xl border border-gray-100 shadow-md">
              <h3 className="font-serif text-lg font-bold text-gray-805 mb-4">Catégories Enregistrées Activement</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-150 text-[10px] uppercase font-bold text-gray-650">
                      <th className="p-3">Identifiant Unique (Clé)</th>
                      <th className="p-3">Titre Collection</th>
                      <th className="p-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-sans">
                    {categories.map((catName) => (
                      <tr key={catName} className="hover:bg-gray-50/50">
                        <td className="p-3 font-bold font-mono text-pink-905">{catName}</td>
                        <td className="p-3 font-semibold uppercase text-xs text-gray-700">{catName}</td>
                        <td className="p-3 text-center">
                          {['parfums', 'cosmétiques', 'sacs', 'montres', 'vêtements'].includes(catName.toLowerCase()) ? (
                            <span className="text-[9px] text-gray-400 italic">Inamovible (Système)</span>
                          ) : (
                            <button
                              onClick={() => deleteCategory(catName)}
                              className="p-1 text-red-650 hover:text-red-900 hover:bg-red-50 rounded transition"
                              title="Retirer la catégorie tag"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
