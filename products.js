// TapZen Products Database
const TAPZEN_PRODUCTS = [
  {
    id: "card-google-review",
    name: "TapZen Google Review Card (10×10 cm)",
    category: "cards",
    price: 999,
    originalPrice: 1499,
    badge: "5-STAR REVIEWS",
    rating: 5.0,
    reviewsCount: 428,
    shortDesc: "Skyrocket your Google reviews on auto-pilot. Customers tap their phone or scan the QR code to open your 5-star review page in 1 second.",
    material: "Premium High-Grade PVC & Cast Acrylic (10 × 10 cm Square)",
    chip: "NXP NTAG216 High Capacity (888 Bytes)",
    compatibility: "Universal iPhone & Android Compatible",
    image: "assets/card-google-review.jpg",
    features: [
      "10 × 10 cm square size with rounded corners & neon red border",
      "Direct deep-link to your Google Review 5-star rating page",
      "Dual-action: Tap NFC or Scan high-contrast QR Code",
      "100% waterproof, wipe-clean & scratch-resistant"
    ],
    inStock: true
  },
  {
    id: "card-instagram",
    name: "TapZen Instagram Follow Card (10×10 cm)",
    category: "cards",
    price: 999,
    originalPrice: 1499,
    badge: "GROW SOCIALS",
    rating: 4.9,
    reviewsCount: 382,
    shortDesc: "Turn store visitors into loyal Instagram followers. Place on your counter or table — customers tap or scan to open your Instagram profile.",
    material: "Premium High-Grade PVC & Cast Acrylic (10 × 10 cm Square)",
    chip: "NXP NTAG216 High Speed NFC",
    compatibility: "All modern iOS & Android smartphones",
    image: "assets/card-instagram.jpg",
    features: [
      "10 × 10 cm square format with official Instagram gradient styling",
      "Opens directly in the Instagram app with one tap",
      "Dual NFC touch target and high-density QR code",
      "Zero app required for the customer"
    ],
    inStock: true
  },
  {
    id: "card-smart-menu",
    name: "TapZen Smart Menu Card (10×10 cm)",
    category: "cards",
    price: 999,
    originalPrice: 1499,
    badge: "SMART MENU OF GENZ",
    rating: 5.0,
    reviewsCount: 295,
    shortDesc: "The Smart Menu of GenZ. Perfect for cafes, dining tables & restaurants. Eliminates paper menus permanently with instant tap & scan ordering.",
    material: "Premium High-Grade PVC & Cast Acrylic (10 × 10 cm Square)",
    chip: "NXP NTAG216 Long-Range NFC",
    compatibility: "Universal Smartphone Compatible",
    image: "assets/card-smart-menu.jpg",
    features: [
      "10 × 10 cm square design with food imagery & neon styling",
      "Tap or scan to view digital menu, PDF, or order portal",
      "Spill-proof, heat-resistant, wipe-clean restaurant grade",
      "Update menu items & prices anytime remotely"
    ],
    inStock: true
  },
  {
    id: "card-whatsapp",
    name: "TapZen WhatsApp Connect Card (10×10 cm)",
    category: "cards",
    price: 999,
    originalPrice: 1499,
    badge: "DIRECT CHAT",
    rating: 4.9,
    reviewsCount: 210,
    shortDesc: "Direct one-tap WhatsApp chat. Customers tap or scan to instantly start a conversation with your business for orders, bookings & support.",
    material: "Premium High-Grade PVC & Cast Acrylic (10 × 10 cm Square)",
    chip: "NXP NTAG216 Shielded Core",
    compatibility: "All iOS & Android Devices",
    image: "assets/card-whatsapp.jpg",
    features: [
      "10 × 10 cm square format with glowing WhatsApp branding",
      "Opens direct WhatsApp chat with optional pre-filled greeting",
      "Dual NFC tap target & high-contrast QR code",
      "Capture customer phone numbers effortlessly"
    ],
    inStock: true
  },
  {
    id: "card-custom-engraved",
    name: "TapZen Fully Customized 10×10 cm Card",
    category: "cards",
    price: 1199,
    originalPrice: 1799,
    badge: "CUSTOM BRANDED",
    rating: 5.0,
    reviewsCount: 340,
    shortDesc: "Your brand, your custom design. Customized with your name, company logo, designation, and custom URL or digital bio.",
    material: "Choice of Premium PVC or Cast Acrylic Sheet (10 × 10 cm Square)",
    chip: "NXP NTAG216 High Capacity Microchip",
    compatibility: "All modern iOS & Android devices",
    image: null,
    features: [
      "10 × 10 cm square format personalized to your brand",
      "Laser engraved or high-resolution UV printed with your details",
      "Choice of matte PVC sheet or crystal cast acrylic sheet",
      "Pre-programmed by Team TapZen before dispatch"
    ],
    inStock: true
  },
  {
    id: "stand-google-review",
    name: "TapZen Acrylic Google Review Table Stand",
    category: "stands",
    price: 999,
    originalPrice: 1499,
    badge: "COUNTERTOP STAND",
    rating: 4.9,
    reviewsCount: 412,
    shortDesc: "Upright tabletop acrylic stand. Place on reception or table for effortless Google reviews.",
    material: "High-Gloss Cast Acrylic Sheet (120 x 80 mm)",
    chip: "Long-Range NTAG216 High Permeability Core",
    compatibility: "Instant opening without any app download",
    image: "assets/card-google-review.jpg",
    features: [
      "Direct deep-link to Google Review 5-star box",
      "Increases customer review conversion by over 300%",
      "Anti-scratch UV printed instructional graphics",
      "Solid cast acrylic weighted base"
    ],
    inStock: true
  },
  {
    id: "stand-cafe-menu",
    name: "TapZen Smart Menu Acrylic Stand",
    category: "stands",
    price: 1199,
    originalPrice: 1699,
    badge: "HOSPITALITY",
    rating: 4.9,
    reviewsCount: 156,
    shortDesc: "Two-in-one table beacon made from durable cast acrylic. Side A taps for Menu, Side B taps for Instagram / WiFi.",
    material: "Durable Cast Acrylic Sheet with Dual NFC Coils",
    chip: "Dual Independent NFC Microcontrollers",
    compatibility: "iOS & Android Universal",
    image: "assets/card-smart-menu.jpg",
    features: [
      "Eliminate reprinting paper menus permanently",
      "Instant WiFi connect or Instagram follow option",
      "Spill-proof, wipe-clean restaurant grade acrylic",
      "Compatible with digital menus & PDFs"
    ],
    inStock: true
  },
  {
    id: "tag-pop-phone-3pack",
    name: "TapZen Pop-Tap Phone Pucks (3-Pack)",
    category: "tags",
    price: 499,
    originalPrice: 799,
    badge: "PACK VALUE",
    rating: 4.8,
    reviewsCount: 275,
    shortDesc: "Ultra-slim 3M adhesive NFC pucks. Stick to the back of your phone, laptop, desk, or retail counter.",
    material: "Gloss Epoxy Coated PVC (30 mm diameter)",
    chip: "Anti-Metal Ferrite Shielded NTAG213/215",
    compatibility: "Works even through thick phone cases",
    image: null,
    features: [
      "Patented anti-interference ferrite shield layer",
      "Ultra-strong 3M removable adhesive",
      "Waterproof PVC, UV resistant, and shock-proof",
      "Includes 3 distinct colorways (Matte Black, Red, Carbon)"
    ],
    inStock: true
  },
  {
    id: "tag-keychain-fob",
    name: "TapZen Smart Acrylic Keychain Fob",
    category: "tags",
    price: 599,
    originalPrice: 899,
    badge: "PORTABLE",
    rating: 4.9,
    reviewsCount: 160,
    shortDesc: "Never leave your digital card behind. Compact cast acrylic NFC keychain with stainless ring.",
    material: "High-Impact Cast Acrylic Sheet & Metal Ring",
    chip: "NXP High-Durability Encapsulated NFC",
    compatibility: "All NFC-enabled devices",
    image: null,
    features: [
      "Rugged impact-resistant acrylic housing",
      "Quick-release stainless steel keyring",
      "Instant contact share or Instagram link",
      "Water immersion rated IP68"
    ],
    inStock: true
  },
  {
    id: "bundle-corporate-team",
    name: "TapZen Team Starter Pack (10 Custom 10×10 Cards)",
    category: "business",
    price: 8999,
    originalPrice: 11990,
    badge: "ENTERPRISE",
    rating: 5.0,
    reviewsCount: 63,
    shortDesc: "Deploy smart networking across your entire team. 10 custom 10×10 cm cards on PVC or Acrylic sheets.",
    material: "Custom Printed Premium PVC or Acrylic Sheets (10 × 10 cm)",
    chip: "Enterprise Managed NTAG216 Security Chips",
    compatibility: "Company-wide iOS & Android rollout",
    image: null,
    features: [
      "Custom branding with employee names & titles",
      "Choice of matte PVC or crystal acrylic sheets",
      "Centralized directory & remote link updates",
      "Priority production & shipping across India"
    ],
    inStock: true
  }
];

