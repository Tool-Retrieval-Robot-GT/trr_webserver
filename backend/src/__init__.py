from flask import Flask, render_template
from flask_cors import CORS
import roslibpy

# Initialize the app
app = Flask(__name__, static_folder='../static', template_folder='../static')

# Enable cors in the app
CORS(app)

# Initialize the ROS client
ros_client = roslibpy.Ros(host='localhost', port=9090)

# Attempt to connect to ROS instance
try:
    print("Connecting to ROS...")
    ros_client.run(timeout=2)
    if ros_client.is_connected:
        print('ROS connected successfully.')
    else:
        print('Failed to connect to ROS.')
except Exception as e:
    print(f'Error connecting to ROS: {e}')

# When app is shut-down, disconnect from ros instance
@app.teardown_appcontext
def close_ros(exception):
    if ros_client.is_connected:
        ros_client.terminate()
        print('ROS connection closed.')

# Serve the "frontend" on the default route
@app.route('/')
def index():
    return render_template('index.html')

# Setup the routes for the api
from src.routes import api
app.register_blueprint(api, url_prefix="/api")
