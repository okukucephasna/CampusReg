import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";

export default function Signup() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/signup", form);
      if (res.data.success) {
        navigate("/");
      } else {
        setMessage(res.data.message || "Signup failed");
      }
    } catch (err) {
      setMessage("Server error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <h1 className="text-3xl font-extrabold text-green-400 mb-2">
        Create Account
      </h1>
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
            placeholder="Enter Username"
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
            placeholder="Enter Password"
            className="w-full mt-1 px-3 py-2 bg-transparent border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </label>

        {message && <p className="text-red-400 text-center mb-2">{message}</p>}

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 py-2 rounded-lg font-semibold transition-all"
        >
          Sign Up
        </button>

        <p className="text-center mt-4 text-gray-300">
          Already have an account?{" "}
          <Link to="/" className="text-green-400 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
