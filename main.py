import os
from flask import Flask, render_template

app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key")

@app.route('/')
def index():
    return render_template('index.html')

# Vercel handles static files based on vercel.json,
# so this route is no longer needed in main.py:
# @app.route('/static/<path:filename>')
# def static_files(filename):
#     return send_from_directory('static', filename)

if __name__ == '__main__':
    # This block is for local development only. Vercel's serverless environment
    # automatically runs your 'app' instance.
    app.run(host='0.0.0.0', port=5001, debug=True)
