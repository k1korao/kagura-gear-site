import type { Locale } from "./locale";
import { siteConfig } from "./site";

export type PolicyPageContent = { title: string; eyebrow: string; intro: string; sections: { heading: string; body: string }[] };
type PolicyKey = "shipping" | "returns" | "privacy" | "terms";
export const policies: Record<Locale, Record<PolicyKey, PolicyPageContent>> = {
  en: {
    shipping: { title: "Shipping information", eyebrow: "BEFORE THE FIRST RELEASE", intro: "KIKORA is currently sharing collections in development and design studies. Orders are not open yet.", sections: [
      { heading: "Delivery details will follow", body: "Destinations, shipping costs, dispatch times and any preorder arrangements will be published before each release. A concept shown here does not indicate available stock or a promised delivery date." },
      { heading: "For future releases", body: "Refer to the release page and your order information when a collection becomes available. For sampling, collaborations or release enquiries, please get in touch." },
    ] },
    returns: { title: "Returns information", eyebrow: "BEFORE THE FIRST RELEASE", intro: "Purchases are not currently available. Return and exchange conditions will be published before products go on sale.", sections: [
      { heading: "Release-specific details", body: "The concepts on this site do not establish a return window or terms for custom orders. Applicable conditions will be provided alongside each release." },
      { heading: "Talk to us", body: `For questions about future collectibles, design concepts or collaborations, use our contact page or email ${siteConfig.supportEmail}.` },
    ] },
    privacy: { title: "Privacy & information", eyebrow: "ABOUT THIS WEBSITE", intro: "This page describes the contact, email signup and language preference features currently available on this showcase site.", sections: [
      { heading: "Information you share", body: "Our contact form processes the name, email address, subject and message you submit so we can respond. Email signup uses your address for a confirmation and the updates you consent to receive. You can reply to an email to ask to unsubscribe." },
      { heading: "Email and language preferences", body: "When email delivery is available, messages are processed through Resend. If delivery fails, we offer a direct email option. A cookie named kagura-language remembers your selected language for up to one year; you can remove it in your browser settings." },
      { heading: "Questions and requests", body: `This site does not currently collect card details or process purchases. To ask about, correct or request deletion of information you submitted, contact ${siteConfig.supportEmail}. This page will be updated when transactional features are introduced.` },
    ] },
    terms: { title: "Using this site", eyebrow: "ABOUT OUR DESIGN STUDIES", intro: "The KIKORA site introduces our creative direction, shares concepts and welcomes collaboration enquiries.", sections: [
      { heading: "Concepts and released objects", body: "Concept images, renders and construction studies express a design direction, not a finished product. Final artwork, materials, specifications, prices and edition rules will be set out with each release." },
      { heading: "Characters and collaborations", body: "Game-character and music-inspired visuals are independent design explorations. Their appearance does not imply an official partnership with a game publisher, recording artist or illustrator. Names and characters belong to their respective rights holders." },
      { heading: "Working together", body: `Our artist collaboration programme is in development. Original IP, creative credit, artwork use and collaboration terms will be agreed with each creator individually. Reach us at ${siteConfig.supportEmail}.` },
    ] },
  },
  ja: {
    shipping: { title: "配送について", eyebrow: "発売前のご案内", intro: "現在のKIKORAサイトでは、開発中のシリーズやデザインコンセプトをご紹介しています。商品のご注文はまだ受け付けていません。", sections: [
      { heading: "配送条件は発売前にご案内します", body: "配送対象地域、送料、発送時期、予約販売の有無は、各作品の発売前にお知らせします。掲載中のコンセプトは、在庫やお届け日をお約束するものではありません。" },
      { heading: "今後の発売について", body: "発売後の詳細は、各作品の販売ページとご注文情報をご確認ください。試作やコラボレーション、発売予定に関するご相談は、お問い合わせページからお寄せください。" },
    ] },
    returns: { title: "返品・交換について", eyebrow: "発売前のご案内", intro: "現在、商品の販売は行っていません。返品・交換の条件とお手続きは、発売前にご案内します。", sections: [
      { heading: "各作品の販売条件をご確認ください", body: "掲載中のデザインコンセプトは、返品期間やカスタムオーダーの条件を定めるものではありません。適用される条件は、各作品の発売情報とあわせてお知らせします。" },
      { heading: "お問い合わせ", body: `今後の作品やデザイン、コラボレーションについては、お問い合わせページ、または ${siteConfig.supportEmail} までご連絡ください。` },
    ] },
    privacy: { title: "プライバシーについて", eyebrow: "現在のサイトの機能について", intro: "このページでは、お問い合わせ、メール配信の登録、表示言語の保存における情報の取り扱いをご案内します。", sections: [
      { heading: "お送りいただく情報", body: "お問い合わせフォームでは、ご記入いただいたお名前、メールアドレス、件名、メッセージを、ご相談への返信に使用します。メール登録では、確認メールと、同意いただいたブランドからのお知らせをお送りします。配信の停止をご希望の場合は、届いたメールにご返信ください。" },
      { heading: "メール送信と表示言語", body: "メール送信機能が利用できる場合は、Resendを通じてメールを処理します。送信できない場合は、直接メールでご連絡いただく方法をご案内します。表示言語は、kagura-languageというCookieに最長1年間保存されます。ブラウザの設定から削除できます。" },
      { heading: "情報に関するご相談", body: `現在、このサイトではカード情報の収集や商品代金の決済は行っていません。送信した情報の確認、訂正、削除をご希望の場合は、${siteConfig.supportEmail} までご連絡ください。販売機能を追加する際には、このご案内も更新します。` },
    ] },
    terms: { title: "サイトのご利用について", eyebrow: "掲載内容について", intro: "KIKORAのサイトは、ブランドの方向性とデザインコンセプトの紹介、およびコラボレーションのご相談を目的としています。", sections: [
      { heading: "コンセプトと製品について", body: "コンセプト画像やレンダリング、構造イメージは、デザインの方向性を示すものであり、完成品とは異なります。実際の絵柄、素材、仕様、価格、限定販売の条件は、発売時にご案内します。" },
      { heading: "キャラクターとコラボレーション", body: "ゲームのキャラクターや音楽のビジュアルから着想した画像は、独自のデザインスタディです。掲載によって、ゲーム会社、音楽アーティスト、イラストレーターとの公式な提携を示すものではありません。名称やキャラクターの権利は、各権利者に帰属します。" },
      { heading: "作家の皆さまへ", body: `作家との共同制作企画は、現在準備中です。オリジナルIP、クレジット表記、作品の利用方法、コラボレーションの条件については、作家ごとに相談のうえ取り決めます。お問い合わせは ${siteConfig.supportEmail} まで。` },
    ] },
  },
};
