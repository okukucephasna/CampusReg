from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash
import jwt, datetime
from db import get_db_connection
from dotenv import load_dotenv
import os

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")

signin_bp = Blueprint("signin", __name__)

@signin_bp.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"success": False, "message": "Username and password required"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT password FROM users WHERE username = %s", (username,))
    result = cursor.fetchone()
    cursor.close()
    conn.close()

    if not result:
        return jsonify({"success": False, "message": "Invalid credentials"}), 401

    if not check_password_hash(result[0], password):
        return jsonify({"success": False, "message": "Invalid credentials"}), 401

    token = jwt.encode(
        {"username": username, "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=2)},
        SECRET_KEY,
        algorithm="HS256"
    )

    return jsonify({"success": True, "token": token})
