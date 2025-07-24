import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    const res = await fetch("/register", {
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
      setError(data.error || "Registration failed");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    const res = await fetch('/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: credentialResponse.credential }),
      credentials: 'include'
    });
    const data = await res.json();
    if (res.ok) {
      setUser(data);
      navigate('/');
    } else {
      setError('Google sign-in failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-grey-10">
      <form
        onSubmit={handleSubmit}
        className="bg-grey-08 p-8 rounded-xl shadow-lg w-full max-w-md flex flex-col gap-6 border border-grey-20"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-2">Sign Up</h2>
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          required
          className="p-3 rounded bg-grey-10 border border-grey-20 text-white focus:outline-none focus:border-purple-600"
        />
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
          Sign Up
        </button>
        <div className="flex items-center gap-2 my-2">
          <div className="flex-1 h-px bg-grey-20" />
          <span className="text-grey-30 text-sm">or</span>
          <div className="flex-1 h-px bg-grey-20" />
        </div>
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError('Google sign-in failed')}
          />
        </div>
        {error && <div className="text-red-500 text-center">{error}</div>}
      </form>
    </div>
  );
};

export default Register; 