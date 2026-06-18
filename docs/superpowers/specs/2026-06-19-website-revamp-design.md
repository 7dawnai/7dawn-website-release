# 7dawn 官网改版设计 Spec

- **日期**:2026-06-19
- **状态**:已定稿(待用户复核)
- **来源**:结合产品 deck(`raw/7dawn_BP_v4_main.pdf`,内部,已 gitignore)、现有官网代码、AI 商业软件官网调研(Cursor/MATLAB/Ansys/Cadence/Palantir/Harvey 等),并经 6-agent 评审团(5 视角并行评审 + 1 综合)收敛。

---

## 1. 目标与背景

把官网从「围绕单一产品 **3Studio** 的暗色单页」升级为「**7dawn = 工业自进化 AI 工程师** 的公司/平台叙事」,旗下两条产品线:**3Studio**(大 B 航天 Agent 工作台)+ **vibe CAE**(工程师个人 PLG)。沿用现有暗色设计系统,改信息架构 + 内容 + 部分新 section,并为后续的 `docs`、`download` 内容预留入口与占位页。

**非目标(本期不做)**:3Studio / vibe CAE 独立产品详情页;docs/download 真实内容;团队成员页;新视觉强调色;完整多页 IA。

---

## 2. 硬约束(已与用户确认,不可推翻)

1. **视觉**:沿用现有暗色 design tokens(`#1f2228` 底、白色透明分层、Geist/Noto 字体),**不引入新强调色**。
2. **内容边界(保守公开)**:剔除融资额/估值/股权、客户管线具体名单与阶段、前公司内部经营数字(MAU/营收/满意度)、SOM/SAM 具体金额。保留:产品定位、全流程能力、GAIA 公开榜单、行业方向、愿景。
3. **团队**:只放公司/愿景与**机构级**背书,**不放具体成员**。
4. **docs/download**:用**占位页 + 留资 CTA**。
5. **语言**:维持 **zh/en 双语**;尽量**复用现有组件**;架构取向 **A**(单页叙事 + 轻量占位路由,不做完整多页)。

---

## 3. ⚠️ 合规脱敏 pass(上线前第一优先级,非可选)

现有 `messages/{zh,en}.json` 几乎是融资 deck 逐字渲染,含**不能上公开站**的内容。**必须先建「数字白名单」并脱敏,再动版面**。被保留的 `PlatformDossier` 也要洗,不能因为它不在下线名单就漏过。

**数字白名单原则**:只允许「有可外链来源」或「客户书面授权署名」的数字进入公开站;其余一律改为**能力性描述**或显式标注「示意 / illustrative」。

**必须清除/改写的清单**:
- 真名与签字流:`李承泽` → 通用「评审人 / Reviewer」;`等待总师签字` → 通用「等待人工复核」。
- 拟真涉密细节:`104 颗在轨星`、卫星代号 `XX-3`、覆盖率 `99.2%`、GJB 编号、星座规模 → 删除或改示意。
- 无来源硬数字:`ROI 37×`、`年省 1200w`、`漏测率 -70%`、自主率 `95%`、首次通过 `92%`、`99% 可审计执行率` → 改能力描述,或保留的需标口径 + 「内部基准/示意」。
- 具名竞品负评:`Epsilon3 / Synera` 对比表 → **删除**(商业诋毁风险,反不正当竞争法 §11)。
- 融资/市场金额:`SOM 8-15 亿`、`Layer 200-400 / 500-1200 亿`、SAM → 删除,仅留「万亿级」定性量级。
- meta/OG 旧单产品口径(`3Studio—面向复杂工程行业的 AI 原生平台`、`Harness 治理`、`99% 可审计执行率`)→ 改公司母品牌定位。

**唯二允许保留的"硬数字"**(需限定):
- `GAIA 91.36 全球第一`:配可点击外链 + 抓取日期 + 限定语「截至 YYYY-MM 列居榜首」+ 一句翻译「同一套自研 Agent 内核,在通用工程任务上全球第一」。
- 「验证漏测率最高约 -70%」:必须标具体环节/口径 + 「场景化结果·内部基准,非全局承诺」。

---

## 4. 信息架构与导航

**架构 A**:单页长滚动主叙事 + `/docs`、`/download` 占位路由。

**一级导航(5 项 + 双 CTA + 语言)**:

