from flask import Blueprint
from src.controllers.test_controller import test

# main blueprint to be registered with application
api = Blueprint('api', __name__)

# Register test with API blueprint
api.register_blueprint(test, url_prefix="/test")