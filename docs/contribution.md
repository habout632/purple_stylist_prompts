# 🤝 贡献指南

感谢你考虑为 Purple Stylist Prompts 做出贡献！本指南将帮助你了解如何添加新的发型提示词和改进项目。

## 🎯 贡献方式

你可以通过以下方式贡献：

1. **添加新的发型提示词**
2. **改进现有提示词**
3. **添加预览图片**
4. **改进工具脚本**
5. **完善文档**
6. **报告问题**

## 📝 添加新发型

### 步骤1：了解现有结构

首先查看 `prompts/hairstyles.yaml` 了解发型定义的结构：

```yaml
- id: unique_identifier        # 唯一标识符，使用英文小写+下划线
  name: 中文名称                # 发型的中文名称
  name_en: English Name        # 发型的英文名称
  category: 分类                # 所属分类
  tags: [标签1, 标签2]          # 相关标签
  style_type: [风格流派]        # 风格类型
  difficulty: easy              # 难度等级
  
  prompt: "提示词"              # AI生成用的正向提示词
  negative_prompt: "负向词"     # 负向提示词
  
  color_options:                # 颜色方案（2-3个）
    - name: 颜色名称
      prompt: "颜色描述"
  
  parameters:                   # 生成参数
    style_strength: 0.8
    cfg_scale: "7-9"
    variation: medium
  
  suitable_for:                 # 适用信息
    face_shapes: [脸型列表]
    age_range: [最小年龄, 最大年龄]
    occasions: [场合列表]
  
  styling_tips: "造型建议"      # 实用建议
  preview_image: "图片路径"     # 预览图路径
```

### 步骤2：创建发型定义

在 `prompts/hairstyles.yaml` 文件末尾添加新的发型定义。

**示例 - 添加空气刘海发型：**

```yaml
  - id: air_bangs_medium
    name: 空气刘海中长发
    name_en: Air Bangs Medium Hair
    category: 中长发
    tags: [清新, 减龄, 韩系, 女性]
    style_type: [韩式潮流, 自然慵懒]
    difficulty: medium
    
    prompt: "medium length hair with air bangs, soft and wispy bangs, natural volume, shoulder length, layered cut, light and airy texture, Korean style"
    negative_prompt: "heavy bangs, blunt cut bangs, straight across bangs, no volume"
    
    color_options:
      - name: 黑茶色
        prompt: "dark brown with subtle warmth"
      - name: 亚麻棕
        prompt: "ash brown with cool tones"
      - name: 奶茶色
        prompt: "milk tea brown, soft beige undertones"
    
    parameters:
      style_strength: 0.75
      cfg_scale: "7-8"
      variation: medium
    
    suitable_for:
      face_shapes: [圆脸, 长脸, 方脸]
      age_range: [18, 35]
      occasions: [日常, 休闲, 约会, 校园]
    
    styling_tips: "需要用卷发棒或卷发梳打造蓬松感，适合想要减龄效果的人"
    preview_image: "images/air_bangs_medium.jpg"
```

### 步骤3：编写优质提示词

#### 提示词编写原则

**DO ✅**

1. **使用专业术语**
   ```
   ✓ "layered cut with textured ends"
   ✗ "nice haircut with different lengths"
   ```

2. **描述具体特征**
   ```
   ✓ "shoulder length, soft curls, voluminous"
   ✗ "pretty hair"
   ```

3. **遵循结构顺序**
   ```
   长度 → 质感 → 造型 → 特殊细节
   "shoulder length wavy hair, soft texture, natural volume, side-swept"
   ```

4. **包含多个相关关键词**
   ```
   "long flowing wavy hair, soft curls, voluminous, natural movement, glossy finish"
   ```

**DON'T ❌**

1. ❌ 使用模糊描述
2. ❌ 包含矛盾词汇（如同时要求 straight 和 curly）
3. ❌ 过度堆砌关键词
4. ❌ 使用非发型相关的描述

#### 负向提示词

负向提示词用于告诉AI不要生成什么：

```yaml
negative_prompt: "straight hair, short hair, frizzy, messy, flat, limp"
```

