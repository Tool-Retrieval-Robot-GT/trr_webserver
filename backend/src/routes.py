from flask import Blueprint
from src.controllers.map_controller import map
from src.controllers.tool_controller import tools

# main blueprint to be registered with application
api = Blueprint('api', __name__)

# Register test with API blueprint
api.register_blueprint(map, url_prefix="/map")
api.register_blueprint(tools, url_prefix="/tools")