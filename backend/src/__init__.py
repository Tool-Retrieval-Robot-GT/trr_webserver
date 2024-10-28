from flask import Flask, render_template
from flask_cors import CORS
import roslibpy
import atexit

# Initialize the app
app = Flask(__name__, static_folder='../static', template_folder='../static')

# Enable cors in the app
CORS(app)

# Initialize the ROS client
ros = roslibpy.Ros(host='143.215.53.172', port=9090)

# Attempt to connect to ROS instance
try:
    print("Connecting to ROS...")
    ros.run(timeout=2)
    if ros.is_connected:
        print('ROS connected successfully.')
    else:
        print('Failed to connect to ROS.')
except Exception as e:
    print(f'Error connecting to ROS: {e}')

# When app is shut-down, disconnect from ros instance
def close_ros_connection():
    if ros.is_connected:
        ros.terminate()
        print('ROS connection closed.')

atexit.register(close_ros_connection)

# Serve the "frontend" on the default route
@app.route('/')
def index():
    return render_template('index.html')

map = None
def map_callback(message):
    global map
    map = message

def get_map():
    return map

topic = roslibpy.Topic(ros, "/map", "nav_msgs/OccupancyGrid")
topic.subscribe(map_callback)

# Setup the routes for the api
from src.routes import api
app.register_blueprint(api, url_prefix="/api")