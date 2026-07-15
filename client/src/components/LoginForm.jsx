import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function LoginForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Normal Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert(res.data.message);

      navigate("/dashboard");

    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);

      localStorage.setItem(
        "firebaseUser",
        JSON.stringify(result.user)
      );

      alert("Google Login Successful");

      navigate("/dashboard");

    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-10 shadow-2xl">

      <h2 className="text-4xl font-bold text-center">
        Welcome Back 👋
      </h2>

      <p className="text-gray-400 text-center mt-3">
        Login to continue using DocMind AI
      </p>

      <form onSubmit={handleSubmit} className="mt-10 space-y-6">

        <div>
          <label>Email</label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mt-2 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label>Password</label>

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full mt-2 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex justify-between text-sm text-gray-400">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Remember Me
          </label>

          <button
            type="button"
            className="hover:text-indigo-400"
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition"
        >
          {loading ? "Logging In..." : "Login"}
        </button>

      </form>

      <div className="my-8 flex items-center">
        <div className="flex-1 h-px bg-slate-700"></div>

        <span className="px-4 text-gray-500">
          OR
        </span>

        <div className="flex-1 h-px bg-slate-700"></div>
      </div>

      <button
        onClick={handleGoogleLogin}
        type="button"
        className="w-full border border-slate-700 rounded-xl py-3 flex justify-center items-center gap-3 hover:bg-slate-800 transition"
      >
        <FaGoogle />
        Continue with Google
      </button>

      <p className="text-center text-gray-400 mt-8">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-indigo-500 hover:underline font-semibold"
        >
          Register
        </Link>
      </p>

    </div>
  );
}