| 项 | 指向 | 说明 |
|---|---|---|
| 产品 Products | `/zh#products` | 绝对锚点(防占位页死链);下拉可分 3Studio / vibe CAE |
| 能力 Platform | `/zh#platform` | 全流程×多物理场能力线(母品牌能力,非按行业) |
| 行业 Industries | `/zh#industries` | Solutions-by-Industry 受众线;与能力线信息正交 |
| 文档 Docs | `/docs` | 占位路由 |
| 公司 Company | `/zh#company` | 公司/愿景小节;机构级背书,不放成员 |
| **预约演示**(主 CTA) | `mailto:contact@7dawn.ai`(subject「预约演示」/ Book a demo,沿用现有 CTAContact 的 mailto 机制) | 实心白 `btn-primary`,常驻 Nav 右侧,面向大 B |
| **试用 vibe CAE**(次 CTA) | `/download` | 描边白 + → 箭头(新建 `btn-secondary`),面向工程师 self-serve |
| 中/EN | `LangSwitch` | 切语言携带当前 pathname,保持锚点 hash,占位页双语对齐 |

**锚点路由规范**:Nav 锚点写成 `/<locale>#xxx` 绝对锚点,保证从 `/docs`、`/download` 占位页点击可跳回首页对应节。

---

## 5. 首页 9 节(deck → section 映射)

> `action`:keep/rewrite/merge/cut/new。所有保留组件先过第 3 节脱敏 pass。

| # | 动作 | 节 | 复用组件 | 内容 |
|---|---|---|---|---|
| 1 | rewrite | **Hero** | `Hero`(含 FogCanvas) | 母品牌一句话定位 + 双 CTA;**不出现任何产品名**;诗意意象退到 label |
| 2 | new | **可信度带 Trust Bar** | 新建小组件(可借 `SectionHeader`/`ScrollReveal`) | 紧贴 Hero(第 2 屏,视觉上属 Hero 延伸):GAIA 91.36(可外链)· 验证漏测率↓70%(标口径)· 全流程「概念→制造」· 多物理场 6 类 + 一颗「可审计·可回滚·人在环」信任徽章 |
| 3 | merge | **Problem**(吞 WhyNow) | `Problem` + `WhyNow` | 工业研发又慢又贵、更贵的是错过本可做出的设计;末尾一句「为什么是现在」承接四力共振窗口期(删需核实的外部数字或补来源) |
| 4 | new | **Products 分流** | 新建(复用卡片样式) | 统一句「同一个自进化 Agent 平台,两种用法」+ 非对称双卡:**3Studio 大卡 ⅔**(PlatformDossier 预览缩略 + `预约演示`主 CTA)/ **vibe CAE 小卡 ⅓**(「自然语言驱动多物理场仿真,上传 CAD/STEP 即跑」+ `试用`次 CTA→`/download`) |
| 5 | rewrite | **3Studio 演示** | `PlatformDossier`(client 交互) | 五工作空间交互 demo(设计/验证/流程/运维/指挥);`Spaces` 静态五卡**并入此节**;底部一行 Harness 治理 chip;**先脱敏再上线** |
| 6 | rewrite | **全流程能力矩阵** `#platform` | `Architecture`(改造) | 一张图:横轴 概念方案→详细设计→仿真验证→DfM→制造 × 纵轴 结构/热/流体/电磁/电子PCB/控制;对 Ansys/MATLAB「全流程 vs 单点」差异化;Harness 治理承诺融入一行;内部口径数字换成不可证伪的能力性表述 |
| 7 | rewrite | **自进化飞轮 / 工业 RSI** | `Evolution` | 改为「机制(M0→M1→M2 记忆 + RL)+ GAIA 可公开指标 + 定性『越用越聪明』曲线」;**降为未来时愿景**;删前公司运营数字(95%/0.4/任务)、删「递归自我改进/巨头复制不动」强断言与竞品贬损 |
| 8 | new | **行业 Land & Expand** `#industries` | 新建轻量行业卡(参考 `Spaces` pack 样式但重写文案) | 按**行业价值语言**(非产品功能):商业航天·星箭 / eVTOL 低空 / 国机系制造,后续航空·汽车·机器人·半导体·储能;每卡讲「该行业研发痛点 + 7dawn 全流程如何落地 + 复制路径」 |
| 9 | merge | **公司/愿景 `#company` + CTA** | `Market`(吸收两句)+ `CTAContact`(双 CTA) | 收尾带:机构级团队基因(清华系 + 航天工程 + EDA 产业化背景,**不放成员**)+「中国高端制造的自进化设计大脑」愿景 + 万亿级 TAM 定性量级(**删 SOM/Layer 金额、删 Epsilon3/Synera 竞品表**)→ 双 CTA 收口 |
| — | keep+扩展 | **Footer** | `Footer` | 加导航 / docs / download 链接 |

