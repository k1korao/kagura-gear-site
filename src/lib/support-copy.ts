import type { Locale } from "@/lib/locale";

type SupportCopy = {
  contact: {
    metaTitle: string; metaDescription: string; label: string; title: string; intro: string;
    inboxTitle: string; inboxCopy: string; topics: { title: string; copy: string }[];
    status: string; formTitle: string; mailSubject: string; mailBody: string;
  };
  faq: {
    metaTitle: string; metaDescription: string; label: string; title: string; intro: string;
    items: { question: string; answer: string }[]; contactTitle: string; contactCopy: string; contactAction: string;
  };
  contactForm: {
    name: string; namePlaceholder: string; email: string; topic: string; message: string; messagePlaceholder: string;
    company: string; topics: { value: string; label: string }[]; submit: string; sending: string; emailAction: string;
    mailSubject: string; mailHeading: string; notices: Record<"idle" | "sending" | "sent" | "invalid" | "unavailable" | "failed" | "uncertain" | "limited", string>;
  };
  newsletter: {
    email: string; company: string; submit: string; sending: string; consent: string; emailAction: string;
    mailSubject: string; mailBody: string;
    notices: Record<"sending" | "sent" | "email" | "consent" | "invalid" | "unavailable" | "failed" | "uncertain" | "limited", string>;
  };
};

