#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
发型提示词验证工具
验证 YAML 文件的格式和内容完整性
"""

import yaml
import sys
from pathlib import Path
from typing import List, Dict, Any, Set

class HairstyleValidator:
    def __init__(self):
        self.errors = []
        self.warnings = []
        self.categories = set()
        self.all_tags = set()
        self.style_types = set()
        self.face_shapes = set()
        self.occasions = set()
        self.used_ids = set()
    
    def load_categories(self, path: str = "prompts/categories.yaml") -> bool:
        """加载分类定义"""
        try:
            with open(path, 'r', encoding='utf-8') as f:
                data = yaml.safe_load(f)
                
                # 加载分类
                for cat in data.get('categories', []):
                    self.categories.add(cat['name'])
                
                # 加载风格流派
                for style in data.get('style_types', []):
                    self.style_types.add(style['name'])
                
                # 加载脸型
                for face in data.get('face_shapes', []):
                    self.face_shapes.add(face['name'])
                
                # 加载场合
                for occ in data.get('occasions', []):
                    self.occasions.add(occ['name'])
                
                return True
        except FileNotFoundError:
            self.warnings.append(f"找不到文件: {path}")
            return False
        except yaml.YAMLError as e:
            self.errors.append(f"YAML 格式错误 in {path}: {e}")
            return False
    
    def load_tags(self, path: str = "prompts/tags.yaml") -> bool:
        """加载标签定义"""
        try:
            with open(path, 'r', encoding='utf-8') as f:
                data = yaml.safe_load(f)
                
                # 收集所有标签
                for key, values in data.items():
                    if isinstance(values, list):
                        self.all_tags.update(values)
                
                return True
        except FileNotFoundError:
            self.warnings.append(f"找不到文件: {path}")
            return False
        except yaml.YAMLError as e:
            self.errors.append(f"YAML 格式错误 in {path}: {e}")
            return False
    
    def validate_hairstyle(self, hairstyle: Dict[str, Any], index: int) -> None:
        """验证单个发型定义"""
        # 必需字段
        required_fields = [
            'id', 'name', 'name_en', 'category', 'tags',
            'style_type', 'difficulty', 'prompt', 'negative_prompt'
        ]
        
        for field in required_fields:
            if field not in hairstyle:
                self.errors.append(f"发型 #{index}: 缺少必需字段 '{field}'")
        
        # 验证 ID
        if 'id' in hairstyle:
            hairstyle_id = hairstyle['id']
            
            # 检查 ID 格式
            if not hairstyle_id.replace('_', '').isalnum():
                self.errors.append(f"发型 #{index} ({hairstyle_id}): ID 应只包含字母、数字和下划线")
            
            # 检查 ID 唯一性
            if hairstyle_id in self.used_ids:
                self.errors.append(f"发型 #{index} ({hairstyle_id}): ID 重复")
            else:
                self.used_ids.add(hairstyle_id)
        
        # 验证分类
        if 'category' in hairstyle:
            category = hairstyle['category']
            if self.categories and category not in self.categories:
                self.warnings.append(
                    f"发型 #{index} ({hairstyle.get('id')}): "
                    f"分类 '{category}' 未在 categories.yaml 中定义"
                )
        
        # 验证标签
        if 'tags' in hairstyle:
            tags = hairstyle['tags']
            if not isinstance(tags, list):
                self.errors.append(f"发型 #{index} ({hairstyle.get('id')}): tags 应为列表")
            elif self.all_tags:
                for tag in tags:
                    if tag not in self.all_tags:
                        self.warnings.append(
                            f"发型 #{index} ({hairstyle.get('id')}): "
                            f"标签 '{tag}' 未在 tags.yaml 中定义"
                        )
        
        # 验证风格流派
        if 'style_type' in hairstyle:
            styles = hairstyle['style_type']
            if not isinstance(styles, list):
                self.errors.append(f"发型 #{index} ({hairstyle.get('id')}): style_type 应为列表")
            elif self.style_types:
                for style in styles:
                    if style not in self.style_types:
                        self.warnings.append(
                            f"发型 #{index} ({hairstyle.get('id')}): "
                            f"风格 '{style}' 未在 categories.yaml 中定义"
                        )
        
        # 验证难度
        if 'difficulty' in hairstyle:
            difficulty = hairstyle['difficulty']
            if difficulty not in ['easy', 'medium', 'high']:
                self.errors.append(
                    f"发型 #{index} ({hairstyle.get('id')}): "
                    f"difficulty 应为 'easy', 'medium' 或 'high'"
                )
        
        # 验证提示词
        if 'prompt' in hairstyle:
            prompt = hairstyle['prompt']
            if not prompt or not prompt.strip():
                self.errors.append(f"发型 #{index} ({hairstyle.get('id')}): prompt 不能为空")
            elif len(prompt) < 20:
                self.warnings.append(
                    f"发型 #{index} ({hairstyle.get('id')}): "
                    f"prompt 可能过短（少于20字符）"
                )
        
        # 验证颜色方案
        if 'color_options' in hairstyle:
            colors = hairstyle['color_options']
            if not isinstance(colors, list):
                self.errors.append(f"发型 #{index} ({hairstyle.get('id')}): color_options 应为列表")
            elif len(colors) == 0:
                self.warnings.append(
                    f"发型 #{index} ({hairstyle.get('id')}): "
                    f"建议提供至少一个颜色方案"
                )
            else:
                for i, color in enumerate(colors):
                    if 'name' not in color:
                        self.errors.append(
                            f"发型 #{index} ({hairstyle.get('id')}): "
                            f"颜色方案 #{i} 缺少 'name'"
                        )
                    if 'prompt' not in color:
                        self.errors.append(
                            f"发型 #{index} ({hairstyle.get('id')}): "
                            f"颜色方案 #{i} 缺少 'prompt'"
                        )
        
        # 验证参数
        if 'parameters' in hairstyle:
            params = hairstyle['parameters']
            if 'style_strength' in params:
                strength = params['style_strength']
                if not isinstance(strength, (int, float)) or strength < 0 or strength > 1:
                    self.warnings.append(
                        f"发型 #{index} ({hairstyle.get('id')}): "
                        f"style_strength 应在 0-1 之间"
                    )
        
        # 验证适用信息
        if 'suitable_for' in hairstyle:
            suitable = hairstyle['suitable_for']
            
            # 验证脸型
            if 'face_shapes' in suitable:
                face_shapes = suitable['face_shapes']
                if not isinstance(face_shapes, list):
                    self.errors.append(
                        f"发型 #{index} ({hairstyle.get('id')}): "
                        f"face_shapes 应为列表"
                    )
                elif self.face_shapes:
                    for face in face_shapes:
                        if face not in self.face_shapes:
                            self.warnings.append(
                                f"发型 #{index} ({hairstyle.get('id')}): "
                                f"脸型 '{face}' 未在 categories.yaml 中定义"
                            )
            
            # 验证年龄范围
            if 'age_range' in suitable:
                age_range = suitable['age_range']
                if not isinstance(age_range, list) or len(age_range) != 2:
                    self.errors.append(
                        f"发型 #{index} ({hairstyle.get('id')}): "
                        f"age_range 应为包含2个元素的列表 [min, max]"
                    )
                elif age_range[0] > age_range[1]:
                    self.errors.append(
                        f"发型 #{index} ({hairstyle.get('id')}): "
                        f"age_range 最小年龄不能大于最大年龄"
                    )
            
            # 验证场合
            if 'occasions' in suitable:
                occasions = suitable['occasions']
                if not isinstance(occasions, list):
                    self.errors.append(
                        f"发型 #{index} ({hairstyle.get('id')}): "
                        f"occasions 应为列表"
                    )
                elif self.occasions:
                    for occ in occasions:
                        if occ not in self.occasions:
                            self.warnings.append(
                                f"发型 #{index} ({hairstyle.get('id')}): "
                                f"场合 '{occ}' 未在 categories.yaml 中定义"
                            )
        
        # 验证预览图
        if 'preview_image' in hairstyle:
            image_path = Path(hairstyle['preview_image'])
            if not image_path.exists():
                self.warnings.append(
                    f"发型 #{index} ({hairstyle.get('id')}): "
                    f"预览图文件不存在: {image_path}"
                )
    
    def validate_hairstyles(self, path: str = "prompts/hairstyles.yaml") -> bool:
        """验证发型提示词文件"""
        try:
            print(f"正在验证: {path}")
            
            with open(path, 'r', encoding='utf-8') as f:
                data = yaml.safe_load(f)
            
            hairstyles = data.get('hairstyles', [])
            
            if not hairstyles:
                self.warnings.append(f"{path}: 文件中没有定义任何发型")
                return True
            
            print(f"找到 {len(hairstyles)} 个发型定义")
            
            for index, hairstyle in enumerate(hairstyles, 1):
                self.validate_hairstyle(hairstyle, index)
            
            return True
            
        except FileNotFoundError:
            self.errors.append(f"找不到文件: {path}")
            return False
        except yaml.YAMLError as e:
            self.errors.append(f"YAML 格式错误 in {path}: {e}")
            return False
    
    def print_results(self) -> bool:
        """打印验证结果"""
        print("\n" + "="*60)
        print("验证结果")
        print("="*60)
        
        if self.errors:
            print(f"\n❌ 发现 {len(self.errors)} 个错误:")
            for error in self.errors:
                print(f"  - {error}")
        
        if self.warnings:
            print(f"\n⚠️  发现 {len(self.warnings)} 个警告:")
            for warning in self.warnings:
                print(f"  - {warning}")
        
        if not self.errors and not self.warnings:
            print("\n✅ 验证通过！没有发现任何问题。")
            return True
        elif not self.errors:
            print(f"\n✅ 验证通过！存在 {len(self.warnings)} 个警告。")
            return True
        else:
            print(f"\n❌ 验证失败！请修复以上错误。")
            return False

def main():
    # 设置 Windows 控制台编码
    if sys.platform == 'win32':
        try:
            import io
            sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
        except:
            pass
    
    print("🔍 发型提示词验证工具")
    print("="*60)
    
    validator = HairstyleValidator()
    
    # 加载分类和标签定义
    print("\n加载定义文件...")
    validator.load_categories()
    validator.load_tags()
    
    # 验证发型文件
    print("\n开始验证发型提示词...")
    validator.validate_hairstyles()
    
    # 打印结果
    success = validator.print_results()
    
    # 返回退出码
    sys.exit(0 if success else 1)

if __name__ == '__main__':
    main()

