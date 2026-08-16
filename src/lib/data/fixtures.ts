export type Money = {
  amount: number;
  currencyCode: 'INR' | 'USD';
};

export type ProductVariant = {
  id: string;
  sku: string;
  color: string;
  size: string;
  availableForSale: boolean;
  price: Money;
  compareAtPrice?: Money;
};

export type ProductMedia = {
  url: string;
  altText: string;
  width: number;
  height: number;
  type: 'image' | 'video';
  isEditorial?: boolean;
};

export type Product = {
  id: string;
  handle: string;
  title: string;
  subtitle?: string;
  description: string;
  category: 'k-line' | 'outerwear' | 'utility' | 'essentials';
  isNewRelease?: boolean;
  priceRange: {
    minVariantPrice: Money;
    maxVariantPrice?: Money;
  };
  compareAtPriceRange?: {
    minVariantPrice: Money;
  };
  availableForSale: boolean;
  variants: ProductVariant[];
  media: ProductMedia[];
};

export type Collection = {
  id: string;
  handle: string;
  title: string;
  description: string;
  image?: string;
};

const PRODUCT_IMAGES = {
  tee: "/images/products/k-line-oversized-tee.png",
  cargo: "/images/products/chennai-cargo-pant.png",
  jacket: "/images/products/monsoon-jacket.png",
  hoodie: "/images/products/signature-hoodie.png",
  parka: "/images/products/night-parka-archive.png",
  vest: "/images/products/modular-utility-vest.png",
  charcoalTee: "/images/products/essential-box-tee-charcoal.png",
  tote: "/images/products/tactical-tote-bag.png",
} as const;

