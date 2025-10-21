# 📖 使用指南

本文档详细介绍如何使用 Purple Stylist Prompts 提示词库。

## 📚 基础概念

### 什么是提示词（Prompt）？

提示词是用于引导 AI 图像生成模型创建特定图像的文本描述。一个好的提示词应该：

- **具体明确**：清晰描述想要的发型特征
- **结构化**：按照一定的顺序组织描述
- **专业性**：使用准确的专业术语

### 提示词结构

```
基础指令 + 发型描述 + 颜色描述 + 质感细节
```

**示例：**
```
keep character consistent; only change the haircut: long flowing wavy hair, soft curls, voluminous, natural movement, dark brown with caramel highlights
```

## 🔍 搜索发型

### 按分类搜索

```bash
# 查看所有长发发型
py scripts/search.py --category 长发

# 查看男士短发
py scripts/search.py --category 男士短发
```

**可用分类：**
- 长发
- 中长发
- 短发
- 男士短发
- 男士中短发

### 按标签搜索

```bash
# 搜索优雅风格
py scripts/search.py --tag 优雅

# 搜索卷发
py scripts/search.py --tag 卷发

# 多标签搜索
py scripts/search.py --tag 时尚 --tag 个性
```

### 按风格流派搜索

```bash
# 韩式潮流
py scripts/search.py --style 韩式潮流

# 街头潮流
py scripts/search.py --style 街头潮流
```

**可用风格流派：**
- 街头潮流
- 韩式潮流
- 欧美潮流
- 文艺复古
- 前卫实验
- 自然慵懒
- 商务精英
- 休闲都市
- 运动活力

### 按脸型搜索

```bash
# 适合圆脸的发型
py scripts/search.py --face-shape 圆脸

# 适合方脸的发型
py scripts/search.py --face-shape 方脸
```

**脸型类型：**
- 鹅蛋脸 - 最标准，适合所有发型
- 圆脸 - 适合长发、层次发型
- 方脸 - 适合柔和卷发、层次发型
- 心形脸 - 适合下巴附近有volume的发型
- 长脸 - 适合刘海、横向volume
- 菱形脸 - 适合侧分、柔和卷发
- 三角脸 - 适合顶部有volume的发型

### 按难度搜索

```bash
# 简单易打理的发型
py scripts/search.py --difficulty easy

# 中等难度
py scripts/search.py --difficulty medium

# 高难度（需要专业技巧）
py scripts/search.py --difficulty high
```

### 组合搜索

```bash
# 搜索适合圆脸的简单短发
py scripts/search.py --category 短发 --face-shape 圆脸 --difficulty easy

# 搜索韩式风格的优雅发型
py scripts/search.py --style 韩式潮流 --tag 优雅
```

## 💡 使用提示词

### 在 AI 图像生成中使用

#### Midjourney
```
/imagine keep character consistent; only change the haircut: [从YAML中复制的prompt], [颜色描述] --v 6
```

#### Stable Diffusion
```
Positive: keep character consistent; only change the haircut: [prompt], [color]
Negative: [negative_prompt]
CFG Scale: [cfg_scale值]
```

#### ChatGPT DALL-E
```
Generate an image of a person with the following hairstyle: [prompt], [color]
```

### 组合颜色方案

每个发型通常提供2-3个颜色方案：

```yaml
color_options:
  - name: 自然褐色
    prompt: "dark brown hair with caramel highlights"
  - name: 蜜糖渐变
    prompt: "honey blonde to light brown gradient"
```

**使用方法：**
```
keep character consistent; only change the haircut: long flowing wavy hair, soft curls, voluminous, honey blonde to light brown gradient
```

### 自定义颜色

你也可以自己创建颜色描述：

**基础颜色：**
- jet black, dark brown, medium brown, light brown
- blonde, platinum, ash blonde, honey blonde
- red, burgundy, copper, auburn

**效果词：**
- ombre (渐变)
- highlights (挑染亮色)
- lowlights (挑染暗色)
- gradient (渐变)
- streaks (条纹)
- tips (发尾)
- roots (发根)

**组合示例：**
- "platinum blonde with dark roots"
- "dark brown to honey blonde gradient"
- "jet black with silver streaks"
- "burgundy hair with copper highlights"

## 🎨 创建发型推荐方案

### 基础推荐流程

1. **分析用户特征**
   - 脸型
   - 年龄段
   - 性别
   - 风格偏好

2. **筛选候选发型**
   ```bash
   py scripts/search.py --face-shape 圆脸 --age-range 20-30
   ```

3. **选择3-5个不同风格的方案**
   - 保守方案（低难度）
   - 中庸方案（中等难度）
   - 大胆方案（高难度）

