import type { OracleCardDraft, Project, StudioSnapshot, TimelineEntry } from "./types";

export const DEFAULT_SNAPSHOT: StudioSnapshot = {
  appName: "月光档案",
  communityAngle: "邀请其他创作者一起讨论这张牌的画面符号与解析方向。",
  weeklyFocusTitle: "Luna · 9月梦境阶段",
  weeklySymbols: ["门", "潮水", "灯", "月光", "旧屋"],
  projects: [
    { id: "default", name: "Luna · 梦境牌组", theme: "旧屋、潮水、月光与边界", lastUpdated: "现在", cards: 1, records: 3, privacy: "仅自己可见", tags: ["梦境", "女性叙事", "神谕卡"] },
  ] satisfies Project[],
  timelineEntries: [
    { id: "tide", day: "18", type: "dream", title: "门后的潮汐", excerpt: "梦见旧屋的门缝里有水声，潮水沿着台阶漫上来，但房间里很安静。", mood: "困惑 / 柔软", symbols: ["门", "潮水", "月光", "台阶"], intensity: 82 },
    { id: "lamp", day: "21", type: "journal", title: "旧屋的灯", excerpt: "她说自己总想把每个人照顾好，像在空房间里留一盏灯。", mood: "牵挂 / 疲惫", symbols: ["灯", "旧屋", "回望"], intensity: 67 },
    { id: "rabbit", day: "25", type: "daily", title: "迟到白兔", excerpt: "一天都在追赶截止时间，反复确认消息，像被看不见的钟推着走。", mood: "急促 / 自责", symbols: ["白兔", "时钟", "车站"], intensity: 74 },
  ] satisfies TimelineEntry[],
  cardDrafts: [{
    number: "07", name: "门后的潮汐", deck: "Luna 梦境神谕", cardType: "神谕卡 / 时间切片牌", element: "水 · 月亮", keywords: ["边界", "旧记忆", "直觉", "柔软的打开"],
    imageDescription: "一扇半开的旧木门后涌出银色潮水，月光落在浅色台阶上，水面漂着一张未写完的信纸。", composition: "竖版牌面中央为门，潮水从画面深处向前流动；人物只以影子出现，留给创作者继续绘制。", symbols: ["门", "潮水", "月光", "台阶", "信纸"], palette: "丁香紫、象牙白、月光银、深李紫", prompt: "月光神谕卡，半开的旧木门，银色潮水漫过台阶，柔软丁香色丝缎光，女性化诗性档案，精致线稿，可编辑牌框。", avoid: "避免恐怖化旧屋、避免宿命审判式表情、避免过度拥挤的符号。", upright: "正位提醒她允许情绪被看见：边界不一定是墙，也可以是一扇能被温柔打开的门。", reversed: "逆位暗示她仍在用旧叙事解释当下，把直觉误读成危险，把退后误读成失败。", story: "潮水不是来淹没她的，而是替她把沉默多年的句子带回岸边。她站在门口，第一次不急着关门。", sourceSummary: "来自梦境、日记与关于照顾责任的摘录。", action: "给这张牌补一件属于自己的物品：它会成为画面中最重要的边界符号。",
  }] satisfies OracleCardDraft[],
};
