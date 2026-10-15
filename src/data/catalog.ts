export interface ProductReview {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  verifiedSize: string;
  title: string;
  comment: string;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  category:
    | 'New Arrivals'
    | 'Dresses'
    | 'Eastern Wear'
    | 'Western Wear'
    | 'Co-Ord Sets'
    | 'Abayas'
    | 'Casual Wear'
    | 'Formal Wear'
    | 'Party Wear'
    | 'Accessories';
  subCategories: string[];
  styleTags: (
    | 'Elegant'
    | 'Minimal'
    | 'Traditional'
    | 'Modern'
    | 'Casual'
    | 'Luxury'
    | 'Party'
    | 'Office Wear'
    | 'Festive'
    | 'Romantic'
  )[];
  collection:
    | 'The Signature Collection'
    | 'Everyday Elegance'
    | 'Festive Edit'
    | 'Evening Glamour';
  fabric: 'Pure Organza Silk' | 'Raw Silk' | 'Crepe Chiffon' | 'Velvet & Zari' | 'Korean Lawn' | 'Satin Charmeuse';
  occasion: 'Festive & Wedding' | 'Evening Soirée' | 'Daytime Chic' | 'Work & Atelier';
  season: 'All-Season Couture' | 'Summer/Spring' | 'Autumn/Winter';
  fit: 'Relaxed Tailored' | 'Flowing Silhouette' | 'Structured Fit' | 'Modest Drape';
  colors: ProductColor[];
  sizes: ('XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL')[];
  primaryImage: string;
  secondaryImage: string;
  galleryImages: string[];
  badge?: 'New' | 'Bestseller' | 'Limited Edition' | 'Sale';
  inStock: boolean;
  shortDescription: string;
  description: string;
  fabricDetails: string[];
  sizeAndFit: string;
  careInstructions: string[];
  deliveryInfo: string;
  completeTheLookIds: string[];
  reviews: ProductReview[];
}

export interface CategoryItem {
  id: string;
  name: Product['category'];
  subtitle: string;
  itemCount: string;
  image: string;
}

export interface StyleItem {
  id: string;
  name: Product['styleTags'][number];
  tagline: string;
  accentHex: string;
  image: string;
}

export interface CollectionBannerItem {
  id: string;
  title: Product['collection'];
  kicker: string;
  subtitle: string;
  image: string;
  featuredProductIds: string[];
}

export interface LookbookSpread {
  id: string;
  chapter: string;
  title: string;
  editorialNote: string;
  image: string;
  hotspots: {
    id: string;
    xPercent: number;
    yPercent: number;
    productId: string;
    label: string;
  }[];
}

// Generated high-fashion asset paths
export const ASSETS = {
  heroCampaign: '/src/assets/images/hero_luxury_campaign_1791435219262.jpg',
  roseGardenMaxi: '/src/assets/images/product_rose_garden_maxi_1791435230985.jpg',
  pearlGraceKurti: '/src/assets/images/product_pearl_grace_kurti_1791435240135.jpg',
  ivoryLuxeAbaya: '/src/assets/images/product_ivory_luxe_abaya_1791435250077.jpg',
  midnightEleganceDress: '/src/assets/images/product_midnight_elegance_dress_1791435259462.jpg',
  editorialLookbook: '/src/assets/images/editorial_lookbook_signature_1791435268405.jpg',
};

