# 内容替换指南

线上地址：**https://daijun10086.github.io/PhysFields/**

页面所有需要替换的文字都以 `_PLACEHOLDER` 结尾。下面按页面从上到下列出每一处，标注所在文件和行号。

---

## 快速流程

```bash
cd "Machine Vision Course Project/project_webpage"
# 1. 用你喜欢的编辑器改 index.html（或替换 static/images 下的图）
# 2. 本地预览
python3 -m http.server 8000     # 打开 http://localhost:8000
# 3. 满意后推上去，GitHub Pages 会在 ~1 分钟内自动重建
git add -A
git commit -m "Update <section name>"
git push
```

查当前还剩哪些占位符没填：

```bash
grep -n 'PLACEHOLDER' index.html
```

---

## 文本占位符对照表

全部在 `index.html` 中。按页面从上到下排列。

### 1. `<head>` 元数据（浏览器标题栏 / 搜索引擎收录）

| 占位符 | 行号 | 换成什么 |
|---|---|---|
| `PROJECT_DESCRIPTION_PLACEHOLDER` | 5 | 项目一句话描述（~150 字以内，会被 Google / 社交分享预览用） |
| `PROJECT_TITLE_PLACEHOLDER` | 7 | 浏览器标签显示的标题（通常和 H1 一致） |

### 2. Hero 顶部区（标题、作者、按钮）

| 占位符 | 行号 | 换成什么 |
|---|---|---|
| `VENUE_BADGE_PLACEHOLDER` | 21 | 课程 / 会议标签，例如 `CSC 249/449 Machine Vision` |
| `PROJECT_TITLE_PLACEHOLDER` | 23 | 页面大标题（H1） |
| `AUTHOR_1_URL_PLACEHOLDER` … `AUTHOR_3_URL_PLACEHOLDER` | 26–28 | 每位作者的个人主页链接；把 `Author One / Two / Three` 也改成真实姓名 |
| `ADVISOR_URL_PLACEHOLDER` | 29 | 指导老师个人主页；把 `Advisor Name` 也改成真实姓名 |
| Paper 按钮 (第 37 行) | — | 链接已指向 `./static/pdfs/paper.pdf`。把课程 Paper 导出 PDF 后放到那个路径，文件名用 `paper.pdf` 即可生效 |
| Slides 按钮 (第 40 行) | — | 链接已指向 `./static/pdfs/PhysFields.pdf`。把 Presentation slides 导出 PDF 后放到那个路径 |
| `GITHUB_CODE_URL_PLACEHOLDER` | 40 | 代码仓库链接（可以就填 `https://github.com/daijun10086/PhysFields`，或另一个代码仓库） |
| `VIDEO_URL_PLACEHOLDER` | 41 | YouTube/Bilibili 讲解视频链接（没有的话删掉整个 `<a>`） |

> 如果只有 2 位作者，把第 3 位那行（`Author Three`）整行删了；同理作者更多就复制一行。第 30 行那段 `Equal contribution` 注释，如果没有并列一作就把 `<p class="note">` 整个段落删掉，并删掉作者名后面的 `<sup>1,*</sup>` 里的 `,*`。

### 3. Teaser 图说明

| 占位符 | 行号 | 换成什么 |
|---|---|---|
| `TEASER_CAPTION_PLACEHOLDER` | 51 | 首图下方一句话说明（这张图在展示什么） |

### 4. Video（视频区）

| 占位符 | 行号 | 换成什么 |
|---|---|---|
| `VIDEO_ID_PLACEHOLDER` | 62 | 如果用 YouTube 嵌入：取 YouTube 链接 `youtu.be/XXXX` 中的 `XXXX` 填这里，并把 62 行的 `<!-- -->` 注释去掉；同时把 63–65 行本地 `<video>` 标签注释掉或删掉 |

> 不用视频就把整个 `<section>` 删掉，或把标题改成其它内容。

### 5. Abstract

| 占位符 | 行号 | 换成什么 |
|---|---|---|
| `ABSTRACT_PLACEHOLDER` | 75 | 一段摘要（~150–200 词）：问题、方法、主要结果 |

### 6. Method（流程图说明）

| 占位符 | 行号 | 换成什么 |
|---|---|---|
| `PIPELINE_CAPTION_PLACEHOLDER` | 89 | Pipeline 图下方一到两句话说明 |

### 7. Results（4 张结果图的标题）

| 占位符 | 行号 | 换成什么 |
|---|---|---|
| `RESULT_1_CAPTION_PLACEHOLDER` | 102 | 第 1 张结果图 caption |
| `RESULT_2_CAPTION_PLACEHOLDER` | 106 | 第 2 张 |
| `RESULT_3_CAPTION_PLACEHOLDER` | 110 | 第 3 张 |
| `RESULT_4_CAPTION_PLACEHOLDER` | 114 | 第 4 张 |

> 想做 3 张或 6 张？复制 / 删除 `<figure>…</figure>` 块即可；CSS 是 2 列网格，不是偶数会自动适配。