// Material / Design options for the Card Selector & Customizer
const CUSTOMIZER_MATERIALS = {
  google_review: {
    id: "google_review",
    name: "Google Review Card",
    subtitle: "10 × 10 cm Square (PVC / Acrylic)",
    bgClass: "card-finish-image-card",
    image: "assets/card-google-review.jpg",
    basePrice: 999,
    isCustom: false,
    defaultLink: "google_review",
    placeholderLink: "Paste your Google Maps / Review Link"
  },
  instagram: {
    id: "instagram",
    name: "Instagram Follow Card",
    subtitle: "10 × 10 cm Square (PVC / Acrylic)",
    bgClass: "card-finish-image-card",
    image: "assets/card-instagram.jpg",
    basePrice: 999,
    isCustom: false,
    defaultLink: "socials",
    placeholderLink: "Enter your Instagram @handle or profile link"
  },
  smart_menu: {
    id: "smart_menu",
    name: "Smart Menu Card",
    subtitle: "10 × 10 cm Square (PVC / Acrylic)",
    bgClass: "card-finish-image-card",
    image: "assets/card-smart-menu.jpg",
    basePrice: 999,
    isCustom: false,
    defaultLink: "website",
    placeholderLink: "Enter your digital menu link or website URL"
  },
  whatsapp: {
    id: "whatsapp",
    name: "WhatsApp Connect Card",
    subtitle: "10 × 10 cm Square (PVC / Acrylic)",
    bgClass: "card-finish-image-card",
    image: "assets/card-whatsapp.jpg",
    basePrice: 999,
    isCustom: false,
    defaultLink: "whatsapp",
    placeholderLink: "Enter your WhatsApp business phone number"
  },
  custom_card: {
    id: "custom_card",
    name: "Customized Card",
    subtitle: "Custom Name & Logo (10 × 10 cm)",
    bgClass: "card-finish-custom-card",
    image: null,
    basePrice: 1199,
    isCustom: true,
    defaultLink: "profile",
    placeholderLink: "Enter custom destination or bio URL"
  }
};