export const supportCopy: Record<Locale, SupportCopy> = {
  en: {
    contact: {
      metaTitle: "Contact KIKORA", metaDescription: "Talk to KIKORA about upcoming objects, artist collaborations and brand partnerships.",
      label: "LET’S TALK", title: "A new world starts\nwith a conversation.", intro: "Curious about a work in progress? Have a character, an original world or a collaboration in mind? We’d like to hear about it.",
      inboxTitle: "Write to us directly", inboxCopy: "This is the place for product questions, creator-owned IP collaborations and brand enquiries.",
      topics: [{ title: "Explore the objects", copy: "Ask about our glass mousepad and metal keycap concepts, and where they’re headed." }, { title: "Artists & original worlds", copy: "Share a portfolio, original character or creator-owned IP, along with what you’d like to make together." }, { title: "Brands & partnerships", copy: "Have an idea that belongs in KIKORA’s world? Tell us what you have in mind." }],
      status: "Our first objects and artist collaboration programme are in development.", formTitle: "Tell us what you’re thinking", mailSubject: "Hello KIKORA", mailBody: "Hello KIKORA,\n\nI’d like to ask about:\n\n",
    },
    faq: {
      metaTitle: "Frequently asked questions", metaDescription: "Find out about KIKORA’s upcoming collections, glass mousepad specifications, artist collaborations and website features.",
      label: "GOOD TO KNOW", title: "About the objects.\nAnd what comes next.", intro: "Here’s what we can confirm today. Full details will appear on each collection page before its release.",
      items: [
        { question: "Can I buy these pieces yet?", answer: "Not yet. The current images are visual and product design studies. Final designs, prices, release dates and purchase details will be announced once they are confirmed." },
        { question: "What kinds of objects is KIKORA developing?", answer: "We’re developing glass mousepads and metal keycaps. Our glass mousepad directions include Core, Artist Editions and the Cover Series; album-inspired designs are one part of that wider collection. Individual releases will be announced separately." },
        { question: "Are the glass mousepad specifications final?", answer: "The current glass mousepad concepts target a size of 490 × 420 mm. Glass thickness, surface treatment, edge finishing, backing and final tolerances still need to be confirmed through sampling. Concept images are not final production specifications." },
        { question: "Are the character images released artist collaborations?", answer: "The images currently illustrate our visual and product direction. They are not released artist collaboration products. Participating artists, licensing arrangements and release plans will be announced after they have been confirmed." },
        { question: "How can an artist or original IP creator get involved?", answer: "Our first collaboration programme is in development. Use the contact page to share your portfolio, original characters or creator-owned IP, and tell us what you’d like to explore. We’ll discuss the creative approach, licensing and release arrangements with each collaborator." },
        { question: "How will limited editions be described?", answer: "We plan to publish edition sizes and reissue policies before each limited release. No edition sizes have been announced yet. Numbers shown on concept pages identify design studies, not purchasable numbered editions." },
        { question: "Do I have to listen to music while browsing?", answer: "Sound is off by default. You choose whether to turn it on, pause it or adjust the volume. If a track isn’t available yet, the sound control will let you know." },
        { question: "Which languages are available, and will my choice be remembered?", answer: "Use the language selector at the top of the page to choose English or 日本語. Your preference is saved in this browser for future visits. You may need to select it again after clearing the relevant browsing data." },
      ],
      contactTitle: "Something else on your mind?", contactCopy: "Ask a question, or bring us a new idea to explore together.", contactAction: "Contact KIKORA",
    },
    contactForm: {
      name: "Name", namePlaceholder: "What should we call you?", email: "Email", topic: "What’s on your mind?", message: "Message", messagePlaceholder: "Tell us about your question, work or collaboration idea.", company: "Company",
      topics: [{ value: "Product question", label: "Product question" }, { value: "Collaboration", label: "Artist / original IP collaboration" }, { value: "Wholesale", label: "Brand or business partnership" }, { value: "Order support", label: "Order enquiry" }, { value: "Other", label: "Something else" }],
      submit: "Send message", sending: "Sending…", emailAction: "Send this message by email", mailSubject: "KIKORA enquiry: {topic}", mailHeading: "Hello KIKORA,",
      notices: {
        idle: "We reply from {email}. If the form is unavailable, you can send the same message using your email app.", sending: "Sending your message…", sent: "Your message has been sent. We’ll reply from {email}.",
        invalid: "Please add your name, a valid email address and a message.", unavailable: "The form is temporarily unavailable, so your message hasn’t been sent. Use the link below to send it from your email app.",
        failed: "Your message couldn’t be sent. Try again, or use the email link below to send the same details.", uncertain: "We couldn’t confirm whether your message was sent. Your details are still here; you can try again or contact us by email.", limited: "Too many attempts. Please try again shortly, or contact us by email.",
      },
    },
    newsletter: {
      email: "Email address", company: "Company", submit: "Keep me posted", sending: "Submitting…",
      consent: "I’d like KIKORA collection news and release emails. I can unsubscribe by replying with UNSUBSCRIBE.", emailAction: "Sign up by email",
      mailSubject: "KIKORA collection and release updates", mailBody: "Hello KIKORA,\n\nI’d like to receive collection news and release updates at {email}, and I agree to receive these emails.\nI understand that I can unsubscribe by replying with UNSUBSCRIBE.\n",
      notices: { sending: "Submitting your email…", sent: "Your email has been sent. Please check your inbox.", email: "Please enter a valid email address.", consent: "Please confirm that you’d like to receive collection and release emails.", invalid: "Please check your email address and confirm that you’d like to receive updates.", unavailable: "Online signup is temporarily unavailable and hasn’t been completed. You can sign up by email below.", failed: "Your signup couldn’t be completed. Try again later, or sign up by email.", uncertain: "We couldn’t confirm the result. Please check your inbox or contact us by email.", limited: "Too many attempts. Please try again shortly." },
    },
  },
  ja: {
    contact: {
      metaTitle: "KIKORA へのお問い合わせ", metaDescription: "制作中の作品、作家とのコラボレーション、ブランドとの協業について KIKORA にお問い合わせください。",
      label: "LET’S TALK / お問い合わせ", title: "新しい世界は、\nひとつの会話から。", intro: "気になる作品について。あなたが描くキャラクターや世界について。これから一緒につくってみたいものについて。まずは、お話を聞かせてください。",
      inboxTitle: "メールでのお問い合わせ", inboxCopy: "作品に関するご質問、オリジナル IP との共創、ブランドとの協業は、こちらのメールアドレスへお寄せください。",
      topics: [{ title: "作品について", copy: "ガラスマウスパッドとメタルキーキャップの構想や制作状況について。" }, { title: "作家・オリジナル IP との共創", copy: "ポートフォリオやオリジナルキャラクターのリンクとともに、取り組んでみたい企画をお知らせください。" }, { title: "ブランド・事業者の方へ", copy: "KIKORA と一緒に実現したいアイデアがあれば、ぜひご相談ください。" }],
      status: "初回コレクションと作家との共創企画は、現在準備中です。", formTitle: "あなたのアイデアを聞かせてください", mailSubject: "KIKORA へのお問い合わせ", mailBody: "KIKORA ご担当者様\n\nお問い合わせ内容：\n\n",
    },
    faq: {
      metaTitle: "よくあるご質問", metaDescription: "KIKORA の制作状況、ガラスマウスパッドの仕様、作家との共創、サイトの使い方についてご案内します。",
      label: "GOOD TO KNOW / よくあるご質問", title: "作品のこと。\nこれからのこと。", intro: "現時点でお伝えできる情報をまとめました。詳細は、正式発売までに各作品のページでご案内します。",
      items: [
        { question: "掲載されている作品は購入できますか？", answer: "現在の掲載内容は、ビジュアルと製品のデザインスタディです。まだ販売していません。最終デザイン、価格、発売日、購入方法は、決定後にご案内します。" },
        { question: "どのようなカテゴリーを展開する予定ですか？", answer: "ガラスマウスパッドとメタルキーキャップを開発しています。ガラスマウスパッドにはコア、アーティストエディション、カバーシリーズがあり、アルバムから着想を得たデザインはそのひとつです。具体的な作品は今後の発表をお待ちください。" },
        { question: "ガラスマウスパッドのサイズや加工方法は決まっていますか？", answer: "現在のコンセプトは、490 × 420 mm を目標サイズとしています。ガラスの厚さ、表面加工、エッジの仕上げ、底面素材、最終的な寸法公差は、試作を通じて確認する予定です。コンセプト画像は最終的な製品仕様を示すものではありません。" },
        { question: "掲載画像は、すでに発表された作家コラボレーションですか？", answer: "現在の画像は、ビジュアルと製品デザインの方向性を示すものです。発売済みの作家コラボレーションではありません。参加作家、利用許諾の範囲、作品の販売計画は、決定後にあらためて発表します。" },
        { question: "作家やオリジナル IP のクリエイターは、どう参加できますか？", answer: "初回の共創企画は準備中です。お問い合わせページから、ポートフォリオやオリジナルキャラクターのリンク、取り組んでみたい内容をお送りください。制作の進め方、利用許諾、販売に関する取り決めは、個別に相談しながら決めていきます。" },
        { question: "限定作品のエディション数は公表されますか？", answer: "限定作品は、正式発売前にエディション数と再販方針を公開する予定です。現在、具体的な版数は発表していません。コンセプトページの番号はデザインスタディを示すもので、販売用の限定シリアル番号ではありません。" },
        { question: "サイトの音楽は必ず再生されますか？", answer: "音楽は初期状態ではオフです。サウンドボタンで再生や一時停止、音量調整を選べます。音源の準備ができていない場合は、その旨を表示します。" },
        { question: "対応言語と、言語設定の保存について教えてください。", answer: "ページ上部からEnglish・日本語を選べます。選択した言語は現在のブラウザに保存され、次回のアクセス時にも引き継がれます。関連する閲覧データを削除した場合は、再度選択してください。" },
      ],
      contactTitle: "ほかに気になることはありますか？", contactCopy: "ご質問も、新しいコラボレーションのアイデアも、お気軽にお寄せください。", contactAction: "KIKORA に問い合わせる",
    },
    contactForm: {
      name: "お名前・作家名", namePlaceholder: "お呼びするお名前を教えてください", email: "メールアドレス", topic: "お問い合わせの種類", message: "お問い合わせ内容", messagePlaceholder: "ご質問、作品、コラボレーションのアイデアをご記入ください。", company: "会社名",
      topics: [{ value: "Product question", label: "作品について" }, { value: "Collaboration", label: "作家・オリジナル IP との共創" }, { value: "Wholesale", label: "ブランド・事業者との協業" }, { value: "Order support", label: "ご注文について" }, { value: "Other", label: "その他" }],
      submit: "メッセージを送る", sending: "送信中…", emailAction: "この内容をメールで送る", mailSubject: "KIKORA へのお問い合わせ：{topic}", mailHeading: "KIKORA ご担当者様",
      notices: {
        idle: "{email} から返信します。フォームを利用できない場合は、同じ内容をメールアプリから送信できます。", sending: "メッセージを送信しています…", sent: "メッセージを送信しました。{email} から返信します。",
        invalid: "お名前、有効なメールアドレス、お問い合わせ内容をご記入ください。", unavailable: "現在フォームから送信できません。メッセージはまだ送られていません。下のリンクからメールアプリを開き、送信してください。",
        failed: "メッセージを送信できませんでした。もう一度お試しいただくか、下のリンクから同じ内容をメールでお送りください。", uncertain: "送信結果を確認できませんでした。入力内容はそのまま残っています。再度お試しいただくか、メールでお問い合わせください。", limited: "短時間に送信が集中しています。しばらく待ってから再度お試しいただくか、メールでお問い合わせください。",
      },
    },
    newsletter: {
      email: "メールアドレス", company: "会社名", submit: "最新情報を受け取る", sending: "送信中…",
      consent: "KIKORA の作品や発売に関するメールの受信に同意します。配信停止は、メールに UNSUBSCRIBE と記載して返信することで申請できます。", emailAction: "メールで登録する",
      mailSubject: "KIKORA の作品・発売情報の配信希望", mailBody: "KIKORA ご担当者様\n\n{email} で作品や発売に関する情報を受け取りたいです。関連メールの受信に同意します。\n配信停止は UNSUBSCRIBE と記載してメールに返信することで申請できることを確認しました。\n",
      notices: { sending: "メールアドレスを送信しています…", sent: "メールを送信しました。受信トレイをご確認ください。", email: "有効なメールアドレスを入力してください。", consent: "作品・発売情報メールの受信に同意する項目にチェックを入れてください。", invalid: "メールアドレスと、メール受信への同意をご確認ください。", unavailable: "現在オンラインで登録できず、手続きは完了していません。下のリンクからメールでお申し込みいただけます。", failed: "登録を完了できませんでした。時間を置いて再度お試しいただくか、メールでお申し込みください。", uncertain: "登録結果を確認できませんでした。受信トレイをご確認いただくか、メールでお問い合わせください。", limited: "短時間に送信が集中しています。しばらく待ってから再度お試しください。" },
    },
  },
};