### 8. Comparisons

| 占位符 | 行号 | 换成什么 |
|---|---|---|
| `COMPARISON_CAPTION_PLACEHOLDER` | 126 | 对比图总体说明 |
| `BASELINE_PLACEHOLDER` | 126 | 对比的基线方法名（例如 `NeRF`, `3DGS`） |

### 9. 定量结果表（Quantitative Evaluation）

| 占位符 | 行号 | 换成什么 |
|---|---|---|
| `METRIC_1_PLACEHOLDER` | 139 | 第 1 个指标列名（例如 `PSNR ↑`） |
| `METRIC_2_PLACEHOLDER` | 140 | 第 2 个（例如 `SSIM ↑`） |
| `METRIC_3_PLACEHOLDER` | 141 | 第 3 个（例如 `LPIPS ↓`） |
| 表格数据 | 145–147 | `Baseline A / B / Ours` 行里的 `0.00` 换成真实数字；可添加更多 `<tr>` 行 |
| `TABLE_CAPTION_PLACEHOLDER` | 150 | 表格下方一句话说明 |

### 10. BibTeX

| 占位符 | 行号 | 换成什么 |
|---|---|---|
| `AUTHOR_YEAR_KEY_PLACEHOLDER` | 158 | BibTeX 的 key（例如 `dai2026physfields`） |
| `PROJECT_TITLE_PLACEHOLDER` | 159 | 项目标题 |
| author / year / url 等 | 160–163 | 直接改成你们的信息 |

### 11. Footer

| 占位符 | 行号 | 换成什么 |
|---|---|---|
| `CONTACT_EMAIL_PLACEHOLDER` | 170 | 联系邮箱（两处都要改，`mailto:` 里一次、显示文字一次） |

---

## 图片 / 视频替换

策略有两种，任选其一：

**A. 同名覆盖（最省事）**
把你的图片/视频重命名成和占位文件一样的名字，直接替换：

```
static/images/teaser_placeholder.svg       → 你的 teaser 图
static/images/pipeline_placeholder.svg     → 你的 pipeline 图
static/images/result_1_placeholder.svg     → 结果图 1
static/images/result_2_placeholder.svg     → 结果图 2
static/images/result_3_placeholder.svg     → 结果图 3
static/images/result_4_placeholder.svg     → 结果图 4
static/images/comparison_placeholder.svg   → 对比图
static/videos/video_placeholder.mp4        → 视频
```

> 注：可以换成 `.png / .jpg / .gif`。如果换了扩展名（例如用 PNG），记得把 `index.html` 中对应的 `src="…/xxx.svg"` 改成 `src="…/xxx.png"`。

**B. 新文件名（更规范）**
把自己的文件直接放进 `static/images/`（例如 `teaser.png`），然后在 `index.html` 里改对应的 `src="…"` 指向新文件。旧的 `*_placeholder.svg` 可以直接删掉。

**图片尺寸建议：**
- Teaser / Pipeline：宽度 ≥ 1200 px
- 结果图 / 对比图：宽度 ≥ 800 px（网格里显示为半宽）
- 文件大小：单文件最好 < 2 MB（GitHub Pages 单个仓库硬上限 1 GB，软限 100 MB/文件）
- 视频：建议转成 H.264 MP4，码率 2–4 Mbps，时长 < 1 分钟；更长的视频用 YouTube 嵌入更合适

---

## 添加 / 删除整个章节

每个章节都是一个独立的 `<section>…</section>` 块，前后用 `<hr>` 分隔。

- **删除**：把 `<section>…</section>` 和它前面或后面的一条 `<hr>` 一起删掉即可。
- **新增**：复制任意一个 `<section>` 块改内容即可，不需要改 CSS。
- **顺序**：`<section>` 从上到下渲染，换顺序就是换代码块的顺序。

---

## 样式微调

改颜色 / 字号 / 宽度都在 `static/css/index.css` 里：

| 想改的东西 | 位置 |
|---|---|
| 页面整体最大宽度（现在 880px） | `main { max-width: 880px; }` |
| 正文字体 | `body { font-family: … }` |
| 标题字体 | `h1, h2, h3 { font-family: … }` |
| 按钮背景色（现在黑色 `#1a1a1a`） | `.hero .links a { background: … }` |
| 链接蓝色 | `a { color: #1558d6; }` |
| 结果区网格列数（现在 2 列） | `.grid-2 { grid-template-columns: 1fr 1fr; }` |

---

## 部署自动化说明

当前 Pages 的构建方式是 **从 `main` 分支的根目录发布**。只要你 `git push` 到 `main`，GitHub 就会在 ~1 分钟内自动重建。不需要任何 CI 配置。

构建状态可以在这里看：
https://github.com/daijun10086/PhysFields/actions

如果某次推送后页面没更新，去 Actions 页面看那次 "pages build and deployment" 任务有没有红叉。
