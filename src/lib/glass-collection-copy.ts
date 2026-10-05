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
const zh: typeof en = {
  hubLabel: "玻璃鼠标垫 / 三种表达",
  hubTitle: "找到属于你的那一面。",
  hubDescription: "专注纯粹形态，收藏画师表达，或把音乐与角色带上桌面。三个系列，各自展开。",
  enter: "进入系列",
  directions: ["形态与专注", "画师与表达", "角色与唱片"],
  interactions: ["近看形态", "走进画廊", "滑动浏览每一款"],
  allGlass: "全部玻璃鼠标垫系列",
  coverLabel: "COVER 专辑系列 / 一幅作品，一张鼠标垫",
  coverIntro: "每幅图都是独立的一款。沿着桌面滑动，依次发现七张鼠标垫。",
  viewer: "专辑系列玻璃鼠标垫。左右拖动，或使用左右方向键浏览；Home 和 End 键可到达第一款和最后一款。",
  previous: "上一张鼠标垫",
  next: "下一张鼠标垫",
  help: "左右拖动浏览 / 七款独立鼠标垫",
  edition: "独立款式",
  artwork: "画面",
  collectionEnd: "已经浏览到这个系列的最后一款。",
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
export const glassCollectionCopy: Record<Locale, typeof en> = { zh, en, ja };
