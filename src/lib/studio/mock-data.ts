export type LocaleMode = "zh-CN" | "en-US";

export type TimelineEntry = {
  id: string;
  day: string;
  type: "dream" | "journal" | "daily" | "session";
  title: string;
  excerpt: string;
  mood: string;
  symbols: string[];
  intensity: number;
  selected?: boolean;
};

export type OracleCardDraft = {
  number: string;
  name: string;
  deck: string;
  cardType: string;
  element: string;
  keywords: string[];
  imageDescription: string;
  composition: string;
  symbols: string[];
  palette: string;
  prompt: string;
  avoid: string;
  upright: string;
  reversed: string;
  story: string;
  sourceSummary: string;
  action: string;
};

export type Project = {
  id: string;
  name: string;
  theme: string;
  lastUpdated: string;
  cards: number;
  records: number;
  privacy: string;
  tags: string[];
};

type StudioData = {
  projects: Project[];
  timelineEntries: TimelineEntry[];
  cardDrafts: OracleCardDraft[];
  weeklyFocusTitle: string;
  weeklySymbols: string[];
  appName: string;
  communityAngle: string;
};

const zhData: StudioData = {
  appName: "月光档案",
  communityAngle: "邀请其他创作者一起讨论这张牌的画面符号与解析方向。",
  weeklyFocusTitle: "Luna · 9月梦境阶段",
  weeklySymbols: ["门", "潮水", "灯", "月光", "旧屋"],
  projects: [
    { id: "luna", name: "Luna · 梦境牌组", theme: "旧屋、潮水、月光与边界", lastUpdated: "9月18日 23:40", cards: 7, records: 18, privacy: "已匿名化", tags: ["梦境", "女性叙事", "神谕卡"] },
    { id: "iris", name: "Iris · 年度疗愈记录", theme: "母女关系、花园与重建", lastUpdated: "9月16日 10:12", cards: 4, records: 11, privacy: "仅自己可见", tags: ["日记", "疗愈", "客户报告"] },
    { id: "atelier", name: "Atelier · 原创神谕设定", theme: "为插画系列整理象征库", lastUpdated: "9月12日 18:05", cards: 12, records: 31, privacy: "创作项目", tags: ["插画", "符号库", "HTML模板"] },
  ],
  timelineEntries: [
    { id: "tide", day: "18", type: "dream", title: "门后的潮汐", excerpt: "梦见旧屋的门缝里有水声，潮水沿着台阶漫上来，但房间里很安静。", mood: "困惑 / 柔软", symbols: ["门", "潮水", "月光", "台阶"], intensity: 82, selected: true },
    { id: "lamp", day: "21", type: "journal", title: "旧屋的灯", excerpt: "她说自己总想把每个人照顾好，像在空房间里留一盏灯。", mood: "牵挂 / 疲惫", symbols: ["灯", "旧屋", "回望"], intensity: 67 },
    { id: "rabbit", day: "25", type: "daily", title: "迟到白兔", excerpt: "一天都在追赶截止时间，反复确认消息，像被看不见的钟推着走。", mood: "急促 / 自责", symbols: ["白兔", "时钟", "车站"], intensity: 74 },
    { id: "garden", day: "02", type: "dream", title: "闭眼花园", excerpt: "闭上眼时看见一座很小的花园，花朵像眼睛一样慢慢张开。", mood: "安静 / 生长", symbols: ["花园", "眼睛", "种子"], intensity: 58 },
    { id: "mirror", day: "09", type: "session", title: "裂镜少女", excerpt: "谈到选择时，她画了一面裂开的镜子，说每一片都像不同版本的自己。", mood: "犹豫 / 清醒", symbols: ["镜面", "双影", "选择"], intensity: 79 },
    { id: "rain", day: "13", type: "journal", title: "雨巷回声", excerpt: "写下一封没有寄出的信，雨声让她意识到自己一直在重复旧对话。", mood: "释然 / 回声", symbols: ["雨", "信", "回声"], intensity: 61 },
  ],
  cardDrafts: [
    {
      number: "07",
      name: "门后的潮汐",
      deck: "Luna 梦境神谕",
      cardType: "神谕卡 / 时间切片牌",
      element: "水 · 月亮",
      keywords: ["边界", "旧记忆", "直觉", "柔软的打开"],
      imageDescription: "一扇半开的旧木门后涌出银色潮水，月光落在浅色台阶上，水面漂着一张未写完的信纸。",
      composition: "竖版牌面中央为门，潮水从画面深处向前流动；人物只以影子出现，留给创作者继续绘制。",
      symbols: ["门", "潮水", "月光", "台阶", "信纸"],
      palette: "丁香紫、象牙白、月光银、深李紫",
      prompt: "月光神谕卡，半开的旧木门，银色潮水漫过台阶，柔软丁香色丝缎光，女性化诗性档案，精致线稿，可编辑牌框。",
      avoid: "避免恐怖化旧屋、避免宿命审判式表情、避免过度拥挤的符号。",
      upright: "正位提醒她允许情绪被看见：边界不一定是墙，也可以是一扇能被温柔打开的门。",
      reversed: "逆位暗示她仍在用旧叙事解释当下，把直觉误读成危险，把退后误读成失败。",
      story: "潮水不是来淹没她的，而是替她把沉默多年的句子带回岸边。她站在门口，第一次不急着关门。",
      sourceSummary: "来自 9月18日梦境、9月21日日记与一次关于家庭照顾责任的咨询摘录。",
      action: "给这张牌补一件属于自己的物品：它会成为画面中最重要的边界符号。",
    },
    {
      number: "11",
      name: "旧屋的灯",
      deck: "Luna 梦境神谕",
      cardType: "神谕卡 / 关系牌",
      element: "火 · 家屋",
      keywords: ["照顾", "回望", "能量归还"],
      imageDescription: "旧屋中央亮着一盏暖灯，窗外是蓝紫色夜色，桌上放着未完成的花环。",
      composition: "灯在画面正中，人物不出现，只用窗影和花环暗示长期照顾者的位置。",
      symbols: ["灯", "窗", "花环", "空椅"],
      palette: "暖金、丁香灰、深咖、象牙白",
      prompt: "暖灯、旧屋、安静窗影、未完成花环、月光档案风格、女性化神谕卡。",
      avoid: "避免把照顾描绘成牺牲美德，避免过暗恐怖氛围。",
      upright: "允许自己慢慢回家，把留给别人的灯也留一点给自己。",
      reversed: "过度承担让她把他人的期待误认为自己的使命。",
      story: "她终于发现，灯亮着并不代表她必须一直守在那里。",
      sourceSummary: "来自日记中关于疲惫照顾、家庭责任与夜晚独处的描述。",
      action: "写下今天可以少承担的一件小事。",
    },
  ],
};