4. **为每个方案选择颜色**
   - 自然色系
   - 时尚色系
   - 个性色系

### 高级推荐策略

#### 多样化原则
确保推荐的发型跨越不同维度：
- 长度差异（长发、中发、短发）
- 风格差异（优雅、街头、前卫）
- 颜色差异（自然、时尚、大胆）

#### 场合适配
根据用户的生活场景选择：

**职场人士：**
- 主选：商务精英风格
- 辅选：休闲都市风格
- 惊喜：稍微前卫但不夸张的设计

**学生/年轻人：**
- 主选：韩式潮流、街头潮流
- 辅选：自然慵懒
- 惊喜：前卫实验

**创意行业：**
- 自由选择，可以更大胆
- 包含前卫实验风格
- 尝试特殊颜色

## 🛠️ 工具使用

### search.py 详细用法

```bash
# 显示帮助
py scripts/search.py --help

# 列出所有发型
py scripts/search.py --list-all

# 显示详细信息
py scripts/search.py --id long_wavy --verbose

# 只显示提示词
py scripts/search.py --id long_wavy --prompt-only

# 导出搜索结果
py scripts/search.py --tag 优雅 --output results.txt
```

### validate.py 验证工具

```bash
# 验证所有YAML文件
py scripts/validate.py

# 验证特定文件
py scripts/validate.py --file prompts/hairstyles.yaml

# 详细模式
py scripts/validate.py --verbose
```

### export.py 导出工具

```bash
# 导出为JSON
py scripts/export.py --format json --output hairstyles.json

# 导出为Markdown表格
py scripts/export.py --format markdown --output hairstyles.md

# 导出为CSV
py scripts/export.py --format csv --output hairstyles.csv

# 只导出特定分类
py scripts/export.py --category 短发 --format json
```

## 📝 实战案例

### 案例1：为圆脸女生推荐发型

```bash
# 1. 搜索适合圆脸的发型
py scripts/search.py --face-shape 圆脸 --category 长发,中长发

# 2. 查看详细信息
py scripts/search.py --id long_wavy --verbose

# 3. 组合提示词
keep character consistent; only change the haircut: long flowing wavy hair, soft curls, voluminous, natural movement, honey blonde to light brown gradient
```

### 案例2：为男士推荐商务发型

```bash
# 搜索商务风格的男士发型
py scripts/search.py --style 商务精英 --category 男士短发,男士中短发

# 选择合适的发型
# ID: fade_quiff (渐变油头)

# 使用提示词
keep character consistent; only change the haircut: modern quiff hairstyle, fade on sides, voluminous top, styled upward, sleek finish, masculine, natural black hair
```

### 案例3：创意行业个性发型

```bash
# 搜索前卫风格
py scripts/search.py --style 前卫实验

# 选择不对称裁剪
# ID: asymmetrical_cut

# 大胆颜色组合
keep character consistent; only change the haircut: asymmetrical haircut, one side longer, edgy styling, geometric shapes, bold contrast, color blocking with black and platinum sections
```

## 🎯 最佳实践

### DO ✅

1. **充分了解用户需求**
   - 询问脸型、年龄、职业
   - 了解风格偏好和日常需求
   - 考虑维护能力

2. **提供多样化选择**
   - 至少3-5个不同风格
   - 包含保守和大胆的选项
   - 解释每个选择的特点

3. **测试和调整**
   - 使用AI生成测试效果
   - 根据结果微调提示词
   - 记录有效的组合

### DON'T ❌

1. **不要盲目推荐**
   - 不考虑脸型就推荐
   - 忽视维护难度
   - 不考虑年龄适配

2. **不要单一化**
   - 只推荐一种风格
   - 颜色选择过于保守
   - 缺乏创新性

3. **不要过度复杂**
   - 提示词过长
   - 包含矛盾的描述
   - 堆砌过多关键词

## 🔗 相关资源

- [贡献指南](contribution.md) - 如何添加新的发型
- [发型术语表](terminology.md) - 专业术语解释
- [AI生成技巧](ai-generation-tips.md) - 优化生成效果

## 💬 常见问题

**Q: 提示词生成的效果不理想怎么办？**
A: 尝试调整参数，增加或减少细节描述，或者组合不同的颜色方案。

**Q: 如何为特殊脸型找到合适的发型？**
A: 使用 `--face-shape` 参数搜索，同时参考 categories.yaml 中的脸型建议。

**Q: 可以自己修改提示词吗？**
A: 当然可以！提示词库只是提供基础模板，鼓励根据实际需求调整。

---

更多问题？请查看 [FAQ](faq.md) 或提交 Issue

