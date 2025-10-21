# 🚀 快速开始

欢迎使用 Purple Stylist Prompts！本指南将帮助你在 5 分钟内上手。

## 📦 安装依赖

```bash
# 安装 Python 依赖
py -m pip install -r requirements.txt
```

## 🔍 搜索发型

### 查看所有发型

```bash
py scripts/search.py --list-all
```

### 查看特定发型的详细信息

```bash
# 查看长卷发
py scripts/search.py --id long_wavy --verbose

# 只显示提示词
py scripts/search.py --id long_wavy --prompt-only
```

### 按条件搜索

```bash
# 搜索短发
py scripts/search.py --category 短发

# 搜索优雅风格
py scripts/search.py --tag 优雅

# 搜索适合圆脸的发型
py scripts/search.py --face-shape 圆脸

# 组合搜索：适合圆脸的简单短发
py scripts/search.py --category 短发 --face-shape 圆脸 --difficulty easy
```

## 🎨 使用提示词

### 基础使用

1. 搜索你想要的发型
2. 复制提示词
3. 在 AI 图像生成工具中使用

**示例：**

```bash
# 1. 搜索发型
py scripts/search.py --id long_wavy --prompt-only

# 2. 复制输出的提示词，例如：
# keep character consistent; only change the haircut: long flowing wavy hair, soft curls, voluminous, natural movement, glossy finish, shoulder to back length, layered waves, bouncy texture, dark brown hair with caramel highlights

# 3. 在 Midjourney/Stable Diffusion/DALL-E 中使用
```

### 选择不同颜色方案

每个发型通常有 2-3 个颜色方案：

```bash
# 使用第一个颜色方案（默认）
py scripts/search.py --id long_wavy --prompt-only --color-index 0

# 使用第二个颜色方案
py scripts/search.py --id long_wavy --prompt-only --color-index 1

# 使用第三个颜色方案
py scripts/search.py --id long_wavy --prompt-only --color-index 2
```

## ✅ 验证

运行验证工具确保数据完整性：

```bash
py scripts/validate.py
```

## 📤 导出

导出为不同格式方便使用：

```bash
# 导出为 JSON
py scripts/export.py --format json --output hairstyles.json

# 导出为 Markdown 文档
py scripts/export.py --format markdown --output hairstyles.md

# 导出为 CSV 表格
py scripts/export.py --format csv --output hairstyles.csv

# 导出为纯文本提示词
py scripts/export.py --format txt --output prompts.txt
```

## 🎯 实战案例

### 案例 1：为圆脸女生推荐浪漫发型

```bash
# 搜索适合圆脸的浪漫风格发型
py scripts/search.py --face-shape 圆脸 --tag 浪漫

# 查看长卷发详情
py scripts/search.py --id long_wavy --verbose

# 获取提示词
py scripts/search.py --id long_wavy --prompt-only

# 输出：
# keep character consistent; only change the haircut: long flowing wavy hair, soft curls, voluminous, natural movement, glossy finish, shoulder to back length, layered waves, bouncy texture, dark brown hair with caramel highlights
```

### 案例 2：为男士推荐商务发型

```bash
# 搜索商务精英风格的男士发型
py scripts/search.py --style 商务精英 --category 男士短发

# 查看渐变油头
py scripts/search.py --id fade_quiff --verbose

# 获取提示词
py scripts/search.py --id fade_quiff --prompt-only
```

### 案例 3：寻找易打理的发型

```bash
# 搜索简单易打理的发型
py scripts/search.py --difficulty easy

# 查看结果列表
```

## 📚 项目结构

```
purple_stylist_prompts/
├── prompts/                    # 提示词库
│   ├── hairstyles.yaml        # 主发型库（15+ 种发型）
│   ├── categories.yaml        # 分类定义
│   └── tags.yaml              # 标签系统
├── images/                    # 预览图目录
├── scripts/                   # 工具脚本
│   ├── search.py             # 搜索工具
│   ├── validate.py           # 验证工具
│   └── export.py             # 导出工具
├── docs/                     # 详细文档
│   ├── usage.md              # 使用指南
│   └── contribution.md       # 贡献指南
├── trendy-designer-prompt.js # AI造型师主提示词
├── README.md                 # 项目说明
├── QUICKSTART.md            # 本文件
└── requirements.txt          # Python 依赖
```

## 🎨 发型分类

当前包含的发型：

**长发系列 👩**
- 长卷发 (long_wavy)
- 长直发 (long_straight_sleek)

**中长发系列 👱‍♀️**
- 层次锁骨发 (shoulder_layered)
- 波浪长 Bob (lob_wavy)

**短发系列 👩‍🦱**
- 顺滑波波头 (bob_cut_sleek)
- 精灵短发 (pixie_cut)
- 侧剃纹理短发 (undercut_textured)

**男士系列 👨**
- 渐变油头 (fade_quiff)
- 平头 (crew_cut)
- 韩式二分区 (korean_two_block)

**特殊风格 🎭**
- 凌乱慵懒风 (messy_bedhead)
- 复古波浪 (vintage_waves)
- 不对称裁剪 (asymmetrical_cut)

## 💡 使用技巧

### 1. 提示词组合

基础结构：
```
keep character consistent; only change the haircut: [发型描述] + [颜色描述]
```

### 2. 参数调整

- **CFG Scale**: 控制提示词的影响强度（建议 7-9）
- **Style Strength**: 控制风格的强度（0-1）

### 3. 负向提示词

使用负向提示词避免不想要的特征：
```
Negative: straight hair, short hair, frizzy, messy
```

### 4. 多次尝试

- 同一个提示词可以尝试不同的颜色方案
- 可以微调描述词获得不同效果
- 结合不同的风格流派

## 🤝 贡献

想添加新的发型？

1. 参考 `docs/contribution.md` 贡献指南
2. 编辑 `prompts/hairstyles.yaml` 添加新发型
3. 运行 `py scripts/validate.py` 验证格式
4. 提交 Pull Request

## ❓ 常见问题

**Q: 提示词生成效果不理想？**
A: 尝试调整 CFG Scale 参数，或者选择不同的颜色方案。

**Q: 如何为特定脸型找发型？**
A: 使用 `--face-shape` 参数搜索：
```bash
py scripts/search.py --face-shape 圆脸
```

**Q: 可以自定义颜色吗？**
A: 当然！你可以修改颜色描述部分，或者参考 `docs/usage.md` 中的颜色词汇表。

## 📖 进一步学习

- [完整使用指南](docs/usage.md) - 深入了解所有功能
- [贡献指南](docs/contribution.md) - 如何添加新发型
- [README](README.md) - 项目概述

## 🎉 开始创作

现在你已经准备好了！开始探索不同的发型，创造属于你的独特造型吧！

```bash
# 试试这个命令开始探索
py scripts/search.py --list-all
```

---

有问题？查看 [完整文档](README.md) 或提交 Issue

