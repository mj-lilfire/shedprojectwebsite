/**
 * Centralised product catalogue data.
 *
 * This is the single source of truth for every individual product page.
 * scripts/generate-products.js reads this file and, together with
 * scripts/product-template.js, generates every file under
 * products/<category>/<slug>.html.
 *
 * TO ADD A NEW PRODUCT: add an entry to the relevant category's
 * `products` array below (copy an existing entry as a starting point),
 * then run `node scripts/generate-products.js` from the repository root.
 *
 * TO ADD A NEW CATEGORY: add a new object to `categories` following the
 * same shape, then add its route to the navigation dropdown
 * (components/navigation.html and every page's inlined copy) and its
 * category landing page under products/<slug>.html.
 *
 * Never hand-edit a file under products/<category>/*.html directly —
 * those files are generated, and hand edits will be overwritten the next
 * time the generator runs. Edit the data (or the template) instead.
 *
 * All photographs are verified, licence-checked Unsplash images (free
 * tier — images.unsplash.com, never the paid plus.unsplash.com tier).
 * IMAGES below is the shared pool referenced by id throughout this file.
 */

const IMAGES = {
  heroCabin: { id: "1697807650304-907257330a3e", alt: "A contemporary forest-green garden building with a timber deck and string lighting, softly lit at dusk" },
  lawnPath: { id: "1586191454576-c94c588a8617", alt: "A well-tended English garden lawn with a gravel path and flower borders" },
  craftsman: { id: "1683115099860-5379ac101bce", alt: "A member of the Hereford Patio & Sheds team building a timber garden structure outdoors" },
  utilityShed: { id: "1770117527415-3d5eba7f2400", alt: "A newly built timber utility shed with an apex roof" },
  gardenRoomBlack: { id: "1724931282671-2d3bcd6de8f2", alt: "A contemporary black-clad garden room with full-height glazing, warmly lit inside" },
  summerAframe: { id: "1776893471287-5a88c2e0743c", alt: "A stylish A-frame summer house reflected in still water" },
  officeLong: { id: "1770306924354-1b3adaf27be5", alt: "A long, contemporary garden building with sage-green window frames" },
  lodgeDusk: { id: "1782226829785-0a7f9568c5ac", alt: "A large timber garden building warmly lit at dusk with string lighting" },
  claddingDetail: { id: "1639818019702-bba773c78923", alt: "Close-up detail of natural timber cladding on a garden building gable" },
  decking: { id: "1533391120950-2d65c72e5969", alt: "Contemporary circular garden decking with modern outdoor furniture" },
  rosePath: { id: "1585320806297-9794b3e4eeae", alt: "A landscaped garden pathway bordered by flowers" },
  patioLanding: { id: "1780838446281-9394772d07a8", alt: "A beautifully landscaped circular paved garden patio surrounded by greenery" },
  toolsRack: { id: "1526381805515-3fec2d69e7cc", alt: "Garden tools neatly hung on a rack, with seedlings in trays below" },
  friendsCouch: { id: "1764006195843-e6f9a5781500", alt: "Friends relaxing and entertaining together in a stylish, contemporary living space" },
  familyGarden: { id: "1770871821382-60ea99b0a941", alt: "A family walking together through a sunlit garden" },
  deskPlants: { id: "1654356709115-3f68998bead4", alt: "A bright desk workspace with plants and natural light from a nearby window" },
  interiorLoft: { id: "1723810742992-0e84241abcf5", alt: "A warm, timber-lined interior with a sleeping loft and natural wood flooring" },
  interiorBench: { id: "1713421892519-d8fc52ecc626", alt: "A timber-lined interior with built-in bench seating and a garden view" },
  jointDetail: { id: "1767685183995-042935fb7a02", alt: "A close-up, black-and-white photograph of a traditional timber joint" },
  nailgunBuild: { id: "1773430273016-630960da6aa7", alt: "A builder fixing timber decking boards during construction" },
};

