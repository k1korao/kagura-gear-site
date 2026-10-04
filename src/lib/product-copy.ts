import type { Locale } from "@/lib/locale";

export const coverEditions = [
  { id: "reyna", name: "Starplayer.", title: "STARPLAYER.", color: "#ab4548" },
  { id: "wraith", name: "Void FM.", title: "VOID FM.", color: "#3e5b94" },
  { id: "chemist", name: "The Chemist.", title: "THE CHEMIST.", color: "#7c8349" },
  { id: "seer", name: "Golden Hour.", title: "GOLDEN HOUR.", color: "#ae7037" },
  { id: "dwolf", name: "Redline.", title: "REDLINE.", color: "#a33031" },
  { id: "vyron", name: "Afterburn.", title: "AFTERBURN.", color: "#566978" },
  { id: "hackclaw", name: "Night Signal.", title: "NIGHT SIGNAL.", color: "#827085" },
] as const;

const en = {
  categories: { glass: "Glass mousepads", keycaps: "Keycaps", metal: "Metal customs" },
  editionNames: ["Starplayer.", "Void FM.", "The Chemist.", "Golden Hour.", "Redline.", "Afterburn.", "Night Signal."],
  collections: [
    { name: "Core glass", caption: "THE ESSENTIALS", description: "A quiet surface. A clear point of view. Our essential glass mousepad direction, designed around the way you play." },
    { name: "Artist editions", caption: "A CANVAS FOR COLLABORATION", description: "A space for future artist and IP collaborations. This original studio study explores what could come next; collaborations are still to be announced." },
    { name: "Cover series", caption: "MUSIC, REIMAGINED", description: "Game worlds meet the visual language of records. One artwork per edition, in a collection of character and album-inspired design studies." },
  ],
  experience: {
    explore: "Explore", allCollections: "ALL COLLECTIONS", glassCollections: "Glass mousepad collections", coverSeries: "01 / THE COVER SERIES", futureObjects: "01 / FUTURE OBJECTS",
    viewer: "Glass mousepad 3D desk. Click a neighbouring pad, or use the left and right arrow keys to change collection.", conceptVisualization: "concept visualization",
    keyTitle: "Starplayer / Keys", keyKicker: "THE KEYCAP COLLECTION", metalKicker: "A NEW MATERIAL LANGUAGE", keyConcept: "Keycap concept", futureCollection: "Future collection", developing: "In development",
    format: "DESIGN FORMAT", series: "SERIES", palette: "PALETTE", colors: "Crimson / Violet", coverNumber: "Cover / 01", formStudy: "FORM STUDY — 001",
    keyDescription: "Reyna, remixed. Red and violet album-cover energy flows across a field of individual keys. A companion concept to the Starplayer glass edition.",
    metalDescription: "Exploring sculptural forms and precise details for future custom metal objects. The first collection is on the drawing board.",
    chooseArt: "Choose cover artwork", more: "see more", release: "Get release updates", artistNote: "Studio concept. Artist collaborations to be announced.", conceptNote: "Design preview. Final product details to be announced.",
    viewingAngle: "Viewing angle", deskView: "DESK VIEW", topView: "TOP VIEW", designStudy: "KAGURA / DESIGN STUDY", previous: "Previous glass collection", next: "Next glass collection", of: "of",
    help: "CLICK A PAD TO EXPLORE", unavailable: "CONCEPT / NOT YET AVAILABLE", withinGlass: "WITHIN THE GLASS COLLECTION", coverTitle: "One cover. One edition.", coverSubtitle: "Character and album-inspired artwork studies.",
    coverNote: "Independent concept artwork. No official game or recording-artist collaboration is implied.",
    keyAlt: "KAGURA Reyna keycap concept: red and violet character artwork flowing across individual keycaps on a silver-gray keyboard",
  },
  concepts: {
    core: {
      title: "Core glass", index: "01 / GLASS — CORE", tagline: "A clear starting point. Quiet by design.", asideTitle: "Focus on the essentials.", description: "A restrained direction for the KAGURA glass mousepad. Form, proportion, and a clear visual identity.",
      storyTitle: "Room for what matters.", story: "Core explores the simplest expression of a glass mousepad: a quiet surface and an intentional presence on the desk. The shape shown is a design study; construction and final specifications remain in development.",
      caption: "Core / form study", question: "What defines the Core direction?", answer: "Core explores a restrained visual design. The charcoal finish shown is a concept; final finish and construction are still to be confirmed.",
    },
    artist: {
      title: "Artist editions", index: "01 / GLASS — ARTIST", tagline: "A different perspective, made part of your desk.", asideTitle: "Make room for expression.", description: "Original visual studies exploring color, composition, and the surface of a glass mousepad.",
      storyTitle: "The surface as a canvas.", story: "Artist editions explores expressive artwork as part of an everyday object. The blue composition shown is an original abstract study. Final editions, participating artists, and product specifications have not been announced.",
      caption: "Artist / abstract study", question: "Is this an announced artist collaboration?", answer: "This is an original abstract design study for the Artist direction. No specific artist collaboration or final edition has been announced.",
    },
    covers: {
      title: "Cover series", index: "01 / GLASS — COVERS", tagline: "One artwork. One edition. A new way to set the tone.", asideTitle: "Set your own tone.", description: "Album-inspired visual editions for your desk. One artwork at a time.",
      storyTitle: "A surface with its own sound.", story: "Each Cover series mousepad is conceived as its own edition: one artwork, one visual identity. Music and album design guide the atmosphere, while final artwork and production specifications are still in development.",
      caption: "Covers / artwork study", question: "What does a Cover edition mean?", answer: "One artwork defines each edition. The direction draws on music and album visuals; the artwork shown here is a concept study, not an announced official collaboration.",
    },
    keycaps: {
      title: "Keycaps", index: "02 / KEYCAPS", tagline: "Reyna. Red light. A different kind of record.", asideTitle: "A new point of contact.", description: "Character art, reimagined across individual keycaps. A visual companion to the Starplayer glass edition.",
      storyTitle: "One artwork. Across every key.", story: "The Cover series brings the atmosphere of a record sleeve to your keyboard. Reyna artwork is composed across individual keycap tops, framed by charcoal modifiers. This is an independent character remix concept, with no official collaboration implied. Materials, printing methods, profiles, and compatibility are still to be confirmed.",
      caption: "Keycaps / printed artwork study", question: "Which keyboards will the keycaps fit?", answer: "Layout compatibility, keycap profile, and kit contents have not been announced. The image illustrates a design direction rather than a final kit.",
    },
    metal: {
      title: "Metal customs", index: "03 / METAL CUSTOMS", tagline: "An exploration of geometry, weight, and detail.", asideTitle: "A future in the details.", description: "Custom metal objects are a future direction for KAGURA. This keycap form is an early geometric study.",
      storyTitle: "A small object. A strong presence.", story: "Metal customs is a future product direction exploring sculptural shapes and individual details for the desk. The keycap shape shown is a concept. Material grades, finishes, manufacturing processes, compatibility, and timing have not been confirmed.",
      caption: "Metal / geometric study", question: "Is this metal keycap available?", answer: "Metal customs is a future plan. This geometric keycap is a form study; specifications, availability, and pricing have not been announced.",
    },
  },
  details: {
    tabs: { specs: "Specs", story: "Story", faq: "FAQ" }, category: "Category", collection: "Collection", edition: "Edition", dimensions: "Design dimensions", thickness: "Thickness", surface: "Surface & base", status: "Status", tbc: "To be confirmed", future: "Future plan",
    direction: "Direction", preview: "Preview", geometric: "Geometric keycap form study", materialsFinish: "Materials & finish", compatibility: "Compatibility", palette: "Palette study", colors: "Crimson / Violet / Charcoal", materialsProcess: "Materials & process", profileKit: "Profile & kit",
    notes: "KAGURA / Product notes", close: "Close", closeLabel: "Close product details", designDimensions: "490 × 420 mm design", designConcept: "Design concept", specsTbc: "Specifications to be confirmed", conceptDeveloping: "Concept / In development", layoutTbc: "Layout and profile to be confirmed", information: "information",
    metalLead: "An early look at what comes next.", lead: "The details are in development.", specNote: "Final specifications, pricing, and release timing will be shared as development progresses.", signoff: "KAGURA / Objects for your everyday.",
    confirmedQuestion: "What are the confirmed specifications?", glassAnswer: "The design dimensions are 490 × 420 mm. Glass thickness, surface finish, and base construction are still to be confirmed.", otherAnswer: "The current preview communicates a design direction. Final materials, dimensions, construction, and compatibility have not been announced.",
    releaseQuestion: "How can I hear about the release?", releaseMetal: "Metal customs is a future plan.", releaseDeveloping: "This product direction is in development.", releaseBefore: " Pricing and release timing have not been announced. Visit the ", newsletter: "release newsletter", releaseAfter: " for future updates.",
    overview: "Product overview", releaseNote: "Specs to be confirmed. Release details to come.", footer1: "Your desk.", footer2: "Your own expression.",
  },
  artwork: [
    { caption: "REYNA / CHARACTER REMIX CONCEPT 001", alt: "Reyna fan art in violet light against a vivid red album-cover background" },
    { caption: "WRAITH / CHARACTER REMIX CONCEPT 002", alt: "Wraith fan art in a cold blue science-fiction album-cover composition" },
    { caption: "CAUSTIC / CINEMATIC REMIX CONCEPT 003", alt: "Caustic in an industrial warehouse with olive-green barrels and warm cinematic backlight" },
    { caption: "SEER / CHARACTER REMIX CONCEPT 004", alt: "Golden Hour: Seer-inspired portrait in copper-orange, gold and deep navy album-cover tones" },
    { caption: "D-WOLF / CHARACTER REMIX CONCEPT 005", alt: "Redline: D-Wolf-inspired character art with a red album-cover palette" },
    { caption: "VYRON / CHARACTER REMIX CONCEPT 006", alt: "Afterburn: Vyron-inspired character art in a cinematic album-cover composition" },
    { caption: "HACKCLAW / CHARACTER REMIX CONCEPT 007", alt: "Night Signal: Hackclaw-inspired character art in a nocturnal album-cover composition" },
  ],
  sound: {
    unavailable: "Music is not connected yet. View track information", startingLabel: "Sound on, starting. Turn sound off", onLabel: "Sound on. Turn sound off", offLabel: "Sound off. Turn sound on", on: "SOUND ON", off: "SOUND OFF", settings: "Music volume and track information", heading: "LISTEN ALONG", close: "Close music settings", trackPending: "A soundtrack for the collection", volume: "Volume", percent: "percent", error: "Audio couldn’t start. Try again.", retry: "Retry audio", starting: "Starting audio…", playing: "Playing. Close this panel to keep listening.", stopped: "Sound is off. Play when you feel like it.", noSource: "Our background track is being selected. No audio is connected yet.",
  },
  metadata: {
    glass: "Explore KAGURA glass mousepads: Core, Artist, and Cover series. Independent design studies in a planned 490 × 420 mm format.",
    keycaps: "Explore KAGURA keycap concepts. Character art and album-inspired compositions, reimagined across the keyboard.",
    metal: "Explore KAGURA’s future direction for custom metal objects. Early studies in geometry, form, and detail.",
  },
};

