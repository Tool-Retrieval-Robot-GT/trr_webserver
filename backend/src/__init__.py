from flask import Flask, render_template
from flask_cors import CORS

# Initialize the app
app = Flask(__name__, static_folder='../static', template_folder='../static')

# Enable cors in the app
CORS(app)

# Serve the "frontend" on the default route
@app.route('/')
def index():
    return render_template('index.html')

# Setup the routes for the api
from src.routes import api
app.register_blueprint(api, url_prefix="/api")