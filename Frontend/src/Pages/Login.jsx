// import React, { useEffect, useState } from "react";
// import auth from "../config/Firebase";
// import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toast";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     onAuthStateChanged(auth, (user) => {
//       if (user) navigate("/dashboard");
//     });
//   }, [navigate]);

//   const handleSubmit = async () => {
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       navigate("/dashboard");
//       toast.success("Login Successful");
//     } catch (error) {
//       setError("Invalid Email or Password");
//       toast.error("Login Failed");
//     }
//   };

//   return (
//     <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-4">
//       <div className="bg-white/20 backdrop-blur-lg border border-white/30 shadow-2xl rounded-2xl px-8 py-10 w-full max-w-md">
//         <h1 className="text-center text-2xl md:text-3xl font-bold text-white">
//           Welcome Back
//         </h1>
//         <p className="text-center text-sm text-gray-200 mt-2">
//           Login to continue to your dashboard
//         </p>

//         <div className="flex flex-col gap-4 mt-6">
//           <input
//             onChange={(e) => setEmail(e.target.value)}
//             type="text"
//             placeholder="Enter Your Email"
//             className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-white"
//           />
//           <input
//             onChange={(e) => setPassword(e.target.value)}
//             type="password"
//             placeholder="Enter Your Password"
//             className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition text-white"
//           />
//         </div>

//         {error && (
//           <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
//         )}

//         <p
//           onClick={() => navigate("/signup")}
//           className="text-gray-200 mt-4 text-sm cursor-pointer hover:underline text-center"
//         >
//           New user? Please signup
//         </p>

//         <button
//           onClick={handleSubmit}
//           className="bg-purple-600 hover:bg-purple-700 active:scale-95 transition text-white w-full py-2 mt-5 rounded-lg font-semibold shadow-md"
//         >
//           Login
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useEffect, useState } from "react";
import auth from "../config/Firebase";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) navigate("/dashboard");
    });
  }, [navigate]);

  const handleSubmit = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
      toast.success("Login Successful");
    } catch (error) {
      setError("Invalid Email or Password");
      toast.error("Login Failed");
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col md:flex-row">
      {/* Left Side - Image / Illustration */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 justify-center items-center">
        <h1 className="text-4xl font-bold text-white text-center px-6">
          Welcome Back 👋 <br />
          <span className="text-lg font-light">
            Manage everything in your dashboard
          </span>
        </h1>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex w-full md:w-1/2 justify-center items-center bg-gray-50 p-6">
        <div className="bg-white shadow-xl rounded-xl px-8 py-10 w-full max-w-md">
          <h1 className="text-center text-2xl md:text-3xl font-bold text-gray-800">
            Login
          </h1>
          <p className="text-center text-sm text-gray-500 mt-1">
            Please enter your credentials
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
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
          )}

          <p
            onClick={() => navigate("/signup")}
            className="text-purple-600 mt-4 text-sm cursor-pointer hover:underline text-center"
          >
            New user? Create an account
          </p>

          <button
            onClick={handleSubmit}
            className="bg-purple-600 hover:bg-purple-700 transition text-white w-full py-2 mt-5 rounded-lg font-semibold shadow-md"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
