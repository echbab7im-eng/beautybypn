import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Package, Truck, RotateCcw, Award, CheckCircle, Info, Landmark, MapPin } from 'lucide-react';

export const PoliciesSect: React.FC = () => {
  const { cityFees, freeShippingThreshold } = useShop();
  const [activeTab, setActiveTab] = useState<'delivery' | 'returns' | 'about'>('delivery');

  return (
    <div className="bg-[#FCF9F7] min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans" id="policies-sect-root">
      <div className="max-w-5xl mx-auto">
        
        {/* Intro */}
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-905 tracking-tight">
            Informations & Engagements Client
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-3 max-w-lg mx-auto leading-relaxed">
            Chez <span className="font-serif italic font-semibold text-pink-905">beautybypnd</span>, notre plus grande exigence est votre sérénité. Retrouvez ici toutes nos modalités logistiques et de garanties.
          </p>
        </div>

        {/* Tab Selection Row */}
        <div className="flex border-b border-gray-200 mb-8 max-w-xl mx-auto">
          <button
            onClick={() => setActiveTab('delivery')}
            className={`flex-1 py-3 text-center border-b-2 text-xs font-bold uppercase tracking-wider transition focus:outline-none flex items-center justify-center gap-1.5 ${
              activeTab === 'delivery'
                ? 'border-pink-900 text-pink-900'
                : 'border-transparent text-gray-500 hover:text-pink-700'
            }`}
            id="tab-btn-delivery"
          >
            <Truck className="w-4 h-4" /> Livraison Maroc
          </button>
          <button
            onClick={() => setActiveTab('returns')}
            className={`flex-1 py-3 text-center border-b-2 text-xs font-bold uppercase tracking-wider transition focus:outline-none flex items-center justify-center gap-1.5 ${
              activeTab === 'returns'
                ? 'border-pink-900 text-pink-900'
                : 'border-transparent text-gray-500 hover:text-pink-700'
            }`}
            id="tab-btn-returns"
          >
            <RotateCcw className="w-4 h-4" /> Retours & Rembursements
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`flex-1 py-3 text-center border-b-2 text-xs font-bold uppercase tracking-wider transition focus:outline-none flex items-center justify-center gap-1.5 ${
              activeTab === 'about'
                ? 'border-pink-900 text-pink-900'
                : 'border-transparent text-gray-500 hover:text-pink-700'
            }`}
            id="tab-btn-about"
          >
            <Award className="w-4 h-4" /> À Propos de Nous
          </button>
        </div>

        {/* Panel Switcher Content */}
        
        {activeTab === 'delivery' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8" id="delivery-panel">
            
            {/* Delivery Terms Details */}
            <div className="md:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-lg space-y-6">
              <div className="border-b border-gray-50 pb-4">
                <h2 className="font-serif text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Truck className="w-6 h-6 text-pink-800" /> Politique de Livraison
                </h2>
                <p className="text-xs text-gray-400 mt-1">Nous expédions vos colis avec des prestataires logistiques spécialisés dans tout le Maroc.</p>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-xs uppercase tracking-wider text-gray-800">Paiement à la Livraison (COD)</h4>
                    <p className="text-gray-500 text-xs sm:text-sm mt-1 font-sans leading-relaxed">
                      Aucun paiement en ligne requis ! Vous réglez la totalité de votre commande en espèces (en Dirhams Morocains) directement au livreur une fois le colis en main.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-xs uppercase tracking-wider text-gray-800">Délais de Livraison</h4>
                    <ul className="text-gray-500 text-xs sm:text-sm mt-1 list-disc pl-4 space-y-1">
                      <li><b>Casablanca, Rabat, Mohammédia :</b> Livraison sous 24 à 48 heures ouvrables.</li>
                      <li><b>Autres villes (Marrakech, Fès, Tanger, Agadir, etc.) :</b> Livraison sous 2 à 4 jours ouvrables.</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-xs uppercase tracking-wider text-gray-800">Seuil de Livraison Gratuite</h4>
                    <p className="text-gray-500 text-xs sm:text-sm mt-1 font-sans">
                      Pour toute commande égale ou supérieure à <b className="text-pink-900">{freeShippingThreshold} DH</b>, les frais de port sont <b>totalement offerts (0 DH)</b> ! Sinon, le prix de livraison dépend de votre ville.
                    </p>
                  </div>
                </div>
              </div>

              {/* Courier service details */}
              <div className="bg-pink-50 p-4 rounded-xl border border-pink-100 flex gap-3 text-xs leading-relaxed text-pink-950">
                <Info className="w-5 h-5 text-pink-700 flex-shrink-0" />
                <p>
                  <b>Note Importante :</b> Le livreur officiel vous appellera par téléphone avant son passage pour convenir de l'heure exacte. Veuillez vous assurer que le numéro renseigné lors de la validation soit accessible et réponde aux appels.
                </p>
              </div>
            </div>

            {/* Dynamic Shipping Fees City Table */}
            <div className="md:col-span-5 bg-white p-6 rounded-2xl border border-gray-100 shadow-md">
              <h3 className="font-serif text-lg font-bold text-gray-800 mb-4 flex items-center gap-1.5">
                <MapPin className="w-4.5 h-4.5 text-pink-850" /> Tarifs de Livraison par Ville
              </h3>
              
              <div className="bg-pink-100/50 rounded-xl p-3 text-[11px] mb-4 text-center border border-pink-200">
                Frais gratuits dès <b className="text-pink-900">{freeShippingThreshold} DH</b> d'achat !
              </div>

              <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-1">
                {cityFees.map((feeObj) => (
                  <div key={feeObj.city} className="flex justify-between items-center text-xs py-2 px-3 hover:bg-pink-50/40 rounded-lg transition border-b border-gray-50">
                    <span className="font-serif font-semibold text-gray-700">{feeObj.city}</span>
                    <span className="font-mono bg-pink-50 text-pink-905 font-bold px-2 py-0.5 rounded-lg border border-pink-100/50">
                      {feeObj.fee} DH
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {activeTab === 'returns' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-lg space-y-6" id="returns-panel">
            <div className="border-b border-gray-50 pb-4">
              <h2 className="font-serif text-2xl font-bold text-gray-905 flex items-center gap-2">
                <RotateCcw className="w-6 h-6 text-pink-805" /> Garantie Sûre de Retours & Remboursements
              </h2>
              <p className="text-xs text-gray-400 mt-1">Chez BeautyByPND, acheter en ligne est un plaisir sans risques de déception.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-semibold text-xs uppercase tracking-widest text-pink-900">1. Délai de Rétractation : 7 Jours</h3>
                <p className="text-gray-550 text-xs sm:text-sm leading-relaxed">
                  Conformément aux lois de protection des consommatrices, vous disposez d'un délai légal de <b>7 jours</b> à compter de la réception de votre achat pour exercer votre droit de retour.
                </p>
                <p className="text-gray-550 text-xs sm:text-sm leading-relaxed">
                  Pas de justificatif requis ! Si un article ne correspond pas à vos attentes, contactez-nous par WhatsApp.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-xs uppercase tracking-widest text-pink-900">2. État du Produit Requis</h3>
                <p className="text-gray-550 text-[#4c4846] text-xs sm:text-sm leading-relaxed">
                  Pour des raisons d'hygiène et de sécurité évidente des produits cosmétiques et parfums :
                </p>
                <ul className="text-gray-500 text-xs list-disc pl-4 space-y-1 font-sans">
                  <li>L'article doit être scellé dans son emballage carton ou plastique d'origine intact.</li>
                  <li>Les flacons de parfums ne doivent pas avoir été vaporisés.</li>
                  <li>Les opercules des crèmes et maquillages Deliplus / Mercadona ne doivent pas être percés.</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-xs uppercase tracking-widest text-pink-900">3. Comment Effectuer mon Retour ?</h3>
                <p className="text-gray-550 text-xs sm:text-sm leading-relaxed">
                  C'est extrêmement simple ! Prenez une photo de l'article fermé et envoyez-la à notre assistance client sur WhatsApp. Nous organiserons le passage d'un livreur partenaire à votre domicile pour récupérer l'article, ou nous vous guiderons pour le confier au guichet Amana le plus proche.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-xs uppercase tracking-widest text-pink-900">4. Modalités de Remboursement</h3>
                <p className="text-[#55504d] text-xs sm:text-sm leading-relaxed">
                  Une fois l'article arrivé à notre dépôt de Casablanca et vérifié conforme, votre remboursement s'effectue sous 48h au choix :
                </p>
                <div className="flex gap-2 text-xs font-semibold font-mono text-pink-900 mt-2 bg-pink-50/60 p-2 rounded-xl border border-pink-100">
                  <Landmark className="w-4 h-4 text-pink-700" /> Virement Bancaire Marocain (CIH, Attijari...) OU Bon d'achat boutique valeur +10% !
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-lg space-y-6" id="about-panel">
            <div className="border-b border-gray-50 pb-4 text-center sm:text-left">
              <h2 className="font-serif text-3xl font-bold text-pink-950">
                beautybypnd
              </h2>
              <p className="text-[10px] uppercase font-bold tracking-[0.25em] text-pink-700 mt-0.5">L'Élégance de la Parfumerie & Sourcing International</p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 space-y-4">
                <h3 className="font-serif text-xl font-bold text-gray-800">Qui sommes-nous ?</h3>
                <p className="text-gray-650 text-xs sm:text-sm leading-relaxed font-sans">
                  Initié à Casablanca, <span className="font-semibold text-pink-900">BeautyByPND</span> s'est donné pour mission de rendre la haute parfumerie, la cosmétique d'exception, les sacs chics et la mode ultra-tendance accessibles à toutes les femmes marocaines sans payer de frais de douane exorbitants ni attendre des semaines.
                </p>
                <p className="text-gray-650 text-xs sm:text-sm leading-relaxed font-sans">
                  Nous sommes spécialisés dans le <b>Sourcing International de Prestige</b> : à l'écoute des tendances virales sur les réseaux sociaux (TikTok), nous voyageons en Europe pour dégoter directement les meilleures pépites des grandes enseignes comme <b>Action</b>, <b>Mercadona / Deliplus</b>, ou encore assembler le meilleur des catalogues de <b>SHEIN</b>, les parfums les plus prisés et les sacs d'inspiration chic.
                </p>
                <h3 className="font-serif text-lg font-bold text-pink-950 pt-2">Pourquoi nous faire confiance ?</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <li className="flex gap-2 items-center text-xs font-semibold text-gray-700">
                    <CheckCircle className="w-4.5 h-4.5 text-emerald-600 flex-shrink-0" /> Produits 100% Originaux certifiés
                  </li>
                  <li className="flex gap-2 items-center text-xs font-semibold text-gray-700">
                    <CheckCircle className="w-4.5 h-4.5 text-emerald-600 flex-shrink-0" /> Service Clientèle WhatsApp 7j/7
                  </li>
                  <li className="flex gap-2 items-center text-xs font-semibold text-gray-700">
                    <CheckCircle className="w-4.5 h-4.5 text-emerald-600 flex-shrink-0" /> Paiement Sécurisé à la Livraison
                  </li>
                  <li className="flex gap-2 items-center text-xs font-semibold text-gray-700">
                    <CheckCircle className="w-4.5 h-4.5 text-emerald-600 flex-shrink-0" /> Pas de surprises de douanes
                  </li>
                </ul>
              </div>

              {/* Decorative Team graphic card */}
              <div className="w-full md:w-80 bg-[#FAF4F1] border border-pink-100 rounded-2.5xl p-6 text-center space-y-4">
                <div className="w-16 h-16 bg-pink-100 text-pink-900 font-serif text-3xl font-bold flex items-center justify-center rounded-full mx-auto shadow-sm">
                  PND
                </div>
                <div>
                  <h4 className="font-serif font-bold text-gray-800 text-base">Équipe Conciergerie</h4>
                  <p className="text-[10px] text-pink-850 font-bold uppercase tracking-wider mt-0.5">Sourcing Casa-Madrid-Paris</p>
                </div>
                <p className="text-[11px] text-gray-500 italic leading-snug">
                  "Chaque semaine, nous inspectons les arrivages Action en France et Deliplus en Espagne pour ramener les meilleurs secrets beauté d'Europe à nos clientes au Maroc !"
                </p>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
