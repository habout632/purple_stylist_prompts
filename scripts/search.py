#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
发型提示词搜索工具
支持按分类、标签、脸型、风格等多条件搜索
"""

import yaml
import argparse
import sys
from pathlib import Path
from typing import List, Dict, Any

class HairstyleSearch:
    def __init__(self, yaml_path: str = "prompts/hairstyles.yaml"):
        """初始化搜索工具"""
        self.yaml_path = Path(yaml_path)
        self.hairstyles = self._load_hairstyles()
    
    def _load_hairstyles(self) -> List[Dict[str, Any]]:
        """加载发型数据"""
        if not self.yaml_path.exists():
            print(f"错误: 找不到文件 {self.yaml_path}")
            sys.exit(1)
        
        with open(self.yaml_path, 'r', encoding='utf-8') as f:
            data = yaml.safe_load(f)
            return data.get('hairstyles', [])
    
    def search_by_id(self, hairstyle_id: str) -> Dict[str, Any]:
        """通过ID搜索发型"""
        for hairstyle in self.hairstyles:
            if hairstyle.get('id') == hairstyle_id:
                return hairstyle
        return None
    
    def search_by_category(self, category: str) -> List[Dict[str, Any]]:
        """通过分类搜索"""
        return [h for h in self.hairstyles if h.get('category') == category]
    
    def search_by_tag(self, tags: List[str]) -> List[Dict[str, Any]]:
        """通过标签搜索（匹配任一标签）"""
        results = []
        for hairstyle in self.hairstyles:
            hairstyle_tags = hairstyle.get('tags', [])
            if any(tag in hairstyle_tags for tag in tags):
                results.append(hairstyle)
        return results
    
    def search_by_style(self, style_type: str) -> List[Dict[str, Any]]:
        """通过风格流派搜索"""
        results = []
        for hairstyle in self.hairstyles:
            styles = hairstyle.get('style_type', [])
            if style_type in styles:
                results.append(hairstyle)
        return results
    
    def search_by_face_shape(self, face_shape: str) -> List[Dict[str, Any]]:
        """通过脸型搜索"""
        results = []
        for hairstyle in self.hairstyles:
            suitable = hairstyle.get('suitable_for', {})
            face_shapes = suitable.get('face_shapes', [])
            if face_shape in face_shapes:
                results.append(hairstyle)
        return results
    
    def search_by_difficulty(self, difficulty: str) -> List[Dict[str, Any]]:
        """通过难度搜索"""
        return [h for h in self.hairstyles if h.get('difficulty') == difficulty]
    
    def search_by_occasion(self, occasion: str) -> List[Dict[str, Any]]:
        """通过场合搜索"""
        results = []
        for hairstyle in self.hairstyles:
            suitable = hairstyle.get('suitable_for', {})
            occasions = suitable.get('occasions', [])
            if occasion in occasions:
                results.append(hairstyle)
        return results
    
    def search_complex(self, **kwargs) -> List[Dict[str, Any]]:
        """复杂搜索，支持多条件"""
        results = self.hairstyles
        
        if kwargs.get('category'):
            results = [h for h in results if h.get('category') == kwargs['category']]
        
        if kwargs.get('tags'):
            results = [h for h in results 
                      if any(tag in h.get('tags', []) for tag in kwargs['tags'])]
        
        if kwargs.get('style_type'):
            results = [h for h in results 
                      if kwargs['style_type'] in h.get('style_type', [])]
        
        if kwargs.get('face_shape'):
            results = [h for h in results 
                      if kwargs['face_shape'] in h.get('suitable_for', {}).get('face_shapes', [])]
        
        if kwargs.get('difficulty'):
            results = [h for h in results if h.get('difficulty') == kwargs['difficulty']]
        
        if kwargs.get('occasion'):
            results = [h for h in results 
                      if kwargs['occasion'] in h.get('suitable_for', {}).get('occasions', [])]
        
        if kwargs.get('age_min') or kwargs.get('age_max'):
            age_min = kwargs.get('age_min', 0)
            age_max = kwargs.get('age_max', 150)
            filtered = []
            for h in results:
                age_range = h.get('suitable_for', {}).get('age_range', [0, 150])
                # 检查年龄范围是否有交集
                if age_range[0] <= age_max and age_range[1] >= age_min:
                    filtered.append(h)
            results = filtered
        
        return results

def format_hairstyle_simple(hairstyle: Dict[str, Any]) -> str:
    """简单格式输出发型信息"""
    output = []
    output.append(f"\n{'='*60}")
    output.append(f"ID: {hairstyle.get('id')}")
    output.append(f"名称: {hairstyle.get('name')} ({hairstyle.get('name_en')})")
    output.append(f"分类: {hairstyle.get('category')}")
    output.append(f"标签: {', '.join(hairstyle.get('tags', []))}")
    output.append(f"难度: {hairstyle.get('difficulty')}")
    return '\n'.join(output)

def format_hairstyle_detailed(hairstyle: Dict[str, Any]) -> str:
    """详细格式输出发型信息"""
    output = []
    output.append(f"\n{'='*60}")
    output.append(f"🎨 {hairstyle.get('name')} ({hairstyle.get('name_en')})")
    output.append(f"{'='*60}")
    
    # 基本信息
    output.append(f"\n📋 基本信息:")
    output.append(f"  ID: {hairstyle.get('id')}")
    output.append(f"  分类: {hairstyle.get('category')}")
    output.append(f"  标签: {', '.join(hairstyle.get('tags', []))}")
    output.append(f"  风格: {', '.join(hairstyle.get('style_type', []))}")
    output.append(f"  难度: {hairstyle.get('difficulty')}")
    
    # 提示词
    output.append(f"\n✨ 正向提示词:")
    output.append(f"  {hairstyle.get('prompt')}")
    
    output.append(f"\n❌ 负向提示词:")
    output.append(f"  {hairstyle.get('negative_prompt')}")
    
    # 颜色方案
    color_options = hairstyle.get('color_options', [])
    if color_options:
        output.append(f"\n🎨 颜色方案:")
        for i, color in enumerate(color_options, 1):
            output.append(f"  {i}. {color.get('name')}")
            output.append(f"     {color.get('prompt')}")
    
    # 参数
    params = hairstyle.get('parameters', {})
    if params:
        output.append(f"\n⚙️ 生成参数:")
        output.append(f"  Style Strength: {params.get('style_strength')}")
        output.append(f"  CFG Scale: {params.get('cfg_scale')}")
        output.append(f"  Variation: {params.get('variation')}")
    
    # 适用信息
    suitable = hairstyle.get('suitable_for', {})
    if suitable:
        output.append(f"\n👤 适用信息:")
        if suitable.get('face_shapes'):
            output.append(f"  适合脸型: {', '.join(suitable.get('face_shapes'))}")
        if suitable.get('age_range'):
            age_range = suitable.get('age_range')
            output.append(f"  年龄范围: {age_range[0]}-{age_range[1]}岁")
        if suitable.get('occasions'):
            output.append(f"  适用场合: {', '.join(suitable.get('occasions'))}")
    
    # 造型建议
    tips = hairstyle.get('styling_tips')
    if tips:
        output.append(f"\n💡 造型建议:")
        output.append(f"  {tips}")
    
    # 预览图
    preview = hairstyle.get('preview_image')
    if preview:
        output.append(f"\n🖼️ 预览图: {preview}")
    
    return '\n'.join(output)

def format_prompt_only(hairstyle: Dict[str, Any], color_index: int = 0) -> str:
    """只输出提示词格式"""
    output = []
    output.append(f"\n{'='*60}")
    output.append(f"{hairstyle.get('name')} ({hairstyle.get('id')})")
    output.append(f"{'='*60}")
    
    base_prompt = hairstyle.get('prompt')
    
    # 颜色方案
    color_options = hairstyle.get('color_options', [])
    if color_options and 0 <= color_index < len(color_options):
        color = color_options[color_index]
        output.append(f"\n颜色方案: {color.get('name')}")
        output.append(f"\n完整提示词:")
        output.append(f"keep character consistent; only change the haircut: {base_prompt}, {color.get('prompt')}")
    else:
        output.append(f"\n基础提示词:")
        output.append(f"keep character consistent; only change the haircut: {base_prompt}")
    
    negative = hairstyle.get('negative_prompt')
    if negative:
        output.append(f"\n负向提示词:")
        output.append(f"{negative}")
    
    return '\n'.join(output)

def main():
    # 设置 Windows 控制台编码
    if sys.platform == 'win32':
        try:
            import io
            sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
        except:
            pass
    
    parser = argparse.ArgumentParser(
        description='发型提示词搜索工具',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
示例用法:
  py search.py --list-all                    # 列出所有发型
  py search.py --id long_wavy                # 查看特定发型
  py search.py --category 短发               # 按分类搜索
  py search.py --tag 优雅                    # 按标签搜索
  py search.py --face-shape 圆脸             # 按脸型搜索
  py search.py --style 韩式潮流              # 按风格搜索
  py search.py --difficulty easy             # 按难度搜索
  py search.py --category 短发 --tag 时尚    # 组合搜索
        """
    )
    
    parser.add_argument('--list-all', action='store_true', help='列出所有发型')
    parser.add_argument('--id', type=str, help='按ID搜索')
    parser.add_argument('--category', type=str, help='按分类搜索')
    parser.add_argument('--tag', type=str, action='append', help='按标签搜索（可多次使用）')
    parser.add_argument('--style', type=str, help='按风格流派搜索')
    parser.add_argument('--face-shape', type=str, help='按脸型搜索')
    parser.add_argument('--difficulty', type=str, choices=['easy', 'medium', 'high'], help='按难度搜索')
    parser.add_argument('--occasion', type=str, help='按场合搜索')
    parser.add_argument('--age-min', type=int, help='最小年龄')
    parser.add_argument('--age-max', type=int, help='最大年龄')
    parser.add_argument('--verbose', '-v', action='store_true', help='显示详细信息')
    parser.add_argument('--prompt-only', action='store_true', help='只显示提示词')
    parser.add_argument('--color-index', type=int, default=0, help='颜色方案索引（用于--prompt-only）')
    
    args = parser.parse_args()
    
    # 初始化搜索工具
    searcher = HairstyleSearch()
    
    # 执行搜索
    results = []
    
    if args.list_all:
        results = searcher.hairstyles
    elif args.id:
        result = searcher.search_by_id(args.id)
        results = [result] if result else []
    else:
        # 组合搜索
        search_params = {}
        if args.category:
            search_params['category'] = args.category
        if args.tag:
            search_params['tags'] = args.tag
        if args.style:
            search_params['style_type'] = args.style
        if args.face_shape:
            search_params['face_shape'] = args.face_shape
        if args.difficulty:
            search_params['difficulty'] = args.difficulty
        if args.occasion:
            search_params['occasion'] = args.occasion
        if args.age_min:
            search_params['age_min'] = args.age_min
        if args.age_max:
            search_params['age_max'] = args.age_max
        
        if search_params:
            results = searcher.search_complex(**search_params)
        else:
            parser.print_help()
            return
    
    # 输出结果
    if not results:
        print("\n未找到匹配的发型。")
        return
    
    print(f"\n找到 {len(results)} 个发型：")
    
    for hairstyle in results:
        if args.prompt_only:
            print(format_prompt_only(hairstyle, args.color_index))
        elif args.verbose:
            print(format_hairstyle_detailed(hairstyle))
        else:
            print(format_hairstyle_simple(hairstyle))
    
    print(f"\n{'='*60}\n")
    print(f"总计: {len(results)} 个结果")

if __name__ == '__main__':
    main()

