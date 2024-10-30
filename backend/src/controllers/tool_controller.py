import json
from flask import Blueprint, jsonify, request
from src.services.database import insert_tool, get_tools

tools = Blueprint("tools", __name__)

INPUTFIELDS = [
    ['name', 'size', 'availability', 'image']
]

@tools.route('/create', methods=['POST'])
def create_tool():
    # Read text fields
    name = request.form.get('name')
    size = request.form.get('size')
    availability = request.form.get('availability')
    if 'image' in request.files:
        image = request.files['image']
        image_data = image.read()

    insert_tool(name, size, availability, image_data)

    # Respond with the received data
    return {'message': 'Tool Created'}, 201

@tools.route('/list', methods=['GET'])
def list_tools():
    tools = get_tools()
    return jsonify(tools)