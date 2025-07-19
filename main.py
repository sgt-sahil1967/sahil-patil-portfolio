import os
from flask import Flask, render_template, send_from_directory, request
from pathlib import Path

app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/static/<path:filename>')
def static_files(filename):
    # Check if client accepts gzip and if gzipped version exists
    if 'gzip' in request.headers.get('Accept-Encoding', ''):
        gzipped_file = Path('static') / (filename + '.gz')
        if gzipped_file.exists():
            response = send_from_directory('static', filename + '.gz')
            response.headers['Content-Encoding'] = 'gzip'
            response.headers['Content-Type'] = get_content_type(filename)
            return response
    
    return send_from_directory('static', filename)

def get_content_type(filename):
    """Get appropriate content type for file."""
    ext = Path(filename).suffix.lower()
    content_types = {
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.json': 'application/json',
        '.webp': 'image/webp',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg'
    }
    return content_types.get(ext, 'application/octet-stream')

@app.after_request
def add_headers(response):
    """Add performance and security headers."""
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'DENY'
    response.headers['X-XSS-Protection'] = '1; mode=block'
    
    # Cache static files for 1 year, others for no cache
    if 'static' in request.path:
        response.headers['Cache-Control'] = 'public, max-age=31536000'
    else:
        response.headers['Cache-Control'] = 'no-cache'
    
    return response

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
