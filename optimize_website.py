#!/usr/bin/env python3
"""
Website optimization script to improve performance, SEO, and user experience
"""

import os
import gzip
import shutil
from pathlib import Path

def compress_css():
    """Minify CSS files by removing unnecessary whitespace and comments."""
    css_file = Path('static/css/style.css')
    if css_file.exists():
        with open(css_file, 'r') as f:
            content = f.read()
        
        # Basic CSS minification
        # Remove comments
        import re
        content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
        # Remove extra whitespace
        content = re.sub(r'\s+', ' ', content)
        content = re.sub(r';\s*}', '}', content)
        content = re.sub(r'{\s*', '{', content)
        content = re.sub(r'}\s*', '}', content)
        content = re.sub(r';\s*', ';', content)
        content = content.strip()
        
        # Save minified version
        with open('static/css/style.min.css', 'w') as f:
            f.write(content)
        
        print(f"CSS minified: {len(content)} characters")

def compress_js():
    """Minify JavaScript files."""
    js_file = Path('static/js/script.js')
    if js_file.exists():
        with open(js_file, 'r') as f:
            content = f.read()
        
        # Basic JS minification
        import re
        # Remove single-line comments (but preserve URLs)
        content = re.sub(r'//(?![^\n]*http)[^\n]*', '', content)
        # Remove multi-line comments
        content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
        # Remove extra whitespace
        content = re.sub(r'\s+', ' ', content)
        content = re.sub(r';\s*', ';', content)
        content = re.sub(r'{\s*', '{', content)
        content = re.sub(r'}\s*', '}', content)
        content = content.strip()
        
        # Save minified version
        with open('static/js/script.min.js', 'w') as f:
            f.write(content)
        
        print(f"JavaScript minified: {len(content)} characters")

def create_gzip_files():
    """Create gzipped versions of static files for better compression."""
    extensions = ['.css', '.js', '.json', '.webp', '.png', '.jpeg', '.jpg']
    static_dir = Path('static')
    
    for file_path in static_dir.rglob('*'):
        if file_path.is_file() and file_path.suffix.lower() in extensions:
            gzip_path = Path(str(file_path) + '.gz')
            
            with open(file_path, 'rb') as f_in:
                with gzip.open(gzip_path, 'wb') as f_out:
                    shutil.copyfileobj(f_in, f_out)
            
            original_size = file_path.stat().st_size
            compressed_size = gzip_path.stat().st_size
            compression_ratio = (1 - compressed_size / original_size) * 100
            
            print(f"Compressed {file_path.name}: {compression_ratio:.1f}% reduction")

def optimize_images():
    """Check image sizes and suggest optimizations."""
    images_dir = Path('static/images')
    total_size = 0
    
    print("\n=== IMAGE OPTIMIZATION REPORT ===")
    for img_file in images_dir.glob('*'):
        if img_file.is_file() and img_file.suffix.lower() in ['.webp', '.png', '.jpg', '.jpeg']:
            size = img_file.stat().st_size
            total_size += size
            size_kb = size / 1024
            
            status = "✓ Optimized" if size_kb < 100 else "⚠ Large" if size_kb < 500 else "❌ Too Large"
            print(f"{img_file.name}: {size_kb:.1f} KB - {status}")
    
    print(f"\nTotal images size: {total_size / 1024:.1f} KB")

if __name__ == '__main__':
    print("Starting website optimization...")
    
    # Minify CSS and JS
    compress_css()
    compress_js()
    
    # Create gzipped versions
    create_gzip_files()
    
    # Analyze images
    optimize_images()
    
    print("\nOptimization complete!")