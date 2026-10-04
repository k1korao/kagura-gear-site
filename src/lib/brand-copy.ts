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
  zh: {
    lang: "zh-CN",
    hero: {
      topline: "艺术 · 个人 IP · 收藏作品", stamp: "KAGURA / 正在生长的世界",
      eyebrow: "为动漫、游戏与潮流文化中的收藏者",
      title: ["让创作者的世界，", "成为你的收藏。"],
      description: ["从个人 IP 的想象，到可以触碰的限定作品。", "我们正在构想，一个由画师与玩家共同丰富的 KAGURA。"],
      storyAction: "走进我们的世界", creatorAction: "画师共创计划",
      collageAria: "KAGURA 艺术与收藏品设计研究", coordinates: "画作 → 物件 → 收藏",
      wraithAlt: "恶灵角色视觉研究，冷蓝色人物与空间构图", reynaAlt: "蕾娜角色视觉研究，红色与紫蓝色的专辑风肖像",
      keycapsAlt: "蕾娜连续印花键帽设计概念", visualStudy: "01 / 视觉研究", coverStudy: "02 / 封面研究",
      keysCaption: "作品的另一种形态。", storyStart: "故事，从这里开始", disclaimer: "页面作品为视觉与产品概念研究，非已发布画师联名。",
      bottomLine: "独立的世界 / 相通的热爱",
    },
    manifesto: {
      label: "KAGURA 的起点", title: ["有些热爱，", "值得拥有", "真实的形状。"],
      paragraphs: ["我们喜欢一个角色，常常是因为看见了自己；我们收藏一件作品，是想把那份共鸣留得更久。KAGURA 从这样的热爱出发。", "我们希望连接全国独立画师与个人 IP 创作者，以玻璃鼠标垫、键帽和金属客制化探索限定艺术作品。让创作有新的去处，也让玩家的收藏有更多自己的样子。"],
    },
    story: {
      aria: "从创作到收藏的三个章节", strapline: "从画师的世界，走进你的世界。", navAria: "叙事章节", chapterAction: "查看第 {number} 章",
      chapters: [
        { number: "01", label: "ONE ARTIST. ONE WORLD.", title: ["一个画师，", "一个世界。"], copy: "鲜明的角色、独特的画风、持续生长的故事。我们期待与独立画师及个人 IP 创作者一起，让他们的世界拥有新的收藏形态。", note: "从个人表达出发 / CREATOR FIRST" },
        { number: "02", label: "ART TAKES FORM.", title: ["把作品，做成", "值得收藏的实物。"], copy: "完整铺开的玻璃画面，排列成章的键帽，金属的轮廓与质感。我们希望与创作者一起，让每种材质成为作品的一次重新表达。", note: "从画面到物件 / ART INTO OBJECTS" },
        { number: "03", label: "LIVE WITH YOUR COLLECTION.", title: ["让收藏，", "进入你的日常。"], copy: "为一个角色、一种画风、一份共鸣而收藏。把你认同的世界留在桌面，让每次游戏与创作，都有它的陪伴。", note: "因热爱而收藏 / MADE PERSONAL" },
      ],
      artistTitle: ["创作者的", "独特宇宙"], artistTopics: ["角色", "风格", "故事"], artistNote: "原点，是独一无二的表达。", artistCaption: "视觉研究 / 个人表达",
      materialNames: ["玻璃", "键帽", "金属"], materialCaption: "同一个创作世界，不同的呈现方式。",
      collectorLabel: "KAGURA / 收藏笔记", collectorTitle: ["为你", "热爱的", "世界。"], collectorCopy: ["为热爱留下位置。", "也为新的故事留下位置。"],
      collectorTags: "艺术 × 游戏 × 日常", collectorCaption: "你的收藏，你的视角。", bottomLine: "想象。共创。收藏。", nextChapter: "下一个章节",
    },
    creators: {
      label: "KAGURA 画师共创计划", title: ["下一件值得收藏的作品，", "也许来自", "你的世界。"], status: "首批画师共创计划 · 筹备中",
      invitation: ["致独立创作者的", "一份邀请"], posterCopy: ["独立画师 / 原创角色 / 个人 IP", "从任何一座城市，带来属于你的世界。"], posterFoot: "共创，从你的表达开始。",
      principles: [
        { number: "01", label: "CREATOR FIRST", title: "让创作者被看见。", copy: "我们希望每次合作都保留清晰的画师署名，呈现个人 IP 的故事与表达。" },
        { number: "02", label: "CREATED TOGETHER", title: "共同创作完整的系列。", copy: "从主题、构图到材质和实物呈现，与创作者一起打磨作品走出画布后的样子。" },
        { number: "03", label: "LIMITED, WITH CLARITY", title: "让限量有清楚的依据。", copy: "限定作品计划在正式发售前公开版数与再版规则。当前展示为设计研究，尚未发售。" },
      ],
      cta: "聊聊你的作品", ctaNote: "开启一段共创对话", mailSubject: "KAGURA 画师共创合作", mailBody: "你好 KAGURA，\n\n我的称呼：\n作品集或个人 IP 链接：\n希望合作的方向：\n联系方式：\n",
      disclaimer: "共创方式、授权范围与作品发行方案将在具体合作中确认。当前概念图用于表达设计方向，尚未公布合作画师名单。",
    },
    discover: {
      label: "探索作品的不同形态", copy: ["同一份热爱，可以有不同的收藏形态。", "选择一个入口，走近正在成形的作品。"],
      categories: [
        { title: "玻璃鼠标垫", aria: "探索玻璃鼠标垫", alt: "恶灵玻璃鼠标垫设计研究", label: "01 / 为你的世界铺开画布", copy: "完整铺开一个世界。" },
        { title: "键帽", aria: "探索键帽", alt: "蕾娜角色图案跨独立键帽印刷的设计概念", label: "02 / 指尖之上的艺术", copy: "让画面经过每一次敲击。", status: "设计研究中" },
        { title: "金属客制化", aria: "探索金属客制化", alt: "", label: "03 / 让存在更有分量", copy: "让轮廓拥有重量。", status: "未来作品计划" },
      ],
      collections: ["基础系列", "画师系列", "专辑封面系列"],
    },
    closing: { label: "这个世界，才刚刚开始。", title: ["你的热爱，", "也是这个世界的一部分。"], link: "认识 KAGURA" },
  },
  en: {
    lang: "en",
    hero: {
      topline: "ART. ORIGINAL WORLDS. COLLECTIBLE OBJECTS.", stamp: "KAGURA / A WORLD IN THE MAKING",
      eyebrow: "For collectors of anime, gaming and street culture",
      title: ["An artist’s world.", "A place in your collection."],
      description: ["Original characters and ideas, imagined as limited-edition objects.", "We’re shaping a KAGURA built around artists, players and the worlds they love."],
      storyAction: "Step into our world", creatorAction: "Artist collaborations",
      collageAria: "KAGURA artwork and collectible design studies", coordinates: "ARTWORK → OBJECT → COLLECTION",
      wraithAlt: "Wraith visual study with an icy blue palette and architectural setting", reynaAlt: "Reyna album-cover portrait study in red and violet-blue",
      keycapsAlt: "Reyna keycap concept with artwork spanning the full keyboard", visualStudy: "01 / VISUAL STUDY", coverStudy: "02 / COVER STUDY",
      keysCaption: "ART, IN ANOTHER FORM.", storyStart: "THE STORY BEGINS HERE", disclaimer: "Images show visual and product studies, not released artist collaborations.",
      bottomLine: "INDEPENDENT WORLDS / SHARED PASSION",
    },
    manifesto: {
      label: "WHY KAGURA EXISTS", title: ["Some worlds deserve", "a place ", "beyond the screen."],
      paragraphs: ["Sometimes a character feels familiar before we know why. Sometimes a piece of art says exactly what we can’t. We collect to keep that connection close. That’s where KAGURA begins.", "We hope to collaborate with independent artists and original IP creators across China, exploring limited-edition art through glass mousepads, keycaps and custom metal objects. New forms for an artist’s vision. New ways to make a collection your own."],
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
      collectorLabel: "KAGURA / COLLECTION NOTES", collectorTitle: ["FOR THE", "WORLDS", "YOU LOVE."], collectorCopy: ["Room for what you love.", "Room for the next story."],
      collectorTags: "ART × PLAY × EVERYDAY", collectorCaption: "YOUR COLLECTION. YOUR POINT OF VIEW.", bottomLine: "IMAGINE. CREATE. COLLECT.", nextChapter: "THE NEXT CHAPTER",
    },
    creators: {
      label: "KAGURA ARTIST COLLABORATIONS", title: ["Your world could inspire", "our next ", "collectible."], status: "First artist collaboration programme · In development",
      invitation: ["AN INVITATION TO", "INDEPENDENT CREATORS"], posterCopy: ["Independent artists / Original characters / Creator-owned IP", "Wherever you create, bring a world that is yours."], posterFoot: "THE COLLABORATION STARTS WITH YOU.",
      principles: [
        { number: "01", label: "CREATOR FIRST", title: "Keep the artist in the picture.", copy: "Our aim is to clearly credit every collaborating artist and share the ideas and stories behind their original work." },
        { number: "02", label: "CREATED TOGETHER", title: "Build a collection together.", copy: "Theme, composition, material and finish: we want to shape the full expression of a collection with its creator, from artwork to physical object." },
        { number: "03", label: "LIMITED, WITH CLARITY", title: "Make the edition clear.", copy: "We plan to publish edition sizes and reissue policies before each limited release. Current images are design studies; no editions are on sale yet." },
      ],
      cta: "Tell us about your work", ctaNote: "START A CONVERSATION", mailSubject: "KAGURA artist collaboration enquiry", mailBody: "Hello KAGURA,\n\nMy name:\nPortfolio or original IP link:\nWhat I’d like to create together:\nContact details:\n",
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
    closing: { label: "THIS WORLD IS ONLY JUST BEGINNING.", title: ["What you love", "belongs here, too."], link: "Meet KAGURA" },
  },
  ja: {
    lang: "ja",
    hero: {
      topline: "アート。オリジナル IP。コレクション。", stamp: "KAGURA / ここから広がる世界",
      eyebrow: "アニメ、ゲーム、ストリートカルチャーを愛する人へ",
      title: ["作家が描く世界を、", "あなたのコレクションへ。"],
      description: ["オリジナル IP の想像力を、手に取れる限定作品へ。", "作家とプレイヤーの「好き」が交わる、新しいコレクションを準備しています。"],
      storyAction: "KAGURA の世界へ", creatorAction: "作家との共創について",
      collageAria: "KAGURA のアートワークとコレクションのデザインスタディ", coordinates: "アートワーク → プロダクト → コレクション",
      wraithAlt: "冷たいブルーの色調と空間構成で描いたレイスのビジュアルスタディ", reynaAlt: "赤と青紫で描いたレイナのアルバムカバー風ポートレート",
      keycapsAlt: "レイナのイラストをキーボード全体に連続して配したキーキャップのコンセプト", visualStudy: "01 / ビジュアルスタディ", coverStudy: "02 / カバースタディ",
      keysCaption: "作品に、もうひとつのかたちを。", storyStart: "物語は、ここから", disclaimer: "掲載画像はビジュアルと製品のコンセプトです。発売済みの作家コラボレーションではありません。",
      bottomLine: "それぞれの世界 / つながる「好き」",
    },
    manifesto: {
      label: "KAGURA の原点", title: ["心を動かされた世界を、", "手に取れる", "かたちに。"],
      paragraphs: ["好きなキャラクターに、自分を重ねる。心に響いた作品を、いつまでもそばに置いておきたくなる。KAGURA の出発点は、そんな気持ちです。", "中国各地の独立した作家やオリジナル IP のクリエイターとともに、ガラス製マウスパッド、キーキャップ、メタルカスタムを通じた限定アートコレクションを構想しています。作品には新しい表現の場を。プレイヤーには、自分らしく集める楽しさを。"],
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
      collectorLabel: "KAGURA / コレクションノート", collectorTitle: ["あなたが", "愛する", "世界へ。"], collectorCopy: ["好きなものを置く場所を。", "次の物語を迎える余白を。"],
      collectorTags: "アート × ゲーム × 日常", collectorCaption: "あなたのコレクション。あなたの視点。", bottomLine: "想像する。ともにつくる。集める。", nextChapter: "次の章へ",
    },
    creators: {
      label: "KAGURA クリエイター・コラボレーション", title: ["次に手元に迎えたくなる作品は、", "あなたの", "世界から。"], status: "初回コラボレーション企画 · 準備中",
      invitation: ["独自の世界を描く", "クリエイターへ"], posterCopy: ["イラストレーター / オリジナルキャラクター / 作家発の IP", "どの街からでも。あなたならではの世界を。"], posterFoot: "共創は、あなたの表現からはじまります。",
      principles: [
        { number: "01", label: "CREATOR FIRST", title: "作品とともに、作家を伝える。", copy: "コラボレーションでは作家名を明記し、オリジナル IP に込めた物語や表現も丁寧に伝えていきたいと考えています。" },
        { number: "02", label: "CREATED TOGETHER", title: "シリーズ全体を、ともにつくる。", copy: "テーマや構図から素材、実物の仕上がりまで。絵が画面を離れたときの姿を、作家と一緒に考え、磨いていきます。" },
        { number: "03", label: "LIMITED, WITH CLARITY", title: "限定のかたちを、明確に。", copy: "限定作品は、発売前にエディション数と再販方針を公開する予定です。現在の掲載内容はデザインスタディで、まだ販売していません。" },
      ],
      cta: "あなたの作品を教えてください", ctaNote: "コラボレーションのお問い合わせ", mailSubject: "KAGURA 作家コラボレーションについて", mailBody: "KAGURA ご担当者様\n\nお名前／作家名：\nポートフォリオ・オリジナル IP の URL：\n希望するコラボレーションの内容：\nご連絡先：\n",
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
    closing: { label: "この世界は、まだはじまったばかり。", title: ["あなたの「好き」も、", "この世界の一部になる。"], link: "KAGURA について" },
  },
};