const SHARED_FAQS = {
  "utility-sheds": [
    { q: "Do I need planning permission?", a: "In most cases, no — garden buildings under a certain size and height are usually classed as permitted development, though this can vary depending on your property. We're happy to talk through your specific situation." },
    { q: "How long does installation take?", a: "Most utility sheds are installed within a single day once groundworks are complete, with minimal disruption to your garden." },
    { q: "What base do I need?", a: "A firm, level base is required — usually concrete or paving slabs. We can advise on the right option for your ground conditions." },
    { q: "Can I customise the size?", a: "Yes — every building in our range can be adjusted to fit your available space and requirements." },
  ],
  "garden-rooms": [
    { q: "Can I use it all year round?", a: "Yes — every garden room is fully insulated as standard, so it stays comfortable in winter and cool in summer." },
    { q: "Do I need planning permission?", a: "Most garden rooms fall under permitted development, though rules vary by property and location — we'll help you check before you commit." },
    { q: "Can it be used as a home office?", a: "Absolutely — many customers use their garden room as a dedicated workspace, with electrics and data connections available as an optional extra." },
    { q: "How long does it take to build?", a: "Typically one to two weeks from groundworks to handover, depending on size and specification." },
  ],
  "summer-houses": [
    { q: "Will it get too hot in summer?", a: "Our summer houses are designed with ventilation and glazing options to keep the space comfortable, even on warmer days." },
    { q: "Can I add insulation later?", a: "Yes — insulation can be added as an optional extra at the time of order, or retrofitted afterwards." },
    { q: "Do you install throughout the year?", a: "Yes, we install year-round, though good weather makes for the smoothest installation." },
    { q: "What maintenance is required?", a: "An annual check of the timber treatment and guttering will keep your summer house looking its best for years to come." },
  ],
  "garden-offices": [
    { q: "Will I get a good internet connection?", a: "Most customers use a wireless extender or run an ethernet cable during installation — we can advise on the best approach for your garden." },
    { q: "Is it insulated for winter working?", a: "Yes, every garden office is fully insulated as standard, with electric heating available as an optional extra." },
    { q: "Do I need building regulations approval?", a: "Most garden offices don't require building regulations approval, though this depends on size and intended use — we'll guide you through what applies." },
    { q: "Can I fit it out with my own furniture?", a: "Of course — we deliver a finished shell ready for you to fit out exactly as you like." },
  ],
};

const SHARED_OPTIONS = {
  "utility-sheds": {
    roof: ["Pent Roof", "Apex Roof"],
    doors: ["Single Personnel Door", "Double Doors"],
    windows: ["Fixed Window", "No Window (Secure Storage)"],
    extras: ["Shelving Package", "Additional Shelving", "Guttering Kit", "Floor Reinforcement"],
    colours: ["Forest Green", "Charcoal", "Natural Timber", "Soft Grey"],
  },
  "garden-rooms": {
    roof: ["Flat Roof", "Pent Roof", "Apex Roof"],
    doors: ["Bi-Fold Doors", "French Doors", "Sliding Doors"],
    windows: ["Full-Height Glazing", "Fixed Windows", "Roof Lantern"],
    extras: ["Insulation Upgrade", "Electrics Package", "Underfloor Heating", "Built-In Storage"],
    colours: ["Forest Green", "Charcoal", "Natural Timber", "Soft Grey", "Warm Timber"],
  },
  "summer-houses": {
    roof: ["Apex Roof", "Pent Roof", "Veranda Roof"],
    doors: ["French Doors", "Single Door", "Double Doors"],
    windows: ["Fixed Windows", "Opening Windows", "Full-Height Glazing"],
    extras: ["Veranda Decking", "Guttering Kit", "Electrics Package", "Insulation Upgrade"],
    colours: ["Forest Green", "Charcoal", "Natural Timber", "Soft Grey"],
  },
  "garden-offices": {
    roof: ["Flat Roof", "Pent Roof"],
    doors: ["Bi-Fold Doors", "Single Door"],
    windows: ["Full-Height Glazing", "Fixed Windows"],
    extras: ["Insulation Upgrade", "Electrics & Data Package", "Air Conditioning", "Built-In Desk"],
    colours: ["Forest Green", "Charcoal", "Natural Timber", "Soft Grey"],
  },
};

