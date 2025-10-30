import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { IoChevronDown } from "react-icons/io5";
import { useUser, useClerk } from "@clerk/clerk-react";


const Navbar = () => {
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <nav className="bg-white text-black shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="flex gap-3 items-center cursor-pointer">
          <img src="/logoo.svg" className="h-10 w-10" alt="logo" />
          <h2 className="text-3xl font-bold">
            W<span className="text-yellow-400">ink</span>
            D<span className="text-yellow-400">ate</span>
          </h2>
        </Link>

        {/* Nav Links */}
        {isSignedIn ? (
          <ul className="hidden md:flex gap-6">
            <Link to="/profile" className="px-4 py-1 text-lg hover:bg-yellow-400 rounded-full">
              Find Friends
            </Link>
            <Link to="/profile/chats" className="px-4 py-1 text-lg hover:bg-yellow-400 rounded-full">
              Chats
            </Link>
          </ul>
        ) : (
          <ul className="hidden md:flex gap-6">
            <li className="px-4 py-1 text-lg hover:bg-yellow-400 rounded-full cursor-pointer">About</li>
            <li className="px-4 py-1 text-lg hover:bg-yellow-400 rounded-full cursor-pointer">Download</li>
            <li className="px-4 py-1 text-lg hover:bg-yellow-400 rounded-full cursor-pointer">Privacy</li>
          </ul>
        )}

        {/* Profile */}
        <div className="relative">
          {isSignedIn ? (
            <div onClick={() => setDropdownOpen(!dropdownOpen)}>
              <button className="flex items-center gap-3 px-4 py-2 rounded-full border border-yellow-400">
                <img
                  src={user.imageUrl}
                  alt={user.fullName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span>{user.fullName}</span>
                <IoChevronDown className="ml-2" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-16 bg-white text-black rounded-lg shadow-xl w-36">
                  <Link
                    to="/profile-setup"
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="px-5 py-2 bg-yellow-400 rounded-full">
              Log In
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
