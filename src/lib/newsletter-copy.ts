import type { Locale } from "./locale";
import type { NewsletterCategory } from "./newsletter-category";

type CategoryEmailCopy = {
  subject: string;
  heading: string;
  body: string;
  label: string;
  links: { path: string; label: string }[];
};

export const newsletterEmailCopy = {
  en: {
    unsubscribe: "This message was sent to the address you signed up with. To stop receiving updates, reply to this email and ask to unsubscribe.",
    fallback: "KIKORA email updates",
    request: "Please add this email address to the KIKORA update list: ",
    categories: {
      keycaps: {
        subject: "You're subscribed to KIKORA keycap updates",
        heading: "KEYCAP UPDATES.",
        body: "Thanks for following KIKORA keycaps. You're subscribed to updates about our Keycaps Set and Artisan Keycaps collections. These collections are in development; we'll share progress and future release news with you.",
        label: "Keycaps (sets and artisan)",
        links: [
          { path: "/explore/keycaps/set", label: "Keycaps Set" },
          { path: "/explore/keycaps/artisan", label: "Artisan Keycaps" },
        ],
      },
      other: {
        subject: "Welcome to KIKORA's next chapter",
        heading: "COLLECT YOUR WORLD.",
        body: "Thanks for following KIKORA. You're subscribed to updates about our glass mousepads and other collections, excluding keycaps. Our designs are still taking shape; we'll share progress and future release news with you.",
        label: "Glass mousepads and other collections",
        links: [{ path: "/explore/glass", label: "Glass mousepads" }],
      },
    },
  },
  ja: {
    unsubscribe: "ご登録いただいたメールアドレスにお送りしています。配信の停止をご希望の場合は、このメールにその旨をご返信ください。",
    fallback: "KIKORAのお知らせを受け取る",
    request: "以下のメールアドレスでKIKORAのお知らせを希望します：",
    categories: {
      keycaps: {
        subject: "KIKORA キーキャップのお知らせにご登録ありがとうございます",
        heading: "キーキャップの最新情報を。",
        body: "KIKORAのキーキャップにご関心をお寄せいただき、ありがとうございます。キーキャップセットとアーティザンキーキャップの開発情報・発売のお知らせにご登録いただきました。両シリーズは現在開発中です。今後の進捗をメールでお届けします。",
        label: "キーキャップ（セット・アーティザン）",
        links: [
          { path: "/explore/keycaps/set", label: "Keycaps Set" },
          { path: "/explore/keycaps/artisan", label: "Artisan Keycaps" },
        ],
      },
      other: {
        subject: "KIKORAへようこそ",
        heading: "作家の世界を、あなたのコレクションに。",
        body: "KIKORAにご関心をお寄せいただき、ありがとうございます。ガラスマウスパッドなど、キーキャップ以外のコレクションの開発情報・発売のお知らせにご登録いただきました。製品は現在企画・開発中です。今後の進捗をメールでお届けします。",
        label: "ガラスマウスパッド・その他のコレクション",
        links: [{ path: "/explore/glass", label: "ガラスマウスパッド" }],
      },
    },
  },
} satisfies Record<Locale, {
  unsubscribe: string;
  fallback: string;
  request: string;
  categories: Record<NewsletterCategory, CategoryEmailCopy>;
}>;
