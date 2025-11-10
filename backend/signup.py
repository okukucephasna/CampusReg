from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash
from db import get_db_connection
from dotenv import load_dotenv
import os

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")

signup_bp = Blueprint("signup", __name__)

@signup_bp.route("/api/signup", methods=["POST"])
def signup():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"success": False, "message": "Username and password required"}), 400

    hashed_password = generate_password_hash(password)

    conn = get_db_connection()
    cursor = conn.cursor()

    # Check if user already exists
    cursor.execute("SELECT id FROM users WHERE username = %s", (username,))
    if cursor.fetchone():
        cursor.close()
        conn.close()
        return jsonify({"success": False, "message": "Username already exists"}), 409

    # Insert new user
    cursor.execute(
        "INSERT INTO users (username, password) VALUES (%s, %s)",
        (username, hashed_password)
    )
    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"success": True, "message": "User created successfully"})
