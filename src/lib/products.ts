export type Product = {
  slug: string;
  name: string;
  category: string;
  series: string;
  tagline: string;
  price: string;
  shortDescription: string;
  description: string;
  size: string;
  surface: string;
  base: string;
  useCase: string;
  speed: string;
  control: string;
  features: string[];
  accent: "red" | "pink" | "brass";
};

export const products: Product[] = [
  {
    slug: "kagura-control-pad",
    name: "Kagura Control Pad",
    category: "Control Pads",
    series: "Kagura Series",
    tagline: "Control surface for tactical FPS aim.",
    price: "$39.00",
    // Replace this placeholder description when your final Shopify product copy is ready.
    shortDescription:
      "A steady, locked-in cloth surface tuned for micro-corrections and tactical FPS control.",
    description:
      "Built for players who value calm precision over flash. The Kagura Control Pad pairs a textured woven surface with a dense rubber base for controlled starts, predictable stops, and consistent aim under pressure.",
    size: "490 x 420 x 4 mm",
    surface: "Fine-control woven cloth",
    base: "High-grip natural rubber",
    useCase: "Valorant, CS, tactical FPS",
    speed: "Medium",
    control: "High",
    features: ["Micro-adjust texture", "Low-profile stitched edge", "Dense anti-slip base"],
    accent: "red",
  },
  {
    slug: "sakura-speed-pad",
    name: "Sakura Speed Pad",
    category: "Speed Pads",
    series: "Sakura Series",
    tagline: "Fast glide for wide flicks and tracking.",
    price: "$42.00",
    // Replace this placeholder description when your final Shopify product copy is ready.
    shortDescription:
      "A fast, low-friction pad for wide flicks, smooth tracking, and high-sensitivity setups.",
    description:
      "The Sakura Speed Pad is tuned for fluid movement and rapid target transitions. Its slick cloth surface keeps glide light while the stitched edge and low-profile rubber base hold the shape through long sessions.",
    size: "500 x 500 x 4 mm",
    surface: "Speed-weave performance cloth",
    base: "Low-profile anti-slip rubber",
    useCase: "Apex, tracking aim, high sens",
    speed: "Fast",
    control: "Medium",
    features: ["Low-friction glide", "Soft sakura accent print", "Stable rubber grip"],
    accent: "pink",
  },
  {
    slug: "shrine-desk-mat",
    name: "Shrine Desk Mat",
    category: "Desk Mats",
    series: "Shrine Series",
    tagline: "Full desk ritual for keyboard setups.",
    price: "$58.00",
    // Replace this placeholder description when your final Shopify product copy is ready.
    shortDescription:
      "An oversized desk mat with a premium woven top, clean edge stitching, and shrine-inspired details.",
    description:
      "Designed for full desk setups, the Shrine Desk Mat gives keyboards, mice, and accessories a unified surface. It brings a premium ritual feel to the desk without sacrificing glide, grip, or everyday durability.",
    size: "900 x 400 x 4 mm",
    surface: "Balanced woven cloth",
    base: "Dense rubber with stitched perimeter",
    useCase: "Keyboard builds, full desk setups",
    speed: "Balanced",
    control: "Balanced",
    features: ["Oversized desk coverage", "Keyboard + mouse layout", "Shrine-line artwork"],
    accent: "brass",
  },
];

export const categories = [
  {
    title: "Control Pads",
    description: "Measured glide, crisp stopping power, and calm aim under pressure.",
  },
  {
    title: "Speed Pads",
    description: "Low-friction surfaces for wide flicks and fluid target tracking.",
  },
  {
    title: "Desk Mats",
    description: "Full-desk coverage for clean setups and consistent surface feel.",
  },
  {
    title: "Accessories",
    description: "Keyboard accents, cable tools, and setup details with ritual polish.",
  },
];
