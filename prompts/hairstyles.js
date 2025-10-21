// API 配置文件 - 基于最新的 fal.ai Flux Kontext API 文档
// 文档地址: https://fal.ai/models/fal-ai/flux-pro/kontext/api
//
// Flux Kontext 特点:
// 1. 专为图像编辑设计，理解图像上下文
// 2. 支持文本和参考图像作为输入
// 3. 能够进行局部编辑和复杂的场景变换
// 4. 参数相比其他 Flux 模型更加简化
//
const API_CONFIG = {
  // ===== 全局调试控制开关 =====
  // 开发环境: DEBUG_MODE: true  - 显示所有调试信息
  // 生产环境: DEBUG_MODE: false - 关闭所有调试信息，提升性能
  // 上线前请务必设置为 false
  DEBUG_MODE: true,
  
  // ===== 提示词选择配置 =====
  PROMPT_CONFIG: {
    // 当前使用的提示词类型
    // 'classic' - 经典自然时尚发型设计师 (design-prompt.js)
    // 'trendy' - AI潮流造型设计师 2.0 (trendy-designer-prompt.js)
    CURRENT_PROMPT_TYPE: 'trendy', // 默认使用最新的潮流设计师提示词
    
    // 提示词选项配置
    PROMPT_OPTIONS: {
      classic: {
        name: '经典自然时尚设计师',
        description: '注重自然时尚靓丽，年轻化效果，适合日常实用的发型推荐',
        file: 'design-prompt.js',
        version: '1.0'
      },
      trendy: {
        name: 'AI潮流造型设计师 2.0',
        description: '突破传统束缚，个性化创新，提供5种风格迥异的大胆方案',
        file: 'trendy-designer-prompt.js',
        version: '2.0'
      }
    }
  },
  
  // fal.ai API 配置
  FAL_AI: {
    // 根据最新文档，Flux Kontext API 端点
    BASE_URL: 'https://fal.run/fal-ai/flux-pro/kontext',
    API_KEY: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', // fal.ai API Key
    TIMEOUT: 60000, // 60秒超时
    
    // LORA 模型通用配置
    LORA_CONFIG: {
      BASE_URL: 'https://fal.run/fal-ai/flux-kontext-lora',
      DEFAULT_SCALE: 1.0, // 默认缩放比例
      SUPPORTED_FORMATS: ['safetensors', 'json'] // 支持的文件格式
    },
    
    // 默认参数 - 根据最新 fal.ai Flux Kontext API 文档更新
    // 文档地址: https://fal.ai/models/fal-ai/flux-pro/kontext/api
    DEFAULT_PARAMS: {
      // 核心参数 - Flux Kontext 支持的参数
      guidance_scale: 16.5,                // CFG指导强度，默认3.5，你调整为13.5以获得更强的控制
      sync_mode: false,                    // 异步模式，避免超时
      num_images: 1,                       // 生成图片数量
      safety_tolerance: "5",               // 安全容忍度，1最严格，6最宽松
      output_format: 'jpeg',               // 输出格式：jpeg或png
      
      // 可选参数
      seed: null,                          // 随机种子，null表示随机生成
      aspect_ratio: null                   // 长宽比，null表示使用原图比例
      
      // 注意：以下参数在 Flux Kontext 中不支持，已移除
      // num_inference_steps: 28,          // Kontext 不支持此参数
      // strength: 0.85,                   // Kontext 不支持此参数  
      // enable_safety_checker: true,      // 使用 safety_tolerance 代替
    },
    
    // API 请求头配置
    HEADERS: {
      'Content-Type': 'application/json',
      'User-Agent': 'WeChatMiniProgram/1.0'
    }
  },
  
  // aihubmix LLM API 配置 
  AIHUBMIX: {
    BASE_URL: 'https://aihubmix.com/v1/chat/completions',
    API_KEY: 'sk-6VaE9aI0p1ghfU4PAa8d41B083Ad44B9A9C94a8f15D142Bf',
    MODEL: 'claude-sonnet-4-20250514',
    TIMEOUT: 60000, // 60秒超时
    MAX_TOKENS: 4000,
    TEMPERATURE: 0.7
  },
  
  // 性别选项
  GENDER_OPTIONS: [
    {
      id: 'male',
      name: '男性',
      icon: '👨',
      description: '选择男性发型'
    },
    {
      id: 'female',
      name: '女性',
      icon: '👩',
      description: '选择女性发型'
    }
  ],
  
  // 发型颜色选项 - 时尚流行色系
  HAIR_COLORS: [
    // 金色系 (Blonde Tones)
    {
      id: 1,
      name: '脏金色',
      englishName: 'Dirty Blonde',
      promptValue: 'dirty blonde',
      colorCode: '#c9a876',
      category: 'blonde',
      description: '低调奢华的脏金色'
    },
    {
      id: 2,
      name: '蜂蜜金',
      englishName: 'Honey Blonde',
      promptValue: 'honey blonde',
      colorCode: '#daa520',
      category: 'blonde',
      description: '温暖甜美的蜂蜜色'
    },
    {
      id: 3,
      name: '白金色',
      englishName: 'Platinum Blonde',
      promptValue: 'platinum blonde',
      colorCode: '#f5f5dc',
      category: 'blonde',
      description: '高级冷艳的白金色'
    },
    {
      id: 4,
      name: '香槟金',
      englishName: 'Champagne Blonde',
      promptValue: 'champagne blonde',
      colorCode: '#f7e7ce',
      category: 'blonde',
      description: '优雅迷人的香槟色'
    },
    {
      id: 5,
      name: '奶油金',
      englishName: 'Cream Blonde',
      promptValue: 'cream blonde',
      colorCode: '#fffdd0',
      category: 'blonde',
      description: '柔和温润的奶油色'
    },
    {
      id: 6,
      name: '草莓金',
      englishName: 'Strawberry Blonde',
      promptValue: 'strawberry blonde',
      colorCode: '#ff9166',
      category: 'blonde',
      description: '甜美活泼的草莓金'
    },
    {
      id: 7,
      name: '沙滩金',
      englishName: 'Beach Blonde',
      promptValue: 'beach blonde',
      colorCode: '#f4d03f',
      category: 'blonde',
      description: '阳光海滩的自然金'
    },
    {
      id: 8,
      name: '冰雪金',
      englishName: 'Ice Blonde',
      promptValue: 'ice blonde',
      colorCode: '#f8f8ff',
      category: 'blonde',
      description: '清冷高贵的冰雪金'
    },

    // 棕色系 (Brown Tones)
    {
      id: 9,
      name: '巧克力色',
      englishName: 'Chocolate Brown',
      promptValue: 'chocolate brown',
      colorCode: '#7b3f00',
      category: 'brown',
      description: '浓郁醇厚的巧克力色'
    },
    {
      id: 10,
      name: '摩卡色',
      englishName: 'Mocha Brown',
      promptValue: 'mocha brown',
      colorCode: '#967117',
      category: 'brown',
      description: '温润香醇的摩卡色'
    },
    {
      id: 11,
      name: '栗子色',
      englishName: 'Chestnut Brown',
      promptValue: 'chestnut brown',
      colorCode: '#8b4513',
      category: 'brown',
      description: '自然亮泽的栗子色'
    },
    {
      id: 12,
      name: '焦糖色',
      englishName: 'Caramel Brown',
      promptValue: 'caramel brown',
      colorCode: '#d2691e',
      category: 'brown',
      description: '甜蜜诱人的焦糖色'
    },
    {
      id: 13,
      name: '咖啡色',
      englishName: 'Coffee Brown',
      promptValue: 'coffee brown',
      colorCode: '#6f4e37',
      category: 'brown',
      description: '深邃知性的咖啡色'
    },
    {
      id: 14,
      name: '核桃色',
      englishName: 'Walnut Brown',
      promptValue: 'walnut brown',
      colorCode: '#773f1a',
      category: 'brown',
      description: '典雅沉稳的核桃色'
    },
    {
      id: 15,
      name: '金棕色',
      englishName: 'Golden Brown',
      promptValue: 'golden brown',
      colorCode: '#daa520',
      category: 'brown',
      description: '温暖明亮的金棕色'
    },
    {
      id: 16,
      name: '灰棕色',
      englishName: 'Ash Brown',
      promptValue: 'ash brown',
      colorCode: '#696969',
      category: 'brown',
      description: '时尚冷调的灰棕色'
    },

    // 灰色系 (Gray/Silver Tones)
    {
      id: 17,
      name: '银灰色',
      englishName: 'Silver Gray',
      promptValue: 'silver gray',
      colorCode: '#c0c0c0',
      category: 'gray',
      description: '高贵典雅的银灰色'
    },
    {
      id: 18,
      name: '烟灰色',
      englishName: 'Smoky Gray',
      promptValue: 'smoky gray',
      colorCode: '#708090',
      category: 'gray',
      description: '神秘迷人的烟灰色'
    },
    {
      id: 19,
      name: '珍珠灰',
      englishName: 'Pearl Gray',
      promptValue: 'pearl gray',
      colorCode: '#e5e4e2',
      category: 'gray',
      description: '温润光泽的珍珠灰'
    },
    {
      id: 20,
      name: '钢铁灰',
      englishName: 'Steel Gray',
      promptValue: 'steel gray',
      colorCode: '#71797e',
      category: 'gray',
      description: '坚毅冷酷的钢铁灰'
    },
    {
      id: 21,
      name: '薰衣草灰',
      englishName: 'Lavender Gray',
      promptValue: 'lavender gray',
      colorCode: '#c8a2c8',
      category: 'gray',
      description: '优雅浪漫的薰衣草灰'
    },
    {
      id: 22,
      name: '白银色',
      englishName: 'Metallic Silver',
      promptValue: 'metallic silver',
      colorCode: '#aaa9ad',
      category: 'gray',
      description: '闪耀质感的白银色'
    },

    // 黑色系 (Black Tones)
    {
      id: 23,
      name: '乌黑色',
      englishName: 'Jet Black',
      promptValue: 'jet black',
      colorCode: '#000000',
      category: 'black',
      description: '深邃纯净的乌黑色'
    },
    {
      id: 24,
      name: '蓝黑色',
      englishName: 'Blue Black',
      promptValue: 'blue black',
      colorCode: '#1a1a2e',
      category: 'black',
      description: '神秘深邃的蓝黑色'
    },
    {
      id: 25,
      name: '棕黑色',
      englishName: 'Brown Black',
      promptValue: 'brown black',
      colorCode: '#2f1b14',
      category: 'black',
      description: '温润自然的棕黑色'
    },
    {
      id: 26,
      name: '自然黑',
      englishName: 'Natural Black',
      promptValue: 'natural black',
      colorCode: '#1a1a1a',
      category: 'black',
      description: '经典百搭的自然黑'
    },

    // 红色系 (Red Tones)
    {
      id: 27,
      name: '樱桃红',
      englishName: 'Cherry Red',
      promptValue: 'cherry red',
      colorCode: '#de3163',
      category: 'red',
      description: '鲜艳诱人的樱桃红'
    },
    {
      id: 28,
      name: '酒红色',
      englishName: 'Burgundy Red',
      promptValue: 'burgundy red',
      colorCode: '#800020',
      category: 'red',
      description: '深邃成熟的酒红色'
    },
    {
      id: 29,
      name: '火焰红',
      englishName: 'Fire Red',
      promptValue: 'fire red',
      colorCode: '#ff4500',
      category: 'red',
      description: '热情奔放的火焰红'
    },
    {
      id: 30,
      name: '铜红色',
      englishName: 'Copper Red',
      promptValue: 'copper red',
      colorCode: '#b87333',
      category: 'red',
      description: '温暖质感的铜红色'
    },
    {
      id: 31,
      name: '玫瑰红',
      englishName: 'Rose Red',
      promptValue: 'rose red',
      colorCode: '#ff69b4',
      category: 'red',
      description: '浪漫优雅的玫瑰红'
    },
    {
      id: 32,
      name: '草莓红',
      englishName: 'Strawberry Red',
      promptValue: 'strawberry red',
      colorCode: '#fc5a8d',
      category: 'red',
      description: '甜美可爱的草莓红'
    },

    // 粉色系 (Pink Tones)
    {
      id: 33,
      name: '玫瑰金',
      englishName: 'Rose Gold',
      promptValue: 'rose gold',
      colorCode: '#e8b4cb',
      category: 'pink',
      description: '温柔高级的玫瑰金'
    },
    {
      id: 34,
      name: '樱花粉',
      englishName: 'Sakura Pink',
      promptValue: 'sakura pink',
      colorCode: '#ffb7c5',
      category: 'pink',
      description: '梦幻浪漫的樱花粉'
    },
    {
      id: 35,
      name: '裸粉色',
      englishName: 'Nude Pink',
      promptValue: 'nude pink',
      colorCode: '#f2d2bd',
      category: 'pink',
      description: '自然低调的裸粉色'
    },
    {
      id: 36,
      name: '珊瑚粉',
      englishName: 'Coral Pink',
      promptValue: 'coral pink',
      colorCode: '#ff7f50',
      category: 'pink',
      description: '活力清新的珊瑚粉'
    },
    {
      id: 37,
      name: '荧光粉',
      englishName: 'Neon Pink',
      promptValue: 'neon pink',
      colorCode: '#ff1493',
      category: 'pink',
      description: '炫彩夺目的荧光粉'
    },

    // 紫色系 (Purple Tones)
    {
      id: 38,
      name: '薰衣草色',
      englishName: 'Lavender Purple',
      promptValue: 'lavender purple',
      colorCode: '#e6e6fa',
      category: 'purple',
      description: '清香优雅的薰衣草色'
    },
    {
      id: 39,
      name: '葡萄紫',
      englishName: 'Grape Purple',
      promptValue: 'grape purple',
      colorCode: '#6f2da8',
      category: 'purple',
      description: '深邃神秘的葡萄紫'
    },
    {
      id: 40,
      name: '丁香紫',
      englishName: 'Lilac Purple',
      promptValue: 'lilac purple',
      colorCode: '#dda0dd',
      category: 'purple',
      description: '温柔梦幻的丁香紫'
    },
    {
      id: 41,
      name: '梅子色',
      englishName: 'Plum Purple',
      promptValue: 'plum purple',
      colorCode: '#8e4585',
      category: 'purple',
      description: '成熟迷人的梅子色'
    },
    {
      id: 42,
      name: '紫罗兰',
      englishName: 'Violet Purple',
      promptValue: 'violet purple',
      colorCode: '#8a2be2',
      category: 'purple',
      description: '高贵典雅的紫罗兰'
    },

    // 蓝色系 (Blue Tones)
    {
      id: 43,
      name: '海军蓝',
      englishName: 'Navy Blue',
      promptValue: 'navy blue',
      colorCode: '#000080',
      category: 'blue',
      description: '深沉稳重的海军蓝'
    },
    {
      id: 44,
      name: '钢铁蓝',
      englishName: 'Steel Blue',
      promptValue: 'steel blue',
      colorCode: '#4682b4',
      category: 'blue',
      description: '冷酷质感的钢铁蓝'
    },
    {
      id: 45,
      name: '冰蓝色',
      englishName: 'Ice Blue',
      promptValue: 'ice blue',
      colorCode: '#b0e0e6',
      category: 'blue',
      description: '清冷纯净的冰蓝色'
    },
    {
      id: 46,
      name: '天空蓝',
      englishName: 'Sky Blue',
      promptValue: 'sky blue',
      colorCode: '#87ceeb',
      category: 'blue',
      description: '清新自然的天空蓝'
    },
    {
      id: 47,
      name: '电光蓝',
      englishName: 'Electric Blue',
      promptValue: 'electric blue',
      colorCode: '#7df9ff',
      category: 'blue',
      description: '炫酷科技的电光蓝'
    },

    // 绿色系 (Green Tones)
    {
      id: 48,
      name: '薄荷绿',
      englishName: 'Mint Green',
      promptValue: 'mint green',
      colorCode: '#98fb98',
      category: 'green',
      description: '清新怡人的薄荷绿'
    },
    {
      id: 49,
      name: '森林绿',
      englishName: 'Forest Green',
      promptValue: 'forest green',
      colorCode: '#228b22',
      category: 'green',
      description: '深邃自然的森林绿'
    },
    {
      id: 50,
      name: '翡翠绿',
      englishName: 'Emerald Green',
      promptValue: 'emerald green',
      colorCode: '#50c878',
      category: 'green',
      description: '高贵奢华的翡翠绿'
    },
    {
      id: 51,
      name: '青绿色',
      englishName: 'Teal Green',
      promptValue: 'teal green',
      colorCode: '#008080',
      category: 'green',
      description: '深邃神秘的青绿色'
    },
    {
      id: 52,
      name: '霓虹绿',
      englishName: 'Neon Green',
      promptValue: 'neon green',
      colorCode: '#39ff14',
      category: 'green',
      description: '炫彩夺目的霓虹绿'
    },

    // 莓果色系 (Berry Tones)
    {
      id: 53,
      name: '蓝莓色',
      englishName: 'Blueberry',
      promptValue: 'blueberry color',
      colorCode: '#4f86f7',
      category: 'berry',
      description: '深邃甜美的蓝莓色'
    },
    {
      id: 54,
      name: '覆盆子色',
      englishName: 'Raspberry',
      promptValue: 'raspberry color',
      colorCode: '#e30b5c',
      category: 'berry',
      description: '鲜艳诱人的覆盆子色'
    },
    {
      id: 55,
      name: '桑椹色',
      englishName: 'Mulberry',
      promptValue: 'mulberry color',
      colorCode: '#c54b8c',
      category: 'berry',
      description: '深邃浪漫的桑椹色'
    },
    {
      id: 56,
      name: '蔓越莓色',
      englishName: 'Cranberry',
      promptValue: 'cranberry color',
      colorCode: '#db2d43',
      category: 'berry',
      description: '酸甜活力的蔓越莓色'
    },

    // 特殊效果色
    {
      id: 57,
      name: '彩虹色',
      englishName: 'Rainbow Hair',
      promptValue: 'rainbow multicolor hair',
      colorCode: 'linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)',
      category: 'special',
      description: '炫彩梦幻的彩虹色'
    },
    {
      id: 58,
      name: '独角兽色',
      englishName: 'Unicorn Hair',
      promptValue: 'unicorn pastel multicolor hair',
      colorCode: 'linear-gradient(45deg, #ff69b4, #87ceeb, #dda0dd, #f0e68c)',
      category: 'special',
      description: '梦幻仙气的独角兽色'
    },
    {
      id: 59,
      name: '美人鱼色',
      englishName: 'Mermaid Hair',
      promptValue: 'mermaid blue green teal hair',
      colorCode: 'linear-gradient(45deg, #008080, #40e0d0, #7fffd4)',
      category: 'special',
      description: '神秘深海的美人鱼色'
    },
    {
      id: 60,
      name: '夕阳色',
      englishName: 'Sunset Hair',
      promptValue: 'sunset orange pink purple hair',
      colorCode: 'linear-gradient(45deg, #ff4500, #ff6347, #ff1493, #8a2be2)',
      category: 'special',
      description: '温暖浪漫的夕阳色'
    },
    {
      id: 61,
      name: '银河色',
      englishName: 'Galaxy Hair',
      promptValue: 'galaxy purple blue black hair',
      colorCode: 'linear-gradient(45deg, #000000, #4b0082, #0000ff, #800080)',
      category: 'special',
      description: '神秘深邃的银河色'
    },
    {
      id: 62,
      name: '极光色',
      englishName: 'Aurora Hair',
      promptValue: 'aurora borealis multicolor hair',
      colorCode: 'linear-gradient(45deg, #00ff7f, #00bfff, #ff69b4, #ffd700)',
      category: 'special',
      description: '绚烂多彩的极光色'
    }
  ],

  // 染发类型选项
  DYEING_TYPES: [
    // 基础染发技术
    {
      id: 1,
      name: '全头染色',
      englishName: 'All-over Color',
      promptValue: 'solid color all-over dyeing',
      description: '整体统一色彩，经典百搭',
      icon: '🎨',
      category: 'basic'
    },
    {
      id: 2,
      name: '挑染',
      englishName: 'Highlights',
      promptValue: 'highlights streaks',
      description: '局部亮色提升层次感',
      icon: '✨',
      category: 'basic'
    },
    {
      id: 3,
      name: '低光染',
      englishName: 'Lowlights',
      promptValue: 'lowlights darker streaks',
      description: '深色条纹增加深度',
      icon: '🌑',
      category: 'basic'
    },
    {
      id: 4,
      name: '渐变色',
      englishName: 'Gradient Color',
      promptValue: 'gradient ombre color transition',
      description: '自然色彩过渡效果',
      icon: '🌈',
      category: 'basic'
    },
    {
      id: 5,
      name: '挑染条纹',
      englishName: 'Streaks',
      promptValue: 'color streaks highlights',
      description: '明显的色彩条纹效果',
      icon: '📏',
      category: 'basic'
    },
    {
      id: 6,
      name: '块状染色',
      englishName: 'Color Blocking',
      promptValue: 'color blocking sections',
      description: '分区块的撞色效果',
      icon: '🎯',
      category: 'basic'
    },

    // 渐变染色技术
    {
      id: 7,
      name: '欧姆布雷',
      englishName: 'Ombre',
      promptValue: 'ombre dark to light gradient',
      description: '深到浅的经典渐变',
      icon: '🌅',
      category: 'gradient'
    },
    {
      id: 8,
      name: '反欧姆布雷',
      englishName: 'Reverse Ombre',
      promptValue: 'reverse ombre light to dark',
      description: '浅到深的反向渐变',
      icon: '🌄',
      category: 'gradient'
    },
    {
      id: 9,
      name: '巴拉雅ージ',
      englishName: 'Balayage',
      promptValue: 'balayage hand-painted highlights',
      description: '手绘式自然挑染',
      icon: '🖌️',
      category: 'gradient'
    },
    {
      id: 10,
      name: '颂布雷',
      englishName: 'Sombre',
      promptValue: 'sombre subtle ombre',
      description: '微妙的渐变效果',
      icon: '🌸',
      category: 'gradient'
    },
    {
      id: 11,
      name: '色彩融合',
      englishName: 'Color Melting',
      promptValue: 'color melting seamless blend',
      description: '无缝色彩融合技术',
      icon: '🎭',
      category: 'gradient'
    },
    {
      id: 12,
      name: '根部阴影',
      englishName: 'Root Shadow',
      promptValue: 'root shadow darker roots',
      description: '根部深色阴影效果',
      icon: '🌳',
      category: 'gradient'
    },

    // 特殊效果染色
    {
      id: 13,
      name: '彩虹染',
      englishName: 'Rainbow Hair',
      promptValue: 'rainbow multicolor vibrant hair',
      description: '炫彩多色彩虹效果',
      icon: '🌈',
      category: 'special'
    },
    {
      id: 14,
      name: '油画染',
      englishName: 'Oil Slick Hair',
      promptValue: 'oil slick iridescent dark hair',
      description: '深色彩虹光泽效果',
      icon: '🎨',
      category: 'special'
    },
    {
      id: 15,
      name: '银河染',
      englishName: 'Galaxy Hair',
      promptValue: 'galaxy space cosmic hair',
      description: '神秘星空宇宙效果',
      icon: '🌌',
      category: 'special'
    },
    {
      id: 16,
      name: '独角兽染',
      englishName: 'Unicorn Hair',
      promptValue: 'unicorn pastel fantasy hair',
      description: '梦幻独角兽色彩',
      icon: '🦄',
      category: 'special'
    },
    {
      id: 17,
      name: '美人鱼染',
      englishName: 'Mermaid Hair',
      promptValue: 'mermaid ocean blue green hair',
      description: '海洋美人鱼色调',
      icon: '🧜‍♀️',
      category: 'special'
    },
    {
      id: 18,
      name: '夕阳染',
      englishName: 'Sunset Hair',
      promptValue: 'sunset warm gradient hair',
      description: '温暖夕阳渐变色',
      icon: '🌅',
      category: 'special'
    },

    // 高光/局部染色
    {
      id: 19,
      name: '挑染片',
      englishName: 'Foil Highlights',
      promptValue: 'foil highlights precise sections',
      description: '精准锡纸挑染',
      icon: '📄',
      category: 'highlight'
    },
    {
      id: 20,
      name: '帽子挑染',
      englishName: 'Cap Highlights',
      promptValue: 'cap highlights uniform pattern',
      description: '均匀分布的帽式挑染',
      icon: '🧢',
      category: 'highlight'
    },
    {
      id: 21,
      name: '面框挑染',
      englishName: 'Face-framing Highlights',
      promptValue: 'face-framing highlights around face',
      description: '修饰脸型的面部挑染',
      icon: '💫',
      category: 'highlight'
    },
    {
      id: 22,
      name: '厚重挑染',
      englishName: 'Chunky Highlights',
      promptValue: 'chunky thick highlights bold',
      description: '粗犷明显的挑染条',
      icon: '🔥',
      category: 'highlight'
    },
    {
      id: 23,
      name: '细丝挑染',
      englishName: 'Babylights',
      promptValue: 'babylights fine delicate highlights',
      description: '细腻自然的婴儿挑染',
      icon: '✨',
      category: 'highlight'
    },
    {
      id: 24,
      name: '条纹染',
      englishName: 'Ribbon Highlights',
      promptValue: 'ribbon highlights decorative stripes',
      description: '装饰性的条纹效果',
      icon: '🎀',
      category: 'highlight'
    }
  ],

  // 发型长度选项
  HAIR_LENGTHS: [
    {
      id: 1,
      name: '精灵短发',
      englishName: 'Pixie Cut',
      promptValue: 'pixie cut',
      description: '极短发型，干练精神',
      icon: '✂️',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/icons/精灵短发.jpg'
    },
    {
      id: 2,
      name: '下巴长度',
      englishName: 'Chin Length',
      promptValue: 'chin length',
      description: '刚好到下巴的发型',
      icon: '👤',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/icons/下巴长度.jpg'
    },
    {
      id: 3,
      name: '中等长度',
      englishName: 'Medium Length',
      promptValue: 'medium length',
      description: '适中的发型长度',
      icon: '💁‍♀️',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/icons/中等长度.jpg'
    },
    {
      id: 4,
      name: '齐肩长度',
      englishName: 'Shoulder Length',
      promptValue: 'shoulder length',
      description: '刚好到肩膀的发型',
      icon: '🙋‍♀️',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/icons/齐肩长度.jpg'
    },
    {
      id: 5,
      name: '胸部长度',
      englishName: 'Chest Length',
      promptValue: 'chest length',
      description: '到胸部的长发型',
      icon: '👩‍🦳',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/icons/胸部长度.jpg'
    }
  ],

  // 刘海类型选项
  BANGS_TYPES: [
    {
      id: 1,
      name: '无刘海',
      englishName: 'No Bangs',
      promptValue: 'no bangs',
      description: '清爽的无刘海造型',
      icon: '🚫',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/icons/无刘海.jpg'
    },
    {
      id: 2,
      name: '齐刘海',
      englishName: 'Blunt Bangs',
      promptValue: 'blunt bangs',
      description: '整齐利落的横向刘海',
      icon: '✂️',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/icons/齐刘海.jpg'
    },
    {
      id: 3,
      name: '侧分刘海',
      englishName: 'Side-swept Bangs',
      promptValue: 'side-swept bangs',
      description: '自然侧分的刘海',
      icon: '🌊',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/icons/侧分刘海.jpg'
    },
    {
      id: 4,
      name: '八字刘海',
      englishName: 'Curtain Bangs',
      promptValue: 'curtain bangs',
      description: '中分向两侧弯曲的刘海',
      icon: '🎭',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/icons/八字刘海.jpg'
    },
    {
      id: 5,
      name: '稀疏刘海',
      englishName: 'Wispy Bangs',
      promptValue: 'wispy bangs',
      description: '轻薄飘逸的刘海',
      icon: '🍃',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/icons/稀疏刘海.jpg'
    },
    {
      id: 6,
      name: '超短刘海',
      englishName: 'Baby Bangs',
      promptValue: 'baby bangs',
      description: '非常短的个性刘海',
      icon: '👶',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/icons/超短刘海.jpg'
    }
  ],

  // 发型样式选项
  HAIR_STYLES_TYPES: [
    // 直发造型
    {
      id: 1,
      name: '直发',
      englishName: 'Straight Hair',
      promptValue: 'straight hair',
      description: '自然顺直的发型',
      icon: '📏',
      category: 'straight'
    },
    {
      id: 2,
      name: '光滑顺直',
      englishName: 'Sleek',
      promptValue: 'sleek straight hair',
      description: '光泽感十足的顺直发',
      icon: '✨',
      category: 'straight'
    },
    {
      id: 3,
      name: '齐切发型',
      englishName: 'Blunt Cut',
      promptValue: 'blunt cut straight',
      description: '整齐利落的直发切线',
      icon: '✂️',
      category: 'straight'
    },
    {
      id: 4,
      name: '齐长发',
      englishName: 'One-length',
      promptValue: 'one-length straight',
      description: '统一长度的直发',
      icon: '📐',
      category: 'straight'
    },
    // 卷发造型
    {
      id: 5,
      name: '卷发',
      englishName: 'Curly Hair',
      promptValue: 'curly hair',
      description: '自然蓬松的卷发',
      icon: '🌀',
      category: 'curly'
    },
    {
      id: 6,
      name: '波浪卷',
      englishName: 'Waves',
      promptValue: 'wavy hair',
      description: '优雅的波浪造型',
      icon: '🌊',
      category: 'curly'
    },
    {
      id: 7,
      name: '海滩波浪',
      englishName: 'Beach Waves',
      promptValue: 'beach waves',
      description: '自然随性的海滩风',
      icon: '🏖️',
      category: 'curly'
    },
    {
      id: 8,
      name: '螺旋卷',
      englishName: 'Spiral Curls',
      promptValue: 'spiral curls',
      description: '螺旋形的卷发造型',
      icon: '🌪️',
      category: 'curly'
    },
    {
      id: 9,
      name: '松散卷发',
      englishName: 'Loose Curls',
      promptValue: 'loose curls',
      description: '轻松自然的大卷',
      icon: '💫',
      category: 'curly'
    },
    {
      id: 10,
      name: '紧密卷发',
      englishName: 'Tight Curls',
      promptValue: 'tight curls',
      description: '紧致有型的小卷',
      icon: '🔄',
      category: 'curly'
    },
    // 层次发型
    {
      id: 11,
      name: '层次剪',
      englishName: 'Layered Cut',
      promptValue: 'layered haircut',
      description: '丰富层次的发型',
      icon: '🗻',
      category: 'layered'
    },
    {
      id: 12,
      name: '羽毛层次',
      englishName: 'Feathered Hair',
      promptValue: 'feathered hair',
      description: '羽毛般轻盈的层次',
      icon: '🪶',
      category: 'layered'
    },
    {
      id: 13,
      name: '碎发层次',
      englishName: 'Shag',
      promptValue: 'shag haircut',
      description: '随性不羁的碎发',
      icon: '✨',
      category: 'layered'
    },
    {
      id: 14,
      name: '狼尾发型',
      englishName: 'Wolf Cut',
      promptValue: 'wolf cut',
      description: '前短后长的个性造型',
      icon: '🐺',
      category: 'layered'
    }
  ],
  
  // 男性发型样式
  MALE_HAIR_STYLES: [
    {
      id: 1,
      name: '平头发型',
      description: 'Crew Cut - 经典简洁的平头造型',
      promptTemplate: 'keep character consistent; only change the haircut: {COLOR}, military cut, clean fade;',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/male/crew_cut_hairstyle.jpg'
    },
    {
      id: 2,
      name: '飞机头发型',
      description: 'Quiff - 时尚立体的飞机头造型',
      promptTemplate: 'keep character consistent; only change the haircut: Modern pompadour, high fade sides, dark {COLOR} hair, voluminous top, slicked back, business style',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/male/quiff_hairstyle.jpg'
    },
    {
      id: 3,
      name: '渐变寸头',
      description: 'Buzz Cut Fade - 现代渐变寸头造型',
      promptTemplate: 'keep character consistent; only change the haircut: {COLOR}, buzz cut fade;',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/male/buzz_cut_fade_hairstyle.jpg'
    },
    {
      id: 4,
      name: '寸头发型',
      description: 'Buzz Cut - 简约干净的寸头造型',
      promptTemplate: 'keep character consistent; only change the haircut: Ultra-short buzz cut, nearly bald, {COLOR} hair, military style, #1 guard all over;',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/male/buzz_cut_hairstyle.jpg'
    },
    {
      id: 5,
      name: '卷发渐变',
      description: 'Curly Hair Fade - 时尚卷发渐变造型',
      promptTemplate: 'keep character consistent; only change the haircut: {COLOR}, curly hair fade;',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/male/curly_hair_fade_hairstyle.jpg'
    },
    {
      id: 6,
      name: '偏分发型',
      description: 'Comb Over - 优雅商务偏分造型',
      promptTemplate: 'keep character consistent; only change the haircut: classic side part, slicked back,  wet look, {COLOR}',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/male/comb_over_hairstyle.jpg'
    },
    {
      id: 7,
      name: '莫霍克发型',
      description: 'Mohawk - 朋克风莫霍克造型',
      promptTemplate: 'keep character consistent; only change the haircut:Mohawk haircut, shaved sides, spiky {COLOR} tips, dark roots, punk style, textured top',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/male/mohawk_hairstyle.jpg'
    },
    {
      id: 8,
      name: '蓬巴杜发型',
      description: 'Pompadour - 复古经典蓬巴杜造型',
      promptTemplate: 'keep character consistent; only change the haircut: {COLOR}, pompadour hairstyle;',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/male/pompadour_hairstyle.jpg'
    },
    {
      id: 9,
      name: '法式短发',
      description: 'French Crop - 简约法式短发造型',
      promptTemplate: 'keep character consistent; only change the haircut:  textured crop fade, wavy {COLOR} hair, mid fade sides, modern barbershop cut',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/male/french_crop_hairstyle.jpg'
    },
    {
      id: 10,
      name: '锯齿分发',
      description: 'Zig Zag Part - 个性锯齿分线造型',
      promptTemplate: 'keep character consistent; only change the haircut: high top fade, geometric line design, flat top, kinky hair texture, razor art pattern, {COLOR}',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/male/zig_zag_part_hairstyle.jpg'
    },
    {
      id: 11,
      name: '脏辫发型',
      description: 'Dreadlocks - 嘻哈风脏辫造型',
      promptTemplate: 'keep character consistent; only change the haircut: {COLOR}, dreadlocks hairstyle;',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/male/dreadlocks_haristyle.jpg'
    },
    {
      id: 12,
      name: '栗子头',
      description: 'Rounded Dome Shape - 栗子头造型',
      promptTemplate: 'keep character consistent; only change the haircut: chestnut cut',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/male/栗子头.png',
      useLora: true, // 标记此发型使用 LORA 模型
      specialModel: 'flux-kontext-lora',
      // 栗子头专用的 LORA 配置
      loraConfig: {
        modelName: 'chestnut-hairstyle-lora',
        version: '1.0',
        scale: 1.0, // LORA 缩放比例
        description: '栗子头发型专用的 LORA 模型配置',
        files: {
          diffusers_lora_file: {
            url: "https://v3.fal.media/files/kangaroo/klW6z-3kuQ7Qs2rIwI_vr_adapter_model.safetensors",
            content_type: "application/octet-stream",
            file_name: "adapter_model.safetensors",
            file_size: 306596088
          },
          config_file: {
            url: "https://v3.fal.media/files/lion/ve3PcHJD1SpKouaWkVmZ8_config_1312e646-5947-4330-87d1-900aebb87628.json",
            content_type: "application/octet-stream",
            file_name: "config_1312e646-5947-4330-87d1-900aebb87628.json",
            file_size: 246
          }
        }
      }
    },
    // 宝宝发型系列
    {
      id: 13,
      name: '中分纹理',
      description: 'Center Part Textured - 自然中分纹理造型',
      promptTemplate: 'keep character consistent; only change the haircut: center part textured hair, natural tousled layers, soft messy finish, {COLOR}',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/boy_hairstyle/纹理中分.jpg'
    },
    {
      id: 14,
      name: '中分碎发',
      description: 'Center Part Choppy - 中分碎发层次造型',
      promptTemplate: 'keep character consistent; only change the haircut: center part choppy layers, sharp middle part, textured messy hair with uneven pieces, {COLOR}',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/boy_hairstyle/中分碎发.jpg'
    },
    {
      id: 15,
      name: '三七侧背',
      description: 'Side Part Slicked Back - 经典三七侧背造型',
      promptTemplate: 'keep character consistent; only change the haircut: sharp 30-70 side part, slicked back hair, clean combed back style, polished finish, {COLOR}',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/boy_hairstyle/三七侧背.jpg'
    },
    {
      id: 16,
      name: '微分碎盖',
      description: 'Subtle Side Part Bowl Cut - 微分碎盖造型',
      promptTemplate: 'keep character consistent; only change the haircut: subtle side part bowl cut, barely visible part, choppy textured hair, covers forehead, soft asymmetrical finish, {COLOR}',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/boy_hairstyle/微分碎盖.jpg'
    },
    {
      id: 17,
      name: '齐发碎盖',
      description: 'Straight Bangs Bowl Cut - 齐发碎盖造型',
      promptTemplate: 'keep character consistent; only change the haircut: straight bangs bowl cut, no part, symmetrical fringe, choppy textured hair, covers forehead, blunt horizontal cut, {COLOR}',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/boy_hairstyle/齐发碎盖.jpg'
    },
    {
      id: 18,
      name: '锅盖头',
      description: 'Natural Bowl Cut - 自然锅盖头造型',
      promptTemplate: 'keep character consistent; only change the haircut: natural bowl cut with bangs, straight fringe covering forehead, no styling products, soft natural texture, {COLOR}',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/boy_hairstyle/锅盖头.jpg'
    },
    {
      id: 19,
      name: '美式寸头',
      description: 'American Crew Cut - 美式寸头造型',
      promptTemplate: 'keep character consistent; only change the haircut: American crew cut, very short buzz cut, uniform length all over, clean military style, {COLOR}',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/boy_hairstyle/美式寸头.jpg'
    },
    {
      id: 20,
      name: '美式前刺',
      description: 'American Style Front Spikes - 美式前刺造型',
      promptTemplate: 'keep character consistent; only change the haircut: American style front spikes, structured forward spikes, clean fade sides, classic spiked texture, {COLOR}',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/boy_hairstyle/美式前刺.jpg'
    },
    {
      id: 21,
      name: '短发前刺',
      description: 'Short Front Spikes - 短发前刺造型',
      promptTemplate: 'keep character consistent; only change the haircut: short front spikes, textured spiky hair pointing forward, short sides, short voluminous spiked top, {COLOR}',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/boy_hairstyle/短发前刺.jpg'
    },
    {
      id: 22,
      name: '背头发型',
      description: 'Slicked Back - 经典商务背头造型',
      promptTemplate: 'keep character consistent; only change the haircut:Slicked-back, side part, {COLOR}, pomade styled, classic formal hairstyle',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/male/slicked_back_hairstyle.jpg'
    },
    {
      id: 23,
      name: '飞机头',
      description: 'Pompadour Quiff - 飞机头造型',
      promptTemplate: 'keep character consistent; only change the haircut: pompadour quiff, voluminous top swept up and back, fade sides, classic airplane style, {COLOR}',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/boy_hairstyle/飞机头.jpg'
    },
    {
      id: 24,
      name: '韩式纹理',
      description: 'Korean Textured Hair - 韩式纹理造型',
      promptTemplate: 'keep character consistent; only change the haircut: Korean textured hair, natural wavy texture, soft layered cut, medium length, messy finish, {COLOR}',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/boy_hairstyle/韩式纹理.jpg'
    }
  ],
  
  // 女性发型样式
  FEMALE_HAIR_STYLES: [
    {
      id: 1,
      name: '波波头',
      description: 'Bob Cut - 经典优雅的波波头造型',
      promptTemplate: 'keep character consistent; only change the hair style: {COLOR}, bob cut hairstyle;',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/female/Bob_cut_female_hairstyle.jpg'
    },
    {
      id: 2,
      name: '挑染红发',
      description: 'Balayage Red - 时尚挑染红发造型',
      promptTemplate: 'keep character consistent; only change the hair style: {COLOR}, balayage red hairstyle;',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/female/Balayage_red_female_hairstyle.jpg'
    },
    {
      id: 3,
      name: '马卡龙色',
      description: 'Pastel Colors - 甜美马卡龙色彩造型',
      promptTemplate: 'keep character consistent; only change the hair style: {COLOR}, pastel colored hairstyle;',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/female/Pastel_colored_hairstyle.jpg'
    },
    {
      id: 4,
      name: '中长发波浪',
      description: 'Shoulder Length Waves - 中长发波浪卷造型',
      promptTemplate: 'keep character consistent; only change the hair style: {COLOR}, shoulder length blonde bob with curtain bangs and soft waves;',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/female/shoulder_length_blonde_bob_with_curtain_bangs_and_soft_waves_female_hairstyle.jpg'
    },
    {
      id: 5,
      name: '精灵短发',
      description: 'Pixie Cut - 时尚干练的精灵短发造型',
      promptTemplate: 'keep character consistent; only change the hair style: {COLOR}, pixie cut hairstyle;',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/female/pixie_cut_hairstyle.jpg'
    },
    {
      id: 6,
      name: '玉米辫',
      description: 'Cornrows - 个性编织玉米辫造型',
      promptTemplate: 'keep character consistent; only change the hair style: {COLOR}, cornrows hairstyle;',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/female/cornrows_hairstyle.jpg'
    },
    {
      id: 7,
      name: '双马尾',
      description: 'Pigtails - 可爱活泼的双马尾造型',
      promptTemplate: 'keep character consistent; only change the hair style: {COLOR}, pigtails hairstyle;',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/female/pigtails_hairstyle.jpg'
    },
    {
      id: 8,
      name: '马尾辫',
      description: 'Ponytail - 经典简约的马尾辫造型',
      promptTemplate: 'keep character consistent; only change the hair style: {COLOR}, ponytail hairstyle;',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/female/ponytail_hairstyle.jpg'
    },
    // 女童发型系列
    {
      id: 9,
      name: '蘑菇头',
      description: 'Mushroom Bob - 经典蘑菇头造型',
      promptTemplate: 'keep character consistent; only change the haircut: classic mushroom bob haircut, blunt straight bangs covering eyebrows, chin-length rounded bob, symmetrical cut, smooth straight hair, dome shape, cute and sweet style, {COLOR}',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/girl_hairstyle/蘑菇头.jpg'
    },
    {
      id: 10,
      name: '波波卷',
      description: 'Bob with Curls - 波波卷发造型',
      promptTemplate: 'keep character consistent; only change the haircut: classic bob with soft curls, blunt bangs, chin-length curly bob, voluminous texture, natural wavy finish, {COLOR}',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/girl_hairstyle/波波卷.jpg'
    },
    // {
    //   id: 11,
    //   name: '公主切',
    //   description: 'Hime Cut - 日式公主切造型',
    //   promptTemplate: 'keep character consistent; only change the haircut: classic hime cut, straight blunt bangs, long hair with dramatic side layering, sharp geometric cut at face sides, {COLOR}',
    //   image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/girl_hairstyle/公主切.jpg'
    // },
    {
      id: 12,
      name: '蓬松短卷发',
      description: 'Short Fluffy Curls - 蓬松短卷发造型',
      promptTemplate: 'keep character consistent; only change the haircut: short fluffy curly hair, voluminous curls, wispy bangs, textured waves, bouncy finish, natural curly style, {COLOR}',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/girl_hairstyle/蓬松短卷发.jpg'
    },
    {
      id: 13,
      name: '中长自然卷发',
      description: 'Medium Natural Curls - 中长自然卷发造型',
      promptTemplate: 'keep character consistent; only change the haircut: medium length curly hair, soft natural waves, wispy bangs, shoulder-length wavy hair, loose curls, natural texture, {COLOR}',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/girl_hairstyle/中长卷发.jpg'
    },
    {
      id: 14,
      name: '直发中长发',
      description: 'Medium Straight Hair - 中长直发造型',
      promptTemplate: 'keep character consistent; only change the haircut: medium length straight hair, sleek and smooth texture, shoulder-length cut, neat straight bangs, classic and elegant style, silky finish, {COLOR}',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/girl_hairstyle/直发中长发.jpg'
    },
    {
      id: 15,
      name: '长直发',
      description: 'Long Straight Hair - 长直发造型',
      promptTemplate: 'keep character consistent; only change the haircut: long straight hair flowing down to chest, silky smooth texture, straight bangs, elegant and graceful style, sleek finish, princess-like appearance, {COLOR}',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/girl_hairstyle/长直发.jpg'
    },
    {
      id: 16,
      name: '双马尾',
      description: 'Twin Pigtails - 双马尾造型',
      promptTemplate: 'keep character consistent; only change the haircut: cute twin pigtails hairstyle, high side ponytails with colorful hair ties, playful and energetic style, neat bangs, symmetrical pigtails, adorable and youthful look, {COLOR}',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/girl_hairstyle/双马尾.jpg'
    },
    {
      id: 17,
      name: '高马尾',
      description: 'High Ponytail - 高马尾造型',
      promptTemplate: 'keep character consistent; only change the haircut: high ponytail hairstyle, hair pulled back sleekly, neat straight bangs, clean and sporty look, energetic and fresh style, ponytail secured high on head, {COLOR}',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/girl_hairstyle/高马尾.jpg'
    },
    {
      id: 18,
      name: '半扎发',
      description: 'Half-up Half-down - 半扎发造型',
      promptTemplate: 'keep character consistent; only change the haircut: half-up half-down hairstyle, upper section of hair tied with cute accessory, lower hair flowing freely, soft bangs, sweet and feminine style, balanced and charming look, {COLOR}',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/girl_hairstyle/半扎发.jpg'
    },
    {
      id: 19,
      name: '长卷发',
      description: 'Long Curly Hair - 长卷发造型',
      promptTemplate: 'keep character consistent; only change the haircut: long curly hair with big romantic waves, chest-length flowing curls, soft bangs, voluminous texture, princess-style curls, dreamy and elegant finish, {COLOR}',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/girl_hairstyle/长卷发.jpg'
    },
    {
      id: 20,
      name: '自然卷发',
      description: 'Natural Curly Hair - 自然卷发造型',
      promptTemplate: 'keep character consistent; only change the haircut: natural curly hair, soft flowing waves, wispy light bangs, medium to shoulder-length wavy hair, loose natural curls, textured finish, carefree and sweet style, {COLOR}',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/girl_hairstyle/自然卷发.jpg'
    },
    {
      id: 21,
      name: '挂耳短发',
      description: 'Tucked Behind Ear - 挂耳短发造型',
      promptTemplate: 'keep character consistent; only change the haircut: tucked-behind-ear short hair, soft bangs, shoulder-length hair tucked behind ears, hair accessory headband, clean and neat style, sweet and tidy look, {COLOR}',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/girl_hairstyle/挂耳短发.jpg'
    },
    {
      id: 22,
      name: '公主锁骨发',
      description: 'Princess Collarbone Hair - 公主锁骨发造型',
      promptTemplate: 'keep character consistent; only change the haircut: princess collarbone hair, soft bangs, collarbone-length hair with face-framing layers, gentle waves, romantic and sweet style, {COLOR}',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/girl_hairstyle/公主锁骨发.jpg'
    },
    {
      id: 23,
      name: '空气锁骨发',
      description: 'Air Collarbone Hair - 空气锁骨发造型',
      promptTemplate: 'keep character consistent; only change the haircut: air collarbone hair, wispy airy bangs, collarbone-length hair with light layered texture, soft flowing hair, natural movement, effortless style, {COLOR}',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/girl_hairstyle/空气锁骨发.jpg'
    },
    // 特殊发型样式（放在最后）
    {
      id: 24,
      name: '瀑布编发',
      description: 'Waterfall Braid - 浪漫瀑布编发造型',
      promptTemplate: 'keep character consistent; only change the hair style: {COLOR}, waterfall braid hairstyle;',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/female/Waterfall_braid_female_hairstyle.jpg'
    },
    {
      id: 25,
      name: '脏辫发型',
      description: 'Dreadlocks - 嘻哈风脏辫造型',
      promptTemplate: 'keep character consistent; only change the hair style: {COLOR}, dreadlocks hairstyle;',
      image: 'cloud://cloudbase-4gd3fd27776a1757.636c-cloudbase-4gd3fd27776a1757-1363155185/images/female/dreadlocks_haristyle.jpg'
    }
  ],
  
  // 根据性别获取发型列表
  getHairStylesByGender(gender) {
    if (gender === 'male') {
      return this.MALE_HAIR_STYLES
    } else if (gender === 'female') {
      return this.FEMALE_HAIR_STYLES
    }
    return []
  },

  // 根据性别获取潮流时尚发型列表
  getTrendyHairstylesByGender(gender) {
    if (gender === 'male') {
      return this.MALE_HAIR_STYLES.slice(0, 12) // 前12个是潮流时尚发型
    } else if (gender === 'female') {
      return this.FEMALE_HAIR_STYLES.slice(0, 8) // 前8个是潮流时尚发型
    }
    return []
  },

  // 根据性别获取宝宝发型列表
  getBabyHairstylesByGender(gender) {
    if (gender === 'male') {
      return this.MALE_HAIR_STYLES.slice(12) // 后12个是宝宝发型
    } else if (gender === 'female') {
      return this.FEMALE_HAIR_STYLES.slice(8, 22) // 中间14个是宝宝发型 (从蘑菇头到空气锁骨发)
    }
    return []
  },

  // 根据性别获取特殊发型列表
  getSpecialHairstylesByGender(gender) {
    if (gender === 'male') {
      return [] // 男性暂无特殊发型
    } else if (gender === 'female') {
      return this.FEMALE_HAIR_STYLES.slice(22) // 最后2个是特殊发型 (瀑布编发和脏辫发型)
    }
    return []
  },
  
  // 动态生成AI提示词
  generatePrompt(hairStyle, hairColor, hairLength = null, bangsType = null, styleType = null, dyeingType = null) {
    // 如果没有发型，返回默认提示词
    if (!hairStyle) {
      return 'keep character consistent; only change the hair style: grey color, buzz cut;'
    }
    
    // 如果没有选择颜色，{COLOR} 替换为空字符串
    const colorValue = hairColor ? hairColor.promptValue : ''
    
    let prompt = hairStyle.promptTemplate.replace('{COLOR}', colorValue)
    
    // 清理可能的多余逗号和空格（当颜色为空时）
    prompt = prompt.replace(/:\s*,\s*/g, ': ')          // 清理 ": , " 格式
    prompt = prompt.replace(/,\s*,/g, ',')              // 清理连续逗号
    prompt = prompt.replace(/,\s*;/g, ';')              // 清理结尾多余逗号
    prompt = prompt.replace(/:\s+hair,\s*/g, ': ')      // 清理 ": hair, " 格式
    prompt = prompt.replace(/\s+hair\s+/g, ' ')         // 清理多余的 "hair" 词
    prompt = prompt.replace(/:\s+/g, ': ')              // 清理冒号后的多余空格
    
    // 构建额外的发型特征数组
    const features = []
    
    // 如果选择了发型长度，添加长度信息
    if (hairLength && hairLength.promptValue) {
      features.push(hairLength.promptValue)
    }
    
    // 如果选择了发型样式，添加样式信息
    if (styleType && styleType.promptValue) {
      features.push(styleType.promptValue)
    }
    
    // 如果选择了刘海类型，添加刘海信息（除了"无刘海"选项）
    if (bangsType && bangsType.promptValue && bangsType.promptValue !== 'no bangs') {
      features.push(bangsType.promptValue)
    }
    
    // 如果选择了染发类型，添加染发技术信息
    if (dyeingType && dyeingType.promptValue) {
      features.push(dyeingType.promptValue)
    }
    
    // 将特征添加到提示词中
    if (features.length > 0) {
      const featuresStr = features.join(', ')
      prompt = prompt.replace('haircut:', `haircut: ${featuresStr},`)
      prompt = prompt.replace('hair style:', `hair style: ${featuresStr},`)
    }
    
    return prompt
  },

  // 生成只包含用户选择特征的AI提示词（不依赖具体发型模板）
  generateCustomPrompt(hairColor = null, hairLength = null, bangsType = null, styleType = null, dyeingType = null) {
    // 构建发型特征数组
    const features = []
    
    // 如果选择了发型长度，添加长度信息
    if (hairLength && hairLength.promptValue) {
      features.push(hairLength.promptValue)
    }
    
    // 如果选择了发型样式，添加样式信息
    if (styleType && styleType.promptValue) {
      features.push(styleType.promptValue)
    }
    
    // 如果选择了刘海类型，添加刘海信息（除了"无刘海"选项）
    if (bangsType && bangsType.promptValue && bangsType.promptValue !== 'no bangs') {
      features.push(bangsType.promptValue)
    }
    
    // 如果选择了发型颜色，添加颜色信息
    if (hairColor && hairColor.promptValue) {
      features.push(hairColor.promptValue)
    }
    
    // 如果选择了染发类型，添加染发技术信息
    if (dyeingType && dyeingType.promptValue) {
      features.push(dyeingType.promptValue)
    }
    
    // 如果没有任何特征，返回基础提示词
    if (features.length === 0) {
      return 'keep character consistent; only change the hair style: modern stylish hairstyle;'
    }
    
    // 构建完整的提示词
    const featuresStr = features.join(', ')
    return `keep character consistent; only change the hair style: ${featuresStr};`
  },
  
  // 生成针对 Flux Kontext 优化的提示词
  generateKontextPrompt(hairStyle, hairColor, enhanceContext = true) {
    if (!hairStyle) {
      return this.generatePrompt(hairStyle, hairColor)
    }
    
    // Flux Kontext 更适合自然语言描述
    const colorPart = hairColor ? `${hairColor.name.toLowerCase()} ` : ''
    const naturalPrompt = `Change the hairstyle to a ${colorPart}${hairStyle.name.toLowerCase()} hairstyle`
    
    if (enhanceContext) {
      return naturalPrompt + ', keeping everything else about the person unchanged, maintaining their natural facial features and expression'
    }
    
    return naturalPrompt
  },

  // 统一的调试日志输出方法
  debugLog(...args) {
    if (this.DEBUG_MODE) {
      console.log(...args)
    }
  },

  // 统一的调试警告输出方法
  debugWarn(...args) {
    if (this.DEBUG_MODE) {
      console.warn(...args)
    }
  },

  // 统一的调试错误输出方法
  debugError(...args) {
    if (this.DEBUG_MODE) {
      console.error(...args)
    }
  },
  
  // 验证API配置是否正确 - 针对 Flux Kontext API
  validateConfig() {
    const issues = []
    
    // 检查基本配置
    if (!this.FAL_AI.API_KEY || this.FAL_AI.API_KEY === 'YOUR_API_KEY_HERE') {
      issues.push('❌ API Key 未配置或使用默认值')
    }
    
    if (!this.FAL_AI.BASE_URL.startsWith('https://')) {
      issues.push('❌ API URL 格式不正确')
    }
    
    if (!this.FAL_AI.BASE_URL.includes('flux-pro/kontext')) {
      issues.push('❌ API URL 应该指向 Flux Kontext 端点')
    }
    
    // 检查 Flux Kontext 特定参数
    const params = this.FAL_AI.DEFAULT_PARAMS
    
    if (params.guidance_scale < 1 || params.guidance_scale > 30) {
      issues.push('⚠️ guidance_scale 建议范围 1-30，当前值: ' + params.guidance_scale)
    }
    
    if (params.safety_tolerance && !['1', '2', '3', '4', '5', '6'].includes(params.safety_tolerance)) {
      issues.push('❌ safety_tolerance 必须是 "1"-"6" 之间的字符串')
    }
    
    if (params.output_format && !['jpeg', 'png'].includes(params.output_format)) {
      issues.push('❌ output_format 必须是 "jpeg" 或 "png"')
    }
    
    if (params.num_images && (params.num_images < 1 || params.num_images > 4)) {
      issues.push('⚠️ num_images 建议范围 1-4')
    }
    
    // 检查不支持的参数
    const unsupportedParams = ['num_inference_steps', 'strength', 'enable_safety_checker']
    unsupportedParams.forEach(param => {
      if (params.hasOwnProperty(param)) {
        issues.push(`⚠️ 参数 "${param}" 在 Flux Kontext 中不支持，建议移除`)
      }
    })
    
    if (issues.length === 0) {
      this.debugLog('✅ Flux Kontext API 配置验证通过')
      this.debugLog(`📊 当前配置: guidance_scale=${params.guidance_scale}, safety_tolerance=${params.safety_tolerance}`)
      return { valid: true, issues: [] }
    } else {
      this.debugWarn('⚠️ Flux Kontext API 配置存在问题:')
      issues.forEach(issue => this.debugWarn(issue))
      return { valid: false, issues }
    }
  },
  
  // 生成测试请求数据，用于验证 API 连接
  generateTestRequest() {
    return {
      ...this.FAL_AI.DEFAULT_PARAMS,
      prompt: "Change the hairstyle to a short modern cut while keeping the person's face and features exactly the same",
      image_url: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=" // 1x1 像素的测试图片
    }
  },
  
  // API 使用建议和最佳实践
  BEST_PRACTICES: {
    guidance_scale: {
      low: '1-5: 生成更自然、更随意的结果',
      medium: '6-15: 平衡创意和控制，推荐范围',  
      high: '16-30: 严格遵循提示词，可能过度处理'
    },
    safety_tolerance: {
      '1': '最严格 - 过滤所有可能不当内容',
      '2': '严格 - 默认推荐设置',
      '3': '中等 - 平衡安全和创意',
      '4': '宽松 - 允许更多创意表达',
      '5': '很宽松 - 最小化内容过滤',
      '6': '最宽松 - 几乎不过滤内容'
    },
    prompt_tips: [
      '使用自然语言描述，Flux Kontext 理解上下文',
      '明确指出要保持不变的部分（如面部特征）',
      '描述具体的发型名称而不是抽象概念',
      '可以包含颜色、长度、质感等详细描述'
    ]
  },

  // 动态读取提示词文件内容（支持多种提示词选择）
  getDesignPrompt(promptType = null) {
    // 确定使用哪种提示词类型
    const selectedPromptType = promptType || this.PROMPT_CONFIG.CURRENT_PROMPT_TYPE
    const promptConfig = this.PROMPT_CONFIG.PROMPT_OPTIONS[selectedPromptType]
    
    if (!promptConfig) {
      this.debugWarn('未知的提示词类型:', selectedPromptType, '，使用默认类型')
      return this.getDesignPrompt('trendy')
    }
    
    this.debugLog('=== 提示词选择信息 ===')
    this.debugLog('选择类型:', selectedPromptType)
    this.debugLog('提示词名称:', promptConfig.name)
    this.debugLog('版本:', promptConfig.version)
    this.debugLog('描述:', promptConfig.description)
    this.debugLog('=====================')
    
    try {
      // 方案1: 尝试通过模块导入读取（推荐方式）
      try {
        let promptModule = null
        let promptContent = null
        
        if (selectedPromptType === 'classic') {
          promptModule = require('../prompts/design-prompt.js')
          promptContent = promptModule?.DESIGN_PROMPT
        } else if (selectedPromptType === 'trendy') {
          promptModule = require('../prompts/trendy-designer-prompt.js')
          promptContent = promptModule?.TRENDY_DESIGNER_PROMPT
        }
        
        if (promptModule && promptContent) {
          this.debugLog('=== 通过模块导入读取提示词成功 ===')
          this.debugLog('提示词来源:', `prompts/${promptConfig.file} 模块`)
          this.debugLog('提示词类型:', promptConfig.name)
          this.debugLog('文件大小:', promptContent.length, '字符')
          this.debugLog('========================================')
          return promptContent
        }
      } catch (moduleError) {
        this.debugLog('模块导入失败，尝试文件系统读取:', moduleError.message)
      }
      
      // 方案2: 尝试文件系统API读取（备用方式）
      // 微信小程序中，我们需要使用不同的方式来读取项目文件
      // 尝试多种可能的文件路径
      const possiblePaths = [
        '/prompts/flux_kontext_design_prompt.md',
        'prompts/flux_kontext_design_prompt.md',
        './prompts/flux_kontext_design_prompt.md',
        'flux_kontext_design_prompt.md'
      ]
      
      const fs = wx.getFileSystemManager()
      
      for (const filePath of possiblePaths) {
        try {
          this.debugLog('尝试读取文件路径:', filePath)
          const fileContent = fs.readFileSync(filePath, 'utf8')
          
          this.debugLog('=== 提示词文件读取成功 ===')
          this.debugLog('成功的文件路径:', filePath)
          this.debugLog('文件大小:', fileContent.length, '字符')
          this.debugLog('==============================')
          
          return fileContent
          
        } catch (pathError) {
          this.debugLog('路径', filePath, '读取失败，尝试下一个路径')
          continue
        }
      }
      
      // 所有路径都失败了，抛出错误
      throw new Error('所有可能的文件路径都无法访问')
      
    } catch (error) {
      this.debugError('读取提示词文件失败:', error)
      this.debugWarn('无法通过模块导入或文件系统读取，使用内置备用提示词')
      
      // 方案3: 如果前两种方案都失败，返回对应类型的内置备用提示词
      if (selectedPromptType === 'trendy') {
        return this.getTrendyDesignPrompt()
      } else {
        return this.getLatestDesignPrompt()
      }
    }
  },

  // 最新的优化提示词（当文件读取失败时使用）
  getLatestDesignPrompt() {
    return `你是一位专业的形象设计师和AI图像生成专家。请按照以下步骤完成任务：

**第一步：图片分析**
仔细观察提供的人物图片，分析并识别：
1. 年龄范围（儿童/青少年/青年/中年/老年）
2. 性别（男性/女性）
3. 脸型特征：
   - 圆形脸：脸部宽度和长度相近，下巴圆润
   - 方形脸：下颌线条明显，脸部宽度较大
   - 长形脸：脸部长度明显大于宽度
   - 心形脸：额头较宽，下巴尖细
   - 椭圆形脸：脸部比例均匀，轮廓柔和
   - 菱形脸：颧骨突出，额头和下巴较窄
4. 其他特征：肤色、五官特点、现有发型
5. 头部和颈部结构：头型、颈部长短、肩膀宽窄
6. 发质特性：发量厚薄、发质粗细、自然卷曲度、生长方向

**第二步：发型匹配分析**
根据分析结果，应用以下原则推荐适合的发型：

**💫 核心设计理念：自然时尚 + 年轻靓丽**
- 所有推荐发型必须体现自然流畅的美感
- 融入当下最流行的时尚元素
- 突出靓丽动人的视觉效果
- 优先选择具有年轻化效果的造型
- 避免老气、沉闷、过于保守的设计

**圆形脸：时尚修颜型**
- 发型策略：利用层次和线条拉长脸型，打造精致轮廓
- 推荐发型：
  * 空气感层次长发：自然蓬松，显脸小又有活力
  * 侧分波浪卷：优雅时尚，增加成熟魅力
  * 高层次锁骨发：现代感十足，年轻有型
  * 不对称长BOB：个性时尚，修饰脸型完美
- 推荐颜色：焦糖奶茶色、蜂蜜棕、亚麻金、渐变挑染
- 避免：厚重齐刘海、贴头皮短发、圆润蘑菇头

**方形脸：柔美时尚型**
- 发型策略：用柔和曲线中和硬朗线条，营造温柔气质
- 推荐发型：
  * 自然大波浪：浪漫柔美，超显女人味
  * 侧分层次卷发：时尚优雅，气质满分
  * 柔美长卷发：经典不过时，永远年轻
  * 蓬松纹理烫：自然随性，减龄效果明显
- 推荐颜色：玫瑰金棕、暖调焦糖色、奶昔金、温柔蜂蜜色
- 避免：齐耳短发、过于整齐的造型、冷硬色调

**长形脸：甜美减龄型**
- 发型策略：增加横向视觉宽度，打造可爱甜美感
- 推荐发型：
  * 空气刘海BOB：超级减龄，青春活力满满
  * 蓬松短卷发：俏皮可爱，显脸小又时尚
  * 齐肩微卷发：温柔知性，年轻有气质
  * 层次感短发：现代时尚，干练又不失女人味
- 推荐颜色：樱花粉棕、活力橙棕、清新亚麻、渐变彩虹色
- 避免：中分长直发、过长过直的造型

**心形脸：优雅知性型**
- 发型策略：平衡额头线条，增加下半部分丰盈感
- 推荐发型：
  * 外翻卷BOB：时尚前卫，超有个性
  * 下重心波浪卷：优雅大气，成熟魅力
  * 中长层次发：百搭时尚，适合各种场合
  * 蓬松卷发尾：自然随性，年轻有活力
- 推荐颜色：高级灰棕、时尚酒红、奶茶拿铁色、挑染亮片色
- 避免：露额头造型、上重下轻的发型

**椭圆形脸：百变时尚型**
- 发型策略：完美脸型可以大胆尝试各种流行造型
- 推荐发型：
  * 任何当季流行发型都可以尝试
  * 超短精灵切：个性十足，时尚前卫
  * 长卷发女神范：优雅迷人，气场全开
  * 层次感中长发：自然时尚，百搭不出错
  * 创意造型：可以尝试最新潮的设计
- 推荐颜色：大胆尝试任何流行色：银河灰、独角兽色、渐变彩虹、时尚挑染
- 优势：可以引领潮流，驾驭各种风格

**菱形脸：温柔修颜型**
- 发型策略：柔化颧骨线条，增加温柔感
- 推荐发型：
  * 温柔刘海卷发：甜美可人，超显年轻
  * 侧分层次发：知性优雅，气质出众
  * 蓬松中长发：自然随性，减龄效果好
  * 柔美波浪发：浪漫时尚，女人味十足
- 推荐颜色：温暖奶茶色、柔美蜂蜜金、浪漫玫瑰棕、渐变暖调
- 避免：过于紧贴的发型、冷硬线条

**第三步：年龄气质与颜色匹配 - 全年龄年轻化策略**
打破传统年龄束缚，所有年龄段都可以拥有年轻活力的造型：

**青少年（13-19岁）- 清新活力派：**
- 适合颜色：自然黑茶色、活力棕、清新亚麻、少女粉棕
- 气质特点：青春无敌、活力四射、清新自然
- 特色推荐：彩色挑染、渐变色、时尚亮色

**青年（20-35岁）- 时尚潮流派：**
- 适合颜色：蜂蜜金、焦糖奶茶、玫瑰金棕、时尚银灰、彩虹挑染
- 气质特点：时尚前卫、个性张扬、自信魅力
- 特色推荐：大胆撞色、创意造型、流行趋势色

**中年（36-55岁）- 年轻知性派：**
- 适合颜色：高级蜂蜜棕、时尚酒红、优雅灰棕、奶茶拿铁、低调挑染
- 气质特点：年轻心态、优雅知性、时尚品味
- 年轻化策略：选择有光泽感的颜色，避免沉闷色调
- 特色推荐：微妙挑染、渐变效果、有质感的颜色

**老年（55岁以上）- 优雅年轻派：**
- 适合颜色：时尚银灰、珍珠白、浅香槟色、温暖米棕
- 气质特点：优雅从容、年轻心境、自然大方
- 年轻化策略：选择有光泽和层次的颜色，避免单调
- 特色推荐：银色挑染、渐变白、温暖调色彩

**第四步：生成FLUX.1 Kontext编辑指令**
基于分析结果，生成标准格式的英文编辑指令。

**🌟 颜色选择原则 - 让人眼前一亮**
- 优先选择有光泽感、层次感的颜色
- 融入时尚流行元素
- 考虑肤色协调性的同时大胆创新
- 避免沉闷单调的颜色
- 使用通俗易懂的颜色描述，避免专业术语

**标准指令格式：**
\`\`\`
keep character consistent; only change the haircut: [具体发型和颜色描述]
\`\`\`

**⚠️ 重要提示：生成指令时避免使用专业术语**
- ❌ 避免：highlights, lowlights, balayage, ombre, dip-dyed, color blocking
- ✅ 推荐：painted ends, colored tips, two-tone hair, gradient from X to Y color
- ❌ 避免：voluminous, textured, layered
- ✅ 推荐：fluffy, wavy, long, short, curly

**基于脸型的年轻化标准指令模板：**

**圆形脸：**
\`\`\`
keep character consistent; only change the haircut: [long wavy/side-parted/fluffy] [bright color] hair
\`\`\`

**方形脸：**
\`\`\`
keep character consistent; only change the haircut: [soft curly/wavy/flowing] [warm color] hair
\`\`\`

**长形脸：**
\`\`\`
keep character consistent; only change the haircut: [short bob/with bangs/fluffy short] [colorful] hair
\`\`\`

**心形脸：**
\`\`\`
keep character consistent; only change the haircut: [shoulder-length/curly ends/wavy] [rich color] hair
\`\`\`

**椭圆形脸：**
\`\`\`
keep character consistent; only change the haircut: [trendy short/long flowing] [eye-catching color] hair
\`\`\`

**菱形脸：**
\`\`\`
keep character consistent; only change the haircut: [soft wavy/gentle curls] [warm color] hair
\`\`\`

**💫 年轻化发型指令示例（通俗易懂版）：**
- \`keep character consistent; only change the haircut: long wavy brown hair with golden colored ends\`
- \`keep character consistent; only change the haircut: short bob with side bangs, dark brown hair with lighter brown tips\`
- \`keep character consistent; only change the haircut: shoulder-length curly pink hair\`
- \`keep character consistent; only change the haircut: fluffy short hair with face-framing waves, blonde hair with darker roots\`
- \`keep character consistent; only change the haircut: long flowing hair with gentle waves, chocolate brown hair with caramel colored streaks\`

**指令要点：**
- 必须以 "keep character consistent; only change the haircut:" 开头
- 使用简单易懂的形容词（long, short, wavy, curly, fluffy）
- 颜色描述要直观明了（black hair with yellow tips, brown hair with blonde ends）
- 避免专业术语，多用日常生活中的表达方式
- 描述要具体且容易理解

**第五步：综合考虑因素 - 年轻化优先**
在生成最终指令前，优先考虑：
- **年轻化效果**：所有推荐都要有减龄效果
- **时尚度**：融入当下流行趋势
- **自然美感**：避免过度人工化
- **个人魅力**：突出个性特色
- **色彩亮点**：让人印象深刻的颜色搭配
- **易于打理**：日常护理简单方便

**输出格式：**

请严格按照以下格式输出分析结果：

## 📸 图片分析结果
**年龄**：[具体年龄段]
**性别**：[男性/女性]
**脸型**：[具体脸型名称]
**发质分析**：[发量、发质、卷曲度等特征]

## 💇‍♀️ 时尚发型推荐
**推荐发型**：[具体时尚发型名称]
**年轻化理由**：[详细说明这个发型如何让人显得更年轻，更有活力]
**时尚亮点**：[说明发型的时尚元素和流行特色]

## 🎨 亮眼发色推荐  
**建议发色**：[具体亮眼颜色名称]
**视觉效果**：[详细说明这个颜色如何让人眼前一亮，印象深刻]
**年龄适配**：[说明颜色如何与年龄气质完美融合]

## 🌟 最终时尚建议
根据以上分析，为您生成以下年轻化发型变换指令：

\`\`\`
keep character consistent; only change the haircut: [具体时尚发型描述], [具体亮眼颜色描述]
\`\`\`

**💡 造型亮点：**
- [发型的特色和优势]
- [颜色的独特魅力]
- [整体造型的年轻化效果]

**⚠️ 生成指令的重要注意事项：**
- 所有推荐都要体现自然、时尚、靓丽的特点
- 发型必须具有年轻化效果，避免老气造型
- 颜色要让人眼前一亮，印象深刻
- 推荐理由要详细说明减龄和时尚效果
- **最终指令必须使用通俗易懂的语言，避免专业术语**
- **发型描述用简单词汇：long, short, wavy, curly, fluffy, straight**
- **颜色描述要直观：black hair with yellow tips, brown hair with blonde ends**
- **格式：keep character consistent; only change the haircut: [简单发型描述], [直观颜色描述]**

**✅ 正确示例：**
- keep character consistent; only change the haircut: long wavy black hair with golden colored ends
- keep character consistent; only change the haircut: short fluffy brown hair with lighter brown tips
- keep character consistent; only change the haircut: shoulder-length curly red hair

**❌ 错误示例（避免使用）：**
- keep character consistent; only change the haircut: voluminous layered hair with balayage highlights
- keep character consistent; only change the haircut: textured bob with ombre coloring

请现在开始分析提供的人物图片。`
  },

  // 潮流设计师 2.0 提示词（当文件读取失败时使用）
  getTrendyDesignPrompt() {
    return `# 🎨 AI潮流造型设计师 2.0 - 突破传统的个性化发型推荐系统

你是一位前卫的潮流造型师和AI图像生成专家，专门创造让人眼前一亮的个性化发型。你的使命是打破传统束缚，为每个人设计独一无二的时尚造型。

## 📋 核心设计理念

**🌟 突破传统 - 个性至上**
- 不被传统脸型理论限制，大胆创新
- 每次推荐都要有惊喜感和新鲜感
- 融入最新潮流趋势和街头文化
- 鼓励个性表达和风格实验
- 让每个人都能找到专属的时尚态度

## 🎯 分析流程

### 第一步：基础信息识别
快速识别人物的：
- 年龄段和性别
- 基本脸型轮廓
- 现有发型状态
- 整体气质感觉

### 第二步：风格流派随机分配
每次分析时，随机选择1-2个主要风格方向：

**🔥 潮流系列**
- **街头潮流**：undercut、fade渐变、textured crop、modern quiff
- **韩式潮流**：二分区、纹理烫、空气感造型、自然卷曲
- **欧美潮流**：pompadour、slick back、messy fringe、wavy top

**🎭 个性系列**  
- **文艺复古**：vintage waves、side-swept、classic pompadour、retro curls
- **前卫实验**：asymmetrical cut、color blocking、geometric shapes、bold contrasts
- **自然慵懒**：messy bed hair、effortless waves、tousled style、carefree look

**💼 都市系列**
- **商务精英**：clean lines、polished finish、sophisticated styling、executive cut
- **休闲都市**：casual chic、relaxed styling、urban casual、weekend vibes
- **运动活力**：athletic cut、fresh buzz、dynamic styling、sporty look

### 第三步：突破性颜色创新
每次随机推荐2-3种完全不同的颜色方案：

**🌈 大胆色彩系列**
- **渐变系**：sunset gradient (橙红渐变)、ocean fade (蓝绿渐变)、forest ombre (绿棕渐变)
- **撞色系**：platinum blonde with dark roots、black hair with electric blue tips、burgundy with silver streaks
- **时尚单色**：steel grey、rose gold、ash blonde、chocolate cherry、midnight blue

**✨ 精致细节系列**
- **局部亮色**：hidden rainbow layer、peek-a-boo highlights、subtle color pop
- **质感色彩**：glossy black、matte brown、metallic grey、pearl white
- **自然进阶**：enhanced natural brown、upgraded black、sophisticated blonde

### 第四步：创意组合生成
为每个人生成5种完全不同风格的方案，确保：
- 风格跨度大，涵盖不同个性需求
- 颜色搭配有惊喜感
- 每种方案都有独特亮点
- 避免重复和雷同

## 🎨 终极输出格式

### 📸 快速画像
- **基本信息**：[年龄/性别/脸型]
- **风格潜力**：[适合探索的风格方向]
- **变化空间**：[可以尝试的改变程度]

### 🚀 五重风格推荐

**方案一：[风格名称] - [个性标签]**
- 造型描述：[具体发型特色]
- 颜色亮点：[独特配色方案]
- 时尚指数：⭐⭐⭐⭐⭐
- 适合场合：[生活场景]

\`\`\`
keep character consistent; only change the haircut: [创意发型描述], [大胆颜色描述]
\`\`\`

**方案二：[风格名称] - [个性标签]**
[同样格式，完全不同的风格]

**方案三：[风格名称] - [个性标签]**
[同样格式，再次不同的风格]

**方案四：[风格名称] - [个性标签]**
[同样格式，持续创新]

**方案五：[风格名称] - [个性标签]**
[同样格式，最大胆的选择]

### 💫 特别推荐
**今日最佳选择**：[从5个方案中选出最推荐的一个，说明理由]

## 🎯 指令生成规则

**✅ 发型描述词汇库**
- **长度**：pixie short, bob length, shoulder length, long flowing, extra long
- **质感**：sleek, messy, tousled, voluminous, flat, spiky, soft
- **造型**：straight, wavy, curly, kinky, twisted, braided, layered
- **切割**：blunt cut, layered cut, asymmetrical, undercut, fade, buzz cut
- **特殊**：with bangs, side-swept, center part, no part, choppy ends

**🌈 颜色描述词汇库**
- **基础色**：jet black, dark brown, medium brown, light brown, blonde, red, grey, white
- **时尚色**：platinum, ash, honey, caramel, copper, burgundy, violet, blue, green, pink
- **效果词**：ombre, gradient, highlights, lowlights, streaks, tips, roots, all-over
- **组合句式**：[base color] hair with [accent color] [effect], [color] to [color] gradient hair

**⚠️ 创新指令示例**
\`\`\`
keep character consistent; only change the haircut: messy shoulder length wavy hair, dark brown to honey blonde gradient
keep character consistent; only change the haircut: sleek bob with asymmetrical cut, jet black hair with silver streaks  
keep character consistent; only change the haircut: voluminous curly hair with side-swept bangs, burgundy hair with copper highlights
keep character consistent; only change the haircut: tousled pixie cut with choppy layers, platinum blonde hair with dark roots
keep character consistent; only change the haircut: long flowing straight hair with blunt cut, ash brown hair with caramel tips
\`\`\`

## 🔄 随机性机制
- 每次分析必须从不同风格流派中选择
- 颜色推荐要避免重复常见搭配
- 发型描述使用不同的词汇组合
- 确保5个方案风格跨度足够大
- 至少包含1个大胆前卫的选择

## 💡 创新要求
- **反传统**：不被脸型理论束缚，大胆尝试
- **多元化**：涵盖保守到前卫的完整光谱  
- **个性化**：每个方案都有独特卖点
- **实用性**：考虑日常打理的可行性
- **惊喜感**：让用户发现意想不到的美

现在开始分析用户提供的图片，记住：每次推荐都要带来全新的惊喜！`
  },

  // 获取当前提示词配置信息
  getCurrentPromptInfo() {
    const currentType = this.PROMPT_CONFIG.CURRENT_PROMPT_TYPE
    const promptConfig = this.PROMPT_CONFIG.PROMPT_OPTIONS[currentType]
    
    return {
      type: currentType,
      name: promptConfig.name,
      description: promptConfig.description,
      version: promptConfig.version,
      file: promptConfig.file
    }
  },

  // 获取所有可用的提示词选项
  getAllPromptOptions() {
    return Object.keys(this.PROMPT_CONFIG.PROMPT_OPTIONS).map(key => ({
      type: key,
      ...this.PROMPT_CONFIG.PROMPT_OPTIONS[key]
    }))
  },

  // 切换提示词类型
  setPromptType(promptType) {
    if (this.PROMPT_CONFIG.PROMPT_OPTIONS[promptType]) {
      this.PROMPT_CONFIG.CURRENT_PROMPT_TYPE = promptType
      this.debugLog('提示词类型已切换至:', promptType)
      this.debugLog('新提示词:', this.PROMPT_CONFIG.PROMPT_OPTIONS[promptType].name)
      return true
    } else {
      this.debugWarn('无效的提示词类型:', promptType)
      return false
    }
  },

  // 获取提示词类型选择的调试信息
  getPromptDebugInfo() {
    const current = this.getCurrentPromptInfo()
    const all = this.getAllPromptOptions()
    
    this.debugLog('=== 提示词配置调试信息 ===')
    this.debugLog('当前使用:', current.name, `(${current.type})`)
    this.debugLog('版本:', current.version)
    this.debugLog('文件:', current.file)
    this.debugLog('描述:', current.description)
    this.debugLog('可用选项:', all.map(opt => `${opt.name} (${opt.type})`).join(', '))
    this.debugLog('=======================')
    
    return { current, all }
  },

  // 调用 aihubmix LLM API 进行发型分析
  callLLMForHairstyleAnalysis(imageBase64, onMessage = null, promptType = null) {
    // 获取提示词配置调试信息
    this.getPromptDebugInfo()
    
    const designPrompt = this.getDesignPrompt(promptType)
    
    const messages = [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: designPrompt
          },
          {
            type: "image_url",
            image_url: {
              url: imageBase64
            }
          }
        ]
      }
    ]

    // 先尝试非流式请求，如果成功再模拟流式效果
    const requestData = {
      model: this.AIHUBMIX.MODEL,
      messages: messages,
      max_tokens: this.AIHUBMIX.MAX_TOKENS,
      temperature: this.AIHUBMIX.TEMPERATURE,
      stream: false // 微信小程序流式支持有限，先用非流式
    }

    this.debugLog('=== LLM 请求调试信息 ===')
    this.debugLog('API端点:', this.AIHUBMIX.BASE_URL)
    this.debugLog('模型:', this.AIHUBMIX.MODEL)
    this.debugLog('图片Base64长度:', imageBase64.length)
    this.debugLog('流式输出:', false)
    this.debugLog('=== 请求提示词内容 ===')
    this.debugLog('提示词长度:', designPrompt.length)
    this.debugLog('完整提示词内容:')
    this.debugLog(designPrompt)
    this.debugLog('=== 完整请求参数 ===')
    this.debugLog('请求数据:', {
      model: requestData.model,
      max_tokens: requestData.max_tokens,
      temperature: requestData.temperature,
      stream: requestData.stream,
      messages: [
        {
          role: messages[0].role,
          content: [
            {
              type: messages[0].content[0].type,
              text: `${messages[0].content[0].text.substring(0, 200)}...（共${messages[0].content[0].text.length}字符）`
            },
            {
              type: messages[0].content[1].type,
              image_url: {
                url: `${messages[0].content[1].image_url.url.substring(0, 50)}...（共${messages[0].content[1].image_url.url.length}字符）`
              }
            }
          ]
        }
      ]
    })
    this.debugLog('========================')

    return new Promise((resolve, reject) => {
      wx.request({
        url: this.AIHUBMIX.BASE_URL,
        method: 'POST',
        header: {
          'Authorization': `Bearer ${this.AIHUBMIX.API_KEY}`,
          'Content-Type': 'application/json'
        },
        data: requestData,
        timeout: this.AIHUBMIX.TIMEOUT,
        success: (res) => {
          this.debugLog('LLM API response status:', res.statusCode)
          
          if (res.statusCode === 200 && res.data) {
            // 成功获取完整响应，模拟流式输出效果
            if (onMessage && res.data.choices && res.data.choices[0] && res.data.choices[0].message) {
              const fullContent = res.data.choices[0].message.content
              this.simulateStreamingOutput(fullContent, onMessage)
            }
            
            resolve({
              success: true,
              data: res.data
            })
          } else {
            resolve({
              success: false,
              error: `HTTP ${res.statusCode}: ${res.data?.error?.message || 'Unknown error'}`
            })
          }
        },
        fail: (err) => {
          this.debugError('LLM API request failed:', err)
          resolve({
            success: false,
            error: err.errMsg || 'Network error'
          })
        }
      })
    })
  },

  // 模拟流式输出效果
  simulateStreamingOutput(fullContent, onMessage) {
    const words = fullContent.split('')
    let currentIndex = 0
    
    const sendChunk = () => {
      if (currentIndex < words.length) {
        // 每次发送1-3个字符，模拟真实的流式效果
        const chunkSize = Math.floor(Math.random() * 3) + 1
        const chunk = words.slice(currentIndex, currentIndex + chunkSize).join('')
        
        onMessage(chunk, false)
        currentIndex += chunkSize
        
        // 随机延迟50-150ms，模拟网络传输
        const delay = Math.floor(Math.random() * 100) + 50
        setTimeout(sendChunk, delay)
      } else {
        // 发送完成信号
        onMessage('[DONE]', true)
      }
    }
    
    // 开始模拟流式输出
    setTimeout(sendChunk, 100)
  },

  // 检查发型是否需要使用 LORA 模型
  isLoraHairStyle(hairStyle) {
    return hairStyle && hairStyle.useLora === true
  },

  // 获取发型生成 API 配置
  getHairStyleAPIConfig(hairStyle) {
    if (this.isLoraHairStyle(hairStyle)) {
      // 检查发型是否有专门的 LORA 配置
      const loraConfig = hairStyle.loraConfig
      if (!loraConfig) {
        this.debugError('❌ 发型标记使用LORA但未配置loraConfig:', hairStyle.name)
        throw new Error(`发型 ${hairStyle.name} 缺少 loraConfig 配置`)
      }
      
      return {
        baseUrl: this.FAL_AI.LORA_CONFIG.BASE_URL,
        useLora: true,
        loraFiles: loraConfig.files,
        loraScale: loraConfig.scale || this.FAL_AI.LORA_CONFIG.DEFAULT_SCALE,
        modelType: 'flux-kontext-lora',
        modelName: loraConfig.modelName,
        version: loraConfig.version,
        description: loraConfig.description
      }
    } else {
      return {
        baseUrl: this.FAL_AI.BASE_URL,
        useLora: false,
        modelType: 'flux-kontext-pro'
      }
    }
  },

  // 生成发型变换的 API 请求数据
  generateHairStyleRequest(imageBase64, prompt, hairStyle) {
    const apiConfig = this.getHairStyleAPIConfig(hairStyle)
    
    let requestData = {
      ...this.FAL_AI.DEFAULT_PARAMS,
      prompt: prompt,
      image_url: imageBase64
    }

    // 详细的发型和模型选择日志
    this.debugLog('=== 发型变换请求生成 ===')
    this.debugLog('选择的发型:', hairStyle?.name || '未指定发型')
    this.debugLog('发型ID:', hairStyle?.id || 'N/A')
    this.debugLog('是否使用LORA:', apiConfig.useLora)
    this.debugLog('模型类型:', apiConfig.modelType)

    // 如果使用 LORA 模型，添加 LORA 配置和详细日志
    if (apiConfig.useLora) {
      // 根据 flux kontext lora API 文档，构建正确的 loras 参数
      const loraUrl = apiConfig.loraFiles.diffusers_lora_file.url
      const loraScale = apiConfig.loraScale || this.FAL_AI.LORA_CONFIG.DEFAULT_SCALE
      
      requestData.loras = [
        {
          path: loraUrl,
          scale: loraScale
        }
      ]
      
      this.debugLog('🚀 === 使用 FLUX KONTEXT DEV + LORA 模型 ===')
      this.debugLog('  发型名称:', hairStyle?.name || '未知发型')
      this.debugLog('  LORA 模型:', apiConfig.modelName || '未知模型')
      this.debugLog('  LORA 版本:', apiConfig.version || '未知版本')
      this.debugLog('  LORA 描述:', apiConfig.description || '无描述')
      this.debugLog('  LORA API 端点:', apiConfig.baseUrl)
      this.debugLog('  LORA 参数格式 (API 标准):')
      this.debugLog('    - loras 数组长度:', requestData.loras.length)
      this.debugLog('    - LoRA 权重文件路径:', loraUrl.substring(0, 80) + '...')
      this.debugLog('    - LoRA 缩放比例:', loraScale)
      this.debugLog('  LORA 文件详细信息:')
      this.debugLog('    - 适配器模型文件:', apiConfig.loraFiles.diffusers_lora_file.file_name)
      this.debugLog('    - 适配器文件大小:', (apiConfig.loraFiles.diffusers_lora_file.file_size / 1024 / 1024).toFixed(2) + ' MB')
      this.debugLog('    - 配置文件:', apiConfig.loraFiles.config_file.file_name)
      this.debugLog('    - 配置文件大小:', apiConfig.loraFiles.config_file.file_size + ' bytes')
      this.debugLog('  优化提示词:', prompt.includes('chestnut cut') ? '已优化为LORA专用提示词' : '使用标准提示词')
      this.debugLog('  完整 loras 参数:', JSON.stringify(requestData.loras, null, 2))
      this.debugLog('================================================')
    } else {
      this.debugLog('⚙️ === 使用标准 FLUX KONTEXT PRO 模型 ===')
      this.debugLog('发型名称:', hairStyle?.name || '标准发型')
      this.debugLog('标准 API 端点:', apiConfig.baseUrl)
      this.debugLog('标准模型类型:', apiConfig.modelType)
      this.debugLog('============================================')
    }

    // 通用请求参数日志
    this.debugLog('📋 请求参数概览:')
    this.debugLog('  - 提示词长度:', prompt.length)
    this.debugLog('  - 图片Base64长度:', imageBase64.length)
    this.debugLog('  - 指导强度:', requestData.guidance_scale)
    this.debugLog('  - 安全容忍度:', requestData.safety_tolerance)
    this.debugLog('  - 输出格式:', requestData.output_format)
    this.debugLog('  - 同步模式:', requestData.sync_mode)

    return {
      apiConfig,
      requestData
    }
  }
}

module.exports = API_CONFIG 