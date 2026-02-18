import React from "react";
import { useNavigate } from "react-router-dom";
import landingImg from "../assets/landingImg.png";

const FrontPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-6 md:px-16 py-5">
        <h1 className="text-3xl md:text-4xl lg:text-4xl font-extrabold text-indigo-600">
          MeetHub
        </h1>

        <div className="flex items-center gap-3 md:gap-6">
          <a className="hidden md:block text-gray-700 font-medium px-3 py-2 rounded-md transition hover:bg-indigo-100 hover:text-indigo-600">
            About
          </a>

          <button
            onClick={() => navigate("/login")}
            className="text-sm md:text-base text-gray-700 font-medium px-3 py-2 rounded-md transition hover:bg-indigo-100 hover:text-indigo-600"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="bg-indigo-600 text-white px-4 md:px-5 py-2 rounded-lg text-sm md:text-base font-semibold hover:bg-indigo-700 transition"
          >
            Register
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="flex flex-col-reverse md:flex-row items-start justify-between px-6 md:px-16 pt-12 md:pt-20 min-h-[85vh] gap-20">
        {/* LEFT CONTENT */}
        <div className="max-w-2xl text-center md:text-left space-y-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight text-gray-900">
            Seamless <span className="text-indigo-600">video meetings</span>
            <br />
            made simple.
          </h1>

          <p className="text-gray-600 text-lg md:text-2xl leading-relaxed">
            Create or join meetings instantly, chat with participants, and
            collaborate in real time.
          </p>

          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-6">
            <button
              onClick={() => navigate("/register")}
              className="
          bg-indigo-600 
          text-white 
          px-10 py-5
          text-lg
          rounded-xl 
          font-semibold 
          shadow-xl
          transition-all 
          duration-300 
          transform 
          hover:-translate-y-2 
          hover:shadow-2xl 
          hover:bg-indigo-700
        "
            >
              Get Started
            </button>

            <button className="border border-gray-300 px-10 py-5 text-lg rounded-xl font-semibold hover:bg-gray-200 transition">
              Learn More
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="w-full md:w-1/2 flex justify-center relative">
          <div className="absolute w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-indigo-200 rounded-full blur-3xl opacity-40"></div>

          <img
            src={landingImg}
            alt="video call"
            className="
      relative
      w-full
      max-w-lg md:max-w-3xl
      drop-shadow-[0_30px_80px_rgba(0,0,0,0.25)]
      transition-transform duration-700
      hover:scale-110
    "
          />
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
