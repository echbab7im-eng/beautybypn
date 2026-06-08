import React from 'react';
import { useShop } from '../context/ShopContext';
import { CONTACT_WHATSAPP_NUMBER } from '../data/products';
import { CheckCircle, Clock, Truck, ShieldCheck, MessageSquare, ExternalLink, Calendar, Receipt } from 'lucide-react';

export const OrdersHistory: React.FC = () => {
  const { orders, navigateTo } = useShop();

  const getOrderStatusBadge = (status: string) => {
    return (
      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-pink-50 border border-pink-200 text-pink-750 text-xs font-bold rounded-full uppercase tracking-wider">
        <Clock className="w-3.5 h-3.5 animate-pulse" />
        En cours de validation (WhatsApp)
      </span>
    );
  };

  const getWhatsAppLink = (order: any) => {
    const itemsText = order.items
      .map((item: any) => `• *${item.quantity}x* ${item.product.name} (${item.product.price} DH/u)`)
      .join('%0A');

    const messageTemplate = 
`🌸 *COMMANDE INTRODUITE - BEAUTYBYPND* 🌸%0D
%0D
*Référence :* #${order.id || 'N/A'}%0D
%0D
*INFORMATIONS CLIENT :*%0D
• *Nom complet :* ${order.fullName}%0D
• *Téléphone :* ${order.phone}%0D
• *Ville :* ${order.city}%0D
• *Adresse :* ${order.address}%0D
• *Note :* ${order.notes}%0D
%0D
*DÉTAIL DU PANIER :*%0D
${itemsText}%0D
%0D
*TOTAL À PAYER À LA LIVRAISON :* *${order.total + (order.total >= 600 ? 0 : 30)} DH*%0D
%0D
✨ _Je souhaite valider ma commande s'il vous plaît !_`;

    return `https://wa.me/${CONTACT_WHATSAPP_NUMBER}?text=${messageTemplate}`;
  };

  return (
    <div className="bg-transparent py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto" id="orders-history-view">
      
      {/* Header and Stats */}
      <div className="border-b border-pink-100/50 pb-6 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-pink-950">
            Suivi de vos Commandes
          </h2>
          <p className="text-xs text-gray-700 leading-relaxed mt-1 font-normal">
            Retrouvez ici l'historique de vos achats locaux. Toutes nos commandes sont traitées en <strong className="text-pink-900">Paiement à la Livraison (CoD)</strong>.
          </p>
        </div>
        <button
          onClick={() => navigateTo('shop', 'all')}
          className="px-5 py-2.5 bg-pink-900 hover:bg-pink-800 text-white text-xs font-bold tracking-widest uppercase transition-all rounded-xl shadow-md cursor-pointer"
          id="orders-shop-more"
        >
          Parcourir plus d’articles
        </button>
      </div>

      {orders.length > 0 ? (
        /* Orders list loops */
        <div className="space-y-8">
          {orders.map((order, idx) => {
            const dateStr = new Date(order.timestamp).toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            });

            const shippingFee = order.total >= 600 ? 0 : 30;
            const finalPayable = order.total + shippingFee;

            return (
              <div 
                key={idx} 
                className="border border-pink-100/50 rounded-2xl overflow-hidden shadow-lg bg-white/30 backdrop-blur-md" 
                id={`history-order-card-${idx}`}
              >
                
                {/* Card Header metadata */}
                <div className="px-5 py-4 bg-white/40 border-b border-pink-100/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <Receipt className="w-4.5 h-4.5 text-pink-700" />
                    <span className="font-serif text-sm font-bold text-pink-950">Commande #{(order as any).id || `REF-${100 + idx}`}</span>
                    <span className="text-xs text-pink-300">|</span>
                    <span className="text-xs text-pink-900/70 flex items-center gap-1 font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-pink-700" /> {dateStr}
                    </span>
                  </div>
                  {getOrderStatusBadge('pending')}
                </div>

                {/* Card body directions and summary */}
                <div className="p-5 grid grid-cols-1 md:grid-cols-12 gap-6">
                  
                  {/* Shipping coordinates */}
                  <div className="md:col-span-5 text-xs text-gray-700 space-y-2 border-r border-pink-100/40 pr-4">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-pink-950 mb-2">Destinataire :</h4>
                    <p><strong className="text-pink-950">Nom :</strong> {order.fullName}</p>
                    <p><strong className="text-pink-950">Téléphone :</strong> {order.phone}</p>
                    <p><strong className="text-pink-950">Ville :</strong> {order.city}</p>
                    <p><strong className="text-pink-950">Adresse :</strong> {order.address}</p>
                    {order.notes && <p className="italic text-pink-900/70"><strong className="text-pink-950">Note :</strong> "{order.notes}"</p>}
                  </div>

                  {/* Basket description list */}
                  <div className="md:col-span-7 flex flex-col justify-between">
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-pink-950 mb-3">Articles commandés :</h4>
                      <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
                        {order.items.map((item, id) => (
                          <div key={id} className="flex justify-between text-xs text-gray-700">
                            <span className="line-clamp-1 flex-1 pr-4 font-normal">
                              {item.quantity}x {item.product.name}
                            </span>
                            <span className="font-bold text-pink-950 shrink-0">{(item.product.price * item.quantity).toFixed(0)} DH</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Summary row */}
                    <div className="border-t border-pink-100/40 pt-3.5 mt-4 flex items-center justify-between">
                      <div className="text-xs text-gray-500 font-semibold leading-relaxed">
                        <span>Frais d'envoi : {shippingFee === 0 ? 'Gratuit' : '30 DH'}</span><br />
                        <span>Méthode : Cash / Paiement à la livraison</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-pink-900/60 font-semibold uppercase block leading-none">Net à payer</span>
                        <span className="font-serif text-lg font-bold text-pink-800 leading-none block mt-1">{finalPayable} DH</span>
                      </div>
                    </div>

                  </div>

                </div>

                {/* Confirm reminder banner below order card */}
                <div className="px-5 py-3.5 bg-pink-50/50 border-t border-pink-100/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <span className="text-pink-950 font-semibold">
                    ⚠️ Cette commande est en attente de votre clic de validation WhatsApp.
                  </span>
                  <a
                    href={getWhatsAppLink(order)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold rounded-xl text-[10px] uppercase tracking-widest transition-all shadow cursor-pointer hover:-translate-y-0.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5 fill-white text-[#25D366]" />
                    Valider sur WhatsApp maintenant
                  </a>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        /* Empty history placeholder */
        <div className="text-center py-20 bg-white/40 border border-pink-100/50 rounded-2xl max-w-md mx-auto shadow-md" id="orders-history-empty">
          <div className="w-16 h-16 bg-white/60 border border-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 text-pink-600 shadow-sm">
            <Receipt className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg font-bold text-pink-950 mb-1">Aucune commande récente</h3>
          <p className="text-xs text-gray-500 leading-relaxed mb-6 font-normal">
            Vous n'avez pas encore passé de commande à la livraison depuis cet appareil.
          </p>
          <button
            onClick={() => navigateTo('shop', 'all')}
            className="px-6 py-2.5 bg-pink-900 text-white text-xs font-bold tracking-widest uppercase hover:bg-pink-800 transition-all rounded-xl shadow-md cursor-pointer"
            id="orders-browse-cta"
          >
            Faire du shopping
          </button>
        </div>
      )}

    </div>
  );
};
