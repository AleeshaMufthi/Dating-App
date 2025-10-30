// import { useState, useContext } from "react";
// import toast from "react-hot-toast";
// import { AppContext } from "../context/AppContext";
// import axios from "axios";
// import { useUpload } from "../hooks/useUpload";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

// const Signup = () => {
//   const [image, setImage] = useState(null);
//   const { setProgress } = useContext(AppContext);
//   const navigate = useNavigate();

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file.size > 1000000) {
//       toast.error("Image size must be less than 1MB");
//     }
//     setImage(file);
//   };

//   const onUploadProgress = (progressEvent) => {
//     const progress = Math.round(
//       (progressEvent.loaded * 100) / progressEvent.total
//     );
//     setProgress(progress);
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       const name = e.target.name.value;
//       const password = e.target.password.value;
//       const email = e.target.email.value;

//       if (!name || !email || !password || !image) {
//         return toast.error("All fields are required");
//       }
//       if (name.trim === "" || email.trim === "" || password.trim === "") {
//         return toast.error("All fields are required");
//       }
//       if (name.length < 3 || (!email.includes("@") && !email.includes("."))) {
//         return toast.error("Please enter valid data");
//       }

//       const { public_id, url } = await useUpload({ image, onUploadProgress });
//       if (!public_id || !url) {
//         toast.error("Error uploading image");
//         return;
//       } else {
//         const res = await axios.post("http://localhost:5000/api/signup", {
//           name,
//           email,
//           password,
//           profile: url,
//           publicId: public_id,
//         });
//         const data = await res.data;
//         if (data.success === true) {
//           toast.success(data.message);
//           e.target.reset();
//           navigate("/login");
//         } else {
//           toast.error(data.message);
//         }
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-white via-yellow-200 to-white px-4">
//     <div className="w-full max-w-lg bg-white backdrop-blur-md p-10 rounded-2xl shadow-lg border border-yellow-400">
      
//       <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center">
//         Create your profile
//       </h2>

//       <form onSubmit={handleSignup} className="mt-8 space-y-6">

//         {/* Name */}
//         <div className="flex flex-col">
//           <label htmlFor="name" className="text-gray-800 font-medium mb-1">
//             Name
//           </label>
//           <input
//             type="text"
//             name="name"
//             id="name"
//             required
//             placeholder="Enter your name"
//             className="px-4 py-3 rounded-md bg-white text-black border border-yellow-400 focus:ring-2 focus:ring-yellow-400 outline-none"
//           />
//         </div>

//         {/* Email */}
//         <div className="flex flex-col">
//           <label htmlFor="email" className="text-gray-800 font-medium mb-1">
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
//           <label htmlFor="password" className="text-gray-800 font-medium mb-1">
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

//         {/* Profile Image Upload */}
//         <div className="flex flex-col">
//           <label htmlFor="profile" className="text-gray-800 font-medium mb-1">
//             Profile Photo
//           </label>

//           <input
//             type="file"
//             name="profile"
//             id="profile"
//             accept="image/*"
//             onChange={handleImageChange}
//             required
//             className="hidden"
//           />

//           {/* Custom Upload Button */}
//           <label
//             htmlFor="profile"
//             className="cursor-pointer w-full py-3 rounded-md bg-yellow-100 border border-yellow-400 text-black text-center hover:bg-white transition-all duration-300"
//           >
//             {image ? "Change Photo" : "Upload Photo"}
//           </label>

//           {/* Preview */}
//           {image && (
//             <img
//               src={URL.createObjectURL(image)}
//               alt="Preview"
//               className="w-20 h-20 mx-auto mt-3 rounded-full border-2 border-yellow-400 object-cover"
//             />
//           )}
//         </div>

//         <button
//           type="submit"
//           className="w-full py-3 rounded-full bg-gradient-to-r from-yellow-300 to-amber-400 text-gray-900 font-semibold text-lg hover:bg-black border border-yellow-400 transition-all duration-300"
//         >
//           Sign Up
//         </button>

//         <p className="text-center text-blue-600 text-md">
//           Already have an account?{" "}
//           <Link to="/login" className="hover:underline text-blue-600 text-lg">
//             Login
//           </Link>
//         </p>
//       </form>
//     </div>
//   </div>
//   );
// };

// export default Signup;

import { SignUp } from "@clerk/clerk-react";
export default function SignUpPage() {
  return <SignUp path="/signup" routing="path" />;
}
