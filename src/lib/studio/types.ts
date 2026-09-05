export type LocaleMode = "zh-CN" | "en-US";

export type TimelineEntry = {
  id: string;
  day: string;
  type: string;
  title: string;
  excerpt: string;
  mood: string;
  symbols: string[];
  intensity: number;
};

export type OracleCardDraft = {
  id?: string;
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

export type StudioSnapshot = {
  appName: string;
  communityAngle: string;
  weeklyFocusTitle: string;
  weeklySymbols: string[];
  projects: Project[];
  timelineEntries: TimelineEntry[];
  cardDrafts: OracleCardDraft[];
};

export function buildCardHtml(card: OracleCardDraft, locale: "zh-CN" | "en-US" = "zh-CN"): string {
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
