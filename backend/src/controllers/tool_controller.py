from flask import Blueprint

tools = Blueprint("tools", __name__)

@tools.route("/hello/<int:thenumber>", methods = ["GET"])
def test(thenumber):
    return f"tool route test {thenumber}"