const SHARED_SIZES = {
  "utility-sheds": [
    { name: "Small", dimensions: "2.0m x 1.5m" },
    { name: "Medium", dimensions: "3.0m x 2.0m" },
    { name: "Large", dimensions: "4.0m x 3.0m" },
  ],
  "garden-rooms": [
    { name: "Small", dimensions: "3.0m x 2.5m" },
    { name: "Medium", dimensions: "4.0m x 3.0m" },
    { name: "Large", dimensions: "5.0m x 4.0m" },
  ],
  "summer-houses": [
    { name: "Small", dimensions: "2.5m x 2.5m" },
    { name: "Medium", dimensions: "3.5m x 3.0m" },
    { name: "Large", dimensions: "4.5m x 3.5m" },
  ],
  "garden-offices": [
    { name: "Small", dimensions: "3.0m x 2.4m" },
    { name: "Medium", dimensions: "4.0m x 2.8m" },
    { name: "Large", dimensions: "5.0m x 3.5m" },
  ],
};

const SHARED_CONSTRUCTION = {
  "utility-sheds": "Every utility shed is built from pressure-treated timber for lasting protection against the weather, with a choice of roof styles to suit your garden. Floors are raised to guard against damp, and each building is finished to keep tools, equipment and garden essentials genuinely dry and secure — not just out of sight.",
  "garden-rooms": "Each garden room is fully insulated — floor, walls and roof — and built from premium timber with a weatherproof exterior finish. Large glazed doors are fitted as standard to keep the space bright and connected to the garden, while the frame is engineered to remain solid and draught-free through every season.",
  "summer-houses": "Built from quality timber with a focus on natural light, every summer house is designed to make the most of long days and warm evenings. Glazing is positioned to capture the best of the garden view, and the timber frame is treated to stand up to years of everyday family use.",
  "garden-offices": "Fully insulated for genuine year-round use, every garden office is built with a contemporary timber frame, weatherproof cladding and large windows to keep the space bright without compromising on privacy or quiet. The result is a workspace that performs like a professional office, not an outbuilding with a desk in it.",
};

const SHARED_FEATURE_ICONS = ["pressureTreated", "madeInBritain", "installation", "customSizes", "sustainableTimber", "guarantee"];

