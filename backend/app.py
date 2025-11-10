from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import jwt
from signup import signup_bp
from signin import signin_bp
from dotenv import load_dotenv
import os
from db import init_db  # Import init_db

# --- Load environment variables ---
load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY", "default-secret-key")

# --- Compute the absolute path to the React build folder ---
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_BUILD_PATH = os.path.abspath(os.path.join(BASE_DIR, "../frontend/build"))

# --- Flask app setup ---
app = Flask(__name__, static_folder=FRONTEND_BUILD_PATH, static_url_path="")
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "*"}})

# --- Initialize database ---
init_db()

# --- Register blueprints ---
app.register_blueprint(signup_bp)
app.register_blueprint(signin_bp)

# --- JWT-protected route ---
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

# --- Serve React frontend ---
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react(path=""):
    if not os.path.exists(FRONTEND_BUILD_PATH):
        return jsonify({"error": "React build folder not found. Please run 'npm run build'."}), 500

    file_path = os.path.join(FRONTEND_BUILD_PATH, path)
    if path != "" and os.path.exists(file_path):
        return send_from_directory(FRONTEND_BUILD_PATH, path)
    else:
        return send_from_directory(FRONTEND_BUILD_PATH, "index.html")

# --- Run app ---
if __name__ == "__main__":
    print("Flask server started!")
    print("Serving React frontend from:", FRONTEND_BUILD_PATH)
    if os.path.exists(FRONTEND_BUILD_PATH):
        print("Files in build directory:", os.listdir(FRONTEND_BUILD_PATH))
    else:
        print("Build folder not found. Run 'npm run build' in the frontend directory.")
    app.run(host="0.0.0.0", port=8080, debug=True)
