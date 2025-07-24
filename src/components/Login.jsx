import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    const res = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
      credentials: "include"
    });
    const data = await res.json();
    if (res.ok) {
      setUser(data);
      navigate("/");
    } else {
      setError(data.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-grey-10">
      <form
        onSubmit={handleSubmit}
        className="bg-grey-08 p-8 rounded-xl shadow-lg w-full max-w-md flex flex-col gap-6 border border-grey-20"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-2">Login</h2>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="p-3 rounded bg-grey-10 border border-grey-20 text-white focus:outline-none focus:border-purple-600"
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="p-3 rounded bg-grey-10 border border-grey-20 text-white focus:outline-none focus:border-purple-600"
        />
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded transition-colors"
        >
          Login
        </button>
        {error && <div className="text-red-500 text-center">{error}</div>}
      </form>
    </div>
  );
};

export default Login; 