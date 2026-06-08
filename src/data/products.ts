import { Product } from '../types';

export const PRODUCTS: Product[] = [
  // --- PARFUMS ---
  {
    id: 'perf-01',
    name: 'La Vie en Rose - Eau de Parfum (100ml)',
    description: 'Une essence florale lumineuse et romantique associant la rose de Grasse à des notes de jasmin sauvage et d\'ambre blanc.',
    details: [
      'Notes de tête : Bergamote, Freesia, Poire',
      'Notes de cœur : Rose de Damas, Jasmin Sambac, Iris',
      'Notes de fond : Patchouli, Musc blanc, Vanille précieuse',
      'Flacon vaporisateur élégant avec son ruban de satin fait main'
    ],
    price: 390,
    originalPrice: 550,
    category: 'parfums',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600',
    inStock: true,
    rating: 4.8,
    reviewsCount: 124,
    tag: 'Promo'
  },
  {
    id: 'perf-02',
    name: 'Nuit Sombre d\'Orient (100ml)',
    description: 'Un parfum envoûtant et sensuel aux accords boisés, épicés et cuirés, conçu pour les soirées sophistiquées.',
    details: [
      'Notes de tête : Safran, Poivre noir, Cardamome',
      'Notes de cœur : Bois de Oud, Encens, Rose noire',
      'Notes de fond : Cuir, Bois de santal, Ambre noir',
      'Sillage longue durée exceptionnel de plus de 12 heures'
    ],
    price: 450,
    category: 'parfums',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600',
    inStock: true,
    rating: 4.9,
    reviewsCount: 88,
    tag: 'Best Seller'
  },
  {
    id: 'perf-03',
    name: 'Ambre d\'Or Secret (50ml)',
    description: 'Une création rare et mystérieuse mêlant la chaleur de l\'ambre gris et l\'exquise douceur de la vanille bourbon.',
    details: [
      'Notes de tête : Mandarine d\'Italie, Épices douces',
      'Notes de cœur : Ambre précieux, Labdanum',
      'Notes de fond : Vanille de Madagascar, Cèdre de l\'Atlas',
      'Édition limitée de notre collection privée haut de gamme'
    ],
    price: 590,
    category: 'parfums',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=600',
    inStock: true,
    rating: 4.7,
    reviewsCount: 42,
    tag: 'Exclusif'
  },

  // --- COSMÉTIQUES ---
  {
    id: 'cosm-01',
    name: 'Sérum Éclat Divin - Vitamine C & Acide Hyaluronique',
    description: 'Un soin visage intensif qui réveille l\'éclat naturel de la peau, estompe les taches de fatigue et hydrate intensément.',
    details: [
      'Formulé avec 15% de Vitamine C pure et stable',
      'Acide hyaluronique multi-poids pour repulper la peau',
      'Texture ultra-légère non grasse à pénétration rapide',
      'Sans parabènes, sans silicone, 98% d\'ingrédients naturels'
    ],
    price: 180,
    category: 'cosmetiques',
    image: 'https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&q=80&w=600',
    inStock: true,
    rating: 4.6,
    reviewsCount: 145,
    tag: 'Best Seller'
  },
  {
    id: 'cosm-02',
    name: 'Rouge à Lèvres Velours Satiné - Nuance Rose Glamour',
    description: 'Un rouge à lèvres crème ultra-pigmenté au fini velouté mat, qui garde les lèvres douces et hydratées toute la journée.',
    details: [
      'Pigments haute définition pour une couleur vibrante dès le premier passage',
      'Enrichi en huile de jojoba et beurre de karité nourrissant',
      'Tenue confortable sans dessèchement pendant 8 heures',
      'Teinte parfaite s\'adaptant à toutes les carnations'
    ],
    price: 120,
    originalPrice: 160,
    category: 'cosmetiques',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=600',
    inStock: true,
    rating: 4.5,
    reviewsCount: 97,
    tag: 'Promo'
  },
  {
    id: 'cosm-03',
    name: 'Palette Nuances Divines (12 Couleurs)',
    description: 'Un écrin de 12 teintes d\'ombres à paupières haut de gamme allant des nudes irisés aux dorés profonds et roses boisés.',
    details: [
      '6 fards mats veloutés et 6 fards métallisés scintillants',
      'Poudres micronisées ultra-faciles à estomper et à dégrader',
      'Livrée avec un pinceau double embout professionnel intégré',
      'Idéale pour les maquillages de jour naturels comme pour les smoky de soirée'
    ],
    price: 250,
    category: 'cosmetiques',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=600',
    inStock: true,
    rating: 4.8,
    reviewsCount: 64,
    tag: 'Nouveau'
  },

  // --- VÊTEMENTS ---
  {
    id: 'vet-01',
    name: 'Robe d\'Été Romantique en Lin Blanc',
    description: 'Une robe midi fluide d\'un blanc éclatant, en pur lin d\'une grande douceur. Dos nu délicat et bretelles ajustables.',
    details: [
      '100% lin de qualité premium, respirant et délicat',
      'Coupe ajustée à la taille et évasée sur la longueur',
      'Détails de broderie anglaise chic sur l\'ourlet bas',
      'Parfaite pour les escapades ensoleillées ou événements chics'
    ],
    price: 420,
    category: 'vetements',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600',
    inStock: true,
    rating: 4.9,
    reviewsCount: 51,
    tag: 'Nouveau'
  },
  {
    id: 'vet-02',
    name: 'Blazer Croisé Parisien Beige Crème',
    description: 'Un blazer structuré chic et intemporel doté de boutons dorés gravés. Une pièce incontournable pour un look élégant.',
    details: [
      'Tissu de costume à tenue impeccable, entièrement doublé de satin rose pâle',
      'Coupe droite moderne légèrement ajustée au niveau des épaules',
      'Poches à rabat fonctionnelles avec col à revers raffiné',
      'Se marie à merveille avec un jean casual ou un pantalon de tailleur'
    ],
    price: 490,
    category: 'vetements',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600',
    inStock: true,
    rating: 4.7,
    reviewsCount: 73,
    tag: 'Best Seller'
  },
  {
    id: 'vet-03',
    name: 'Jupe Midi Plissée à Fleurs de Soie',
    description: 'Jupe délicatement plissée au motif floral pastel, offrant un mouvement somptueux à chacun de vos pas.',
    details: [
      'Voile satiné soyeux de haute qualité avec doublure opaque douce',
      'Taille élastique dorée confortable qui souligne la silhouette',
      'Longueur midi élégante avec plis permanents haute précision',
      'Lavage délicat recommandé pour préserver la brillance pastel des fleurs'
    ],
    price: 310,
    originalPrice: 390,
    category: 'vetements',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600',
    inStock: true,
    rating: 4.6,
    reviewsCount: 39,
    tag: 'Promo'
  },

  // --- SACS ---
  {
    id: 'sac-01',
    name: 'Le Cabas Gabrielle - Cuir Souple Crème',
    description: 'Un sac cabas luxueux en cuir grainé couleur crème, spacieux et idéal pour emporter vos essentiels stylistiques.',
    details: [
      '100% Cuir de veau véritable, grainé et extrêmement résistant',
      'Détails et fermoirs métalliques dorés avec logo gravé discret',
      'Intérieur doublé en suédine beige avec compartiments zippés',
      'Dimensions : Largeur 38cm, Hauteur 28cm, Profondeur 13cm'
    ],
    price: 680,
    category: 'sacs',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=600',
    inStock: true,
    rating: 4.9,
    reviewsCount: 112,
    tag: 'Best Seller'
  },
  {
    id: 'sac-02',
    name: 'Pochette de Soirée Satinée Élite',
    description: 'Une pochette de soirée d\'une finesse incomparable, en satin ivoire drapé avec une bandoulière amovible en chaîne bijou.',
    details: [
      'Tissu de satin de soie drapé fait main à la main',
      'Fermoir bijou doré orné de nacre de synthèse synthétique',
      'Chaîne amovible de 115cm pour un porté épaule ou en pochette à main',
      'Format idéal pour smartphone, miroir, clé et rouge à lèvres'
    ],
    price: 350,
    originalPrice: 450,
    category: 'sacs',
    image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc15aae9?auto=format&fit=crop&q=80&w=600',
    inStock: true,
    rating: 4.8,
    reviewsCount: 56,
    tag: 'Promo'
  },
  {
    id: 'sac-03',
    name: 'Sac Seau Iris - Camel Satiné',
    description: 'Un sac d\'inspiration bohème-chic en cuir suédé camel avec pompon décoratif et cordon de serrage en cuir tressé.',
    details: [
      'Cuir de vachette finition nubuck véritable touché pêche',
      'Cordon de serrage coulissant très souple',
      'Bandoulière en cuir réglable pour un porté épaule confortable',
      'Parfait pour ajouter une touche preppy-chic à toutes vos tenues'
    ],
    price: 480,
    category: 'sacs',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=600',
    inStock: true,
    rating: 4.5,
    reviewsCount: 28,
    tag: 'Nouveau'
  },

  // --- MONTRES ---
  {
    id: 'mon-01',
    name: 'Montre Altesse Impériale - Or Rose & Nacre',
    description: 'Une montre d\'exception chic et féminine dotée d\'un cadran en nacre véritable et d\'un bracelet en acier or rose finement ciselé.',
    details: [
      'Mouvement à quartz japonais de haute précision d\'une excellente fiabilité',
      'Boîtier en acier inoxydable 32mm ultra-plat, finition or rose poli',
      'Verre saphir inrayable et étanchéité de niveau 3 ATM (splashproof)',
      'Bracelet en maille milanaise sophistiquée auto-ajustable'
    ],
    price: 850,
    category: 'montres',
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=600',
    inStock: true,
    rating: 4.9,
    reviewsCount: 94,
    tag: 'Best Seller'
  },
  {
    id: 'mon-02',
    name: 'Montre Astrée Élégance - Cuir Blanc',
    description: 'Une pièce d\'horlogerie élégante qui allie un boîtier doré brossé classique à la pureté d\'un bracelet en cuir blanc épuré.',
    details: [
      'Cadran blanc épuré avec de fins index géométriques gravés dorés',
      'Bracelet en cuir véritable blanc cousu à la main, boucle ardillon',
      'Boîtier de 34mm en acier plaqué or brossé ultra-discret',
      'Un design intemporel d\'un raffinement absolu pour un style quotidien poli'
    ],
    price: 720,
    originalPrice: 950,
    category: 'montres',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=600',
    inStock: true,
    rating: 4.7,
    reviewsCount: 61,
    tag: 'Promo'
  },
  // --- SÉLECTION SHEIN ---
  {
    id: 'shein-01',
    name: 'Top en Maille Côtelée Blanc - Collection SHEIN',
    description: 'Un magnifique t-shirt en tricot de maille côtelée fine avec encolure festonnée et détails perlés scintillants pour sublimer vos soirées.',
    details: [
      'Marque : SHEIN - Collection Glamour certifiée',
      'Composition : 95% Polyester ultra doux extensible, 5% Élasthanne',
      'Coupe ajustée flatteuse avec manches papillon courtes',
      'Idéal avec un jean taille haute ou une jupe plissée pastel'
    ],
    price: 165,
    category: 'vetements',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600',
    inStock: true,
    rating: 4.8,
    reviewsCount: 231,
    tag: 'Nouveau'
  },
  {
    id: 'shein-02',
    name: 'Robe Longue Fleurie de Vacances - Collection SHEIN',
    description: 'Une superbe robe longue fleurie à bretelles de style champêtre avec fente ajustable, parfaite pour vos sorties d\'été décontractées.',
    details: [
      'Marque : SHEIN - Tissu fluide respirant et antistatique',
      'Dos nu croisé très féminin avec cordon réglable',
      'Imprimé champêtre fleurs sauvages haute fidélité',
      'Lavage en machine à froid rapide'
    ],
    price: 240,
    originalPrice: 290,
    category: 'vetements',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=600',
    inStock: true,
    rating: 4.6,
    reviewsCount: 312,
    tag: 'Promo'
  },
  // --- MERKADONA (DELIPLUS) ---
  {
    id: 'merca-01',
    name: 'Crème à l\'Huile d\'Olive Hydratante Visage & Corps - Mercadona Deliplus',
    description: 'La crème culte et ultra populaire de Mercadona pour nourrir intensément la peau sèche et lui redonner souplesse et élasticité.',
    details: [
      'Marque : Deliplus (Exclusivité Mercadona Espagne)',
      'Formule enrichie en huile d\'olive vierge extra pressée à froid',
      'Hydratation longue durée cliniquement prouvée de 24h',
      'Grand format généreux idéal pour toute la famille'
    ],
    price: 85,
    category: 'cosmetiques',
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=600',
    inStock: true,
    rating: 4.9,
    reviewsCount: 540,
    tag: 'Best Seller'
  },
  {
    id: 'merca-02',
    name: 'Sérum Anti-âge Huile de Rose Musquée Régénérant - Mercadona Deliplus',
    description: 'Un merveilleux concentré de soin qui estompe les imperfections cutanées, cicatrice et prévient les ridules grâce à la rose musquée.',
    details: [
      'Marque : Deliplus des supermarchés Mercadona',
      '100% Huile de Rose musquée pure d\'origine naturelle',
      'Texture fine et fluide non comédogène, absorption instantanée',
      'Appliquer 3 à 4 gouttes chaque soir de préférence sur le visage humide'
    ],
    price: 130,
    category: 'cosmetiques',
    image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=600',
    inStock: true,
    rating: 4.8,
    reviewsCount: 228,
    tag: 'Exclusif'
  },
  // --- EXCLUSIVITÉS ACTION ---
  {
    id: 'action-01',
    name: 'Brume Hydratante Corps & Cheveux Coco - Collection ACTION Max',
    description: 'Une explosion aromatique exotique et rafraîchissante qui hydrate vos cheveux et votre peau avec une senteur paradisiaque.',
    details: [
      'Marque / Sélection : Action Europe - Max & More',
      'Sans alcool et au pH équilibré pour les peaux les plus sensibles',
      'Senteur irrésistible de coco crémeux et vanille des îles',
      'Format spray léger de voyage (150ml) facile à transporter'
    ],
    price: 65,
    category: 'cosmetiques',
    image: 'https://images.unsplash.com/photo-1556229174-5e42a09e45af?auto=format&fit=crop&q=80&w=600',
    inStock: true,
    rating: 4.7,
    reviewsCount: 310,
    tag: 'Nouveau'
  },
  {
    id: 'action-02',
    name: 'Palette Ombre à Paupières Max & More (24 Nuances) - ACTION',
    description: 'Une superbe collection géante de fards à paupières de qualité professionnelle aux couleurs riches pour laisser libre cours à votre créativité maquillage.',
    details: [
      'Gamme maquillage culte de l\'enseigne discount ACTION',
      'Pigments vifs tenue parfaite sans transfert',
      'Mélange unique de fards mats, nacrés, satinés et pailletés',
      'Formule 100% vegan et certifiée cruelty-free (sans cruauté animale)'
    ],
    price: 110,
    originalPrice: 150,
    category: 'cosmetiques',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=600',
    inStock: true,
    rating: 4.5,
    reviewsCount: 418,
    tag: 'Promo'
  }
];