const zh: typeof en = {
  categories: { glass: "玻璃鼠标垫", keycaps: "键帽", metal: "金属客制化" },
  editionNames: ["明星玩家", "虚空电台", "化学家", "鎏金时刻", "红线", "余焰", "夜间信号"],
  collections: [
    { name: "Core 基础系列", caption: "回归纯粹", description: "让桌面安静下来，让注意力回到游戏。Core 从简洁的形态出发，探索玻璃鼠标垫最纯粹的样子。" },
    { name: "Artist 画师系列", caption: "为创作留一块空间", description: "为未来的画师与 IP 合作预留的系列。眼前这幅原创抽象作品，是我们对色彩与构图的一次尝试；具体合作尚未公布。" },
    { name: "Cover 专辑封面系列", caption: "把音乐的视觉，放上桌面", description: "让游戏角色走进唱片封面的世界。每幅作品独立成款，以角色与专辑视觉为灵感，探索属于桌面的另一种表达。" },
  ],
  experience: {
    explore: "探索", allCollections: "全部系列", glassCollections: "玻璃鼠标垫系列", coverSeries: "01 / 封面系列", futureObjects: "01 / 未来企划",
    viewer: "玻璃鼠标垫三维桌面。点击旁边的鼠标垫，或使用键盘左右方向键切换系列。", conceptVisualization: "概念效果图",
    keyTitle: "明星玩家 / 键帽", keyKicker: "键帽系列", metalKicker: "探索金属的另一种表达", keyConcept: "键帽概念", futureCollection: "未来企划", developing: "开发中",
    format: "设计尺寸", series: "系列", palette: "概念配色", colors: "绯红 / 紫罗兰", coverNumber: "封面 / 01", formStudy: "造型研究 — 001",
    keyDescription: "以蕾娜为主角，让红与紫的专辑封面画面铺展在每颗键帽之间。与「明星玩家」玻璃垫呼应的键帽设计概念。",
    metalDescription: "从雕塑感的形态与细节出发，探索未来的定制金属物件。首个系列仍在构思中。",
    chooseArt: "选择封面作品", more: "了解详情", release: "订阅发售动态", artistNote: "原创概念预览。画师合作信息将另行公布。", conceptNote: "设计概念预览，最终产品信息待公布。",
    viewingAngle: "查看角度", deskView: "桌面视角", topView: "俯视角度", designStudy: "KAGURA / 设计研究", previous: "上一个玻璃垫系列", next: "下一个玻璃垫系列", of: "/",
    help: "点击鼠标垫，探索系列", unavailable: "概念预览 / 尚未发售", withinGlass: "玻璃鼠标垫 · 封面系列", coverTitle: "一幅封面，一款作品。", coverSubtitle: "从角色与专辑视觉中，寻找新的表达。",
    coverNote: "独立二创概念设计，不代表与游戏方或音乐人的官方联名。",
    keyAlt: "KAGURA 蕾娜键帽概念：红紫色角色画面连续铺展在银灰色键盘的独立键帽上",
  },
  concepts: {
    core: {
      title: "Core 基础系列", index: "01 / 玻璃鼠标垫 — CORE", tagline: "从简洁出发，为专注留白。", asideTitle: "把注意力留给真正重要的事。", description: "简洁的形态、恰好的比例、清晰的视觉。KAGURA 对基础玻璃鼠标垫的设计探索。",
      storyTitle: "桌面上的一块留白。", story: "Core 探索玻璃鼠标垫最简洁的表达：安静的表面，有分寸的存在感。当前展示为造型概念，产品结构与最终规格仍在开发中。",
      caption: "Core / 造型研究", question: "Core 系列的设计方向是什么？", answer: "Core 以克制、简洁的视觉为出发点。目前展示的炭黑表面是概念效果，最终表面处理与结构尚待确认。",
    },
    artist: {
      title: "Artist 画师系列", index: "01 / 玻璃鼠标垫 — ARTIST", tagline: "让另一种视角，成为桌面的一部分。", asideTitle: "为表达留出空间。", description: "以玻璃鼠标垫为画布，探索色彩、构图与原创视觉。",
      storyTitle: "让表面成为画布。", story: "Artist 系列尝试将艺术表达带入日常物件。画面中的蓝色构图为原创抽象设计研究，最终款式、合作画师与产品规格尚未公布。",
      caption: "Artist / 抽象视觉研究", question: "这是已经公布的画师联名吗？", answer: "目前展示的是 Artist 方向的原创抽象概念设计。具体画师合作及最终款式尚未公布。",
    },
    covers: {
      title: "Cover 专辑封面系列", index: "01 / 玻璃鼠标垫 — COVERS", tagline: "一幅作品，一款设计，为桌面定下自己的基调。", asideTitle: "桌面的氛围，由你来定。", description: "从唱片封面汲取灵感，让每一幅作品成为独立的桌面表达。",
      storyTitle: "让画面，有自己的声音。", story: "Cover 系列以一幅作品对应一款设计：每一款都有独立的画面与视觉个性。音乐和专辑设计构成灵感来源，最终图案与生产规格仍在开发中。",
      caption: "Covers / 封面视觉研究", question: "Cover 系列每一款有什么区别？", answer: "每款以一幅独立作品为核心，灵感来自音乐与专辑视觉。目前展示的是概念设计，尚未公布任何官方联名。",
    },
    keycaps: {
      title: "键帽", index: "02 / 键帽", tagline: "蕾娜、红色光线，以及另一种唱片封面。", asideTitle: "让每一次触碰，都有自己的表达。", description: "将角色画面重新编排在独立键帽上，与「明星玩家」玻璃垫形成视觉呼应。",
      storyTitle: "一幅画面，延伸到每一颗键。", story: "Cover 系列将唱片封面的氛围带到键盘上。蕾娜画面贯穿独立键帽的顶面，搭配炭黑色功能键。这是独立角色二创概念，不代表官方联名。材质、印刷工艺、键帽高度与适配范围尚待确认。",
      caption: "键帽 / 图案印刷概念", question: "这套键帽适配哪些键盘？", answer: "适配配列、键帽高度与套装内容尚未公布。当前图片用于展示设计方向，并非最终套装。",
    },
    metal: {
      title: "金属客制化", index: "03 / 金属客制化", tagline: "探索几何形态、重量与细节。", asideTitle: "从细节，想象未来。", description: "定制金属物件是 KAGURA 的未来方向。当前键帽造型为早期几何形态研究。",
      storyTitle: "小物件，也有鲜明的存在感。", story: "金属客制化是未来产品企划，尝试以雕塑感的形态和细节丰富桌面。当前展示的键帽为概念造型，材料牌号、表面处理、制造工艺、适配范围与上市时间均未确定。",
      caption: "金属 / 几何造型研究", question: "这颗金属键帽可以购买了吗？", answer: "金属客制化仍属未来企划。当前几何键帽仅为造型研究，规格、发售安排与价格尚未公布。",
    },
  },
  details: {
    tabs: { specs: "规格", story: "设计理念", faq: "常见问题" }, category: "品类", collection: "系列", edition: "款式", dimensions: "设计尺寸", thickness: "厚度", surface: "表面与底部结构", status: "进度", tbc: "待确认", future: "未来企划",
    direction: "产品方向", preview: "预览内容", geometric: "几何键帽造型研究", materialsFinish: "材质与表面处理", compatibility: "适配范围", palette: "概念配色", colors: "绯红 / 紫罗兰 / 炭黑", materialsProcess: "材质与工艺", profileKit: "键帽高度与套装",
    notes: "KAGURA / 产品手记", close: "关闭", closeLabel: "关闭产品详情", designDimensions: "设计尺寸 490 × 420 mm", designConcept: "设计概念", specsTbc: "最终规格待确认", conceptDeveloping: "概念设计 / 开发中", layoutTbc: "配列与键帽高度待确认", information: "详情",
    metalLead: "提前看看，我们正在构思什么。", lead: "产品细节，正在逐步打磨。", specNote: "最终规格、价格与发售时间，将随开发进度陆续公布。", signoff: "KAGURA / 为日常，添一点自己的表达。",
    confirmedQuestion: "目前有哪些已确定的规格？", glassAnswer: "设计尺寸为 490 × 420 mm。玻璃厚度、表面处理与底部结构尚待确认。", otherAnswer: "当前预览用于呈现设计方向。最终材质、尺寸、结构与适配范围尚未公布。",
    releaseQuestion: "如何获得发售消息？", releaseMetal: "金属客制化仍属未来企划。", releaseDeveloping: "该产品方向正在开发中。", releaseBefore: "价格与发售时间尚未公布。可前往", newsletter: "发售动态订阅", releaseAfter: "，关注后续消息。",
    overview: "产品概览", releaseNote: "最终规格待确认，发售信息将另行公布。", footer1: "你的桌面，", footer2: "你的表达。",
  },
  artwork: [
    { caption: "蕾娜 / 角色二创概念 001", alt: "紫色光线中的蕾娜角色二创，背景为鲜红色专辑封面构图" },
    { caption: "恶灵 / 角色二创概念 002", alt: "以冷蓝色科幻专辑封面构图呈现的恶灵角色二创" },
    { caption: "侵蚀 / 电影感二创概念 003", alt: "工业仓库中的侵蚀，周围有橄榄绿色桶与暖色电影感逆光" },
    { caption: "希尔 / 角色二创概念 004", alt: "鎏金时刻：以希尔为灵感的铜橙、金色与海军蓝专辑封面概念" },
    { caption: "红狼 / 角色二创概念 005", alt: "红线：以红狼为灵感的红色专辑封面概念" },
    { caption: "威龙 / 角色二创概念 006", alt: "余焰：以威龙为灵感的电影感专辑封面概念" },
    { caption: "麦晓雯（骇爪）/ 角色二创概念 007", alt: "夜间信号：以麦晓雯（骇爪）为灵感的夜色专辑封面概念" },
  ],
  sound: {
    unavailable: "音乐尚未接入，查看说明", startingLabel: "音乐正在加载，点击关闭", onLabel: "音乐已开启，点击关闭", offLabel: "音乐已关闭，点击开启", on: "音乐 开", off: "音乐 关", settings: "音量与曲目信息", heading: "给桌面一点声音", close: "关闭音乐设置", trackPending: "属于这个系列的背景音乐", volume: "音量", percent: "%", error: "暂时无法播放，请重试。", retry: "重新播放", starting: "正在加载音乐…", playing: "音乐播放中，关闭面板后也会继续播放。", stopped: "音乐已关闭，想听的时候再打开。", noSource: "背景音乐正在挑选中，当前尚未接入音源。",
  },
  metadata: {
    glass: "探索 KAGURA 玻璃鼠标垫：Core 基础、Artist 艺术与 Cover 专辑封面系列。以 490 × 420 mm 为设计尺寸的独立概念设计。",
    keycaps: "探索 KAGURA 键帽概念。以角色与专辑封面为灵感，让完整画面延伸到每一颗键。",
    metal: "探索 KAGURA 金属客制化的未来企划，从几何形态、造型与细节开始。",
  },
};

