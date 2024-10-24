from flask import Blueprint

test = Blueprint("test", __name__)

@test.route('/hello', methods = ["GET"])
def handle_test():
    return "Hello this is my test endpoint"

