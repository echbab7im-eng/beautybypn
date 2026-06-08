import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Package, Truck, Check, ChevronRight, HelpCircle, MapPin, Calendar, Clock } from 'lucide-react';

export const OrderTracking: React.FC = () => {
  const { orders, navigateTo } = useShop();
  const [searchId, setSearchId] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<any>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = searchId.trim().toUpperCase();
    if (!cleanId) return;

    const found = orders.find(
      (o) => o.id.toUpperCase() === cleanId || o.id.toUpperCase() === `PND-${cleanId}`
    );
    setSearchedOrder(found || null);
    setHasSearched(true);
  };

  const handleQuickTrack = (orderId: string) => {
    const found = orders.find((o) => o.id === orderId);
    setSearchId(orderId);
    setSearchedOrder(found || null);
    setHasSearched(true);
  };

  const statusSteps = [
    {
      key: 'pending',
      title: 'Validation',
      description: 'Commande enregistrée, validation WhatsApp',
      icon: Clock,
      color: 'pink'
    },
    {
      key: 'preparation',
      title: 'En préparation',
      description: 'Votre colis est soigneusement emballé',
      icon: Package,
      color: 'amber'
    },
    {
      key: 'shipped',
      title: 'Expédié',
      description: 'Remis au livreur pour expédition',
      icon: Truck,
      color: 'blue'
    },
    {
      key: 'delivered',
      title: 'Livré',
      description: 'Colis livré en main propre et payé',
      icon: Check,
      color: 'emerald'
    }
  ];

  const getStepIndex = (statusCode: string) => {
    switch (statusCode) {
      case 'pending': return 0;
      case 'preparation': return 1;
      case 'shipped': return 2;
      case 'delivered': return 3;
      default: return 0;
    }
  };

  // Convert status to French label
  const getStatusLabel = (statusCode: string) => {
    switch (statusCode) {
      case 'pending': return 'En attente de validation';
      case 'preparation': return 'En cours de préparation';
      case 'shipped': return 'Expédié / En cours de livraison';
      case 'delivered': return 'Livré avec succès';
      default: return 'Inconnu';
    }
  };

  return (
    <div className="bg-transparent py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto" id="order-tracking-view">
      
      {/* View Header */}
      <div className="border-b border-pink-100/50 pb-6 mb-8 text-center sm:text-left">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-pink-950">
          Suivi de Commande en Temps Réel
        </h2>
        <p className="text-xs text-gray-700 leading-relaxed mt-1 font-normal">
          Saisissez votre numéro de commande pour connaître l'avancée de votre livraison à domicile.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Search input and local orders list */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white/45 backdrop-blur-md border border-pink-100/60 p-5 rounded-2xl shadow-md">
            <h3 className="text-xs font-bold uppercase tracking-wider text-pink-950 mb-3 flex items-center gap-1.5">
              <Search className="w-4 h-4 text-pink-800" />
              Rechercher un colis
            </h3>
            <form onSubmit={handleSearch} className="space-y-3">
              <div>
                <input
                  type="text"
                  placeholder="Ex: PND-782415"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white/70 border border-pink-150 rounded-xl outline-none focus:ring-1 focus:ring-pink-500 text-pink-950 placeholder-pink-300 font-mono"
                  id="tracking-search-input"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-pink-900 hover:bg-pink-800 text-white text-[11px] font-bold tracking-widest uppercase transition-all rounded-xl shadow cursor-pointer text-center"
                id="tracking-search-submit"
              >
                Suivre l'envoi
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-pink-100/50">
              <p className="text-[10px] text-pink-800 leading-relaxed bg-pink-50/50 p-2.5 rounded-xl border border-pink-100/40 font-medium">
                💡 <span className="font-bold">Astuce de test :</span> Recherchez <span className="underline font-mono font-bold cursor-pointer text-pink-900 hover:text-pink-700" onClick={() => handleQuickTrack('PND-782415')}>PND-782415</span> (Expédié) ou <span className="underline font-mono font-bold cursor-pointer text-pink-900 hover:text-pink-700" onClick={() => handleQuickTrack('PND-910482')}>PND-910482</span> (En préparation) !
              </p>
            </div>
          </div>

          {/* Quick Shortcuts for your own orders */}
          <div className="bg-white/30 backdrop-blur-md border border-pink-100/40 p-5 rounded-2xl shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-pink-950 mb-3">
              Vos Commandes Récentes ({orders.length})
            </h3>
            {orders.length > 0 ? (
              <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
                {orders.map((o) => (
                  <button
                    key={o.id}
                    onClick={() => handleQuickTrack(o.id)}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between text-xs cursor-pointer ${
                      searchId === o.id
                        ? 'bg-pink-50/80 border-pink-200 text-pink-950 font-bold'
                        : 'bg-white/40 border-pink-100/40 text-gray-700 hover:bg-pink-50/30'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="font-mono text-[10px] font-bold text-pink-950">#{o.id}</div>
                      <div className="text-[9px] text-gray-500 font-normal">
                        {new Date(o.timestamp).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} • {o.total} DH
                      </div>
                    </div>
                    <span className="text-[9px] px-2 py-0.5 bg-pink-100 text-pink-800 font-bold rounded-lg uppercase tracking-wide shrink-0">
                      {o.status === 'pending' ? 'Validation' : o.status === 'preparation' ? 'Stock' : o.status === 'shipped' ? 'Route' : 'Livré'}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-[10px] text-gray-500 italic">Aucune commande enregistrée sur cet appareil.</p>
            )}
          </div>
        </div>

        {/* Right Side: Timeline Steps and detailed order card */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {hasSearched ? (
              searchedOrder ? (
                <motion.div
                  key={searchedOrder.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  
                  {/* Active tracker card banner */}
                  <div className="bg-white/45 backdrop-blur-md border border-pink-100/60 p-6 rounded-2xl shadow-md">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-pink-100/50 pb-4 mb-6 gap-3">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-pink-700 block mb-0.5">Commande Validée par Équipe</span>
                        <h4 className="font-serif text-xl font-bold text-pink-950 flex items-center gap-2">
                          Colis <span className="font-mono">#{searchedOrder.id}</span>
                        </h4>
                      </div>
                      <div className="text-right sm:text-right">
                        <span className="text-[9px] text-gray-500 uppercase tracking-wider block">Statut Actuel</span>
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-pink-100 text-pink-900 border border-pink-200 text-xs font-bold rounded-full mt-1">
                          <span className="w-1.5 h-1.5 bg-pink-700 rounded-full animate-ping" />
                          {getStatusLabel(searchedOrder.status)}
                        </span>
                      </div>
                    </div>

                    {/* Timeline visualization flow */}
                    <div className="py-2.5 relative">
                      
                      {/* Vertical line connector in background for styling */}
                      <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-pink-100/70" />

                      <div className="space-y-8">
                        {statusSteps.map((step, idx) => {
                          const currentStepIdx = getStepIndex(searchedOrder.status);
                          const isDone = idx <= currentStepIdx;
                          const isActive = idx === currentStepIdx;
                          const StepIcon = step.icon;

                          return (
                            <div key={step.key} className="flex gap-4 items-start relative z-10">
                              
                              {/* Step circle index marker */}
                              <div className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 shrink-0 ${
                                isDone 
                                  ? 'bg-pink-900 border-pink-900 text-white shadow-md scale-105' 
                                  : 'bg-white border-pink-100 text-pink-300'
                              } ${isActive ? 'ring-4 ring-pink-100' : ''}`}>
                                {isDone ? (
                                  <Check className="w-5 h-5 text-white stroke-[3px]" />
                                ) : (
                                  <StepIcon className="w-5 h-5" />
                                )}
                              </div>

                              {/* Step descriptive values */}
                              <div className="pt-0.5">
                                <h5 className={`text-sm font-bold leading-none ${isDone ? 'text-pink-950' : 'text-pink-300 font-medium'}`}>
                                  {step.title}
                                </h5>
                                <p className={`text-xs mt-1 leading-relaxed ${isDone ? 'text-gray-700 font-normal' : 'text-pink-300/60 font-light'}`}>
                                  {step.description}
                                </p>
                                {isActive && (
                                  <span className="inline-block mt-1.5 text-[9px] text-pink-500 tracking-wider uppercase font-bold animate-pulse">
                                    • Étape en cours de traitement
                                  </span>
                                )}
                              </div>

                            </div>
                          );
                        })}
                      </div>

                    </div>

                    {/* Delivery summary sub-panel */}
                    <div className="border-t border-pink-100/50 mt-6 pt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-normal text-gray-700">
                      <div className="space-y-1.5 bg-pink-50/30 p-4 rounded-xl border border-pink-100/30">
                        <div className="font-bold text-[10px] uppercase tracking-wider text-pink-950 mb-1 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-pink-700" /> Adresse de dépôt
                        </div>
                        <p><span className="font-bold">Destinataire :</span> {searchedOrder.fullName}</p>
                        <p><span className="font-bold">Ville :</span> {searchedOrder.city}</p>
                        <p><span className="font-bold">Adresse :</span> {searchedOrder.address}</p>
                      </div>

                      <div className="space-y-1.5 bg-pink-50/30 p-4 rounded-xl border border-pink-100/30">
                        <div className="font-bold text-[10px] uppercase tracking-wider text-pink-950 mb-1 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-pink-700" /> Détails d'envoi
                        </div>
                        <p><span className="font-bold">Créée le :</span> {new Date(searchedOrder.timestamp).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        <p><span className="font-bold">Mode de paiement:</span> Cash à la livraison</p>
                        <p><span className="font-bold">Total net à payer:</span> <strong className="text-pink-900">{searchedOrder.total} DH</strong></p>
                      </div>
                    </div>

                  </div>

                </motion.div>
              ) : (
                <motion.div
                  key="not-found"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white/40 border border-pink-100/50 rounded-2xl p-10 text-center shadow-md max-w-md mx-auto"
                >
                  <div className="w-16 h-16 bg-pink-50 border border-pink-200 rounded-full flex items-center justify-center mx-auto mb-4 text-pink-750">
                    <HelpCircle className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-pink-950 mb-1">Aucun colis trouvé</h4>
                  <p className="text-xs text-gray-500 leading-relaxed mb-6 font-normal">
                    Nous n'avons trouvé aucune commande correspondant à l'identifiant <strong className="font-mono text-pink-900 font-bold">"{searchId}"</strong>. Veuillez vérifier l'orthographe ou réessayer.
                  </p>
                  <button
                    onClick={() => { setHasSearched(false); setSearchId(''); }}
                    className="px-5 py-2.5 bg-pink-900 text-white text-xs font-bold tracking-widest uppercase hover:bg-pink-800 transition-all rounded-xl shadow cursor-pointer"
                  >
                    Faire une nouvelle recherche
                  </button>
                </motion.div>
              )
            ) : (
              <motion.div
                key="welcome-tracking"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white/40 border border-pink-100/50 rounded-2xl p-8 sm:p-12 text-center shadow-md flex flex-col items-center justify-center min-h-[350px]"
              >
                <div className="w-20 h-20 bg-pink-500/10 border border-pink-100 rounded-full flex items-center justify-center mb-6 text-pink-900 shadow-sm">
                  <Truck className="w-9 h-9 animate-bounce text-pink-700" />
                </div>
                <h4 className="font-serif text-xl font-bold text-pink-950 mb-2">Suivez votre colis étape par étape</h4>
                <p className="text-xs text-gray-600 leading-relaxed max-w-md mb-6 font-normal">
                  Chaque commande passée chez <strong className="text-pink-900 text-[13px]">beautybypnd</strong> bénéficie d'un suivi personnalisé. Saisissez votre référence de commande pour consulter l'avancement en temps réel.
                </p>
                {orders.length > 0 && (
                  <div className="p-4 bg-pink-50/50 border border-pink-100/60 rounded-xl">
                    <p className="text-[11px] text-pink-900 font-bold mb-1">Vous avez des commandes sauvegardées !</p>
                    <button
                      onClick={() => handleQuickTrack(orders[0].id)}
                      className="inline-flex items-center gap-1 text-pink-800 hover:text-pink-600 text-[11px] font-bold underline cursor-pointer"
                    >
                      Suivre ma commande récente (#{orders[0].id}) <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
};