const enData: StudioData = {
  appName: "Moonlit Archive",
  communityAngle: "Invite other creators to discuss the card's visual symbols and reading direction.",
  weeklyFocusTitle: "Luna · September Dream Phase",
  weeklySymbols: ["Door", "Tide", "Lamp", "Moonlight", "Old house"],
  projects: [
    { id: "luna", name: "Luna · Dream Oracle Deck", theme: "Old houses, tides, moonlight, and boundaries", lastUpdated: "Sep 18 · 23:40", cards: 7, records: 18, privacy: "Anonymized", tags: ["Dreams", "Feminine narrative", "Oracle cards"] },
    { id: "iris", name: "Iris · Annual Healing Notes", theme: "Mother-daughter patterns, gardens, and rebuilding", lastUpdated: "Sep 16 · 10:12", cards: 4, records: 11, privacy: "Private", tags: ["Journal", "Healing", "Client report"] },
    { id: "atelier", name: "Atelier · Original Oracle Lore", theme: "Organizing a symbolic library for an illustration series", lastUpdated: "Sep 12 · 18:05", cards: 12, records: 31, privacy: "Creative project", tags: ["Illustration", "Symbols", "HTML templates"] },
  ],
  timelineEntries: [
    { id: "tide", day: "18", type: "dream", title: "The Tide Behind the Door", excerpt: "She dreamed of water behind an old door. The tide climbed the steps while the room stayed strangely quiet.", mood: "Confused / Tender", symbols: ["Door", "Tide", "Moonlight", "Steps"], intensity: 82, selected: true },
    { id: "lamp", day: "21", type: "journal", title: "The Lamp in the Old House", excerpt: "She wrote that she keeps trying to take care of everyone, like leaving a lamp on in an empty room.", mood: "Caring / Tired", symbols: ["Lamp", "Old house", "Looking back"], intensity: 67 },
    { id: "rabbit", day: "25", type: "daily", title: "The Late White Rabbit", excerpt: "The day felt like chasing deadlines and rereading messages, pushed forward by an invisible clock.", mood: "Urgent / Self-blaming", symbols: ["Rabbit", "Clock", "Station"], intensity: 74 },
    { id: "garden", day: "02", type: "dream", title: "The Closed-Eye Garden", excerpt: "With her eyes closed she saw a tiny garden where the flowers slowly opened like eyes.", mood: "Quiet / Growing", symbols: ["Garden", "Eyes", "Seeds"], intensity: 58 },
    { id: "mirror", day: "09", type: "session", title: "The Girl in the Split Mirror", excerpt: "When speaking about choice, she drew a cracked mirror and said each shard felt like a different self.", mood: "Hesitant / Awake", symbols: ["Mirror", "Double", "Choice"], intensity: 79 },
    { id: "rain", day: "13", type: "journal", title: "Echoes in the Rain Alley", excerpt: "She wrote an unsent letter. The rain helped her notice she was repeating an old conversation.", mood: "Released / Echoing", symbols: ["Rain", "Letter", "Echo"], intensity: 61 },
  ],
  cardDrafts: [
    {
      number: "07",
      name: "The Tide Behind the Door",
      deck: "Luna Dream Oracle",
      cardType: "Oracle card / Time-slice card",
      element: "Water · Moon",
      keywords: ["Boundary", "Old memory", "Intuition", "Soft opening"],
      imageDescription: "A half-open old wooden door releases a silver tide onto pale steps; moonlight catches an unfinished letter floating on the water.",
      composition: "The vertical card centers the door, with water flowing forward from deep space; the human presence remains only as a shadow for the artist to complete.",
      symbols: ["Door", "Tide", "Moonlight", "Steps", "Letter"],
      palette: "Lilac, ivory, moon silver, deep plum",
      prompt: "moonlit oracle card, half-open wooden door, silver tide flowing over steps, soft lilac satin light, poetic feminine archive, delicate linework, editable card border",
      avoid: "Avoid horror treatment, fatalistic judgment, or overcrowded symbolism.",
      upright: "The upright meaning invites emotion to be seen: a boundary does not have to be a wall; it can be a door opened gently.",
      reversed: "The reversed meaning suggests an old story is still being used to interpret the present, turning intuition into danger and retreat into failure.",
      story: "The tide is not here to drown her. It carries sentences that were silent for years back to the shore. At the threshold, she does not rush to close the door.",
      sourceSummary: "Drawn from the Sep 18 dream, Sep 21 journal note, and a session fragment about family care-taking.",
      action: "Add one personal object to this card; it becomes the most important boundary symbol in the image.",
    },
    {
      number: "11",
      name: "The Lamp in the Old House",
      deck: "Luna Dream Oracle",
      cardType: "Oracle card / Relationship card",
      element: "Fire · House",
      keywords: ["Care", "Looking back", "Returning energy"],
      imageDescription: "A warm lamp glows in the center of an old house; blue-violet night sits outside the window and an unfinished wreath rests on the table.",
      composition: "The lamp sits at the exact center. No figure appears; window shadows and the wreath imply the long-time caregiver.",
      symbols: ["Lamp", "Window", "Wreath", "Empty chair"],
      palette: "Warm gold, lilac gray, deep coffee, ivory",
      prompt: "warm lamp in an old house, feminine oracle card, quiet window shadows, unfinished wreath, moonlit archive aesthetic",
      avoid: "Avoid framing care-taking as noble self-sacrifice or making the house feel frightening.",
      upright: "Come home slowly, and keep a little of the light you leave for everyone else.",
      reversed: "Over-responsibility can make other people's expectations feel like your own mission.",
      story: "She finally realizes that a lit lamp does not mean she has to keep watch forever.",
      sourceSummary: "Drawn from journal notes about tired care-taking, family duty, and solitary nights.",
      action: "Write down one small responsibility you can put down today.",
    },
  ],
};

export function resolveStudioLocale(language?: string): LocaleMode {
  return language?.toLowerCase().startsWith("zh") ? "zh-CN" : "en-US";
}

export function getStudioData(language?: string): StudioData {
  return resolveStudioLocale(language) === "zh-CN" ? zhData : enData;
}

export function buildCardHtml(card: OracleCardDraft, locale: LocaleMode = "zh-CN"): string {
  const symbolSeparator = locale === "zh-CN" ? "、" : ", ";
  return `<article class="oracle-card" data-card-number="${card.number}">
  <header class="card-header">
    <section class="field card-number">${card.number}</section>
    <section class="field card-name">${card.name}</section>
  </header>
  <section class="field deck-name">${card.deck}</section>
  <section class="field image-description">${card.imageDescription}</section>
  <section class="field composition">${card.composition}</section>
  <section class="field symbols">${card.symbols.join(symbolSeparator)}</section>
  <section class="field upright-meaning">${card.upright}</section>
  <section class="field reversed-meaning">${card.reversed}</section>
  <section class="field story-reading">${card.story}</section>
  <section class="field drawing-prompt">${card.prompt}</section>
</article>`;
}
