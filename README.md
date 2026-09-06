# Luna · 塔罗神谕 AI 创作工作台 (Tarot Oracle AI Studio)

> 把梦境、日记、咨询片段整理成一张可绘画的神谕牌 —— 记录成牌，字段成稿。

🔗 **在线访问 / Live App:** https://tarot-oracle-ai-studio-9c96c1ee.eazo.dev
📦 **代码仓库 / Repository:** https://github.com/LotusLiuXY/tarot-oracle-ai-studio

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

---

## 简介 · Overview

Tarot Oracle AI Studio 是一个面向塔罗 / 神谕咨询师与插画师的创作工作台。它把来访者的**梦境、日记与咨询片段**沉淀进时间线，再借助 AI 把这些"时间切片"结构化成一张可绘画、可编辑、可导出的**神谕牌卡草案**。

每张牌被拆解成 17 个独立字段（编号、牌名、画面构图、象征物、色彩建议、绘画提示词、正位 / 逆位解析、解析故事等），既能逐项编辑，也能一键导出为语义清晰的 HTML 模板，方便交付或继续排版。

## 核心功能 · Features

- 🗂️ **项目管理** — 以"客户 / 主题"为单位保存长期叙事材料，沉淀记录、符号、时间线与生成过的牌卡。
- ⏳ **时间线追踪** — 把每条记录按情绪、强度、符号排列成连续时间线，横向浏览来访者的变化。
- ✍️ **多形态录入** — 支持文字速记、语音记录、图片线索三种方式快速添加记录。
- ✨ **AI 生成牌卡草案** — 由记录自动生成牌名、关键词、画面描述、绘画提示词、正逆位解析与解析故事。
- 🧩 **字段拆分编辑** — 17 个字段按「基础 / 画面 / 解析 / 来源」四组归类，逐项可编辑。
- 📄 **HTML 模板导出** — 单张或整组导出为语义化 HTML，`article` 表示单张牌，`section.field` 表示每个字段。
- 🌗 **白天 / 夜晚模式** — 内置浅色与深色主题切换。
- 🌐 **中英文双语** — 全站基于 react-i18next，支持 `zh-CN` / `en-US` 无缝切换。
- 🔒 **登录与数据持久化** — 基于 Eazo Auth 与数据库，数据按登录用户隔离存储。

## 技术栈 · Tech Stack

| 领域 | 技术 |
|---|---|
| 框架 | Next.js (App Router) + React + TypeScript |
| 样式 | Tailwind CSS + shadcn 设计变量（月光丝缎主题） |
| 国际化 | react-i18next（`zh-CN` / `en-US`） |
| 主题 | next-themes（白天 / 夜晚） |
| 数据库 | PostgreSQL + Drizzle ORM |
| 平台能力 | Eazo SDK（认证 / 存储 / 分享）、服务端 App AI 计费代理 |
| 运行时 | Bun |

## 本地运行 · Getting Started

安装依赖（使用 Bun）：

```bash
bun install
```

如果 `sharp` 安装卡住，可使用：

```bash
SHARP_IGNORE_GLOBAL_LIBVIPS=1 bun install
```

启动开发服务器：

```bash
bun dev
```

在浏览器打开 [http://localhost:3000](http://localhost:3000) 查看效果。

### 数据库迁移

```bash
bun run db:generate   # 生成迁移
bun run db:migrate    # 应用迁移，创建数据表
```

## 环境变量 · Environment Variables

复制 `.env.example` 为 `.env` 并填入你的私钥：

```bash
cp .env.example .env
```

| 变量 | 说明 |
|---|---|
| `EAZO_PRIVATE_KEY` | Eazo 开发者私钥（hex，64 位），服务端用于解密用户会话 token。 |
| `DATABASE_URL` | PostgreSQL 连接串，服务端使用，切勿暴露到浏览器。 |

私钥可在 Eazo 开发者设置中生成。**切勿把任何私钥暴露到浏览器端。**

## 链接汇总 · Links

| 用途 | 链接 |
|---|---|
| 在线访问 | https://tarot-oracle-ai-studio-9c96c1ee.eazo.dev |
| 代码仓库 | https://github.com/LotusLiuXY/tarot-oracle-ai-studio |
| Eazo 文档 | https://docs.eazo.ai |
| Next.js 文档 | https://nextjs.org/docs |

## 许可证 · License

本项目基于 [MIT License](./LICENSE) 开源。