const categories = [
  {
    slug: "utility-sheds",
    label: "Utility Sheds",
    tagline: "Practical, durable storage solutions.",
    heroImageKey: "utilityShed",
    lifestyleImageKey: "toolsRack",
    galleryPool: ["utilityShed", "claddingDetail", "toolsRack", "jointDetail", "nailgunBuild", "craftsman"],
    products: [
      { slug: "compact-store", name: "Compact Store", tagline: "Neat, secure storage for smaller gardens.", overview: "A neatly proportioned storage shed designed for gardens where space is at a premium, without compromising on security or finish." },
      { slug: "apex-utility", name: "Apex Utility", tagline: "Classic apex styling with room to spare.", overview: "A traditionally styled apex-roofed shed offering generous headroom and a timeless look that suits any garden." },
      { slug: "pent-workshop", name: "Pent Workshop", tagline: "A dedicated space for projects and hobbies.", overview: "A pent-roofed workshop shed built with hobbyists and DIY enthusiasts in mind, with room to work as well as store." },
      { slug: "heavy-duty-store", name: "Heavy Duty Store", tagline: "Built for serious storage demands.", overview: "Our most robust utility shed, reinforced for heavier equipment and larger loads without losing its clean, practical lines." },
      { slug: "garden-store-plus", name: "Garden Store Plus", tagline: "Versatile storage with a touch of style.", overview: "A versatile storage building that brings a little extra style to practical garden storage, inside and out." },
      { slug: "premium-workshop", name: "Premium Workshop", tagline: "A workshop that feels as good as it works.", overview: "The flagship of our utility range — a premium workshop finished to a standard that makes spending time in it a pleasure." },
    ],
  },
  {
    slug: "garden-rooms",
    label: "Garden Rooms",
    tagline: "Versatile insulated spaces for work, relaxation and entertaining.",
    heroImageKey: "gardenRoomBlack",
    lifestyleImageKey: "friendsCouch",
    galleryPool: ["gardenRoomBlack", "heroCabin", "lodgeDusk", "interiorLoft", "decking", "interiorBench"],
    products: [
      { slug: "the-studio", name: "The Studio", tagline: "A flexible space for work, rest or play.", overview: "A flexible, fully insulated garden room designed to adapt to however you need to use it, day to day." },
      { slug: "the-retreat", name: "The Retreat", tagline: "Your own quiet corner of the garden.", overview: "A calm, considered space built for quiet moments — reading, relaxing, or simply being away from the house for a while." },
      { slug: "the-cedar", name: "The Cedar", tagline: "Warm, natural tones for relaxed living.", overview: "Warm timber tones and a relaxed, natural feel make The Cedar a garden room that feels instantly welcoming." },
      { slug: "the-oak", name: "The Oak", tagline: "Solid, timeless design built to last.", overview: "A solid, dependable design built on the idea that a garden room should still look and feel its best in ten years' time." },
      { slug: "the-contemporary", name: "The Contemporary", tagline: "Sharp lines and full-height glazing.", overview: "Clean, architectural lines and full-height glazing give The Contemporary a genuinely modern feel." },
      { slug: "the-pavilion", name: "The Pavilion", tagline: "An open, airy space for entertaining.", overview: "An open, light-filled garden room designed with entertaining and gathering in mind." },
    ],
  },
  {
    slug: "summer-houses",
    label: "Summer Houses",
    tagline: "Stylish outdoor retreats.",
    heroImageKey: "summerAframe",
    lifestyleImageKey: "familyGarden",
    galleryPool: ["summerAframe", "rosePath", "lawnPath", "lodgeDusk", "decking", "interiorBench"],
    products: [
      { slug: "classic-summer-house", name: "Classic Summer House", tagline: "Timeless style for long summer days.", overview: "A classically styled summer house built for long, easy summer days in the garden." },
      { slug: "corner-retreat", name: "Corner Retreat", tagline: "Designed to make the most of a corner plot.", overview: "Shaped to fit neatly into a corner plot, making the most of gardens where space is at a premium." },
      { slug: "garden-pavilion", name: "Garden Pavilion", tagline: "An elegant garden feature you'll live in.", overview: "As much a garden feature as a functional space, the Garden Pavilion is built to be seen and enjoyed in equal measure." },
      { slug: "heritage-summer-house", name: "Heritage Summer House", tagline: "Traditional charm, built to modern standards.", overview: "Traditional detailing and proportions, built using modern materials and construction methods throughout." },
      { slug: "contemporary-retreat", name: "Contemporary Retreat", tagline: "A modern take on the classic summer house.", overview: "A confident, contemporary reinterpretation of the classic summer house, with cleaner lines and larger glazing." },
      { slug: "family-summer-house", name: "Family Summer House", tagline: "Room enough for the whole family.", overview: "Generously proportioned for family use, with enough room for everyone to enjoy the garden together." },
    ],
  },
  {
    slug: "garden-offices",
    label: "Garden Offices",
    tagline: "Modern workspaces for your garden.",
    heroImageKey: "officeLong",
    lifestyleImageKey: "deskPlants",
    galleryPool: ["officeLong", "gardenRoomBlack", "claddingDetail", "decking", "deskPlants", "interiorLoft"],
    products: [
      { slug: "executive-office", name: "Executive Office", tagline: "A serious workspace for serious work.", overview: "A generously specified garden office built for focused, professional working, day in and day out." },
      { slug: "compact-office", name: "Compact Office", tagline: "A focused workspace for smaller gardens.", overview: "A compact garden office proving that a dedicated workspace doesn't need a large garden to fit it in." },
      { slug: "professional-studio", name: "Professional Studio", tagline: "Room to think, create and get things done.", overview: "A flexible studio space suited to focused work, creative projects, or a mix of both." },
      { slug: "garden-workspace", name: "Garden Workspace", tagline: "A dedicated office, steps from your door.", overview: "A straightforward, well-specified garden workspace — a proper separation between home and work, just steps away." },
      { slug: "executive-plus", name: "Executive Plus", tagline: "Extra space for meetings and storage.", overview: "An extended layout with room for meetings, storage or a second workstation alongside your own." },
      { slug: "signature-office", name: "Signature Office", tagline: "Our flagship office, fully specified.", overview: "The most fully specified office in our range, built for customers who want everything finished to the highest standard." },
    ],
  },
];

module.exports = {
  IMAGES,
  SHARED_FAQS,
  SHARED_OPTIONS,
  SHARED_SIZES,
  SHARED_CONSTRUCTION,
  SHARED_FEATURE_ICONS,
  categories,
};
