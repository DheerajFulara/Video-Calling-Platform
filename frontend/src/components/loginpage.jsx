import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoopCircleLoading from "./loader.jsx";
import { useAuth } from "../contexts/AuthContext";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [invaliduser, setInvaliduser] = useState("");
  const [loading, setLoading] = useState(false);

  const Logincheck = async () => {
    let newErrors = {};

    if (!email) newErrors.email = "Email is required";
    if (!pass) newErrors.pass = "Password is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);

    try {
      const result = `${import.meta.env.VITE_API_URL}/data/logincheck`;
      const res = await axios.post(result, { email, password: pass });

      if (res.data.data === "Invalid Credentials") {
        setInvaliduser("Please enter valid credentials");
      } else {
        login(res.data);
        navigate("/home");
      }
    } catch (err) {
      setInvaliduser("Server error. Please try again.");
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoopCircleLoading />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-50 overflow-hidden">

      {/* BACKGROUND GLOW BLOBS */}
      <div className="absolute top-[-120px] left-[-100px] w-[400px] h-[400px] bg-indigo-300 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-[-120px] right-[-100px] w-[400px] h-[400px] bg-blue-300 rounded-full blur-3xl opacity-40"></div>

      {/* CARD */}
      <div className="relative bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl transition-all duration-500 hover:shadow-indigo-200 hover:-translate-y-1">

        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">
          Welcome Back 👋
        </h2>

        {/* EMAIL */}
        <div className="mb-5">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          {errors.pass && (
            <p className="text-red-500 text-sm mt-1">{errors.pass}</p>
          )}
        </div>

        {/* LOGIN BUTTON */}
        <button
          onClick={Logincheck}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:bg-indigo-700 hover:shadow-2xl"
        >
          Login
        </button>

        {/* ERROR */}
        {invaliduser && (
          <p className="text-center text-red-500 mt-4">{invaliduser}</p>
        )}

        {/* REGISTER LINK */}
        <p className="text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <span
            className="text-indigo-600 font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>

      </div>
    </div>
  );
};
