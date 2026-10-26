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
  directions: ["Form & focus", "Art & expression", "Music & identity"],
  interactions: ["Explore the form", "Step into the gallery", "Explore the preview"],
  allGlass: "All glass collections",
  coverLabel: "COVER SERIES / ONE ARTWORK, ONE MOUSEPAD",
  coverIntro: "A first look at the Cover direction, featuring KIKORA’s signature K. Artwork and editions are in development.",
  viewer: "Cover series glass mousepad featuring the KIKORA single K logo.",
  previous: "Previous mousepad",
  next: "Next mousepad",
  help: "KIKORA / IDENTITY PREVIEW",
  edition: "EDITION",
  artwork: "Artwork",
  collectionEnd: "You’ve reached the end of the collection.",
};
const ja: typeof en = {
  hubLabel: "ガラスマウスパッド / 3つの表現",
  hubTitle: "あなたらしい一枚を。",
  hubDescription: "かたちを突き詰める。アートを身近に置く。音楽とキャラクターの世界を楽しむ。それぞれのシリーズを、別々の空間でご覧ください。",
  enter: "シリーズを見る",
  directions: ["かたちと集中", "アートと表現", "音楽とブランド"],
  interactions: ["かたちを見つめる", "ギャラリーへ", "プレビューを見る"],
  allGlass: "ガラスマウスパッドの全シリーズ",
  coverLabel: "COVER シリーズ / 一つのアートから、一枚のパッドへ",
  coverIntro: "KIKORA の K ロゴを使った Cover シリーズの最初のプレビュー。アートワークとエディションは開発中です。",
  viewer: "KIKORA の K ロゴを使用した Cover シリーズのガラスマウスパッド。",
  previous: "前のマウスパッド",
  next: "次のマウスパッド",
  help: "KIKORA / ブランドプレビュー",
  edition: "エディション",
  artwork: "アートワーク",
  collectionEnd: "このシリーズの最後の一枚です。",
};
export const glassCollectionCopy: Record<Locale, typeof en> = { en, ja };