**下线**:`Scenarios`(航天 4 场景,归未来 3Studio 产品页)、`Harness` 独立节(信任卖点「工具白名单·全链路审计·一键回滚·分级审批」降级为能力矩阵一行承诺 + 可信度带一颗徽章)。

---

## 6. Hero 文案(定稿)

**中文**
- label:`// 奇点初芒 · 7dawn`
- 主标:**让 AI 在工业现场真做工程**
- 副标:从概念设计到多物理场验证再到制造——一个会自我进化的工业工程引擎,越用越聪明。
- 主 CTA:`预约演示`  ·  次 CTA:`试用 vibe CAE →`

**English**
- label:`// 7DAWN · SINGULARITY DAWN`
- H1:**AI that does real engineering — and evolves.**
- sub:From concept design to multiphysics validation to manufacturing — a self-evolving industrial engineering engine that gets smarter the more you use it.
- primary CTA:`Book a demo`  ·  secondary CTA:`Try vibe CAE →`

裁决要点:主标用可证伪的「真做工程」动词兜底(回应务实买家),「自进化」作紧随差异点;**`RSI / 递归自我改进` 术语不进 Hero**。

---

## 7. 视觉 / CTA 层级 / i18n

- **视觉**:完全沿用现有暗色 tokens,不加新强调色;只按内容增减结构。
- **双 CTA 层级(无强调色下)**:`btn-primary` 实心白 = 唯一主 CTA(预约演示);**新建 `btn-secondary`** = 描边白 + → 箭头 + hover 填充反馈(试用)。全站统一(Nav/Hero/Products/CTA 四处同一套规则);激活态改用细描边/dot,把白实心让给 CTA。
- **i18n**:`zh.json` 与 `en.json` 同步重写;新增 `products / platform / industries / company / trust / docs / download` 等 key,移除/改写被脱敏的字段;`nav` key 改为新 5 项。
- **meta/SEO/OG**:标题从「3Studio…」改为公司母品牌定位;`sitemap.ts` 加 `/docs`、`/download`;`robots.ts` 视情更新。

---

## 8. 占位页

- `/docs`:暗色占位,「文档建设中 / Docs coming soon」+ 简短说明 + 留资 CTA(mailto)+「返回首页」;进 sitemap;双语。
- `/download`(vibe CAE 试用):「vibe CAE 即将开放 / 申请早期访问」+ 留资 CTA;进 sitemap;双语。
- 占位页**不放**主导航全部锚点(只放返回首页 + 留资),避免跨页锚点失效。

---

## 9. 关键风险

1. **合规闸门优先于一切版面改动**(见第 3 节)——先洗数据再动版面。
2. **PlatformDossier 是保留节但最大残留风险源**,必须单独脱敏。
3. **无强调色下双 CTA 主次易塌**——靠 `btn-secondary` 描边 + 箭头 + hover 反馈 + 全站统一规则解决。
4. **锚点 + 路由混用死链**——绝对锚点 `/<locale>#xxx`;LangSwitch 携带 pathname。
5. **GAIA 相关性断层**——配「同一套自研 Agent 内核,通用工程任务全球第一」翻译句 + 时间限定。
6. **vibe CAE 内容开天窗**——小卡 1 句能力锚 + `/download` 占位承接,不强造整屏内容。
7. **自进化飞轮节翻车面最大**——用「机制 + GAIA 可公开指标 + 定性曲线 + 未来时」填实。

---

## 10. 验收标准

- `npm run build` 通过;`npm run dev` 本地可跑,9 节 + 2 占位页双语渲染正常,导航锚点/语言切换正常。
- 全站**无**第 3 节清单中的真名/涉密/无来源数字/具名竞品/融资金额(可 grep 校验)。
- 首页主语是 7dawn(母品牌),Hero 不含产品名;双 CTA 主次清晰可辨。
- meta/OG 为公司母品牌口径,分享卡不外泄未证实数字。
- `messages/zh.json` 与 `en.json` key 对齐,无遗漏 key 报错。
- 资深前端视角 review:结构清晰、组件职责单一、复用合理、无 hacky 实现。
