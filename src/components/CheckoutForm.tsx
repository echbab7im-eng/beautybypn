import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { CONTACT_WHATSAPP_NUMBER } from '../data/products';
import { Contact, ShoppingBag, ShieldCheck, Mail, Phone, MapPin, CheckCircle, MessageSquare, ArrowRight, CornerDownLeft, Sparkles } from 'lucide-react';

export const CheckoutForm: React.FC = () => {
  const {
    cart,
    cartTotal,
    placeOrder,
    navigateTo
  } = useShop();

  // Form states
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Casablanca');
  const [customCity, setCustomCity] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<any>(null);

  // Delivery configuration
  const FREE_SHIPPING_THRESHOLD = 600;
  const shippingFee = cartTotal >= FREE_SHIPPING_THRESHOLD ? 0 : 30;
  const grandTotal = cartTotal + shippingFee;

  const popularCities = [
    'Casablanca',
    'Rabat',
    'Marrakech',
    'Tanger',
    'Fès',
    'Agadir',
    'Oujda',
    'Kénitra',
    'Nador',
    'Meknès',
    'Dakar',
    'Abidjan',
    'Autre Ville...'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !address) {
      alert('Veuillez remplir tous les champs obligatoires (Nom, Téléphone et Adresse).');
      return;
    }

    setIsSubmitting(true);

    const chosenCity = city === 'Autre Ville...' ? customCity : city;

    // Simulate order placement
    setTimeout(() => {
      const savedDetails = {
        fullName,
        phone,
        city: chosenCity || 'Non spécifiée',
        address,
        notes: notes || 'Aucunes instructions complémentaires'
      };

      const orderData = placeOrder({
        ...savedDetails,
        paymentMethod: 'Paiement à la livraison'
      });

      // Hook up local state for showing success screen
      setSubmittedOrder(orderData);
      setIsSubmitting(false);
    }, 800);
  };

  // Generate dynamic URL-encoded WhatsApp text link
  const getWhatsAppLink = (order: any) => {
    if (!order) return '';

    const itemsText = order.items
      .map((item: any) => `• *${item.quantity}x* ${item.product.name} (${item.product.price} DH/u)`)
      .join('%0A');

    const messageTemplate = 
`🌸 *NOUVELLE COMMANDE - BEAUTYBYPND* 🌸%0D
%0D
*Référence :* #${order.id}%0D
*Date :* ${new Date(order.timestamp).toLocaleDateString('fr-FR')}%0D
%0D
👤 *INFORMATIONS CLIENT :*%0D
• *Nom complet :* ${order.fullName}%0D
• *Téléphone :* ${order.phone}%0D
• *Ville :* ${order.city}%0D
• *Adresse :* ${order.address}%0D
• *Note :* ${order.notes}%0D
%0D
📦 *DÉTAIL DU PANIER :*%0D
${itemsText}%0D
%0D
💵 *TOTAL À PAYER À LA LIVRAISON :* *${order.total + (order.total >= FREE_SHIPPING_THRESHOLD ? 0 : 30)} DH*%0D
_(Livraison : ${order.total >= FREE_SHIPPING_THRESHOLD ? 'Gratuite' : '30 DH'})_%0D
%0D
✨ _Je souhaite valider ma commande s'il vous plaît !_`;

    return `https://wa.me/${CONTACT_WHATSAPP_NUMBER}?text=${messageTemplate}`;
  };

  /* SUCCESS SCREEN (ORDER CONFIRMED) */
  if (submittedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center" id="checkout-success-view">
        <div className="w-20 h-20 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600 shadow-md animate-bounce">
          <CheckCircle className="w-12 h-12" />
        </div>
        
        <p className="text-xs font-bold uppercase tracking-widest text-pink-700 mb-2">
          Commande enregistrée d'un niveau supérieur !
        </p>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-pink-950 mb-3">
          Merci pour votre achat !
        </h2>

        <p className="text-sm text-gray-700 max-w-lg mx-auto font-normal leading-relaxed mb-8">
          Votre commande <span className="font-bold text-pink-950">#{submittedOrder.id}</span> de <span className="font-bold text-pink-900">{grandTotal} DH</span> a été enregistrée avec succès sous la méthode de <span className="font-bold text-pink-750">Paiement à la Livraison</span>.
        </p>

        {/* Dynamic WhatsApp validation callout action */}
        <div className="bg-white/40 backdrop-blur-md border border-white/60 rounded-2xl p-6 mb-10 max-w-xl mx-auto text-center shadow-lg shadow-pink-950/5">
          <div className="inline-flex py-1 px-3 bg-pink-100 text-pink-700 rounded-full text-xs font-bold gap-1.5 mb-3 items-center">
            <Sparkles className="w-3.5 h-3.5 text-pink-700" />
            Étape recommandée de validation
          </div>
          <h3 className="font-serif text-lg font-bold text-pink-950 mb-2">
            Accélérez l'expédition via WhatsApp
          </h3>
          <p className="text-xs text-gray-650 leading-relaxed font-normal mb-6 max-w-md mx-auto">
            Cliquez sur le bouton ci-dessous pour envoyer instantanément un récapitulatif détaillé de votre commande à notre service de préparation. Nous expédierons votre colis directement !
          </p>

          <a
            href={getWhatsAppLink(submittedOrder)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-xs tracking-widest uppercase rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 focus:outline-none"
            id="success-whatsapp-btn"
          >
            <MessageSquare className="w-5 h-5 fill-white text-[#25D366]" />
            Envoyer sur WhatsApp pour valider
          </a>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <button
            onClick={() => navigateTo('shop', 'all')}
            className="px-6 py-3 border border-pink-200 hover:bg-pink-100/50 text-pink-700 text-xs font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            id="success-back-to-shop"
          >
            <CornerDownLeft className="w-4 h-4" />
            Continuer mes achats
          </button>
          
          <button
            onClick={() => navigateTo('orders')}
            className="px-6 py-3 bg-pink-950 hover:bg-pink-900 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-md shadow-pink-950/20 cursor-pointer"
            id="success-view-orders"
          >
            Consulter l'historique de mes commandes
          </button>
        </div>
      </div>
    );
  }

  /* EMPTY ORDER FORM FALLBACK */
  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-20 px-4" id="checkout-empty-view">
        <div className="w-16 h-16 bg-white/60 rounded-full border border-pink-100 flex items-center justify-center mx-auto mb-4 text-pink-600 shadow-sm">
          <ShoppingBag className="w-6 h-6" />
        </div>
        <h3 className="font-serif text-lg font-bold text-pink-950 mb-2">Aucun article dans le panier</h3>
        <p className="text-xs text-gray-500 leading-relaxed mb-6 font-normal">
          Vous devez ajouter nos parfums, cosmétiques, chaussures ou vêtements chics au panier pour pouvoir passer commande.
        </p>
        <button
          onClick={() => navigateTo('shop', 'all')}
          className="px-6 py-3.5 bg-pink-900 text-white text-xs font-bold tracking-widest uppercase hover:bg-pink-800 transition-all rounded-xl shadow-md cursor-pointer"
          id="checkout-empty-cta"
        >
          Visiter le Catalogue
        </button>
      </div>
    );
  }

  /* ORDER FORM FILL */
  return (
    <div className="bg-transparent py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="checkout-form-section">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Side: Cash-on-Delivery Delivery validation Form */}
        <div className="lg:col-span-7">
          <div className="border border-pink-100/50 rounded-2xl p-6 sm:p-8 bg-white/30 backdrop-blur-md shadow-lg shadow-pink-950/5">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-pink-950 mb-6 flex items-center gap-2">
              <Contact className="w-5.5 h-5.5 text-pink-700" />
              Formulaire de Commande
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Client Full name */}
              <div className="flex flex-col">
                <label className="text-xs font-bold uppercase tracking-wider text-pink-950 mb-1.5 flex items-center gap-1">
                  Nom Complet <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ex: Fatima Zahra"
                  className="w-full px-4 py-3 bg-white/60 border border-pink-150 rounded-xl text-sm text-pink-950 focus:ring-1 focus:ring-pink-500 outline-none transition-all placeholder-pink-300"
                  id="checkout-fullname"
                />
              </div>

              {/* Client active phone number (crucial for CoD calls) */}
              <div className="flex flex-col">
                <label className="text-xs font-bold uppercase tracking-wider text-pink-950 mb-1.5 flex items-center gap-1">
                  Numéro de Téléphone (WhatsApp) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-pink-400">
                    <Phone className="w-4 h-4" />
                  </span>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ex: 0612345678"
                    className="w-full pl-11 pr-4 py-3 bg-white/60 border border-pink-150 rounded-xl text-sm text-pink-950 focus:ring-1 focus:ring-pink-500 outline-none transition-all placeholder-pink-300"
                    id="checkout-phone"
                  />
                </div>
                <span className="text-[10px] text-gray-500 mt-1 italic font-light">
                  * Important : nous appelons ce numéro pour confirmer l'heure de livraison.
                </span>
              </div>

              {/* City Row Selection & Custom inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="flex flex-col">
                  <label className="text-xs font-bold uppercase tracking-wider text-pink-950 mb-1.5 flex items-center gap-1">
                    Ville de Livraison <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-3 bg-white/60 border border-pink-150 rounded-xl text-sm text-pink-950 focus:ring-1 focus:ring-pink-500 outline-none cursor-pointer"
                    id="checkout-city"
                  >
                    {popularCities.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {city === 'Autre Ville...' && (
                  <div className="flex flex-col animate-fadeIn">
                    <label className="text-xs font-bold uppercase tracking-wider text-pink-950 mb-1.5 flex items-center gap-1">
                      Spécifiez votre ville <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={customCity}
                      onChange={(e) => setCustomCity(e.target.value)}
                      placeholder="Ex: Ouarzazate"
                      className="w-full px-4 py-3 bg-white/60 border border-pink-150 rounded-xl text-sm text-pink-950 focus:ring-1 focus:ring-pink-500 outline-none transition-all placeholder-pink-300"
                      id="checkout-custom-city"
                    />
                  </div>
                )}
              </div>

              {/* Exact Home physical Address */}
              <div className="flex flex-col">
                <label className="text-xs font-bold uppercase tracking-wider text-pink-950 mb-1.5 flex items-center gap-1">
                  Adresse de Livraison Exacte <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute top-3.5 left-3.5 text-pink-400">
                    <MapPin className="w-4 h-4" />
                  </span>
                  <textarea
                    required
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Ex: Appt 4, Immeuble B, Rue des Lilas, Quartier Gauthier"
                    className="w-full pl-11 pr-4 py-3 bg-white/60 border border-pink-150 rounded-xl text-sm text-pink-950 focus:ring-1 focus:ring-pink-500 outline-none transition-all placeholder-pink-300 resize-none animate-fadeIn"
                    id="checkout-address"
                  />
                </div>
              </div>

              {/* Optional comments */}
              <div className="flex flex-col">
                <label className="text-xs font-bold uppercase tracking-wider text-pink-950 mb-1.5">
                  Notes de livraison / Instructions complémentaires (optionnel)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ex : Appeler avant de venir, livrer l’après-midi après 15h, etc."
                  className="w-full px-4 py-3 bg-white/60 border border-pink-150 rounded-xl text-sm text-pink-950 focus:ring-1 focus:ring-pink-500 outline-none transition-all placeholder-pink-300 resize-none"
                  id="checkout-notes"
                />
              </div>

              {/* High Security & Payment Assurances Badge block */}
              <div className="p-4 bg-white/50 backdrop-blur-xs rounded-2xl border border-pink-150 flex gap-3 text-pink-950">
                <ShieldCheck className="w-6 h-6 shrink-0 text-emerald-600 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wide">
                    Paiement à la Livraison Securisé
                  </h4>
                  <p className="text-[11px] leading-relaxed font-normal text-gray-700">
                    Pas besoin de carte bancaire ! Vous ne réglez qu'en espèces (Cash) au livreur au moment d'avoir le colis physique entre vos mains. Nous vérifions l'emballage ensemble lors du dépôt !
                  </p>
                </div>
              </div>

              {/* Submit trigger button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 text-xs font-bold tracking-widest uppercase rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                  isSubmitting
                    ? 'bg-pink-100 text-pink-300 cursor-wait'
                    : 'bg-pink-900 hover:bg-pink-800 text-white cursor-pointer active:translate-y-0.5 hover:scale-[1.01]'
                }`}
                id="checkout-submit-btn"
              >
                {isSubmitting ? (
                  <span>Traitement en cours...</span>
                ) : (
                  <>
                    <span>Confirmer ma commande ({grandTotal} DH)</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>
          </div>
        </div>

        {/* Right Side: Detailed Bag list & Recalculated values */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="border border-pink-100/50 rounded-2xl p-6 bg-white/35 backdrop-blur-md shadow-lg flex-1 flex flex-col justify-between">
            
            {/* Summary Title */}
            <div>
              <h3 className="font-serif text-lg font-bold text-pink-950 border-b border-pink-100/50 pb-4 mb-5">
                Résumé de votre Panier
              </h3>

              {/* Products recap scrolls */}
              <div className="max-h-[380px] overflow-y-auto space-y-4 mb-6 pr-1 divide-y divide-pink-100/30">
                {cart.map((item, index) => (
                  <div key={item.product.id} className={`flex gap-3.5 items-center ${index > 0 ? 'pt-4' : ''}`} id={`checkout-recap-row-${item.product.id}`}>
                    <div className="w-14 h-16 bg-white/40 rounded-xl overflow-hidden border border-pink-100/50 shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover object-center"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-pink-950 line-clamp-1">
                        {item.product.name}
                      </h4>
                      <p className="text-[10px] text-pink-700 uppercase tracking-widest font-bold">
                        {item.product.category}
                      </p>
                      <span className="text-xs font-normal text-gray-600 mt-0.5 block">
                        {item.quantity} x {item.product.price} DH
                      </span>
                    </div>
                    <span className="text-xs font-bold text-pink-950 shrink-0">
                      {(item.product.price * item.quantity).toFixed(0)} DH
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price values total panel */}
            <div className="bg-white/45 border border-pink-100/60 rounded-2xl p-5 mt-auto">
              <div className="space-y-2.5 text-xs text-gray-700">
                <div className="flex justify-between">
                  <span>Sous-total articles</span>
                  <span className="font-bold text-pink-950">{cartTotal} DH</span>
                </div>
                <div className="flex justify-between">
                  <span>Livraison à domicile</span>
                  {shippingFee === 0 ? (
                    <span className="font-extrabold text-emerald-700 uppercase text-[10px] tracking-widest">Gratuite ce jour</span>
                  ) : (
                    <span className="font-semibold text-pink-950">{shippingFee} DH</span>
                  )}
                </div>
                
                {/* Visual banner reminders for Free Shipping */}
                {shippingFee > 0 && (
                  <p className="text-[10px] text-pink-900 italic mt-1 font-semibold bg-pink-50/50 text-pink-950 p-2.5 border border-pink-100/50 rounded-xl">
                    💡 Astuce : Ajoutez encore <strong>{FREE_SHIPPING_THRESHOLD - cartTotal} DH</strong> d'achats pour activer la <strong>livraison gratuite</strong> !
                  </p>
                )}

                <div className="pt-3 border-t border-pink-100/50 flex justify-between text-pink-950 font-bold text-sm">
                  <span>Total à payer</span>
                  <span className="text-pink-850 font-serif text-lg font-bold">{grandTotal} DH</span>
                </div>
              </div>

              {/* Guarantees checklist strip */}
              <div className="border-t border-pink-100/50 pt-4.5 mt-4 text-[10px] space-y-2 text-pink-900/65 font-semibold">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-700 animate-ping" />
                  <span>Validation directe sur WhatsApp après commande</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-700" />
                  <span>Colis inspecté par vous-même avant règlement financier</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-700" />
                  <span>Assistance client 24h/7j pour retours ou échanges</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