export const CATEGORIES = [
  { id: 'all', name: 'Tout voir' },
  { id: 'parfums', name: 'Parfums' },
  { id: 'cosmetiques', name: 'Cosmétiques' },
  { id: 'vetements', name: 'Vêtements' },
  { id: 'sacs', name: 'Sacs' },
  { id: 'montres', name: 'Montres' }
];

export const HERO_SLIDES = [
  {
    id: 1,
    title: 'Élégance Féminine',
    subtitle: 'La nouvelle collection est arrivée',
    description: 'Découvrez notre sélection exclusive de parfums envoûtants, cosmétiques de pointe, vêtements raffinés, sacs et montres de prestige.',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=1200',
    buttonText: 'Découvrir la collection',
    actionCategory: 'all'
  },
  {
    id: 2,
    title: 'Parfums d\'Exception',
    subtitle: 'Sillonnez les senteurs de Grasse',
    description: 'Une gamme de fragrances divines élaborée par les plus grands parfumeurs pour souligner votre sillage unique.',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=1200',
    buttonText: 'Explorer les Parfums',
    actionCategory: 'parfums'
  },
  {
    id: 3,
    title: 'Accessoires de Luxe',
    subtitle: 'Sacs & Montres d\'Élite',
    description: 'Trouvez l\'accessoire parfait : des sacs en cuir véritable d\'une qualité supérieure et des montres d\'une précision absolue.',
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=1200',
    buttonText: 'Voir les Accessoires',
    actionCategory: 'sacs'
  }
];

export const CONTACT_WHATSAPP_NUMBER = '212612345678'; // Example Moroccan WhatsApp number
export const INSTAGRAM_LINK = 'https://instagram.com/beautybypnd';
export const FACEBOOK_LINK = 'https://facebook.com/beautybypnd';