常用负向词：
- 质感：frizzy, messy, flat, limp, greasy
- 长度：short hair, long hair（相反的长度）
- 造型：straight, curly（相反的造型）

#### 颜色描述

每个发型应提供2-3个颜色方案：

1. **自然色系**：适合保守、职场
   ```
   "dark brown with natural highlights"
   "jet black with glossy finish"
   ```

2. **时尚色系**：流行但不夸张
   ```
   "honey blonde with caramel balayage"
   "ash brown with cool undertones"
   ```

3. **大胆色系**：个性鲜明
   ```
   "platinum blonde with dark roots"
   "burgundy with copper highlights"
   "ocean fade gradient from black to blue"
   ```

### 步骤4：选择合适的分类和标签

#### 分类选择

参考 `prompts/categories.yaml`：

- **长发**: 肩部以下
- **中长发**: 下巴到肩部
- **短发**: 耳朵到下巴
- **男士短发**: 男性短发
- **男士中短发**: 男性中长发

#### 标签选择

参考 `prompts/tags.yaml`，选择3-5个最相关的标签：

**风格标签**：浪漫、优雅、清爽、时尚、个性、帅气...
**质感标签**：卷发、直发、波浪、蓬松、顺滑...
**性别标签**：女性、男性、中性

#### 风格流派

从9大流派中选择1-2个最符合的：

1. 街头潮流
2. 韩式潮流
3. 欧美潮流
4. 文艺复古
5. 前卫实验
6. 自然慵懒
7. 商务精英
8. 休闲都市
9. 运动活力

### 步骤5：填写适用信息

#### 脸型适配

根据发型特点判断适合的脸型：

```yaml
suitable_for:
  face_shapes: [圆脸, 鹅蛋脸, 心形脸]
```

**参考原则：**
- **长发/卷发**：适合圆脸（拉长脸型）
- **短发/利落**：适合鹅蛋脸、瓜子脸
- **刘海**：适合长脸（缩短视觉长度）
- **侧分/层次**：适合方脸（柔和线条）

#### 年龄范围

```yaml
age_range: [18, 45]  # [最小年龄, 最大年龄]
```

考虑因素：
- 发型的成熟度
- 维护难度
- 流行趋势的年龄适配

#### 适用场合

```yaml
occasions: [日常, 职场, 派对]
```

可选场合：
- 日常、职场、商务、休闲
- 派对、约会、婚礼
- 运动、艺术活动

### 步骤6：添加造型建议

提供实用的造型和维护建议：

```yaml
styling_tips: "需要用卷发棒打造卷度，建议使用弹力素维持造型，适合追求浪漫优雅风格的人"
```

包含：
- 如何打理
- 需要的工具/产品
- 维护频率
- 适合人群

## 🖼️ 添加预览图

### 图片要求

1. **格式**：JPG 或 PNG
2. **尺寸**：建议 800x800 或 1024x1024
3. **质量**：清晰展示发型特征
4. **内容**：聚焦发型，背景简洁

### 命名规范

使用与发型 ID 相同的文件名：

```
images/
  ├── long_wavy.jpg
  ├── bob_cut.jpg
  ├── pixie_cut.jpg
  └── ...
```

### 添加图片

1. 将图片放入 `images/` 目录
2. 在发型定义中添加路径：
   ```yaml
   preview_image: "images/your_hairstyle.jpg"
   ```

## ✅ 验证你的贡献

### 运行验证脚本

```bash
py scripts/validate.py
```

验证脚本会检查：
- YAML 格式是否正确
- 必需字段是否完整
- ID 是否唯一
- 引用的分类/标签是否存在
- 图片路径是否有效

### 手动检查清单

- [ ] ID 是唯一的（不与现有发型重复）
- [ ] 包含所有必需字段
- [ ] 提示词语法正确，无拼写错误
- [ ] 标签和分类在定义文件中存在
- [ ] 年龄范围合理
- [ ] 提供了2-3个颜色方案
- [ ] 包含造型建议
- [ ] 如有预览图，路径正确

## 🚀 提交贡献

### 1. Fork 项目

点击 GitHub 上的 Fork 按钮，创建你自己的副本。

### 2. 创建分支

```bash
git checkout -b add-hairstyle-air-bangs
```