export const PRODUCTS: Product[] = [
  {
    id: 'rose-garden-maxi-dress',
    name: 'Rose Garden Maxi Dress',
    sku: 'SAM-26-001',
    price: 28500,
    originalPrice: 32000,
    rating: 4.9,
    reviewCount: 42,
    category: 'Dresses',
    subCategories: ['New Arrivals', 'Dresses', 'Formal Wear', 'Party Wear'],
    styleTags: ['Elegant', 'Romantic', 'Luxury', 'Party'],
    collection: 'The Signature Collection',
    fabric: 'Pure Organza Silk',
    occasion: 'Evening Soirée',
    season: 'All-Season Couture',
    fit: 'Flowing Silhouette',
    colors: [
      { name: 'Blush Rose', hex: '#E8C5C0' },
      { name: 'Warm Ivory', hex: '#F5EFE6' },
      { name: 'Champagne Gold', hex: '#D4B982' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    primaryImage: ASSETS.roseGardenMaxi,
    secondaryImage: ASSETS.heroCampaign,
    galleryImages: [ASSETS.roseGardenMaxi, ASSETS.heroCampaign, ASSETS.editorialLookbook],
    badge: 'New',
    inStock: true,
    shortDescription:
      'Floor-sweeping blush pink silk organza maxi with delicate hand-embroidered metallic gold botanical motifs.',
    description:
      'Crafted in our Lahore couture atelier, the Rose Garden Maxi Dress embodies romantic femininity. Cut from weightless pure silk organza in a signature dusty blush tone, the bodice and cascading panels feature hand-worked tilla, resham, and pearl florets that catch the light with every step.',
    fabricDetails: [
      '100% Pure Mulberry Organza Silk outer layer',
      'Soft breathable viscose crepe slip lining included',
      'Hand-embellished antique gold zari and natural freshwater seed pearls',
    ],
    sizeAndFit:
      'Floor-length flared silhouette. True to standard size. Model is 5\'8" and wears size Small (Length: 56 inches).',
    careInstructions: [
      'Specialist dry clean only',
      'Steam lightly from the reverse side',
      'Store in the provided breathable cotton garment bag away from direct sunlight',
    ],
    deliveryInfo: 'Dispatched within 2–3 business days. Complimentary luxury gift box packaging included.',
    completeTheLookIds: ['classic-pearl-set', 'ivory-luxe-abaya', 'golden-bloom-formal'],
    reviews: [
      {
        id: 'rev-1',
        author: 'Ayesha Sikandar',
        city: 'Lahore',
        rating: 5,
        date: 'September 28, 2026',
        verifiedSize: 'M',
        title: 'Breathtaking craftsmanship and drape',
        comment:
          'Wore the Rose Garden Maxi to my sister’s engagement dinner in Gulberg. The blush tone and subtle gold threadwork look straight out of a couture runway.',
      },
      {
        id: 'rev-2',
        author: 'Zara Mahmood',
        city: 'Islamabad',
        rating: 5,
        date: 'September 19, 2026',
        verifiedSize: 'S',
        title: 'True luxury quality',
        comment:
          'The stitching finish and inner slip lining are impeccable. Fits like a dream without needing any alterations.',
      },
    ],
  },
  {
    id: 'pearl-grace-kurti',
    name: 'Pearl Grace Kurti',
    sku: 'SAM-26-002',
    price: 14500,
    rating: 4.8,
    reviewCount: 64,
    category: 'Eastern Wear',
    subCategories: ['New Arrivals', 'Eastern Wear', 'Casual Wear'],
    styleTags: ['Minimal', 'Traditional', 'Elegant', 'Office Wear'],
    collection: 'Everyday Elegance',
    fabric: 'Raw Silk',
    occasion: 'Daytime Chic',
    season: 'All-Season Couture',
    fit: 'Relaxed Tailored',
    colors: [
      { name: 'Alabaster Ivory', hex: '#FAF5EE' },
      { name: 'Soft Blush', hex: '#EED9D4' },
      { name: 'Warm Taupe', hex: '#C7B8A9' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    primaryImage: ASSETS.pearlGraceKurti,
    secondaryImage: ASSETS.editorialLookbook,
    galleryImages: [ASSETS.pearlGraceKurti, ASSETS.editorialLookbook, ASSETS.heroCampaign],
    badge: 'New',
    inStock: true,
    shortDescription:
      'Tailored ivory Korean raw silk tunic adorned with freshwater pearls and fine gold thread detailing along the neckline.',
    description:
      'Designed for effortless poise from daytime luncheons to intimate dinners, the Pearl Grace Kurti pairs structured Korean raw silk with artisanal pearl clusters on a split mandarin collar and scalloped cuffs.',
    fabricDetails: [
      '85% Korean Raw Silk, 15% Cotton blend for breathable structure',
      'Hand-sewn lustrous pearl and zardozi neckline detail',
      'Paired with matching straight-leg raw silk trousers',
    ],
    sizeAndFit:
      'Relaxed straight-cut silhouette. Knee-length (42 inches). Model is 5\'7" and wears size Small.',
    careInstructions: [
      'Dry clean recommended or gentle cold hand wash',
      'Iron on low silk setting on reverse side',
    ],
    deliveryInfo: 'Ready to ship — delivered in 2–4 working days across Pakistan.',
    completeTheLookIds: ['classic-pearl-set', 'blush-silk-co-ord'],
    reviews: [
      {
        id: 'rev-3',
        author: 'Hina Tariq',
        city: 'Karachi',
        rating: 5,
        date: 'October 01, 2026',
        verifiedSize: 'L',
        title: 'My go-to sophisticated eastern outfit',
        comment:
          'So rare to find white/ivory raw silk that isn’t see-through. The pearl work around the cuffs is so delicate and classy.',
      },
    ],
  },
  {
    id: 'blush-silk-co-ord',
    name: 'Blush Silk Co-Ord',
    sku: 'SAM-26-003',
    price: 18900,
    originalPrice: 21500,
    rating: 4.9,
    reviewCount: 38,
    category: 'Co-Ord Sets',
    subCategories: ['New Arrivals', 'Co-Ord Sets', 'Western Wear', 'Casual Wear'],
    styleTags: ['Modern', 'Minimal', 'Casual', 'Office Wear'],
    collection: 'Everyday Elegance',
    fabric: 'Satin Charmeuse',
    occasion: 'Work & Atelier',
    season: 'Summer/Spring',
    fit: 'Relaxed Tailored',
    colors: [
      { name: 'Dusty Blush', hex: '#E6C8C3' },
      { name: 'Champagne Cream', hex: '#F3E9DC' },
      { name: 'Espresso Noir', hex: '#2B221E' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    primaryImage: ASSETS.editorialLookbook,
    secondaryImage: ASSETS.roseGardenMaxi,
    galleryImages: [ASSETS.editorialLookbook, ASSETS.roseGardenMaxi, ASSETS.pearlGraceKurti],
    badge: 'Bestseller',
    inStock: true,
    shortDescription:
      'Fluid two-piece blush silk charmeuse co-ord featuring a draped wrap-front tunic and wide-leg palazzo trousers.',
    description:
      'Modern tailoring meets liquid drape. The Blush Silk Co-Ord transitions seamlessly from creative boardrooms to evening gallery openings, finished with custom brushed-gold buttons on the French cuffs.',
    fabricDetails: [
      'Heavyweight 22-momme Silk Charmeuse with matte-lustre finish',
      'Custom engraved brushed-gold cuff hardware',
      'Elasticated back waistband on trousers for tailored comfort',
    ],
    sizeAndFit:
      'Fluid relaxed fit. Tunic length: 34 inches; Trouser length: 41 inches. Model wears size Small.',
    careInstructions: ['Dry clean or cold delicate cycle in mesh bag', 'Steam to release creases'],
    deliveryInfo: 'Express nationwide shipping in 48 hours.',
    completeTheLookIds: ['classic-pearl-set', 'ivory-luxe-abaya'],
    reviews: [
      {
        id: 'rev-4',
        author: 'Mehreen Raza',
        city: 'Lahore',
        rating: 5,
        date: 'September 22, 2026',
        verifiedSize: 'S',
        title: 'Feels like liquid gold & blush on the skin',
        comment: 'The drape of this co-ord set is unmatched. The gold buttons on the sleeves make it look so expensive.',
      },
    ],
  },
  {
    id: 'midnight-elegance-dress',
    name: 'Midnight Elegance Dress',
    sku: 'SAM-26-004',
    price: 34000,
    rating: 5.0,
    reviewCount: 29,
    category: 'Party Wear',
    subCategories: ['New Arrivals', 'Dresses', 'Western Wear', 'Formal Wear', 'Party Wear'],
    styleTags: ['Luxury', 'Party', 'Elegant', 'Modern'],
    collection: 'Evening Glamour',
    fabric: 'Velvet & Zari',
    occasion: 'Evening Soirée',
    season: 'Autumn/Winter',
    fit: 'Structured Fit',
    colors: [
      { name: 'Espresso Obsidian', hex: '#1E1815' },
      { name: 'Antique Gold', hex: '#C6A355' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    primaryImage: ASSETS.midnightEleganceDress,
    secondaryImage: ASSETS.heroCampaign,
    galleryImages: [ASSETS.midnightEleganceDress, ASSETS.heroCampaign, ASSETS.ivoryLuxeAbaya],
    badge: 'New',
    inStock: true,
    shortDescription:
      'Sculpted espresso-black silk velvet evening gown accented with hand-embroidered antique gold filigree on the bodice.',
    description:
      'Commanding yet understated, the Midnight Elegance Dress contrasts rich espresso-black micro-velvet with luminous metallic gold dabka and kora craftsmanship along the sculpted neckline and waist.',
    fabricDetails: [
      'Plush silk-blend micro-velvet bodice with pure silk crepe skirt',
      'Hand-crafted metallic gold bullion embroidery',
      'Concealed back zip closure with silk satin lining',
    ],
    sizeAndFit: 'Structured bodice with sweeping A-line skirt (Length: 58 inches). Model wears size XS.',
    careInstructions: ['Specialist velvet dry clean only', 'Do not iron directly on velvet or embroidery'],
    deliveryInfo: 'Delivered in signature SHUMAILA ZAMAN garment trunk within 3–5 business days.',
    completeTheLookIds: ['classic-pearl-set', 'rose-garden-maxi-dress'],
    reviews: [
      {
        id: 'rev-5',
        author: 'Sana Javed',
        city: 'Islamabad',
        rating: 5,
        date: 'September 30, 2026',
        verifiedSize: 'M',
        title: 'Showstopper for winter formal dinners',
        comment: 'The contrast of deep dark brown-black velvet with the muted antique gold embroidery is pure perfection.',
      },
    ],
  },
  {
    id: 'ivory-luxe-abaya',
    name: 'Ivory Luxe Abaya',
    sku: 'SAM-26-005',
    price: 26500,
    originalPrice: 29500,
    rating: 4.9,
    reviewCount: 51,
    category: 'Abayas',
    subCategories: ['New Arrivals', 'Abayas', 'Eastern Wear', 'Formal Wear'],
    styleTags: ['Elegant', 'Traditional', 'Luxury', 'Minimal'],
    collection: 'The Signature Collection',
    fabric: 'Crepe Chiffon',
    occasion: 'Festive & Wedding',
    season: 'All-Season Couture',
    fit: 'Modest Drape',
    colors: [
      { name: 'Warm Ivory', hex: '#FAF5EE' },
      { name: 'Sandstone Gold', hex: '#D8C3A5' },
      { name: 'Blush Quartz', hex: '#EED9D4' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    primaryImage: ASSETS.ivoryLuxeAbaya,
    secondaryImage: ASSETS.pearlGraceKurti,
    galleryImages: [ASSETS.ivoryLuxeAbaya, ASSETS.pearlGraceKurti, ASSETS.heroCampaign],
    badge: 'New',
    inStock: true,
    shortDescription:
      'Flowing warm ivory Medina silk-crepe abaya with intricate metallic gold threadwork along the wide kimono sleeves.',
    description:
      'Elevated modest couture crafted from breathable premium Medina crepe. The Ivory Luxe Abaya includes an inner sleeveless satin slip dress, a gold-embroidered open-front outer abaya, and a matching gold-edged chiffon sheila.',
    fabricDetails: [
      'Premium wrinkle-resistant Medina Silk Crepe',
      '3-piece ensemble: Outer Abaya, Inner Slip Dress, and Matching Sheila',
      'Metallic gold thread and seed pearl embroidery on sleeves and hem',
    ],
    sizeAndFit: 'Generous modest cut with kimono sleeves (Length: 54–58 inches based on size).',
    careInstructions: ['Gentle dry clean or hand wash in cold water', 'Hang dry in shade'],
    deliveryInfo: 'Complimentary gift wrapping and fast nationwide & GCC delivery.',
    completeTheLookIds: ['classic-pearl-set', 'pearl-grace-kurti'],
    reviews: [
      {
        id: 'rev-6',
        author: 'Fatima Al-Mansoor',
        city: 'Dubai / Karachi',
        rating: 5,
        date: 'September 25, 2026',
        verifiedSize: 'M',
        title: 'Boutique Dubai quality at its finest',
        comment: 'The ivory shade is so warm and flattering, and the gold embroidery on the sleeves is museum-worthy.',
      },
    ],
  },
  {
    id: 'golden-bloom-formal',
    name: 'Golden Bloom Formal',
    sku: 'SAM-26-006',
    price: 42000,
    rating: 5.0,
    reviewCount: 33,
    category: 'Formal Wear',
    subCategories: ['New Arrivals', 'Eastern Wear', 'Formal Wear', 'Party Wear'],
    styleTags: ['Festive', 'Traditional', 'Luxury', 'Romantic'],
    collection: 'Festive Edit',
    fabric: 'Pure Organza Silk',
    occasion: 'Festive & Wedding',
    season: 'All-Season Couture',
    fit: 'Flowing Silhouette',
    colors: [
      { name: 'Champagne Gold', hex: '#C6A355' },
      { name: 'Blush Ivory', hex: '#F3E5E2' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    primaryImage: ASSETS.heroCampaign,
    secondaryImage: ASSETS.roseGardenMaxi,
    galleryImages: [ASSETS.heroCampaign, ASSETS.roseGardenMaxi, ASSETS.editorialLookbook],
    badge: 'Limited Edition',
    inStock: true,
    shortDescription:
      'Three-piece heirloom eastern formal in ivory silk and gold zari featuring a hand-embellished blush organza dupatta.',
    description:
      'Our flagship bridal-festive creation from the Festive Edit. The Golden Bloom Formal brings together centuries-old Lahori zardozi craftsmanship with a contemporary architectural silhouette and a whisper-soft blush pink organza drape.',
    fabricDetails: [
      'Pure Tissue Silk kameez with hand-worked gold kora, dabka, and sequins',
      'Blush pink pure silk organza dupatta with four-sided scalloped gold border',
      'Raw silk tailored izaar trousers included',
    ],
    sizeAndFit: 'Couture tailored fit. Shirt length: 46 inches; Dupatta: 2.75 yards.',
    careInstructions: ['Specialist couture dry clean only', 'Store flat wrapped in muslin cloth'],
    deliveryInfo: 'Insured priority courier delivery in custom keepsake box.',
    completeTheLookIds: ['classic-pearl-set', 'rose-garden-maxi-dress'],
    reviews: [],
  },
  {
    id: 'rose-velvet-ensemble',
    name: 'Rose Velvet Ensemble',
    sku: 'SAM-26-007',
    price: 36500,
    originalPrice: 39900,
    rating: 4.8,
    reviewCount: 21,
    category: 'Eastern Wear',
    subCategories: ['Eastern Wear', 'Formal Wear', 'Party Wear'],
    styleTags: ['Festive', 'Romantic', 'Luxury', 'Traditional'],
    collection: 'Festive Edit',
    fabric: 'Velvet & Zari',
    occasion: 'Festive & Wedding',
    season: 'Autumn/Winter',
    fit: 'Structured Fit',
    colors: [
      { name: 'Antique Rose', hex: '#C99690' },
      { name: 'Espresso Brown', hex: '#2A201C' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    primaryImage: ASSETS.roseGardenMaxi,
    secondaryImage: ASSETS.midnightEleganceDress,
    galleryImages: [ASSETS.roseGardenMaxi, ASSETS.midnightEleganceDress, ASSETS.heroCampaign],
    badge: 'Sale',
    inStock: true,
    shortDescription:
      'Regal dusty-rose silk velvet pishwas and shawl ensemble with antique gold tilla marori borders.',
    description:
      'Designed for winter weddings and festive soirées, the Rose Velvet Ensemble pairs a flared silk-organza kalidar with an heirloom embroidered velvet shawl in soft blush-rose and antique gold.',
    fabricDetails: [
      '9000-grade pure viscose-silk velvet shawl with gold zardozi pallu',
      'Hand-stitched kalidar panels with gota and tilla finishing',
    ],
    sizeAndFit: 'Traditional flared fit. Length: 52 inches.',
    careInstructions: ['Dry clean only'],
    deliveryInfo: 'Ships within 3 business days.',
    completeTheLookIds: ['classic-pearl-set', 'golden-bloom-formal'],
    reviews: [],
  },
  {
    id: 'classic-pearl-set',
    name: 'Classic Pearl & Gold Set',
    sku: 'SAM-26-008',
    price: 9500,
    rating: 4.9,
    reviewCount: 77,
    category: 'Accessories',
    subCategories: ['New Arrivals', 'Accessories', 'Party Wear'],
    styleTags: ['Elegant', 'Minimal', 'Luxury', 'Romantic'],
    collection: 'The Signature Collection',
    fabric: 'Raw Silk',
    occasion: 'Festive & Wedding',
    season: 'All-Season Couture',
    fit: 'Structured Fit',
    colors: [
      { name: '24k Gold & Pearl', hex: '#C6A355' },
      { name: 'Rose Gold & Pearl', hex: '#E0BFB8' },
    ],
    sizes: ['S', 'M', 'L'],
    primaryImage: ASSETS.pearlGraceKurti,
    secondaryImage: ASSETS.ivoryLuxeAbaya,
    galleryImages: [ASSETS.pearlGraceKurti, ASSETS.ivoryLuxeAbaya],
    badge: 'Bestseller',
    inStock: true,
    shortDescription:
      'Handcrafted 22k gold-vermeil choker, drop earrings, and pearl clutch set to complete your couture look.',
    description:
      'Every SHUMAILA ZAMAN silhouette deserves an heirloom finishing touch. This artisanal jewelry and minaudière set pairs baroque freshwater pearls with hand-hammered gold vermeil.',
    fabricDetails: [
      '22k Gold Vermeil over hypoallergenic sterling silver base',
      'cultured freshwater baroque pearls',
      'Presented in a blush suede jewelry case',
    ],
    sizeAndFit: 'Adjustable collar length (14–17 inches).',
    careInstructions: ['Wipe with soft jewelers cloth after wear', 'Avoid direct perfume spray'],
    deliveryInfo: 'Ships next business day.',
    completeTheLookIds: ['rose-garden-maxi-dress', 'golden-bloom-formal'],
    reviews: [],
  },
  {
    id: 'serene-lawn-tunic',
    name: 'Serene Ivory Lawn Ensemble',
    sku: 'SAM-26-009',
    price: 11800,
    originalPrice: 13500,
    rating: 4.7,
    reviewCount: 54,
    category: 'Casual Wear',
    subCategories: ['Casual Wear', 'Eastern Wear', 'Western Wear'],
    styleTags: ['Casual', 'Minimal', 'Office Wear', 'Modern'],
    collection: 'Everyday Elegance',
    fabric: 'Korean Lawn',
    occasion: 'Daytime Chic',
    season: 'Summer/Spring',
    fit: 'Relaxed Tailored',
    colors: [
      { name: 'Warm Cream', hex: '#F7F2EA' },
      { name: 'Blush Petal', hex: '#EED9D4' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    primaryImage: ASSETS.ivoryLuxeAbaya,
    secondaryImage: ASSETS.editorialLookbook,
    galleryImages: [ASSETS.ivoryLuxeAbaya, ASSETS.editorialLookbook],
    badge: 'Sale',
    inStock: true,
    shortDescription:
      'Breathable Swiss voile lawn two-piece set with schiffli cutwork embroidery and lace-trimmed culottes.',
    description:
      'Effortless everyday refinement for warm afternoons. Features intricate tonal schiffli embroidery on ultra-soft Egyptian cotton lawn with delicate organza inserts.',
    fabricDetails: ['100% Egyptian Pima Cotton Lawn', 'Tonal cutwork & French lace trims'],
    sizeAndFit: 'Breezy relaxed fit. Length: 40 inches.',
    careInstructions: ['Gentle machine wash cold', 'Warm iron'],
    deliveryInfo: 'Ships within 24–48 hours.',
    completeTheLookIds: ['classic-pearl-set', 'blush-silk-co-ord'],
    reviews: [],
  },
  {
    id: 'velvet-soirée-gown',
    name: 'Atelier Gold & Noir Kaftan',
    sku: 'SAM-26-010',
    price: 31500,
    rating: 4.9,
    reviewCount: 19,
    category: 'Western Wear',
    subCategories: ['Western Wear', 'Dresses', 'Party Wear', 'Formal Wear'],
    styleTags: ['Luxury', 'Modern', 'Party', 'Elegant'],
    collection: 'Evening Glamour',
    fabric: 'Crepe Chiffon',
    occasion: 'Evening Soirée',
    season: 'All-Season Couture',
    fit: 'Flowing Silhouette',
    colors: [
      { name: 'Noir & Gold', hex: '#1E1815' },
      { name: 'Ivory & Gold', hex: '#FAF7F2' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    primaryImage: ASSETS.midnightEleganceDress,
    secondaryImage: ASSETS.editorialLookbook,
    galleryImages: [ASSETS.midnightEleganceDress, ASSETS.editorialLookbook],
    badge: 'New',
    inStock: true,
    shortDescription:
      'Draped silk crepe kaftan dress with detachable metallic gold cinch belt and dramatic cape sleeves.',
    description:
      'International resort-couture silhouette crafted for black-tie evenings and destination weddings. Features an optional hand-braided metallic gold waist belt.',
    fabricDetails: ['100% Pure Silk Georgette Crepe', 'Detachable gold-thread waist sash'],
    sizeAndFit: 'Free-flowing kaftan silhouette with internal waist tie (Length: 57 inches).',
    careInstructions: ['Dry clean only'],
    deliveryInfo: 'Express delivery available.',
    completeTheLookIds: ['classic-pearl-set', 'midnight-elegance-dress'],
    reviews: [],
  },
];

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'cat-new',
    name: 'New Arrivals',
    subtitle: 'Autumn / Festive ’26 Edit',
    itemCount: '24 Pieces',
    image: ASSETS.heroCampaign,
  },
  {
    id: 'cat-dresses',
    name: 'Dresses',
    subtitle: 'Floor-Length & Midi Silhouettes',
    itemCount: '18 Pieces',
    image: ASSETS.roseGardenMaxi,
  },
  {
    id: 'cat-eastern',
    name: 'Eastern Wear',
    subtitle: 'Artisanal Pret & Heritage Zari',
    itemCount: '32 Pieces',
    image: ASSETS.pearlGraceKurti,
  },
  {
    id: 'cat-western',
    name: 'Western Wear',
    subtitle: 'Contemporary Tailoring & Gowns',
    itemCount: '16 Pieces',
    image: ASSETS.midnightEleganceDress,
  },
  {
    id: 'cat-coords',
    name: 'Co-Ord Sets',
    subtitle: 'Matching Silk & Linen Ensembles',
    itemCount: '14 Pieces',
    image: ASSETS.editorialLookbook,
  },
  {
    id: 'cat-abayas',
    name: 'Abayas',
    subtitle: 'Medina Silk Modest Couture',
    itemCount: '12 Pieces',
    image: ASSETS.ivoryLuxeAbaya,
  },
  {
    id: 'cat-casual',
    name: 'Casual Wear',
    subtitle: 'Refined Daytime Pret',
    itemCount: '28 Pieces',
    image: ASSETS.pearlGraceKurti,
  },
  {
    id: 'cat-formal',
    name: 'Formal Wear',
    subtitle: 'Heirloom Hand-Embellished Luxury',
    itemCount: '15 Pieces',
    image: ASSETS.heroCampaign,
  },
  {
    id: 'cat-party',
    name: 'Party Wear',
    subtitle: 'Evening Glamour & Soirée',
    itemCount: '19 Pieces',
    image: ASSETS.midnightEleganceDress,
  },
  {
    id: 'cat-accessories',
    name: 'Accessories',
    subtitle: 'Pearl & Gold Vermeil Finishing Touches',
    itemCount: '10 Pieces',
    image: ASSETS.roseGardenMaxi,
  },
];

export const STYLES: StyleItem[] = [
  { id: 'st-elegant', name: 'Elegant', tagline: 'Poised & Graceful Drapes', accentHex: '#EED9D4', image: ASSETS.roseGardenMaxi },
  { id: 'st-minimal', name: 'Minimal', tagline: 'Clean Architectural Lines', accentHex: '#F3EDE2', image: ASSETS.pearlGraceKurti },
  { id: 'st-traditional', name: 'Traditional', tagline: 'Heritage Zardozi Craft', accentHex: '#E5D3B3', image: ASSETS.heroCampaign },
  { id: 'st-modern', name: 'Modern', tagline: 'Contemporary Silhouettes', accentHex: '#E8D8D5', image: ASSETS.editorialLookbook },
  { id: 'st-casual', name: 'Casual', tagline: 'Effortless Daytime Pret', accentHex: '#F2ECE1', image: ASSETS.ivoryLuxeAbaya },
  { id: 'st-luxury', name: 'Luxury', tagline: 'Couture Atelier Editions', accentHex: '#D8C39A', image: ASSETS.heroCampaign },
  { id: 'st-party', name: 'Party', tagline: 'Statement Evening Glamour', accentHex: '#D9C5C1', image: ASSETS.midnightEleganceDress },
  { id: 'st-office', name: 'Office Wear', tagline: 'Tailored Silk & Raw Silk', accentHex: '#EAE3DC', image: ASSETS.pearlGraceKurti },
  { id: 'st-festive', name: 'Festive', tagline: 'Celebration & Wedding Edit', accentHex: '#E6CFA8', image: ASSETS.roseGardenMaxi },
  { id: 'st-romantic', name: 'Romantic', tagline: 'Blush Organza & Florals', accentHex: '#F2D8D3', image: ASSETS.roseGardenMaxi },
];

export const COLLECTIONS: CollectionBannerItem[] = [
  {
    id: 'col-signature',
    title: 'The Signature Collection',
    kicker: '01. ATELIER EDITION',
    subtitle: 'Hand-embellished pure organza silk, freshwater pearls, and gilded zardozi crafted for timeless sophistication.',
    image: ASSETS.heroCampaign,
    featuredProductIds: ['rose-garden-maxi-dress', 'ivory-luxe-abaya', 'classic-pearl-set'],
  },
  {
    id: 'col-everyday',
    title: 'Everyday Elegance',
    kicker: '02. PRET-A-PORTER',
    subtitle: 'Breathable Korean raw silk kurtis and liquid satin charmeuse co-ord sets designed for the modern woman’s daily wardrobe.',
    image: ASSETS.editorialLookbook,
    featuredProductIds: ['pearl-grace-kurti', 'blush-silk-co-ord', 'serene-lawn-tunic'],
  },
  {
    id: 'col-festive',
    title: 'Festive Edit',
    kicker: '03. HERITAGE COUTURE',
    subtitle: 'Opulent festive ensembles celebrating South Asian craftsmanship in blush rose, warm ivory, and antique gold.',
    image: ASSETS.roseGardenMaxi,
    featuredProductIds: ['golden-bloom-formal', 'rose-velvet-ensemble'],
  },
  {
    id: 'col-evening',
    title: 'Evening Glamour',
    kicker: '04. NOCTURNE SOIRÉE',
    subtitle: 'Sculpted espresso velvet gowns and gilded silk kaftans that command the room after dusk.',
    image: ASSETS.midnightEleganceDress,
    featuredProductIds: ['midnight-elegance-dress', 'velvet-soirée-gown'],
  },
];

export const LOOKBOOK_SPREADS: LookbookSpread[] = [
  {
    id: 'lb-01',
    chapter: 'Chapter I · Golden Hour in Lahore',
    title: 'Whispers of Organza & Zari',
    editorialNote:
      'Captured in a sunlit limestone courtyard, our Autumn/Festive ’26 campaign explores the interplay between weightless blush silk organza and heirloom gold threadwork.',
    image: ASSETS.heroCampaign,
    hotspots: [
      {
        id: 'hs-1',
        xPercent: 48,
        yPercent: 42,
        productId: 'golden-bloom-formal',
        label: 'Golden Bloom Formal',
      },
      {
        id: 'hs-2',
        xPercent: 56,
        yPercent: 28,
        productId: 'classic-pearl-set',
        label: 'Classic Pearl & Gold Set',
      },
    ],
  },
  {
    id: 'lb-02',
    chapter: 'Chapter II · The Modern Courtyard',
    title: 'Fluidity in Motion',
    editorialNote:
      'Tailored silk co-ords and serene raw silk separates designed for women who move effortlessly between tradition and modernity.',
    image: ASSETS.editorialLookbook,
    hotspots: [
      {
        id: 'hs-3',
        xPercent: 35,
        yPercent: 48,
        productId: 'blush-silk-co-ord',
        label: 'Blush Silk Co-Ord',
      },
      {
        id: 'hs-4',
        xPercent: 66,
        yPercent: 44,
        productId: 'rose-garden-maxi-dress',
        label: 'Rose Garden Maxi Dress',
      },
    ],
  },
  {
    id: 'lb-03',
    chapter: 'Chapter III · Nocturne Atelier',
    title: 'Velvet & Antique Gold',
    editorialNote:
      'Deep espresso-black micro-velvet illuminated by hand-worked metallic bullion embroidery for unforgettable winter soirées.',
    image: ASSETS.midnightEleganceDress,
    hotspots: [
      {
        id: 'hs-5',
        xPercent: 50,
        yPercent: 52,
        productId: 'midnight-elegance-dress',
        label: 'Midnight Elegance Dress',
      },
    ],
  },
];

export const SIZE_GUIDE_DATA = [
  { size: 'XS', uk: '6', bust: '32"', waist: '25"', hips: '35"', length: '54" / 40"' },
  { size: 'S', uk: '8', bust: '34"', waist: '27"', hips: '37"', length: '55" / 41"' },
  { size: 'M', uk: '10', bust: '36"', waist: '29"', hips: '39"', length: '56" / 42"' },
  { size: 'L', uk: '12', bust: '39"', waist: '32"', hips: '42"', length: '56" / 43"' },
  { size: 'XL', uk: '14', bust: '42"', waist: '35"', hips: '45"', length: '57" / 44"' },
  { size: 'XXL', uk: '16', bust: '45"', waist: '38"', hips: '48"', length: '57" / 44"' },
];

export const formatPKR = (amount: number): string => {
  return `Rs. ${amount.toLocaleString('en-PK')}`;
};
