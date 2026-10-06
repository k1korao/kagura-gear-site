import type { Locale } from "@/lib/locale";

type Chapter = { number: string; label: string; title: string[]; copy: string; note: string };
type Principle = { number: string; label: string; title: string; copy: string };
type Category = { title: string; aria: string; alt: string; label: string; copy: string; status?: string };

type BrandCopy = {
  lang: string;
  hero: {
    topline: string; stamp: string; eyebrow: string; title: string[]; description: string[];
    storyAction: string; creatorAction: string; collageAria: string; coordinates: string;
    wraithAlt: string; reynaAlt: string; keycapsAlt: string; visualStudy: string; coverStudy: string;
    keysCaption: string; storyStart: string; disclaimer: string; bottomLine: string;
  };
  manifesto: { label: string; title: string[]; paragraphs: string[] };
  story: {
    aria: string; strapline: string; navAria: string; chapterAction: string;
    chapters: Chapter[]; artistTitle: string[]; artistTopics: string[]; artistNote: string; artistCaption: string;
    materialNames: string[]; materialCaption: string; collectorLabel: string; collectorTitle: string[];
    collectorCopy: string[]; collectorTags: string; collectorCaption: string; bottomLine: string; nextChapter: string;
  };
  creators: {
    label: string; title: string[]; status: string; invitation: string[]; posterCopy: string[];
    posterFoot: string; principles: Principle[]; cta: string; ctaNote: string;
    mailSubject: string; mailBody: string; disclaimer: string;
  };
  discover: { label: string; copy: string[]; categories: Category[]; collections: string[] };
  closing: { label: string; title: string[]; link: string };
};

