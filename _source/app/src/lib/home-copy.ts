import type { Locale } from "./locale";

export const homeCopy = {
  zh: { title: "让创作者的世界，成为你的收藏", description: "KIKORA 面向动漫、游戏与潮流玩家，探索独立画师、个人 IP 与限定艺术作品。从玻璃鼠标垫、键帽到未来的金属客制化。", label: "下一件值得期待的作品", newsletter: "下一章，一起见证。", updates: "订阅作品进展、共创计划与未来发售信息。" },
  en: { title: "Collect Your World", description: "Independent art. Original characters. Objects to make your own. Explore the KIKORA vision through glass mousepads, keycaps and future metal customs.", label: "GOOD THINGS. NEXT IN LINE.", newsletter: "THE NEXT CHAPTER.", updates: "New artwork, studio updates and the first word on future releases." },
  ja: { title: "作家の世界を、あなたのコレクションに", description: "アニメ・ゲーム・ストリートカルチャーを愛する人へ。KIKORAは、作家のオリジナルIPをガラスマウスパッド、キーキャップ、メタルアイテムへと広げる可能性を探っています。", label: "次の作品を、いち早く", newsletter: "次の一作を、一緒に。", updates: "作品づくりの進捗やコラボレーション企画、今後の発売情報をお届けします。" },
} satisfies Record<Locale, { title: string; description: string; label: string; newsletter: string; updates: string }>;
