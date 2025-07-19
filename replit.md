# Portfolio Website

## Overview

This is a personal portfolio website for Sahil Patil, a Jr. Web Developer specializing in Flask, WordPress, and Shopify development. The application is built using Flask as the backend framework with a modern frontend featuring Bootstrap 5, Three.js animations, and responsive design.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: Vanilla HTML, CSS, and JavaScript with Bootstrap 5 for responsive design
- **Styling**: Custom CSS with CSS variables for consistent theming, Google Fonts (Poppins), and Font Awesome icons
- **Interactive Elements**: Three.js for 3D animations and particle effects
- **Layout**: Single-page application with smooth scrolling navigation
- **Responsive Design**: Mobile-first approach using Bootstrap's grid system

### Backend Architecture
- **Framework**: Flask (Python web framework)
- **Server**: Development server running on host 0.0.0.0, port 5000
- **Template Engine**: Jinja2 (Flask's default templating engine)
- **Static File Serving**: Custom route for serving static assets

## Key Components

### Backend Components
1. **Flask Application (`main.py`)**
   - Main application entry point
   - Route handlers for homepage and static files
   - Session secret key configuration via environment variables
   - Debug mode enabled for development

2. **Template System**
   - `templates/index.html`: Main portfolio page template
   - Jinja2 templating for dynamic content rendering

### Frontend Components
1. **HTML Structure (`templates/index.html`)**
   - Semantic HTML5 structure
   - SEO-optimized meta tags
   - Loading screen implementation
   - Navigation with Bootstrap components

2. **Styling (`static/css/style.css`)**
   - CSS custom properties for consistent theming
   - Professional color scheme (brown/gold palette)
   - Responsive design patterns
   - Animation and transition definitions

3. **JavaScript Functionality**
   - **Main Script (`static/js/script.js`)**: Core functionality including loader, navigation, scroll animations, and smooth scrolling
   - **Three.js Scene (`static/js/three-scene.js`)**: 3D background animations with floating geometric shapes

## Data Flow

1. **Request Handling**: Flask receives HTTP requests and routes them to appropriate handlers
2. **Template Rendering**: Flask renders HTML templates with Jinja2, injecting dynamic content
3. **Static Asset Delivery**: CSS, JavaScript, and other static files served via dedicated route
4. **Client-Side Interactivity**: JavaScript handles user interactions, animations, and Three.js rendering

## External Dependencies

### CDN Resources
- **Bootstrap 5**: CSS framework for responsive design
- **Font Awesome**: Icon library for UI elements
- **Google Fonts**: Poppins font family for typography
- **Three.js**: 3D graphics library for background animations

### Python Dependencies
- **Flask**: Web framework for backend functionality
- **Standard Library**: `os` module for environment variable access

## Deployment Strategy

### Development Environment
- Flask development server with debug mode enabled
- Hot reloading for development changes
- Environment-based configuration for session secrets

### Production Considerations
- Session secret should be set via `SESSION_SECRET` environment variable
- Debug mode should be disabled in production
- Static file serving should be handled by a web server (nginx/Apache) in production
- WSGI server (Gunicorn/uWSGI) recommended for production deployment

### File Structure
```
├── main.py                    # Flask application entry point
├── templates/
│   └── index.html            # Main page template
├── static/
│   ├── css/
│   │   └── style.css         # Custom styling
│   └── js/
│       ├── script.js         # Main JavaScript functionality
│       └── three-scene.js    # Three.js 3D animations
└── attached_assets/          # Reference materials and requirements
```

The application follows a simple but effective architecture suitable for a personal portfolio website, with clear separation between backend logic, templating, and frontend assets. The design emphasizes modern web standards, responsive design, and engaging visual elements through Three.js integration.