export const brandCopy: Record<Locale, BrandCopy> = {
  en: {
    lang: "en",
    hero: {
      topline: "ART. ORIGINAL WORLDS. COLLECTIBLE OBJECTS.", stamp: "KIKORA / A WORLD IN THE MAKING",
      eyebrow: "For collectors of anime, gaming and street culture",
      title: ["An artist’s world.", "A place in your collection."],
      description: ["Original characters and ideas, imagined as limited-edition objects.", "We’re shaping a KIKORA built around artists, players and the worlds they love."],
      storyAction: "Step into our world", creatorAction: "Artist collaborations",
      collageAria: "KIKORA artwork and collectible design studies", coordinates: "ARTWORK → OBJECT → COLLECTION",
      wraithAlt: "Wraith visual study with an icy blue palette and architectural setting", reynaAlt: "Reyna album-cover portrait study in red and violet-blue",
      keycapsAlt: "Reyna keycap concept with artwork spanning the full keyboard", visualStudy: "01 / VISUAL STUDY", coverStudy: "02 / COVER STUDY",
      keysCaption: "ART, IN ANOTHER FORM.", storyStart: "THE STORY BEGINS HERE", disclaimer: "Images show visual and product studies, not released artist collaborations.",
      bottomLine: "INDEPENDENT WORLDS / SHARED PASSION",
    },
    manifesto: {
      label: "WHY KIKORA EXISTS", title: ["Some worlds deserve", "a place ", "beyond the screen."],
      paragraphs: ["Sometimes a character feels familiar before we know why. Sometimes a piece of art says exactly what we can’t. We collect to keep that connection close. That’s where KIKORA begins.", "We hope to collaborate with independent artists and original IP creators across China, exploring limited-edition art through glass mousepads, keycaps and custom metal objects. New forms for an artist’s vision. New ways to make a collection your own."],
    },
    story: {
      aria: "Three chapters from artistic vision to personal collection", strapline: "FROM AN ARTIST’S WORLD TO YOURS.", navAria: "Story chapters", chapterAction: "Go to chapter {number}",
      chapters: [
        { number: "01", label: "ONE ARTIST. ONE WORLD.", title: ["A signature style.", "A world of its own."], copy: "Distinctive characters. A visual language you recognise. Stories with somewhere to go. We hope to work with independent artists to give their original worlds a new life as collectibles.", note: "A PERSONAL VISION / CREATOR FIRST" },
        { number: "02", label: "ART TAKES FORM.", title: ["From an idea", "to an object to keep."], copy: "An image unfolds across glass. Colour finds a rhythm in keycaps. A silhouette gains weight in metal. Each material offers a new way to bring an artist’s vision into the world.", note: "FROM IMAGE TO OBJECT / ART INTO OBJECTS" },
        { number: "03", label: "LIVE WITH YOUR COLLECTION.", title: ["Keep it close.", "Make it part of your day."], copy: "Collect for the character, the style, the feeling that stays with you. Give those worlds a place on your desk, alongside the games you play and the things you make.", note: "COLLECT WHAT CONNECTS / MADE PERSONAL" },
      ],
      artistTitle: ["THE CREATIVE", "UNIVERSE"], artistTopics: ["CHARACTER", "STYLE", "STORY"], artistNote: "It starts with a voice of its own.", artistCaption: "VISUAL STUDY / PERSONAL EXPRESSION",
      materialNames: ["GLASS", "KEYCAPS", "METAL"], materialCaption: "ONE CREATIVE WORLD. MULTIPLE FORMS.",
      collectorLabel: "KIKORA / COLLECTION NOTES", collectorTitle: ["FOR THE", "WORLDS", "YOU LOVE."], collectorCopy: ["Room for what you love.", "Room for the next story."],
      collectorTags: "ART × PLAY × EVERYDAY", collectorCaption: "YOUR COLLECTION. YOUR POINT OF VIEW.", bottomLine: "IMAGINE. CREATE. COLLECT.", nextChapter: "THE NEXT CHAPTER",
    },
    creators: {
      label: "KIKORA ARTIST COLLABORATIONS", title: ["Your world could inspire", "our next ", "collectible."], status: "First artist collaboration programme · In development",
      invitation: ["AN INVITATION TO", "INDEPENDENT CREATORS"], posterCopy: ["Independent artists / Original characters / Creator-owned IP", "Wherever you create, bring a world that is yours."], posterFoot: "THE COLLABORATION STARTS WITH YOU.",
      principles: [
        { number: "01", label: "CREATOR FIRST", title: "Keep the artist in the picture.", copy: "Our aim is to clearly credit every collaborating artist and share the ideas and stories behind their original work." },
        { number: "02", label: "CREATED TOGETHER", title: "Build a collection together.", copy: "Theme, composition, material and finish: we want to shape the full expression of a collection with its creator, from artwork to physical object." },
        { number: "03", label: "LIMITED, WITH CLARITY", title: "Make the edition clear.", copy: "We plan to publish edition sizes and reissue policies before each limited release. Current images are design studies; no editions are on sale yet." },
      ],
      cta: "Tell us about your work", ctaNote: "START A CONVERSATION", mailSubject: "KIKORA artist collaboration enquiry", mailBody: "Hello KIKORA,\n\nMy name:\nPortfolio or original IP link:\nWhat I’d like to create together:\nContact details:\n",
      disclaimer: "Collaboration terms, licensing and release plans will be agreed with each creator. The concepts shown illustrate our design direction; collaborating artists have not yet been announced.",
    },
    discover: {
      label: "EXPLORE THE OBJECTS", copy: ["One connection. More than one way to collect it.", "Step into a category and explore the ideas taking shape."],
      categories: [
        { title: "Glass mousepads", aria: "Explore glass mousepads", alt: "Wraith glass mousepad design study", label: "01 / A CANVAS FOR YOUR WORLD", copy: "A whole world, laid out before you." },
        { title: "Keycaps", aria: "Explore keycaps", alt: "Keycap design concept with a continuous Reyna illustration across individual keys", label: "02 / ART AT YOUR FINGERTIPS", copy: "A little art in every keystroke.", status: "DESIGN STUDY" },
        { title: "Metal customs", aria: "Explore custom metal objects", alt: "", label: "03 / A DIFFERENT KIND OF PRESENCE", copy: "Give an idea shape, texture and weight.", status: "FUTURE OBJECTS" },
      ],
      collections: ["Core", "Artist editions", "Cover series"],
    },
    closing: { label: "THIS WORLD IS ONLY JUST BEGINNING.", title: ["What you love", "belongs here, too."], link: "Meet KIKORA" },
  },
  ja: {
    lang: "ja",
    hero: {
      topline: "アート。オリジナル IP。コレクション。", stamp: "KIKORA / ここから広がる世界",
      eyebrow: "アニメ、ゲーム、ストリートカルチャーを愛する人へ",
      title: ["作家が描く世界を、", "あなたのコレクションへ。"],
      description: ["オリジナル IP の想像力を、手に取れる限定作品へ。", "作家とプレイヤーの「好き」が交わる、新しいコレクションを準備しています。"],
      storyAction: "KIKORA の世界へ", creatorAction: "作家との共創について",
      collageAria: "KIKORA のアートワークとコレクションのデザインスタディ", coordinates: "アートワーク → プロダクト → コレクション",
      wraithAlt: "冷たいブルーの色調と空間構成で描いたレイスのビジュアルスタディ", reynaAlt: "赤と青紫で描いたレイナのアルバムカバー風ポートレート",
      keycapsAlt: "レイナのイラストをキーボード全体に連続して配したキーキャップのコンセプト", visualStudy: "01 / ビジュアルスタディ", coverStudy: "02 / カバースタディ",
      keysCaption: "作品に、もうひとつのかたちを。", storyStart: "物語は、ここから", disclaimer: "掲載画像はビジュアルと製品のコンセプトです。発売済みの作家コラボレーションではありません。",
      bottomLine: "それぞれの世界 / つながる「好き」",
    },
    manifesto: {
      label: "KIKORA の原点", title: ["心を動かされた世界を、", "手に取れる", "かたちに。"],
      paragraphs: ["好きなキャラクターに、自分を重ねる。心に響いた作品を、いつまでもそばに置いておきたくなる。KIKORA の出発点は、そんな気持ちです。", "中国各地の独立した作家やオリジナル IP のクリエイターとともに、ガラス製マウスパッド、キーキャップ、メタルカスタムを通じた限定アートコレクションを構想しています。作品には新しい表現の場を。プレイヤーには、自分らしく集める楽しさを。"],
    },
    story: {
      aria: "創作からコレクションへ、3 つの章", strapline: "作家の世界から、あなたの世界へ。", navAria: "ストーリーの章を選ぶ", chapterAction: "第 {number} 章へ",
      chapters: [
        { number: "01", label: "ONE ARTIST. ONE WORLD.", title: ["ひとりの作家。", "ひとつの世界。"], copy: "印象に残るキャラクター。その人だけの画風。続いていく物語。独自の世界を描く作家とともに、新しいコレクションのかたちを探っていきます。", note: "作家ならではの表現から / CREATOR FIRST" },
        { number: "02", label: "ART TAKES FORM.", title: ["その一枚を、", "手元に残る作品へ。"], copy: "ガラスいっぱいに広がる画面。キーキャップが奏でる色のリズム。金属に宿る輪郭と質感。素材ごとの魅力を生かし、作品の新しい表情を作家とともに考えます。", note: "絵から、手に取れるものへ / ART INTO OBJECTS" },
        { number: "03", label: "LIVE WITH YOUR COLLECTION.", title: ["コレクションと、", "毎日を過ごす。"], copy: "あのキャラクターが好き。この画風に惹かれる。その気持ちで選んだ作品を、いつものデスクへ。ゲームにも創作にも、好きな世界が寄り添う日常を。", note: "「好き」で選ぶコレクション / MADE PERSONAL" },
      ],
      artistTitle: ["作家が描く", "ひとつの宇宙"], artistTopics: ["キャラクター", "スタイル", "ストーリー"], artistNote: "はじまりは、その人だけの表現。", artistCaption: "ビジュアルスタディ / 作家の表現",
      materialNames: ["ガラス", "キーキャップ", "メタル"], materialCaption: "ひとつの世界から、さまざまなかたちへ。",
      collectorLabel: "KIKORA / コレクションノート", collectorTitle: ["あなたが", "愛する", "世界へ。"], collectorCopy: ["好きなものを置く場所を。", "次の物語を迎える余白を。"],
      collectorTags: "アート × ゲーム × 日常", collectorCaption: "あなたのコレクション。あなたの視点。", bottomLine: "想像する。ともにつくる。集める。", nextChapter: "次の章へ",
    },
    creators: {
      label: "KIKORA クリエイター・コラボレーション", title: ["次に手元に迎えたくなる作品は、", "あなたの", "世界から。"], status: "初回コラボレーション企画 · 準備中",
      invitation: ["独自の世界を描く", "クリエイターへ"], posterCopy: ["イラストレーター / オリジナルキャラクター / 作家発の IP", "どの街からでも。あなたならではの世界を。"], posterFoot: "共創は、あなたの表現からはじまります。",
      principles: [
        { number: "01", label: "CREATOR FIRST", title: "作品とともに、作家を伝える。", copy: "コラボレーションでは作家名を明記し、オリジナル IP に込めた物語や表現も丁寧に伝えていきたいと考えています。" },
        { number: "02", label: "CREATED TOGETHER", title: "シリーズ全体を、ともにつくる。", copy: "テーマや構図から素材、実物の仕上がりまで。絵が画面を離れたときの姿を、作家と一緒に考え、磨いていきます。" },
        { number: "03", label: "LIMITED, WITH CLARITY", title: "限定のかたちを、明確に。", copy: "限定作品は、発売前にエディション数と再販方針を公開する予定です。現在の掲載内容はデザインスタディで、まだ販売していません。" },
      ],
      cta: "あなたの作品を教えてください", ctaNote: "コラボレーションのお問い合わせ", mailSubject: "KIKORA 作家コラボレーションについて", mailBody: "KIKORA ご担当者様\n\nお名前／作家名：\nポートフォリオ・オリジナル IP の URL：\n希望するコラボレーションの内容：\nご連絡先：\n",
      disclaimer: "共創の進め方、利用許諾の範囲、作品の販売計画は、各作家との相談を通じて決定します。掲載コンセプトはデザインの方向性を示すもので、参加作家はまだ発表していません。",
    },
    discover: {
      label: "作品のかたちを探す", copy: ["ひとつの「好き」に、いくつもの集め方を。", "気になるカテゴリーから、制作中のアイデアをご覧ください。"],
      categories: [
        { title: "ガラスマウスパッド", aria: "ガラスマウスパッドを見る", alt: "レイスを描いたガラスマウスパッドのデザインスタディ", label: "01 / あなたの世界を描くキャンバス", copy: "ひとつの世界を、目の前いっぱいに。" },
        { title: "キーキャップ", aria: "キーキャップを見る", alt: "レイナのイラストをそれぞれのキーにつながるように配したキーキャップのコンセプト", label: "02 / 指先に触れるアート", copy: "キーを打つたび、作品に触れる。", status: "デザイン検討中" },
        { title: "メタルカスタム", aria: "メタルカスタムを見る", alt: "", label: "03 / かたちに宿る存在感", copy: "輪郭に、質感と重みを。", status: "今後のコレクション構想" },
      ],
      collections: ["Core シリーズ", "Artist シリーズ", "Cover シリーズ"],
    },
    closing: { label: "この世界は、まだはじまったばかり。", title: ["あなたの「好き」も、", "この世界の一部になる。"], link: "KIKORA について" },
  },
};
