import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    // Optionally fetch user data from Flask
    api
      .get("/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/");
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-6">
      <div className="bg-black/60 p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-extrabold text-green-400 mb-4">
          Welcome to Your Dashboard
        </h1>
        <p className="text-gray-300 mb-6">
          {user ? (
            <>
              Logged in as:{" "}
              <span className="text-green-400 font-semibold">
                {user.username}
              </span>
            </>
          ) : (
            "Fetching user details..."
          )}
        </p>
        <button
          onClick={handleLogout}
          className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg font-semibold transition-all"
        >
          Log Out
        </button>
      </div>
      <footer className="text-green-400 text-sm mt-8">
        Copyright © 2025 - ABNO Softwares International
      </footer>
    </div>
  );
}
