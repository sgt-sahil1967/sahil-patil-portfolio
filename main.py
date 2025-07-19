import os
from flask import Flask, render_template

app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key")

@app.route('/')
def index():
    return render_template('index.html')

# Local dev only; Vercel will invoke your WSGI `app` directly
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
