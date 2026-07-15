import { useState } from "react";
import { FaGoogle, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function RegisterForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Please fill all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      alert(res.data.message);

      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message || "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-10 shadow-2xl">

      <div className="flex justify-center mb-6">
        <FaUserCircle className="text-7xl text-indigo-500" />
      </div>

      <h2 className="text-4xl font-bold text-center">
        Create Account 🚀
      </h2>

      <p className="text-gray-400 text-center mt-3">
        Join DocMind AI
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

      </form>

      <div className="my-8 flex items-center">
        <div className="flex-1 h-px bg-slate-700"></div>
        <span className="px-4 text-gray-500">OR</span>
        <div className="flex-1 h-px bg-slate-700"></div>
      </div>

      <button className="w-full border border-slate-700 rounded-xl py-3 flex justify-center items-center gap-3 hover:bg-slate-800 transition">
        <FaGoogle />
        Continue with Google
      </button>

      <p className="text-center text-gray-400 mt-8">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-indigo-500 hover:underline font-semibold"
        >
          Login
        </Link>
      </p>

    </div>
  );
}