#!/usr/bin/env python3
"""
Image processing script to convert images to WebP format,
compress them, and extract primary colors for theme switching.
"""

import os
from PIL import Image
from colorthief import ColorThief
import json

def rgb_to_hex(rgb):
    """Convert RGB tuple to hex color."""
    return '#{:02x}{:02x}{:02x}'.format(rgb[0], rgb[1], rgb[2])

def extract_color_palette(image_path):
    """Extract dominant colors from an image."""
    try:
        # Get dominant color
        color_thief = ColorThief(image_path)
        dominant_color = color_thief.get_color(quality=1)
        
        # Get color palette (5 colors)
        palette = color_thief.get_palette(color_count=6, quality=1)
        
        return {
            'dominant': rgb_to_hex(dominant_color),
            'palette': [rgb_to_hex(color) for color in palette]
        }
    except Exception as e:
        print(f"Error extracting colors from {image_path}: {e}")
        return None

def convert_to_webp(input_path, output_path, quality=85):
    """Convert image to WebP format with compression."""
    try:
        with Image.open(input_path) as img:
            # Convert to RGB if necessary
            if img.mode in ('RGBA', 'P'):
                img = img.convert('RGB')
            
            # Resize if too large (max 1920px width)
            if img.width > 1920:
                ratio = 1920 / img.width
                new_height = int(img.height * ratio)
                img = img.resize((1920, new_height), Image.Resampling.LANCZOS)
            
            # Save as WebP with specified quality
            img.save(output_path, 'WebP', quality=quality, optimize=True)
            print(f"Converted {input_path} to {output_path}")
            return True
    except Exception as e:
        print(f"Error converting {input_path}: {e}")
        return False

def process_images():
    """Process all images and create theme data."""
    # Create static/images directory if it doesn't exist
    os.makedirs('static/images', exist_ok=True)
    
    # Define image mappings
    image_mappings = [
        {
            'name': 'yellow-theme',
            'input': 'attached_assets/bg for portfolio_1752894149274.jpeg',
            'output': 'static/images/bg-yellow.webp',
            'fallback_colors': {
                'dominant': '#ffd700',
                'palette': ['#ffd700', '#ffed4e', '#fff3a0', '#ffc107', '#ff8f00', '#f57f17']
            }
        },
        {
            'name': 'orange-theme', 
            'input': 'attached_assets/me_bg_1752903393622.png',
            'output': 'static/images/bg-orange.webp',
            'fallback_colors': {
                'dominant': '#ff6b35',
                'palette': ['#ff6b35', '#f7931e', '#ffb347', '#d2691e', '#cd853f', '#a0522d']
            }
        },
        {
            'name': 'purple-theme',
            'input': 'attached_assets/pink bg_1752903393624.png', 
            'output': 'static/images/bg-purple.webp',
            'fallback_colors': {
                'dominant': '#c792ea',
                'palette': ['#c792ea', '#bb86fc', '#e1bee7', '#ba68c8', '#9c27b0', '#7b1fa2']
            }
        },
        {
            'name': 'blue-theme',
            'input': 'attached_assets/WhatsApp Image 2025-07-19 at 10.49.10_1752903393624.jpeg',
            'output': 'static/images/bg-blue.webp',
            'fallback_colors': {
                'dominant': '#2196f3',
                'palette': ['#2196f3', '#64b5f6', '#90caf9', '#1976d2', '#1565c0', '#0d47a1']
            }
        },
        {
            'name': 'green-theme',
            'input': 'attached_assets/WhatsApp Image 2025-07-19 at 10.50.51_1752903393625.jpeg',
            'output': 'static/images/bg-green.webp',
            'fallback_colors': {
                'dominant': '#4caf50',
                'palette': ['#4caf50', '#66bb6a', '#a5d6a7', '#388e3c', '#2e7d32', '#1b5e20']
            }
        }
    ]
    
    theme_data = {}
    
    for mapping in image_mappings:
        print(f"\nProcessing {mapping['name']}...")
        
        # Convert to WebP
        if os.path.exists(mapping['input']):
            success = convert_to_webp(mapping['input'], mapping['output'], quality=85)
            
            if success:
                # Extract colors
                colors = extract_color_palette(mapping['output'])
                if colors:
                    theme_data[mapping['name']] = {
                        'background': mapping['output'],
                        'colors': colors
                    }
                else:
                    # Use fallback colors
                    theme_data[mapping['name']] = {
                        'background': mapping['output'],
                        'colors': mapping['fallback_colors']
                    }
            else:
                print(f"Failed to convert {mapping['name']}")
        else:
            print(f"Input file not found: {mapping['input']}")
    
    # Save theme data
    with open('static/themes.json', 'w') as f:
        json.dump(theme_data, f, indent=2)
    
    print(f"\nProcessed {len(theme_data)} themes successfully!")
    print("Theme data saved to static/themes.json")
    
    return theme_data

if __name__ == '__main__':
    theme_data = process_images()
    
    # Print theme summary
    print("\n=== THEME SUMMARY ===")
    for theme_name, theme_info in theme_data.items():
        colors = theme_info['colors']
        print(f"\n{theme_name.upper()}:")
        print(f"  Background: {theme_info['background']}")
        print(f"  Dominant Color: {colors['dominant']}")
        print(f"  Palette: {', '.join(colors['palette'][:3])}")