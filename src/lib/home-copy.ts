import type { Locale } from "./locale";

export const homeCopy = {
  en: { title: "Collect Your World", description: "Independent art. Original characters. Objects to make your own. Explore the KIKORA vision through glass mousepads and metal keycaps.", label: "GOOD THINGS. NEXT IN LINE.", newsletter: "THE NEXT CHAPTER.", updates: "New artwork, studio updates and the first word on future releases." },
  ja: { title: "作家の世界を、あなたのコレクションに", description: "アニメ・ゲーム・ストリートカルチャーを愛する人へ。KIKORAは、作家のオリジナルIPをガラスマウスパッドとメタルキーキャップへと広げる可能性を探っています。", label: "次の作品を、いち早く", newsletter: "次の一作を、一緒に。", updates: "作品づくりの進捗やコラボレーション企画、今後の発売情報をお届けします。" },
} satisfies Record<Locale, { title: string; description: string; label: string; newsletter: string; updates: string }>;
