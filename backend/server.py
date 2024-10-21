from flask import Flask, render_template
from flask_cors import CORS
import roslibpy

app = Flask(__name__, static_folder='static', template_folder='static')
CORS(app)

# Initialize the ROS client globally
ros_client = roslibpy.Ros(host='localhost', port=9090)

# Push app context and connect to ROS
with app.app_context():
    if not ros_client.is_connected:
        ros_client.run()
        print('ROS connected:', ros_client.is_connected)

@app.route('/')
def index():
    return render_template('index.html')

@app.teardown_appcontext
def close_ros(exception):
    if ros_client.is_connected:
        ros_client.terminate()
        print('ROS connection closed.')

if __name__ == '__main__':
    app.run(debug=True)
