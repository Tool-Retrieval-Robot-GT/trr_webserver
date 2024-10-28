from flask import Blueprint, request

tools = Blueprint("tools", __name__)

@tools.route("/hello/<int:thenumber>", methods = ["GET"])
def test(thenumber):
    return f"tool route test {thenumber}"

INPUTFIELDS = [
    ['name', 'size', 'availability', 'image']
]

@tools.route('/create', methods=['POST'])
def create_tool():
    # Create a dictionary to store the data
    tool_data = {}
    
    # Read text fields
    tool_data['name'] = request.form.get('name')
    tool_data['size'] = request.form.get('size')
    tool_data['availability'] = request.form.get('availability')
    if 'image' in request.files:
        image = request.files['image']
    
    print(image)
    
    # Log the tool data for debugging
    print("Received tool data:", tool_data)

    # Respond with the received data
    return tool_data, 201