export const MOCK_COLLECTIONS: Collection[] = [
  {
    id: "col_all",
    handle: "all",
    title: "All Products",
    description: "The complete CHAKSU archive. Built in movement, engineered with controlled aggression.",
    image: PRODUCT_IMAGES.tee,
  },
  {
    id: "col_new_release",
    handle: "new-release",
    title: "New Release",
    description: "Chennai-after-dark capsule drop. Tactical silhouettes and night-climate textiles.",
    image: PRODUCT_IMAGES.jacket,
  },
  {
    id: "col_k_line",
    handle: "k-line",
    title: "K-Line Series",
    description: "Signature boxy silhouettes bearing the architectural CHAKSU K motif.",
    image: PRODUCT_IMAGES.hoodie,
  },
  {
    id: "col_outerwear",
    handle: "outerwear",
    title: "Technical Outerwear",
    description: "Monsoon-tested weatherproof layers engineered for rapid urban transition.",
    image: PRODUCT_IMAGES.parka,
  },
  {
    id: "col_utility",
    handle: "utility",
    title: "Utility & Cargo",
    description: "Heavyweight canvas pants and articulated utility garments built for durability.",
    image: PRODUCT_IMAGES.cargo,
  }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod_01",
    handle: "k-line-oversized-tee",
    title: "K-Line Oversized Heavyweight Tee",
    subtitle: "300 GSM Organic Cotton",
    description: "A staple in the CHAKSU collection, featuring our signature boxy fit, dropped shoulders, and embroidered K-device on back yoke.",
    category: "k-line",
    isNewRelease: true,
    availableForSale: true,
    priceRange: { minVariantPrice: { amount: 4800, currencyCode: "INR" } },
    media: [
      { url: PRODUCT_IMAGES.tee, altText: "Black K-Line oversized heavyweight tee in a blue-lit concrete setting", width: 1024, height: 1280, type: "image", isEditorial: true }
    ],
    variants: [
      { id: "var_01_blk_s", sku: "K-TEE-BLK-S", color: "Black", size: "S", availableForSale: true, price: { amount: 4800, currencyCode: "INR" } },
      { id: "var_01_blk_m", sku: "K-TEE-BLK-M", color: "Black", size: "M", availableForSale: true, price: { amount: 4800, currencyCode: "INR" } },
      { id: "var_01_blk_l", sku: "K-TEE-BLK-L", color: "Black", size: "L", availableForSale: true, price: { amount: 4800, currencyCode: "INR" } },
      { id: "var_01_bone_m", sku: "K-TEE-BNE-M", color: "Bone", size: "M", availableForSale: true, price: { amount: 4800, currencyCode: "INR" } }
    ]
  },
  {
    id: "prod_02",
    handle: "chennai-cargo-pant",
    title: "Articulated Double-Knee Tactical Oversized Canvas Cargo Trousers",
    subtitle: "450 GSM Heavy Cotton Canvas",
    description: "Engineered for movement. Features double-knee reinforced paneling, 6 tactical utility pockets, and adjustable leg cuffs.",
    category: "utility",
    isNewRelease: true,
    availableForSale: true,
    priceRange: { minVariantPrice: { amount: 9500, currencyCode: "INR" } },
    compareAtPriceRange: { minVariantPrice: { amount: 11500, currencyCode: "INR" } },
    media: [
      { url: PRODUCT_IMAGES.cargo, altText: "Black articulated cargo trousers photographed in motion at night", width: 1024, height: 1280, type: "image", isEditorial: false }
    ],
    variants: [
      { id: "var_02_blk_30", sku: "C-CARGO-BLK-30", color: "Black", size: "S", availableForSale: true, price: { amount: 9500, currencyCode: "INR" }, compareAtPrice: { amount: 11500, currencyCode: "INR" } },
      { id: "var_02_blk_32", sku: "C-CARGO-BLK-32", color: "Black", size: "M", availableForSale: true, price: { amount: 9500, currencyCode: "INR" }, compareAtPrice: { amount: 11500, currencyCode: "INR" } },
      { id: "var_02_olv_32", sku: "C-CARGO-OLV-32", color: "Olive", size: "M", availableForSale: true, price: { amount: 9500, currencyCode: "INR" } }
    ]
  },
  {
    id: "prod_03",
    handle: "monsoon-jacket",
    title: "Monsoon Waterproof Tactical Shell Jacket",
    subtitle: "3-Layer Membrane Ripstop",
    description: "Lightweight weatherproofing designed for humid monsoon transitions. Waterproof seams, magnetic collar latch, and underarm vents.",
    category: "outerwear",
    isNewRelease: true,
    availableForSale: true,
    priceRange: { minVariantPrice: { amount: 16500, currencyCode: "INR" } },
    media: [
      { url: PRODUCT_IMAGES.jacket, altText: "Olive monsoon shell jacket on a rain-dark rooftop", width: 1024, height: 1280, type: "image", isEditorial: true }
    ],
    variants: [
      { id: "var_03_olv_m", sku: "M-JACKET-OLV-M", color: "Olive", size: "M", availableForSale: true, price: { amount: 16500, currencyCode: "INR" } },
      { id: "var_03_olv_l", sku: "M-JACKET-OLV-L", color: "Olive", size: "L", availableForSale: true, price: { amount: 16500, currencyCode: "INR" } },
      { id: "var_03_blk_l", sku: "M-JACKET-BLK-L", color: "Black", size: "L", availableForSale: true, price: { amount: 16500, currencyCode: "INR" } }
    ]
  },
  {
    id: "prod_04",
    handle: "signature-hoodie",
    title: "Signature K-Device Heavyweight Hoodie",
    subtitle: "500 GSM French Terry",
    description: "Premium heavyweight French terry hoodie with structured double-layer hood and high-density chest branding.",
    category: "k-line",
    availableForSale: true,
    priceRange: { minVariantPrice: { amount: 7800, currencyCode: "INR" } },
    media: [
      { url: PRODUCT_IMAGES.hoodie, altText: "Bone heavyweight structured hoodie in warm architectural light", width: 1024, height: 1280, type: "image", isEditorial: false }
    ],
    variants: [
      { id: "var_04_bne_s", sku: "S-HOOD-BNE-S", color: "Bone", size: "S", availableForSale: true, price: { amount: 7800, currencyCode: "INR" } },
      { id: "var_04_bne_m", sku: "S-HOOD-BNE-M", color: "Bone", size: "M", availableForSale: true, price: { amount: 7800, currencyCode: "INR" } },
      { id: "var_04_bne_l", sku: "S-HOOD-BNE-L", color: "Bone", size: "L", availableForSale: true, price: { amount: 7800, currencyCode: "INR" } }
    ]
  },
  {
    id: "prod_05",
    handle: "night-parka-archive",
    title: "Night-Shift Insulated Technical Parka",
    subtitle: "Reflective Weave Shell",
    description: "Limited release nocturnal parka with subtle anti-reflective yarn weave and oversized storm hood.",
    category: "outerwear",
    isNewRelease: false,
    availableForSale: false, // SOLD OUT ITEM
    priceRange: { minVariantPrice: { amount: 22000, currencyCode: "INR" } },
    media: [
      { url: PRODUCT_IMAGES.parka, altText: "Black insulated technical parka on a wet flyover at night", width: 1024, height: 1280, type: "image", isEditorial: true }
    ],
    variants: [
      { id: "var_05_blk_m", sku: "N-PARKA-BLK-M", color: "Black", size: "M", availableForSale: false, price: { amount: 22000, currencyCode: "INR" } },
      { id: "var_05_blk_l", sku: "N-PARKA-BLK-L", color: "Black", size: "L", availableForSale: false, price: { amount: 22000, currencyCode: "INR" } }
    ]
  },
  {
    id: "prod_06",
    handle: "modular-utility-vest",
    title: "Modular Ballistic Utility Harness Vest",
    subtitle: "Cordura Nylon Weave",
    description: "Modular chest rig vest with detachable weatherproof pouches and heavy-duty Cobra quick-release buckles.",
    category: "utility",
    isNewRelease: true,
    availableForSale: true,
    priceRange: { minVariantPrice: { amount: 6200, currencyCode: "INR" } },
    compareAtPriceRange: { minVariantPrice: { amount: 7500, currencyCode: "INR" } },
    media: [
      { url: PRODUCT_IMAGES.vest, altText: "Black modular utility vest with geometric pouches", width: 1024, height: 1280, type: "image", isEditorial: false }
    ],
    variants: [
      { id: "var_06_blk_os", sku: "M-VEST-BLK-OS", color: "Black", size: "M", availableForSale: true, price: { amount: 6200, currencyCode: "INR" }, compareAtPrice: { amount: 7500, currencyCode: "INR" } }
    ]
  },
  {
    id: "prod_07",
    handle: "essential-box-tee-charcoal",
    title: "Essential Boxy Fit Heavyweight Tee - Charcoal",
    subtitle: "280 GSM Ring-Spun Cotton",
    description: "Clean silhouette featuring reinforced neck tape and raw edge detail on hem.",
    category: "essentials",
    availableForSale: true,
    priceRange: { minVariantPrice: { amount: 3900, currencyCode: "INR" } },
    media: [
      { url: PRODUCT_IMAGES.charcoalTee, altText: "Charcoal heavyweight boxy tee in a modernist stairwell", width: 1024, height: 1280, type: "image", isEditorial: false }
    ],
    variants: [
      { id: "var_07_ch_s", sku: "E-TEE-CHR-S", color: "Charcoal", size: "S", availableForSale: true, price: { amount: 3900, currencyCode: "INR" } },
      { id: "var_07_ch_m", sku: "E-TEE-CHR-M", color: "Charcoal", size: "M", availableForSale: true, price: { amount: 3900, currencyCode: "INR" } },
      { id: "var_07_ch_l", sku: "E-TEE-CHR-L", color: "Charcoal", size: "L", availableForSale: true, price: { amount: 3900, currencyCode: "INR" } },
      { id: "var_07_ch_xl", sku: "E-TEE-CHR-XL", color: "Charcoal", size: "XL", availableForSale: true, price: { amount: 3900, currencyCode: "INR" } }
    ]
  },
  {
    id: "prod_08",
    handle: "tactical-tote-bag",
    title: "Tactical Canvas Field Tote Bag",
    subtitle: "Waxed Cotton Canvas",
    description: "Heavy-duty 18oz waxed canvas tote bag with internal padded laptop sleeve and MOLLE attachment webbing.",
    category: "utility",
    availableForSale: true,
    priceRange: { minVariantPrice: { amount: 5400, currencyCode: "INR" } },
    media: [
      { url: PRODUCT_IMAGES.tote, altText: "Black architectural waxed-canvas field tote at night", width: 1024, height: 1280, type: "image", isEditorial: true }
    ],
    variants: [
      { id: "var_08_blk_os", sku: "T-TOTE-BLK-OS", color: "Black", size: "M", availableForSale: true, price: { amount: 5400, currencyCode: "INR" } }
    ]
  }
];

export const MOCK_STORIES = [
  {
    id: "story_01",
    title: "Built in movement",
    chapters: [
      {
        id: "chap_01",
        text: "The fabric of the city dictates how we move. South Indian nights demand breathability, structure, and absolute freedom.",
        image: PRODUCT_IMAGES.cargo,
        altText: "Black articulated cargo trousers moving through a rain-lit transit space",
        productRef: "prod_02"
      },
      {
        id: "chap_02",
        text: "We engineered the Chennai Cargo specifically for these transitions. Dense enough for protection, articulated for momentum.",
        image: PRODUCT_IMAGES.jacket,
        altText: "Olive technical shell engineered for monsoon movement",
        productRef: "prod_02"
      },
      {
        id: "chap_03",
        text: "No extraneous details. Every seam serves the narrative of controlled aggression.",
        image: PRODUCT_IMAGES.vest,
        altText: "Modular black utility vest showing its geometric construction",
        productRef: "prod_01"
      }
    ]
  }
];
