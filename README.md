````markdown
# CampusReg – Full-Stack Course Registration System 🔒

**CampusReg** is a full-stack **course registration system** featuring a **React frontend** and a **Flask + PostgreSQL backend**.  
It provides secure user registration and login using **JWT authentication**, with hashed passwords and environment variables for sensitive info.

The frontend leverages:

- **React** – Modern UI library  
- **Axios** – For HTTP requests to the backend  
- **React Router DOM** – For client-side routing  
- **Tailwind CSS** – Utility-first styling  
- **Bootstrap** – Responsive components  

---

## Features ✨

- User registration (`/api/signup`)  
- User login with JWT token (`/api/login`)  
- JWT-protected route to get user info (`/api/user`)  
- PostgreSQL database integration  
- Password hashing with Werkzeug  
- Environment variables for credentials and secret key  
- Modern React frontend using Axios, Tailwind, Bootstrap, and React Router  

---

## Prerequisites ⚡

- Python 3.10+  
- PostgreSQL  
- Node.js & npm/yarn  
- `pip`  

---

## Backend Setup 🛠️

1. **Clone the repository:**

```bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo
````

2. **Create and activate a virtual environment:**

```bash
python -m venv venv
# Linux / macOS
source venv/bin/activate
# Windows
venv\Scripts\activate
```

3. **Install backend dependencies:**

```bash
pip install -r requirements.txt
```

4. **Create a `.env` file** in the project root:

```
DB_HOST=localhost
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
SECRET_KEY=yoursecretkey
```

5. **Run the Flask backend:**

```bash
python app.py
```

> The backend will automatically create the `users` table if it doesn’t exist.

---

## Frontend Setup 💻

1. Navigate to the frontend folder (assuming `frontend`):

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm start
# or
yarn start
```

The React frontend runs on `http://localhost:3000` and communicates with the Flask backend via **Axios**.

---

## API Endpoints 📡

### 1. Register a new user

* **URL:** `/api/signup`
* **Method:** POST
* **Body (JSON):**

```json
{
  "username": "your_username",
  "password": "your_password"
}
```

* **Response:**

```json
{
  "success": true,
  "message": "User registered successfully"
}
```

---

### 2. Login user

* **URL:** `/api/login`
* **Method:** POST
* **Body (JSON):**

```json
{
  "username": "your_username",
  "password": "your_password"
}
```

* **Response:**

```json
{
  "success": true,
  "token": "your_jwt_token_here"
}
```

---

### 3. Get logged-in user info

* **URL:** `/api/user`
* **Method:** GET
* **Headers:**

```http
Authorization: Bearer your_jwt_token_here
```

* **Response:**

```json
{
  "user": {
    "username": "your_username"
  }
}
```

---

## Architecture Diagram 🏗️
```mermaid
graph LR
A[React Frontend] -->|Sends Request (Axios)| B[Flask Backend (API)]
B -->|Queries| C[(PostgreSQL Database)]
C -->|Returns Data| B
B -->|Responds with JSON| A
```

**Explanation:**

1. **React Frontend** – Handles UI, forms, and client-side routing.
2. **Axios** – Sends HTTP requests (signup, login, fetch user info) to the backend.
3. **Flask Backend** – Handles API requests, authenticates users, generates JWTs, and interacts with the database.
4. **PostgreSQL** – Stores user credentials securely (hashed passwords).
5. JWT token – Sent by frontend in headers to access protected routes.

---

## Notes 📝

* Passwords are stored **hashed** using PBKDF2 with SHA256.
* JWT tokens expire in 2 hours.
* `.env` keeps credentials and secret key safe – **do not push it to GitHub**.
* The frontend uses **React + Tailwind + Bootstrap** for a modern responsive UI.
* **Axios** handles API calls, and **React Router DOM** handles client-side navigation.

---

## License

MIT License © 2025

```

---

This version is **complete, professional, and visually structured** for GitHub.  

If you want, I can also **add a small section showing example React Axios calls** for signup and login, so anyone can immediately test the API from the frontend.  

Do you want me to add that?
```
