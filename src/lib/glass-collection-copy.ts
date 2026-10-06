import type { Locale } from "@/lib/locale";

export const glassCollectionIds = ["core", "artist", "covers"] as const;
export type GlassCollection = (typeof glassCollectionIds)[number];
export function isGlassCollection(value: string): value is GlassCollection {
  return glassCollectionIds.includes(value as GlassCollection);
}

const en = {
  hubLabel: "GLASS / THREE PERSPECTIVES",
  hubTitle: "Find your kind of glass.",
  hubDescription: "Quiet essentials. A canvas for artists. A collection with its own sound. Three directions, each with a space of its own.",
  enter: "Explore collection",
  directions: ["Form & focus", "Art & expression", "Characters & records"],
  interactions: ["Explore the form", "Step into the gallery", "Browse the editions"],
  allGlass: "All glass collections",
  coverLabel: "COVER SERIES / ONE ARTWORK, ONE MOUSEPAD",
  coverIntro: "Every artwork is its own edition. Slide across the desk to discover all seven.",
  viewer: "Cover series glass mousepads. Drag sideways or use the left and right arrow keys to browse. Home and End move to the first and last pad.",
  previous: "Previous mousepad",
  next: "Next mousepad",
  help: "DRAG TO EXPLORE / 7 INDIVIDUAL EDITIONS",
  edition: "EDITION",
  artwork: "Artwork",
  collectionEnd: "You’ve reached the end of the collection.",
};
const ja: typeof en = {
  hubLabel: "ガラスマウスパッド / 3つの表現",
  hubTitle: "あなたらしい一枚を。",
  hubDescription: "かたちを突き詰める。アートを身近に置く。音楽とキャラクターの世界を楽しむ。それぞれのシリーズを、別々の空間でご覧ください。",
  enter: "シリーズを見る",
  directions: ["かたちと集中", "アートと表現", "キャラクターとレコード"],
  interactions: ["かたちを見つめる", "ギャラリーへ", "スライドして一枚ずつ"],
  allGlass: "ガラスマウスパッドの全シリーズ",
  coverLabel: "COVER シリーズ / 一つのアートから、一枚のパッドへ",
  coverIntro: "どのアートワークも、それぞれが一つのエディション。デスクを横にスライドして、7枚のパッドをご覧ください。",
  viewer: "Cover シリーズのガラスマウスパッド。左右にドラッグするか、左右の矢印キーで移動できます。Home と End キーで最初と最後のパッドに移動します。",
  previous: "前のマウスパッド",
  next: "次のマウスパッド",
  help: "左右にドラッグ / 7つのエディション",
  edition: "エディション",
  artwork: "アートワーク",
  collectionEnd: "このシリーズの最後の一枚です。",
};
export const glassCollectionCopy: Record<Locale, typeof en> = { en, ja };
