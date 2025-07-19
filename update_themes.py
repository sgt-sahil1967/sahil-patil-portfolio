#!/usr/bin/env python3
"""
Update theme colors with brighter, more vibrant colors
"""

import json
from colorthief import ColorThief

def rgb_to_hex(rgb):
    """Convert RGB tuple to hex color."""
    return '#{:02x}{:02x}{:02x}'.format(rgb[0], rgb[1], rgb[2])

def brighten_color(hex_color, factor=1.3):
    """Make a color brighter by increasing RGB values."""
    # Remove # if present
    hex_color = hex_color.lstrip('#')
    
    # Convert to RGB
    r = int(hex_color[0:2], 16)
    g = int(hex_color[2:4], 16)
    b = int(hex_color[4:6], 16)
    
    # Brighten by factor
    r = min(255, int(r * factor))
    g = min(255, int(g * factor))
    b = min(255, int(b * factor))
    
    return '#{:02x}{:02x}{:02x}'.format(r, g, b)

def extract_and_brighten_colors(image_path):
    """Extract colors and create brighter variants."""
    try:
        color_thief = ColorThief(image_path)
        dominant_color = color_thief.get_color(quality=1)
        palette = color_thief.get_palette(color_count=6, quality=1)
        
        # Convert to hex and brighten
        dominant_hex = rgb_to_hex(dominant_color)
        bright_dominant = brighten_color(dominant_hex, 1.4)
        
        palette_hex = [rgb_to_hex(color) for color in palette]
        bright_palette = [brighten_color(color, 1.3) for color in palette_hex]
        
        return {
            'dominant': bright_dominant,
            'palette': bright_palette
        }
    except Exception as e:
        print(f"Error extracting colors from {image_path}: {e}")
        return None

def update_themes():
    """Update themes with new images and brighter colors."""
    
    # Define updated theme configurations with vibrant colors
    themes = {
        'yellow-theme': {
            'background': 'static/images/bg-yellow.webp',
            'colors': {
                'dominant': '#ffd700',  # Bright gold
                'palette': ['#ffd700', '#ffed4a', '#fff59d', '#ffc107', '#ff9800', '#f57c00']
            }
        },
        'orange-theme': {
            'background': 'static/images/bg-orange.webp',
            'colors': extract_and_brighten_colors('static/images/bg-orange.webp') or {
                'dominant': '#ff914d',  # Bright orange-red
                'palette': ['#ff914d', '#ff8a50', '#ffb74d', '#e65100', '#bf360c', '#d84315']
            }
        },
        'purple-theme': {
            'background': 'static/images/bg-purple.webp',
            'colors': extract_and_brighten_colors('static/images/bg-purple.webp') or {
                'dominant': '#e91e63',  # Bright pink
                'palette': ['#e91e63', '#f06292', '#f8bbd9', '#c2185b', '#ad1457', '#880e4f']
            }
        },
        'blue-theme': {
            'background': 'static/images/bg-blue.webp',
            'colors': {
                'dominant': '#00bcd4',  # Bright cyan from the water
                'palette': ['#00bcd4', '#26c6da', '#4dd0e1', '#00acc1', '#0097a7', '#006064']
            }
        },
        'green-theme': {
            'background': 'static/images/bg-green.webp',
            'colors': {
                'dominant': '#9c27b0',  # Bright purple from night sky
                'palette': ['#9c27b0', '#ab47bc', '#ba68c8', '#8e24aa', '#7b1fa2', '#4a148c']
            }
        }
    }
    
    # Try to extract real colors for blue and green themes
    blue_colors = extract_and_brighten_colors('static/images/bg-blue.webp')
    if blue_colors:
        themes['blue-theme']['colors'] = blue_colors
        print("Extracted bright colors for blue theme:", blue_colors['dominant'])
    
    green_colors = extract_and_brighten_colors('static/images/bg-green.webp')
    if green_colors:
        themes['green-theme']['colors'] = green_colors
        print("Extracted bright colors for green theme:", green_colors['dominant'])
    
    # Save updated themes
    with open('static/themes.json', 'w') as f:
        json.dump(themes, f, indent=2)
    
    print("Updated themes with brighter colors!")
    
    # Print theme summary
    print("\n=== UPDATED THEME SUMMARY ===")
    for theme_name, theme_info in themes.items():
        colors = theme_info['colors']
        print(f"\n{theme_name.upper()}:")
        print(f"  Background: {theme_info['background']}")
        print(f"  Dominant Color: {colors['dominant']}")
        print(f"  Palette: {', '.join(colors['palette'][:3])}")

if __name__ == '__main__':
    update_themes()