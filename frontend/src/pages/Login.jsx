import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", form);
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      } else {
        setError(res.data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <img
        src="/logo.png"
        alt="Logo"
        className="w-24 h-24 mb-4"
      />
      <h1 className="text-3xl font-extrabold text-green-400 mb-2">
        Hi, welcome back
      </h1>
      <p className="text-gray-400 mb-6">Please fill in your details to log in</p>

      <form
        onSubmit={handleSubmit}
        className="bg-black/60 p-6 rounded-2xl shadow-lg w-full max-w-sm"
      >
        <label className="block mb-3">
          <span className="text-sm font-bold">Username</span>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Student No/ Employee No"
            className="w-full mt-1 px-3 py-2 bg-transparent border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </label>

        <label className="block mb-3">
          <span className="text-sm font-bold">Password</span>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your Password"
            className="w-full mt-1 px-3 py-2 bg-transparent border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </label>

        <div className="flex justify-between items-center mb-4 text-sm">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="accent-green-500" />
            <span>Remember me</span>
          </label>
          <Link to="/forgot-password" className="text-green-400 hover:underline">
            Forgot Password?
          </Link>
        </div>

        {error && <p className="text-red-400 text-center mb-2">{error}</p>}

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 py-2 rounded-lg font-semibold transition-all"
        >
          Sign In
        </button>

        <p className="text-center mt-4 text-gray-300">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-green-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>

      <footer className="text-green-400 text-sm mt-8">
        Copyright © 2025 - ABNO Softwares International
      </footer>
    </div>
  );
}
