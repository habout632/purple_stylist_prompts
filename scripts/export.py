#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
发型提示词导出工具
支持导出为 JSON, Markdown, CSV 等格式
"""

import yaml
import json
import csv
import argparse
import sys
from pathlib import Path
from typing import List, Dict, Any

class HairstyleExporter:
    def __init__(self, yaml_path: str = "prompts/hairstyles.yaml"):
        """初始化导出工具"""
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
    
    def filter_hairstyles(self, **kwargs) -> List[Dict[str, Any]]:
        """筛选发型"""
        results = self.hairstyles
        
        if kwargs.get('category'):
            results = [h for h in results if h.get('category') == kwargs['category']]
        
        if kwargs.get('difficulty'):
            results = [h for h in results if h.get('difficulty') == kwargs['difficulty']]
        
        return results
    
    def export_json(self, output_path: str, hairstyles: List[Dict[str, Any]], pretty: bool = True) -> None:
        """导出为 JSON 格式"""
        with open(output_path, 'w', encoding='utf-8') as f:
            if pretty:
                json.dump({'hairstyles': hairstyles}, f, ensure_ascii=False, indent=2)
            else:
                json.dump({'hairstyles': hairstyles}, f, ensure_ascii=False)
        print(f"✅ 已导出到: {output_path}")
    
    def export_markdown(self, output_path: str, hairstyles: List[Dict[str, Any]]) -> None:
        """导出为 Markdown 格式"""
        lines = []
        lines.append("# 发型提示词库\n")
        lines.append(f"总计: {len(hairstyles)} 个发型\n")
        
        # 按分类分组
        categories = {}
        for h in hairstyles:
            cat = h.get('category', '未分类')
            if cat not in categories:
                categories[cat] = []
            categories[cat].append(h)
        
        for category, items in categories.items():
            lines.append(f"\n## {category}\n")
            
            for h in items:
                lines.append(f"### {h.get('name')} ({h.get('name_en')})\n")
                lines.append(f"**ID**: `{h.get('id')}`  \n")
                lines.append(f"**标签**: {', '.join(h.get('tags', []))}  \n")
                lines.append(f"**难度**: {h.get('difficulty')}  \n")
                lines.append(f"**风格**: {', '.join(h.get('style_type', []))}  \n")
                
                lines.append(f"\n**提示词**:  \n")
                lines.append(f"```\n{h.get('prompt')}\n```\n")
                
                lines.append(f"\n**负向提示词**:  \n")
                lines.append(f"```\n{h.get('negative_prompt')}\n```\n")
                
                # 颜色方案
                colors = h.get('color_options', [])
                if colors:
                    lines.append(f"\n**颜色方案**:  \n")
                    for i, color in enumerate(colors, 1):
                        lines.append(f"{i}. {color.get('name')}: `{color.get('prompt')}`  \n")
                
                # 适用信息
                suitable = h.get('suitable_for', {})
                if suitable:
                    lines.append(f"\n**适用信息**:  \n")
                    if suitable.get('face_shapes'):
                        lines.append(f"- 适合脸型: {', '.join(suitable.get('face_shapes'))}  \n")
                    if suitable.get('age_range'):
                        age = suitable.get('age_range')
                        lines.append(f"- 年龄范围: {age[0]}-{age[1]}岁  \n")
                    if suitable.get('occasions'):
                        lines.append(f"- 适用场合: {', '.join(suitable.get('occasions'))}  \n")
                
                # 造型建议
                tips = h.get('styling_tips')
                if tips:
                    lines.append(f"\n**造型建议**: {tips}  \n")
                
                lines.append("\n---\n")
        
        with open(output_path, 'w', encoding='utf-8') as f:
            f.writelines(lines)
        
        print(f"✅ 已导出到: {output_path}")
    
    def export_csv(self, output_path: str, hairstyles: List[Dict[str, Any]]) -> None:
        """导出为 CSV 格式"""
        with open(output_path, 'w', encoding='utf-8-sig', newline='') as f:
            fieldnames = [
                'ID', '名称', '英文名', '分类', '标签', '风格',
                '难度', '提示词', '负向提示词', '适合脸型',
                '年龄范围', '适用场合', '造型建议'
            ]
            
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            
            for h in hairstyles:
                suitable = h.get('suitable_for', {})
                age_range = suitable.get('age_range', [])
                age_str = f"{age_range[0]}-{age_range[1]}" if age_range else ""
                
                writer.writerow({
                    'ID': h.get('id'),
                    '名称': h.get('name'),
                    '英文名': h.get('name_en'),
                    '分类': h.get('category'),
                    '标签': ', '.join(h.get('tags', [])),
                    '风格': ', '.join(h.get('style_type', [])),
                    '难度': h.get('difficulty'),
                    '提示词': h.get('prompt'),
                    '负向提示词': h.get('negative_prompt'),
                    '适合脸型': ', '.join(suitable.get('face_shapes', [])),
                    '年龄范围': age_str,
                    '适用场合': ', '.join(suitable.get('occasions', [])),
                    '造型建议': h.get('styling_tips', '')
                })
        
        print(f"✅ 已导出到: {output_path}")
    
    def export_prompts_txt(self, output_path: str, hairstyles: List[Dict[str, Any]]) -> None:
        """导出为纯文本提示词格式"""
        lines = []
        
        for h in hairstyles:
            lines.append(f"# {h.get('name')} ({h.get('id')})\n")
            lines.append(f"{h.get('prompt')}\n")
            
            # 添加颜色方案
            colors = h.get('color_options', [])
            if colors:
                for color in colors:
                    lines.append(f"## {color.get('name')}\n")
                    lines.append(f"keep character consistent; only change the haircut: {h.get('prompt')}, {color.get('prompt')}\n")
            
            lines.append("\n")
        
        with open(output_path, 'w', encoding='utf-8') as f:
            f.writelines(lines)
        
        print(f"✅ 已导出到: {output_path}")

def main():
    # 设置 Windows 控制台编码
    if sys.platform == 'win32':
        try:
            import io
            sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
        except:
            pass
    
    parser = argparse.ArgumentParser(
        description='发型提示词导出工具',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
示例用法:
  py export.py --format json --output hairstyles.json
  py export.py --format markdown --output hairstyles.md
  py export.py --format csv --output hairstyles.csv
  py export.py --format txt --output prompts.txt
  py export.py --format json --category 短发 --output short_hair.json
        """
    )
    
    parser.add_argument('--format', type=str, required=True,
                       choices=['json', 'markdown', 'csv', 'txt'],
                       help='导出格式')
    parser.add_argument('--output', type=str, required=True,
                       help='输出文件路径')
    parser.add_argument('--category', type=str,
                       help='只导出指定分类')
    parser.add_argument('--difficulty', type=str,
                       choices=['easy', 'medium', 'high'],
                       help='只导出指定难度')
    parser.add_argument('--pretty', action='store_true',
                       help='JSON 格式化输出（仅用于 JSON）')
    
    args = parser.parse_args()
    
    # 初始化导出工具
    exporter = HairstyleExporter()
    
    # 筛选发型
    hairstyles = exporter.filter_hairstyles(
        category=args.category,
        difficulty=args.difficulty
    )
    
    if not hairstyles:
        print("错误: 没有找到匹配的发型")
        sys.exit(1)
    
    print(f"准备导出 {len(hairstyles)} 个发型...")
    
    # 导出
    if args.format == 'json':
        exporter.export_json(args.output, hairstyles, args.pretty)
    elif args.format == 'markdown':
        exporter.export_markdown(args.output, hairstyles)
    elif args.format == 'csv':
        exporter.export_csv(args.output, hairstyles)
    elif args.format == 'txt':
        exporter.export_prompts_txt(args.output, hairstyles)

if __name__ == '__main__':
    main()

