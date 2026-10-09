import type { Locale } from "@/lib/locale";

export const keycapsCollectionIds = ["set", "artisan"] as const;
export type KeycapsCollection = (typeof keycapsCollectionIds)[number];

export function isKeycapsCollection(value: string): value is KeycapsCollection {
  return keycapsCollectionIds.includes(value as KeycapsCollection);
}

const en = {
  hubLabel: "KEYCAPS / TWO DIRECTIONS",
  hubTitle: "Keycaps",
  hubDescription: "A complete composition, or one considered detail. Explore two directions for the keys on your desk.",
  allCollections: "All collections",
  allKeycaps: "All keycaps collections",
  enter: "Explore collection",
  developing: "In development",
  release: "Get release updates",
  conceptNote: "Concept visualizations only. Product specifications, availability, and release details will be shared as development progresses.",
  previewLabel: "DESIGN STUDY / NOT A RELEASED PRODUCT",
  collections: {
    set: {
      name: "Keycaps Set",
      direction: "A complete composition",
      description: "A coordinated set, with color, legends, and form considered together across the keyboard.",
      story: "We are exploring keycap sets as a complete visual language for your keyboard. This is an early look at the direction; layouts, materials, and final specifications are still in development.",
      preview: "Keycap set concept visualization",
      study: "FORM / RHYTHM / COLOR",
    },
    artisan: {
      name: "Artisan Keycaps",
      direction: "A detail with character",
      description: "Individual keys explored as small objects, with a focus on shape, surface, and expression.",
      story: "Our artisan direction gives a single key room to stand out. These studies explore sculptural forms and metallic surfaces, with materials, compatibility, and final specifications still in development.",
      preview: "Artisan keycap concept visualization",
      study: "FORM / SURFACE / DETAIL",
    },
  },
};

const ja: typeof en = {
  hubLabel: "キーキャップ / 2つの方向性",
  hubTitle: "Keycaps",
  hubDescription: "キーボード全体を彩るセットと、一つのキーに個性を込めるアーティザン。デスクに添える、2つの方向性をご覧ください。",
  allCollections: "すべてのコレクション",
  allKeycaps: "キーキャップの全シリーズ",
  enter: "シリーズを見る",
  developing: "開発中",
  release: "発売情報を受け取る",
  conceptNote: "掲載画像はコンセプトイメージです。製品仕様、販売時期などの詳細は、開発の進捗に合わせてお知らせします。",
  previewLabel: "デザインスタディ / 発売前のコンセプト",
  collections: {
    set: {
      name: "Keycaps Set",
      direction: "キーボード全体に、一つの表情を",
      description: "色、刻印、かたちをトータルで考え、キーボード全体に統一感を生むキーキャップセット。",
      story: "キーボード全体を一つの表現として捉えたキーキャップセットを検討しています。現在は初期のデザイン段階で、対応配列、素材、最終仕様は開発中です。",
      preview: "キーキャップセットのコンセプトイメージ",
      study: "かたち / リズム / 色",
    },
    artisan: {
      name: "Artisan Keycaps",
      direction: "一つのキーに、個性を",
      description: "かたち、質感、表情を追求する、小さなオブジェのようなキーキャップ。",
      story: "一つのキーが持つ存在感を探るアーティザンシリーズ。彫刻的なかたちや金属の表情を検討しています。素材、対応スイッチ、最終仕様は開発中です。",
      preview: "アーティザンキーキャップのコンセプトイメージ",
      study: "かたち / 質感 / ディテール",
    },
  },
};

export const keycapsCollectionCopy: Record<Locale, typeof en> = { en, ja };
