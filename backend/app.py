from flask import Flask, request, jsonify
from flask_cors import CORS
import jwt
from signup import signup_bp
from signin import signin_bp
from dotenv import load_dotenv
import os
from db import init_db  # Import init_db

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")

app = Flask(__name__)
CORS(app)

# Initialize database (create users table if not exists)
init_db()

# Register blueprints
app.register_blueprint(signup_bp)
app.register_blueprint(signin_bp)

@app.route("/api/user", methods=["GET"])
def get_user():
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        return jsonify({"message": "Missing token"}), 401

    token = auth_header.split(" ")[1]

    try:
        decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return jsonify({"user": {"username": decoded["username"]}})
    except jwt.ExpiredSignatureError:
        return jsonify({"message": "Token expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"message": "Invalid token"}), 401

if __name__ == "__main__":
    app.run(debug=True)
