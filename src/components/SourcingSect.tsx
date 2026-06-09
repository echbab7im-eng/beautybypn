import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, Send, Link, Image as ImageIcon, CheckCircle, Search, HelpCircle, ArrowRight, ShoppingCart } from 'lucide-react';

export const SourcingSect: React.FC = () => {
  const { customRequests, addCustomRequest } = useShop();
  
  // Sourcing Form State
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [productName, setProductName] = useState('');
  const [productUrl, setProductUrl] = useState('');
  const [description, setDescription] = useState('');
  const [colorSize, setColorSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [source, setSource] = useState('TikTok Viral');
  const [imageUrl, setImageUrl] = useState('');
  
  // Local File Upload Mock Base64 representation
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState<any | null>(null);

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
        setIsUploading(false);
        setUploadSuccess(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
        setIsUploading(false);
        setUploadSuccess(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !productName || !description) {
      alert("Veuillez remplir tous les champs requis.");
      return;
    }

    const newRequest = addCustomRequest({
      customerName,
      customerPhone,
      productName,
      productUrl: productUrl || undefined,
      description: `${source} Sourcing: ${description}`,
      colorSize: colorSize || undefined,
      quantity,
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=600'
    });

    // Save for confirmation modal/view
    setSubmittedRequest(newRequest);
    
    // Reset Form
    setCustomerName('');
    setCustomerPhone('');
    setProductName('');
    setProductUrl('');
    setDescription('');
    setColorSize('');
    setQuantity(1);
    setSource('TikTok Viral');
    setImageUrl('');
    setUploadSuccess(false);
  };

  const getStatusBadge = (status: string) => {
    const configs: Record<string, { bg: string, text: string, label: string }> = {
      pending: { bg: 'bg-amber-100 text-amber-800', text: 'text-amber-800', label: 'En attente de revue' },
      searching: { bg: 'bg-blue-100 text-blue-800 border border-blue-200 animate-pulse', text: 'text-blue-800', label: 'Recherche active (Europe...)' },
      found: { bg: 'bg-emerald-100 text-emerald-800', text: 'text-emerald-800', label: 'Produit trouvé !' },
      not_available: { bg: 'bg-rose-100 text-rose-800', text: 'text-rose-800', label: 'Indisponible' },
      ordered: { bg: 'bg-purple-100 text-purple-800', text: 'text-purple-800', label: 'Arrivage programmé ✈' },
    };
    const current = configs[status] || configs.pending;
    return (
      <span className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full ${current.bg}`}>
        {current.label}
      </span>
    );
  };

  return (
    <div className="bg-[#FAF6F4] min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans" id="sourcing-sect-root">
      
      {/* Intro Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <span className="text-pink-800 font-bold tracking-widest text-xs uppercase bg-pink-100/60 px-3 py-1 rounded-full inline-flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" /> Service Conciergerie Premium
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-3 tracking-tight">
          Sourcing & Recherche Personnalisée
        </h1>
        <p className="text-gray-600 text-sm sm:text-base mt-4 max-w-2xl mx-auto font-sans leading-relaxed">
          Vous cherchez un produit vu sur <b className="text-pink-900">TikTok</b>, ou un article exclusif d' <b className="text-pink-800 font-semibold">Action, Shein, ou Mercadona / Deliplus</b> introuvable au Maroc ? Décrivez-le nous, et notre équipe en Europe s'occupe de le sourcer pour vous !
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Sourcing Form Panel */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-xl transition-all hover:shadow-2xl">
          {submittedRequest ? (
            <div className="text-center py-10" id="sourcing-success-container">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-gray-900 mb-2">Demande envoyée avec succès !</h3>
              <p className="text-gray-600 text-sm max-w-sm mx-auto mb-8">
                Votre demande de recherche n° <b>{submittedRequest.id}</b> a bien été enregistrée. Notre concierge examinera votre demande et vous contactera sur WhatsApp au <b>{submittedRequest.customerPhone}</b>.
              </p>
              <div className="bg-pink-50 p-4 rounded-xl text-left max-w-md mx-auto mb-8 border border-pink-100/60">
                <div className="flex gap-3 text-sm">
                  <div className="font-semibold text-pink-900">Produit:</div>
                  <div className="text-gray-700">{submittedRequest.productName}</div>
                </div>
                <div className="flex gap-3 text-sm mt-1">
                  <div className="font-semibold text-pink-900">WhatsApp:</div>
                  <div className="text-gray-700">{submittedRequest.customerPhone}</div>
                </div>
              </div>
              <button
                onClick={() => setSubmittedRequest(null)}
                className="px-6 py-2.5 bg-pink-900 text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-pink-800 transition shadow"
              >
                Faire une nouvelle demande
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" id="sourcing-request-form">
              <div className="border-b border-gray-100 pb-4">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-gray-800">Formulaire de Demande Sourcing</h2>
                <p className="text-xs text-gray-400 mt-1">Fournissez le plus d'informations possible afin que nous puissions identifier l'article exact.</p>
              </div>

              {/* Grid Client Infos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest mb-1.5">Votre Nom Complet *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Mme / Mlle Nour El"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-pink-800 font-sans text-sm focus:border-pink-800 bg-gray-50/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest mb-1.5">Numéro WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Ex: 0622334455"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-pink-800 font-sans text-sm focus:border-pink-800 bg-gray-50/50"
                  />
                </div>
              </div>

              {/* Grid Product description */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest mb-1.5">Nom / Modèle du produit *</label>
                  <input
                    type="text"
                    required
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Ex: Palette Fards à paupières Maxi Deliplus"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-pink-800 font-sans text-sm focus:border-pink-800 bg-gray-50/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest mb-1.5">Sourcing Source / Enseigne</label>
                  <select
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-pink-800 font-sans text-sm focus:border-pink-800 bg-gray-50/50 font-medium"
                  >
                    <option value="Mercadona / Deliplus">Mercadona / Deliplus (Cosmétiques d'Espagne)</option>
                    <option value="Action">Action (Europe - Beauté, Maison, Deco)</option>
                    <option value="Shein">Shein (Vêtements, Robes, Sacs tendance)</option>
                    <option value="TikTok Viral">TikTok Viral Trend (Beauty & Mode)</option>
                    <option value="Autre Magasin">Autre Boutique / Original Europe</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest mb-1.5">Taille / Couleur / Volume de l'Article</label>
                  <input
                    type="text"
                    value={colorSize}
                    onChange={(e) => setColorSize(e.target.value)}
                    placeholder="Ex: Rose Gold / Taille S / Flacon 100ml"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-pink-800 font-sans text-sm focus:border-pink-800 bg-gray-50/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest mb-1.5">Quantité souhaitée</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-pink-800 font-sans text-sm focus:border-pink-800 bg-gray-50/50 text-center"
                  />
                </div>
              </div>

              {/* Image Drag and Drop */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest mb-1.5">Photo de l'article (Recommandé)</label>
                <div 
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className="border-2 border-dashed border-gray-200 hover:border-pink-800/60 rounded-2xl p-5 text-center cursor-pointer transition bg-gray-50/50 flex flex-col items-center justify-center group"
                >
                  {imageUrl ? (
                    <div className="relative">
                      <img 
                        src={imageUrl} 
                        alt="Aperçu" 
                        referrerPolicy="no-referrer"
                        className="h-32 object-cover rounded-xl border shadow" 
                      />
                      <button 
                        type="button" 
                        onClick={() => setImageUrl('')}
                        className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 text-[9px] hover:bg-red-700 shadow"
                      >
                        Retirer
                      </button>
                    </div>
                  ) : (
                    <>
                      <ImageIcon className="w-8 h-8 text-gray-400 group-hover:text-pink-800 transition" />
                      <p className="text-xs font-medium text-gray-600 mt-2 font-sans">
                        Glissez-déposez la photo ici ou <span className="text-pink-900 font-semibold hover:underline">parcourez vos fichiers</span>
                      </p>
                      <p className="text-[10px] text-gray-400 mt-1">Fichiers PNG, JPG ou GIF acceptés</p>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageFileChange}
                        className="hidden" 
                        id="file-image-selector"
                      />
                      <label htmlFor="file-image-selector" className="absolute inset-0 w-full h-full cursor-pointer opacity-0" />
                    </>
                  )}
                </div>
              </div>

              {/* Direct Link */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                  <Link className="w-3.5 h-3.5 text-pink-700" /> Lien internet de référence (Optionnel)
                </label>
                <input
                  type="url"
                  value={productUrl}
                  onChange={(e) => setProductUrl(e.target.value)}
                  placeholder="Ex: https://www.shein.com/fr/Robe-de-soiree-..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-pink-800 focus:border-pink-800 text-sm font-sans bg-gray-50/50"
                />
              </div>

              {/* Particular directions details */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest mb-1.5">Description et détails de recherche *</label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Décrivez précisément l'article. Par exemple: le parfum Deliplus de couleur orange disponible cet été à Mercadona, ou l'organisateur acrylique rotatif vu dans la vidéo Action..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-pink-800 focus:border-pink-800 text-sm font-sans bg-gray-50/50 leading-relaxed"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isUploading}
                  className="w-full py-3.5 bg-pink-900 hover:bg-pink-800 active:bg-pink-950 font-sans tracking-widest text-xs font-bold text-white uppercase rounded-xl transition duration-350 shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:bg-gray-450"
                >
                  <Send className="w-4 h-4" /> Envoyer ma demande aux acheteurs
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Existing / Pending Requests list board */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="bg-gradient-to-br from-pink-900 via-[#3a061d] to-[#1a020c] p-6 sm:p-8 rounded-2xl text-white shadow-xl">
            <h3 className="font-serif text-2xl font-bold tracking-tight mb-3">Recherches en Cours</h3>
            <p className="text-white/80 text-xs leading-relaxed mb-6">
              Découvrez les dernières demandes confiées par nos clientes marocaines. Notre équipe voyage toutes les semaines pour collecter ces trésors !
            </p>

            {/* List of custom requests */}
            <div className="space-y-4 max-h-[480px] overflow-y-auto pr-2 custom-scrollbar">
              {customRequests.map((request) => (
                <div 
                  key={request.id} 
                  className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all group"
                  id={`request-card-${request.id}`}
                >
                  <div className="flex items-start gap-3">
                    {request.imageUrl && (
                      <img 
                        src={request.imageUrl} 
                        alt={request.productName} 
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 object-cover rounded-lg border border-white/20 flex-shrink-0" 
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-1">
                        <span className="text-[10px] uppercase font-mono tracking-wider text-pink-300">Réf: {request.id}</span>
                        {getStatusBadge(request.status)}
                      </div>
                      <h4 className="text-xs sm:text-sm font-semibold truncate text-white mt-1 group-hover:text-pink-200 transition-colors">
                        {request.productName}
                      </h4>
                      <p className="text-[11px] text-white/70 line-clamp-2 mt-1.5 italic font-serif">
                        "{request.description}"
                      </p>
                      
                      <div className="flex items-center justify-between text-[10px] text-white/55 mt-3 border-t border-white/10 pt-2">
                        <span>Demandé par {request.customerName.split(' ')[0]}</span>
                        <span>{new Date(request.timestamp).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Guarantee Box */}
            <div className="mt-6 border-t border-white/20 pt-4 flex gap-3 text-white/80">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400 mt-1.5 animate-ping flex-shrink-0" />
              <p className="text-[11px] italic leading-tight">
                Garantie Authenticité Libre : Aucun acompte n'est demandé à l'enregistrement et aucun engagement. Nous fixons un prix équitable après avoir trouvé l'article original chez le détaillant européen !
              </p>
            </div>
          </div>
          
          {/* Sourcing Brands Badge Grid */}
          <div className="mt-6 bg-white border border-gray-100 rounded-2xl p-5 text-center shadow-md">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Enseignes les plus demandées</h4>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {['Shein Trend', 'Deliplus Mercadona', 'Action Promo', 'TikTok Beauty', 'Primark Spain', 'Zara Outlet'].map((tag) => (
                <span key={tag} className="px-3 py-1 bg-pink-50 text-pink-900 border border-pink-100/60 rounded-full text-[11px] font-semibold">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
