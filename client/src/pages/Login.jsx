import { SignIn } from "@clerk/clerk-react";

import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function SignInPage() {
  return <SignIn path="/login" routing="path" />;
}

// import { Link, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import axios from "axios";
// import { useContext } from "react";
// import { AppContext } from "../context/AppContext";

// const Login = () => {
//   const { setProgress, setUser } = useContext(AppContext);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setProgress(0);
//     const email = e.target.email.value;
//     const password = e.target.password.value;

//     if (!email || !password) {
//       toast.error("Please fill all fields");
//     }
//     if (!email.includes("@") || !email.includes(".")) {
//       toast.error("Invalid email");
//     }

//     const res = await axios.post("http://localhost:5000/api/login", {
//       email,
//       password,
//     });
//     const data = await res.data;
//     setUser(data.data);
//     localStorage.setItem("token", data.token);
//     setProgress(100);
//     if (data.success === true) {
//       toast.success(data.message);
//       e.target.reset();
//       navigate("/profile");
//     } else {
//       toast.error(data.message);
//     }
//   };

//   return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-white via-yellow-200 to-white px-4">
//     <div className="w-full max-w-md bg-white backdrop-blur-md p-8 rounded-2xl shadow-lg border border-yellow-400">
//       <h4 className="font-bold text-4xl text-gray-900 text-center">
//         Login
//       </h4>

//       <form onSubmit={handleLogin} className="mt-8 space-y-6">
//         {/* Email */}
//         <div className="flex flex-col">
//           <label htmlFor="email" className="text-gray-700 font-medium mb-1">
//             Email
//           </label>
//           <input
//             type="email"
//             name="email"
//             id="email"
//             required
//             placeholder="Enter your email"
//             className="px-4 py-3 rounded-md bg-white text-black border border-yellow-400 focus:ring-2 focus:ring-yellow-400 outline-none"
//           />
//         </div>

//         {/* Password */}
//         <div className="flex flex-col">
//           <label htmlFor="password" className="text-gray-700 font-medium mb-1">
//             Password
//           </label>
//           <input
//             type="password"
//             name="password"
//             id="password"
//             required
//             placeholder="Enter your password"
//             className="px-4 py-3 rounded-md bg-white text-black border border-yellow-400 focus:ring-2 focus:ring-yellow-400 outline-none"
//           />
//         </div>

//         {/* Submit + Signup Link */}
//         <div className="flex flex-col items-center gap-4 mt-6">
//           <button
//             type="submit"
//             className="w-full py-3 rounded-full bg-gradient-to-r from-yellow-300 to-amber-400 text-gray-900 hover:text-black font-semibold text-lg transition-all duration-300"
//           >
//             Login
//           </button>

//           <Link
//             to="/signup"
//             className="text-blue-600 text-md hover:underline"
//           >
//             Don't have an account? <span className="text-lg">Signup</span>
//           </Link>
//         </div>
//       </form>
//     </div>
//   </div>
//   );
// };

// export default Login;



