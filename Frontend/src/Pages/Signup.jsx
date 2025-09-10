import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../config/Firebase";
import { toast } from "react-toast";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) navigate("/dashboard");
    });
  }, [navigate]);

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
      toast.success("User Registered");
    } catch (error) {
      toast.error("User already exists");
      console.log(error);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col md:flex-row">
      {/* Left Side - Illustration / Gradient */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 justify-center items-center">
        <h1 className="text-4xl font-bold text-white text-center px-6">
          Join Us 🚀 <br />
          <span className="text-lg font-light">
            Create your account and get started
          </span>
        </h1>
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex w-full md:w-1/2 justify-center items-center bg-gray-50 p-6">
        <div className="bg-white shadow-xl rounded-xl px-8 py-10 w-full max-w-md">
          <h1 className="text-center text-2xl md:text-3xl font-bold text-gray-800">
            Create Account
          </h1>
          <p className="text-center text-sm text-gray-500 mt-1">
            Fill in your details to get started
          </p>

          <div className="flex flex-col gap-4 mt-6">
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email"
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              placeholder="Confirm Password"
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
          )}

          <p
            onClick={() => navigate("/")}
            className="text-purple-600 mt-4 text-sm cursor-pointer hover:underline text-center"
          >
            Already a user? Login
          </p>

          <button
            onClick={handleSignup}
            className="bg-purple-600 hover:bg-purple-700 transition text-white w-full py-2 mt-5 rounded-lg font-semibold shadow-md"
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
