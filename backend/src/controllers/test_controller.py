from flask import Blueprint
import numpy as np
from PIL import Image, ImageOps 
import base64
import io

from src.services.ros_client import ros_client

test = Blueprint("test", __name__)

latest_map = {"data": "No map received yet."}
def ros_map_callback(message):
    global latest_map
    latest_map = message
ros_client.setup_subscriber('/map', 'nav_msgs/OccupancyGrid', ros_map_callback)

@test.route('/map', methods = ["GET"])
def send_map():
    global latest_map
    width = latest_map['info']['width']
    height = latest_map['info']['height']
    
    data = np.array(latest_map['data'], dtype=np.int8).reshape((height, width))

    # Map values: 0 (free), 100 (occupied)
    img = np.zeros((height, width, 3), dtype=np.uint8)  # Create a 3-channel image

    # Fill image array
    img[data == 0] = [255, 255, 255]  # Free space as white
    img[data == 100] = [0, 0, 0]      # Occupied space as black

    # Convert the numpy array to a PIL image
    pil_img = Image.fromarray(img)

    high_res_width = width * 5  # or some factor based on your needs
    high_res_height = height * 5  # or some factor based on your needs
    pil_img = pil_img.resize((high_res_width, high_res_height), Image.Resampling.NEAREST)

    pil_img = pil_img.rotate(-90, expand=True)
    pil_img = ImageOps.flip(pil_img)

    # Create a bytes buffer to hold the PNG image
    buffered = io.BytesIO()
    pil_img.save(buffered, format="PNG")

    # Encode the image to base64
    img_str = base64.b64encode(buffered.getvalue()).decode('utf-8')

    img = {'img': img_str, 'width': pil_img.width, 'height': pil_img.height }

    return img