const ja: typeof en = {
  categories: { glass: "ガラスマウスパッド", keycaps: "キーキャップ", metal: "メタルカスタム" },
  editionNames: ["スタープレイヤー", "虚空ラジオ", "ケミスト", "ゴールデンアワー", "レッドライン", "残り火", "夜のシグナル"],
  collections: [
    { name: "Core シリーズ", caption: "シンプルを、突き詰める", description: "デスクには余白を、プレイには集中を。Core は、ガラスマウスパッドのシンプルなかたちを探るシリーズです。" },
    { name: "Artist シリーズ", caption: "表現が広がる、一枚のキャンバス", description: "これからのアーティストや IP とのコラボレーションに向けたシリーズ。現在のビジュアルは、色と構図の可能性を探るオリジナルのコンセプトです。具体的なコラボレーションは未発表です。" },
    { name: "Cover シリーズ", caption: "音楽の空気を、デスクに", description: "ゲームの世界と、レコードジャケットの表現が出会う。一枚のアートワークを一つのエディションに仕立てる、キャラクターと音楽から生まれたデザインスタディです。" },
  ],
  experience: {
    explore: "コレクションを見る：", allCollections: "すべてのコレクション", glassCollections: "ガラスマウスパッドのシリーズ", coverSeries: "01 / COVER シリーズ", futureObjects: "01 / これからのプロダクト",
    viewer: "ガラスマウスパッドの 3D プレビュー。隣のパッドをクリックするか、左右の矢印キーでシリーズを切り替えられます。", conceptVisualization: "のコンセプトビジュアル",
    keyTitle: "スタープレイヤー / キーキャップ", keyKicker: "キーキャップコレクション", metalKicker: "金属で探る、新しい表現", keyConcept: "キーキャップのコンセプト", futureCollection: "今後の企画", developing: "開発中",
    format: "デザイン寸法", series: "シリーズ", palette: "カラースタディ", colors: "クリムゾン / バイオレット", coverNumber: "Cover / 01", formStudy: "フォルムスタディ — 001",
    keyDescription: "レイナを、レコードジャケットのように。赤と紫のアートワークが、一つひとつのキーに広がります。「スタープレイヤー」のガラスエディションと響き合うキーキャップのコンセプトです。",
    metalDescription: "彫刻のようなかたちと、細部の仕上げから考えるメタルプロダクト。最初のコレクションは、まだ構想の段階です。",
    chooseArt: "カバーアートを選ぶ", more: "詳しく見る", release: "発売情報を受け取る", artistNote: "オリジナルのコンセプトです。アーティストとのコラボレーションは今後発表予定。", conceptNote: "デザインのプレビューです。製品の最終仕様は後日お知らせします。",
    viewingAngle: "表示アングル", deskView: "デスクビュー", topView: "真上から見る", designStudy: "KAGURA / デザインスタディ", previous: "前のガラスシリーズへ", next: "次のガラスシリーズへ", of: "/",
    help: "パッドをクリックして切り替え", unavailable: "コンセプト / 発売前", withinGlass: "ガラスマウスパッド · COVER シリーズ", coverTitle: "一枚のアートから、一つのエディションへ。", coverSubtitle: "キャラクターとレコードジャケットに着想を得たアートワーク。",
    coverNote: "自主制作の二次創作コンセプトです。ゲームや音楽アーティストとの公式コラボレーションではありません。",
    keyAlt: "シルバーグレーのキーボードに、赤と紫のレイナのアートワークがキーをまたいで広がる KAGURA キーキャップのコンセプト",
  },
  concepts: {
    core: {
      title: "Core シリーズ", index: "01 / ガラスマウスパッド — CORE", tagline: "シンプルなかたちから、静かな存在感を。", asideTitle: "大切なことに、集中できるように。", description: "かたち、バランス、そして一目で伝わる個性。KAGURA が考える、シンプルなガラスマウスパッドです。",
      storyTitle: "デスクに、余白を。", story: "Core が目指すのは、ガラスマウスパッドの最もシンプルな表現。落ち着いた表面と、デスクに自然になじむ佇まいを探っています。表示しているのはデザインスタディで、構造と最終仕様は開発中です。",
      caption: "Core / フォルムスタディ", question: "Core はどのようなシリーズですか？", answer: "余計な要素を抑えた、シンプルなビジュアルを探るシリーズです。表示しているチャコールの表面はコンセプトで、最終的な仕上げと構造は未定です。",
    },
    artist: {
      title: "Artist シリーズ", index: "01 / ガラスマウスパッド — ARTIST", tagline: "いつものデスクに、新しい視点を。", asideTitle: "自分らしい表現のために。", description: "ガラスマウスパッドをキャンバスに、色や構図を探るオリジナルのビジュアルスタディ。",
      storyTitle: "一枚のパッドを、キャンバスに。", story: "Artist シリーズは、日常の道具にアートの表現を取り入れる試みです。青を基調としたビジュアルは、オリジナルの抽象デザイン。製品化するエディション、参加アーティスト、製品仕様はまだ発表していません。",
      caption: "Artist / 抽象デザインスタディ", question: "発表済みのアーティストコラボですか？", answer: "現在のビジュアルは、Artist シリーズに向けたオリジナルの抽象デザインです。特定のアーティストとのコラボレーションや最終エディションは未発表です。",
    },
    covers: {
      title: "Cover シリーズ", index: "01 / ガラスマウスパッド — COVERS", tagline: "一枚のアートで、デスクの空気が変わる。", asideTitle: "好きなムードを、デスクに。", description: "レコードジャケットに着想を得た、一枚ずつ異なる個性を持つエディション。",
      storyTitle: "音が聞こえてくるような、一枚を。", story: "Cover シリーズは、一つのアートワークから一つのエディションを考えるコレクションです。音楽やアルバムデザインの空気感を手がかりに、独自のビジュアルを探っています。最終アートワークと製造仕様は開発中です。",
      caption: "Covers / アートワークスタディ", question: "Cover の各エディションは何が違いますか？", answer: "それぞれ一つのアートワークを軸に、異なる個性を持たせています。音楽やアルバムのビジュアルから着想を得たコンセプトで、公式コラボレーションの発表ではありません。",
    },
    keycaps: {
      title: "キーキャップ", index: "02 / キーキャップ", tagline: "レイナと赤い光。もう一つのレコードジャケット。", asideTitle: "指先から、自分らしく。", description: "キャラクターのアートワークを、キーの一つひとつに再構成。「スタープレイヤー」のガラスエディションとつながるビジュアルです。",
      storyTitle: "一枚のアートを、すべてのキーへ。", story: "Cover シリーズのレコードジャケットのような空気感を、キーボードにも。レイナのアートワークを各キーのトップに配置し、チャコールの修飾キーで囲んでいます。自主制作の二次創作コンセプトで、公式コラボレーションではありません。素材、印刷方式、プロファイル、対応レイアウトは未定です。",
      caption: "キーキャップ / 印刷デザインのコンセプト", question: "どのキーボードに対応しますか？", answer: "対応レイアウト、キーキャップのプロファイル、セット内容は未発表です。画像はデザインの方向性を示すもので、最終的なセット構成ではありません。",
    },
    metal: {
      title: "メタルカスタム", index: "03 / メタルカスタム", tagline: "かたち、重み、そして細部の探求。", asideTitle: "細部から、これからを考える。", description: "金属のカスタムプロダクトは、KAGURA の今後の企画です。このキーキャップは、幾何学的なかたちを探る初期スタディです。",
      storyTitle: "小さなかたちに、確かな存在感を。", story: "メタルカスタムは、彫刻的なかたちと細かな表現からデスクの道具を考える今後の企画です。表示しているキーキャップはコンセプトモデル。素材の種類、表面仕上げ、製造方法、互換性、発売時期は未定です。",
      caption: "メタル / フォルムスタディ", question: "この金属キーキャップは購入できますか？", answer: "メタルカスタムは今後の企画です。このキーキャップはかたちを検討するためのスタディで、仕様、発売時期、価格はまだ発表していません。",
    },
  },
  details: {
    tabs: { specs: "仕様", story: "デザインについて", faq: "よくある質問" }, category: "カテゴリー", collection: "シリーズ", edition: "エディション", dimensions: "デザイン寸法", thickness: "厚さ", surface: "表面・ベース構造", status: "開発状況", tbc: "未定", future: "今後の企画",
    direction: "製品の方向性", preview: "プレビュー内容", geometric: "幾何学的なキーキャップの造形", materialsFinish: "素材・表面仕上げ", compatibility: "互換性", palette: "カラースタディ", colors: "クリムゾン / バイオレット / チャコール", materialsProcess: "素材・製法", profileKit: "プロファイル・セット内容",
    notes: "KAGURA / プロダクトノート", close: "閉じる", closeLabel: "製品の詳細を閉じる", designDimensions: "デザイン寸法 490 × 420 mm", designConcept: "デザインコンセプト", specsTbc: "最終仕様は未定", conceptDeveloping: "コンセプト / 開発中", layoutTbc: "レイアウト・プロファイルは未定", information: "の詳細",
    metalLead: "これからのプロダクトを、少しだけ。", lead: "細かな仕様は、開発を進めています。", specNote: "最終仕様、価格、発売時期は、開発の進捗に合わせてお知らせします。", signoff: "KAGURA / 日々の道具に、自分らしさを。",
    confirmedQuestion: "現時点で決まっている仕様は？", glassAnswer: "デザイン寸法は 490 × 420 mm です。ガラスの厚さ、表面仕上げ、ベースの構造は未定です。", otherAnswer: "現在のプレビューはデザインの方向性を示しています。最終的な素材、寸法、構造、互換性はまだ発表していません。",
    releaseQuestion: "発売情報はどこで確認できますか？", releaseMetal: "メタルカスタムは今後の企画です。", releaseDeveloping: "現在、開発を進めている製品です。", releaseBefore: "価格と発売時期は未発表です。最新情報は", newsletter: "メールニュースへの登録", releaseAfter: "からお受け取りいただけます。",
    overview: "製品の概要", releaseNote: "最終仕様は未定です。発売情報は後日お知らせします。", footer1: "いつものデスクに、", footer2: "自分らしさを。",
  },
  artwork: [
    { caption: "レイナ / 二次創作コンセプト 001", alt: "鮮やかな赤いレコードジャケット風の背景に、紫の光を浴びたレイナを描いたファンアート" },
    { caption: "レイス / 二次創作コンセプト 002", alt: "冷たい青を基調に、SF のレコードジャケット風に構成したレイスのファンアート" },
    { caption: "コースティック / シネマティックコンセプト 003", alt: "オリーブグリーンのドラム缶が並ぶ倉庫で、暖かな逆光に照らされたコースティック" },
    { caption: "シア / 二次創作コンセプト 004", alt: "ゴールデンアワー：銅色とゴールドを背景に、つばの広い帽子に手を添えるシアのポートレート" },
    { caption: "D-WOLF / 二次創作コンセプト 005", alt: "レッドライン：D-Wolf に着想を得た、赤を基調とするレコードジャケット風のコンセプト" },
    { caption: "VYRON / 二次創作コンセプト 006", alt: "残り火：Vyron に着想を得た、映画のようなレコードジャケット風のコンセプト" },
    { caption: "HACKCLAW / 二次創作コンセプト 007", alt: "夜のシグナル：Hackclaw に着想を得た、夜の空気を描くレコードジャケット風のコンセプト" },
  ],
  sound: {
    unavailable: "音源はまだ設定されていません。詳細を見る", startingLabel: "音楽を読み込み中。音楽をオフにする", onLabel: "音楽はオンです。オフにする", offLabel: "音楽はオフです。オンにする", on: "サウンド ON", off: "サウンド OFF", settings: "音量と楽曲情報", heading: "音楽と一緒に", close: "音楽設定を閉じる", trackPending: "コレクションに合う一曲を", volume: "音量", percent: "パーセント", error: "再生できませんでした。もう一度お試しください。", retry: "もう一度再生", starting: "音楽を読み込み中…", playing: "再生中です。パネルを閉じても音楽は続きます。", stopped: "音楽はオフです。お好きなときに再生してください。", noSource: "BGM を選曲中です。現在、音源はまだ設定されていません。",
  },
  metadata: {
    glass: "KAGURA のガラスマウスパッドを探る。Core、Artist、Cover の各シリーズで展開する、490 × 420 mm を想定したオリジナルのデザインコンセプト。",
    keycaps: "KAGURA のキーキャップコンセプト。キャラクターアートとレコードジャケットの表現を、一つひとつのキーへ。",
    metal: "KAGURA のメタルカスタム。幾何学的なかたちと細部から、これからのデスクプロダクトを考える初期スタディ。",
  },
};

export const productCopy: Record<Locale, typeof en> = { zh, en, ja };