分支命名建议：
- `add-hairstyle-[发型名]`
- `improve-hairstyle-[发型名]`
- `fix-[问题描述]`

### 3. 提交更改

```bash
git add prompts/hairstyles.yaml
git commit -m "Add air bangs medium hairstyle"
```

提交信息格式：
- `Add [发型名] hairstyle`
- `Improve [发型名] prompt`
- `Fix typo in [文件名]`

### 4. 推送到 GitHub

```bash
git push origin add-hairstyle-air-bangs
```

### 5. 创建 Pull Request

在 GitHub 上创建 Pull Request，描述你的更改：

```markdown
## 添加新发型：空气刘海中长发

### 更改内容
- 添加了空气刘海中长发的提示词定义
- 提供了3种颜色方案
- 包含了适用脸型和场合信息

### 测试情况
- 已运行 validate.py 验证
- 已测试提示词生成效果

### 预览
[可选：上传生成的示例图片]
```

## 🎨 改进现有提示词

如果你发现现有提示词可以改进：

1. **测试并记录问题**
   - 描述当前问题
   - 提供生成的示例（如果可能）

2. **提出改进方案**
   - 解释为什么要改进
   - 提供改进后的提示词

3. **创建 Pull Request**
   - 清楚说明改进内容
   - 对比改进前后的效果

## 📚 改进文档

文档改进同样重要：

- 修正错别字
- 添加示例
- 完善说明
- 翻译内容

文档文件位于 `docs/` 目录。

## 🐛 报告问题

发现 Bug 或有建议？请创建 Issue：

### Bug 报告模板

```markdown
**问题描述**
清晰描述问题

**复现步骤**
1. 执行 '...'
2. 查看 '....'
3. 出现错误

**预期行为**
应该发生什么

**实际行为**
实际发生了什么

**环境信息**
- 操作系统：
- Python 版本：

**截图**
如果适用，添加截图
```

### 功能建议模板

```markdown
**功能描述**
你希望添加什么功能？

**使用场景**
这个功能解决什么问题？

**建议实现**
你认为应该如何实现？

**替代方案**
考虑过其他方案吗？
```

## 💡 编写技巧

### 发型描述词汇参考

**长度：**
- pixie short, bob length, chin length
- shoulder length, collarbone length
- long, extra long, waist length

**质感：**
- sleek, smooth, polished
- messy, tousled, undone
- voluminous, bouncy, full
- soft, silky, glossy
- textured, choppy, piecey

**造型：**
- straight, sleek straight
- wavy, loose waves, beach waves
- curly, tight curls, loose curls
- kinky, coily

**切割：**
- blunt cut, one length
- layered, multi-layered
- choppy layers, textured layers
- asymmetrical cut
- undercut, shaved sides
- fade, taper, graduated

**特殊：**
- with bangs, air bangs, curtain bangs
- side-swept, center part, deep side part
- slicked back, pulled back

### 颜色描述词汇参考

**基础色：**
- jet black, ebony black
- dark brown, chocolate brown, espresso
- medium brown, chestnut
- light brown, caramel
- blonde, honey blonde, golden blonde
- ash blonde, platinum blonde, icy blonde
- red, auburn, copper, burgundy
- grey, silver, steel grey

**效果：**
- ombre (深到浅渐变)
- gradient (颜色渐变)
- balayage (手刷挑染)
- highlights (挑染亮色)
- lowlights (挑染暗色)
- streaks (条纹)
- tips (发尾)
- roots (发根)
- all-over (全头)

**组合句式：**
- `[base color] with [accent color] [effect]`
  - "dark brown with caramel highlights"
  - "black with silver streaks"
  
- `[color1] to [color2] [effect]`
  - "dark brown to honey blonde gradient"
  - "black to electric blue ombre"

## 🌟 成为核心贡献者

持续贡献并表现出色的成员可能被邀请成为核心贡献者，获得：

- 直接提交权限
- 参与项目决策
- 在 README 中署名

## 📞 联系方式

有问题？需要帮助？

- 创建 Issue
- 在 Pull Request 中评论
- 查看现有的讨论

---

再次感谢你的贡献！每一个贡献都让这个项目变得更好。🎨

