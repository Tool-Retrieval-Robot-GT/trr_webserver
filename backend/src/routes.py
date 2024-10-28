from flask import Blueprint
from src.controllers.test_controller import test
from src.controllers.tool_controller import tools

from src.services.database import db

# main blueprint to be registered with application
api = Blueprint('api', __name__)

# Register test with API blueprint
api.register_blueprint(test, url_prefix="/test")
api.register_blueprint(tools, url_prefix="/tools")