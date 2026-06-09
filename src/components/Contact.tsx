import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { CONTACT_WHATSAPP_NUMBER } from '../data/products';
import { MessageSquare, Mail, Phone, Clock, MapPin, ChevronDown, ChevronUp, Send, Sparkles } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

export const Contact: React.FC = () => {
  const { showNotification } = useShop();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Form states
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');

  const faqs: FAQItem[] = [
    {
      q: 'Comment fonctionne le Paiement à la Livraison ?',
      a: 'C’est simple et sécurisé ! Vous passez commande sur notre site en renseignant vos coordonnées. Nous expédions votre colis par notre service de livraison. À l’arrivée du livreur chez vous, vous inspectez votre marchandise et lui remettez le montant en espèces. Pas besoin de carte bancaire !'
    },
    {
      q: 'Quels sont vos délais et tarifs de livraison ?',
      a: 'Nous livrons sous 24h à 48h jours ouvrables à compter de la confirmation. La livraison est de 30 DH pour toute commande inférieure à 600 DH, et devient entièrement GRATUITE à partir de 600 DH d\'achats !'
    },
    {
      q: 'Vos produits sont-ils authentiques et originaux ?',
      a: 'Chez BeautyByPnd, l’authenticité est notre signature absolue. Tous nos parfums, cosmétiques, montres et accessoires de mode proviennent de circuits de distribution officiels et de marques certifiées. Nous garantissons l\'origine de toutes nos pièces.'
    },
    {
      q: 'Puis-je échanger un article ou demander un remboursement ?',
      a: 'Oui, vous disposez d\'un délai de 7 jours après la livraison pour demander un échange ou un retour si l’article ne vous convient pas ou présente un défaut. Pour lancer la procédure, contactez-nous directement sur WhatsApp.'
    }
  ];

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMsg) return;

    showNotification('Votre message a bien été envoyé ! Nous vous répondrons sous peu. 🥰', 'success');
    setContactName('');
    setContactEmail('');
    setContactMsg('');
  };

  const genericWhatsAppMessage = 'Bonjour BeautyByPnd ! J\'aimerais avoir des informations complémentaires sur vos produits et vos arrivages de collection.';
  const directWALink = `https://wa.me/${CONTACT_WHATSAPP_NUMBER}?text=${encodeURIComponent(genericWhatsAppMessage)}`;

  return (
    <div className="bg-transparent py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="contact-view">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-pink-700 mb-2">
          Service Client Disponible 24/7
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-pink-950 mb-4">
          Contactez BeautyByPnd
        </h2>
        <div className="h-[2px] w-12 bg-pink-600 mx-auto mb-4" />
        <p className="text-gray-700 font-normal text-sm sm:text-base leading-relaxed">
          Une question concernant un parfum, une taille de vêtement ou besoin d’aide pour valider votre commande ? Notre équipe chaleureuse vous accompagne pas à pas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
        
        {/* Left column: Contact Info Cards */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Main WhatsApp Direct Chat box */}
          <div className="bg-white/40 backdrop-blur-md border border-white/60 rounded-2xl p-6 text-center shadow-lg shadow-pink-950/5">
            <div className="w-12 h-12 bg-[#25D366]/15 rounded-full flex items-center justify-center text-[#128C7E] mx-auto mb-4 animate-bounce">
              <MessageSquare className="w-6 h-6 fill-[#25D366] text-white" />
            </div>
            <h3 className="font-serif text-lg font-bold text-pink-950 mb-2">
              Discussion WhatsApp Directe
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed mb-5 font-normal">
              Notre canal le plus rapide ! Cliquez et discutez instantanément avec notre conseillère beauté sur WhatsApp.
            </p>
            <a
              href={directWALink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 px-5 py-3 bg-[#25D366] hover:bg-[#128C7E] text-white text-xs font-bold tracking-widest uppercase rounded-xl shadow-md transition-all hover:-translate-y-0.5"
              id="contact-whatsapp-direct"
            >
              <MessageSquare className="w-4 h-4 fill-white text-[#25D366]" />
              Lancer la discussion
            </a>
          </div>

          {/* Core metadata blocks - styled with glass panel */}
          <div className="bg-white/30 backdrop-blur-md border border-white/50 rounded-2xl p-6 space-y-5 shadow-sm shadow-pink-950/5">
            
            <div className="flex items-start gap-3.5">
              <Mail className="w-5 h-5 text-pink-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-pink-950">E-mail Boutique</h4>
                <p className="text-sm font-semibold text-gray-700 mt-0.5">contact@beautybypnd.com</p>
                <p className="text-[10px] text-gray-500">Réponse garantie sous 12h</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 border-t border-pink-100/50 pt-4">
              <Clock className="w-5 h-5 text-pink-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-pink-950">Heures d'ouverture</h4>
                <p className="text-sm font-semibold text-gray-700 mt-0.5">Lundi — Samedi : 09:00 - 20:00</p>
                <p className="text-sm font-semibold text-gray-700">Dimanche : Fermé</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 border-t border-pink-100/50 pt-4">
              <MapPin className="w-5 h-5 text-pink-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-pink-950">Siège Showroom</h4>
                <p className="text-sm font-semibold text-gray-700 mt-0.5">Boulevard d'Anfa, Maarif</p>
                <p className="text-sm font-semibold text-gray-700">Casablanca, Maroc</p>
              </div>
            </div>

          </div>

        </div>

        {/* Right column: Message Form & Interactive Faqs block */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* FAQ Accordion container */}
          <div className="border border-white/50 rounded-2xl p-6 sm:p-8 bg-white/40 backdrop-blur-md shadow-lg shadow-pink-950/5">
            <h3 className="font-serif text-xl font-bold text-pink-950 mb-6 flex items-center gap-1.5">
              <Sparkles className="w-5 h-5 text-pink-700" />
              Foire Aux Questions (FAQ)
            </h3>

            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div key={index} className="border border-pink-100/50 rounded-xl overflow-hidden bg-white/50">
                    
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full flex justify-between items-center px-4 py-4 text-left font-serif text-sm sm:text-base text-pink-950 font-bold hover:text-pink-700 transition-colors focus:outline-none cursor-pointer"
                      id={`faq-btn-${index}`}
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-pink-700 font-bold" /> : <ChevronDown className="w-4 h-4 text-pink-400" />}
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 text-xs sm:text-sm text-gray-700 leading-relaxed font-normal border-t border-pink-100/30 pt-3 animate-fadeIn bg-white/70">
                        {faq.a}
                      </div>
                    )}

                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick email query sender form */}
          <div className="border border-pink-100/50 rounded-2xl p-6 sm:p-8 bg-white/30 backdrop-blur-md shadow-lg shadow-pink-950/5">
            <h3 className="font-serif text-lg font-bold text-pink-950 mb-5">
              Écrivez-nous un message
            </h3>

            <form onSubmit={handleMessageSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-pink-900 mb-1">Votre Nom</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Ex: Myriam"
                    className="w-full px-4 py-2.5 bg-white/60 border border-pink-100 rounded-xl text-sm text-pink-950 focus:ring-1 focus:ring-pink-500 focus:outline-none placeholder-pink-300 transition-all"
                    id="contact-form-name"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-pink-900 mb-1">Votre E-mail</label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="Ex: myriam@example.com"
                    className="w-full px-4 py-2.5 bg-white/60 border border-pink-100 rounded-xl text-sm text-pink-950 focus:ring-1 focus:ring-pink-500 focus:outline-none placeholder-pink-300 transition-all"
                    id="contact-form-email"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-[10px] font-bold uppercase tracking-wider text-pink-900 mb-1">Votre Message</label>
                <textarea
                  required
                  rows={4}
                  value={contactMsg}
                  onChange={(e) => setContactMsg(e.target.value)}
                  placeholder="Écrivez votre question ou remarque ici..."
                  className="w-full px-4 py-2.5 bg-white/60 border border-pink-100 rounded-xl text-sm text-pink-950 focus:ring-1 focus:ring-pink-500 focus:outline-none placeholder-pink-300 transition-all resize-none"
                  id="contact-form-message"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-pink-900 hover:bg-pink-800 text-white text-xs font-bold tracking-widest uppercase transition-all rounded-xl shadow-md shadow-pink-950/20 hover:scale-[1.02] active:translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
                id="contact-form-submit"
              >
                <Send className="w-3.5 h-3.5" />
                Envoyer mon Message
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};
