import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import SetupProfile from "./pages/SetupProfile";
import Chats from "./pages/Chats";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AppContextProvier } from "./context/AppContext";
import ProtectedRoute from "./components/ProtectedRoute";

import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect } from "react";
import toast from 'react-hot-toast'
import { useNavigate } from "react-router-dom";

import { LoadScript } from "@react-google-maps/api";

const SyncUser = () => {
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSignedIn || !user?.primaryEmailAddress?.emailAddress) return;
   
    console.log(user,'user');
    
    const syncClerkUser = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/checkAuth",
          {
            email: user.primaryEmailAddress.emailAddress,
            name: user.fullName,
            clerkId: user.id,
          },
          { withCredentials: true }
        );
        console.log(res,'res from the sync clerkuser');
        console.log(res.data,'res.data from the sync clerk user');
        console.log(res.data.created, 'res.data.created');
        
        if (res.data.created) {
          toast.success("Welcome! Complete your profile");
          navigate("/profile-setup");
        } else {
          navigate("/profile");
        }
      } catch (err) {
        console.log(err);
        toast.error("Failed to sync user");
      }
    };

    syncClerkUser();
  }, [isSignedIn]);

  return null;
};

const App = () => {
 
  return (
    <>
     <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} libraries={['places']}>
      <AppContextProvier>
        <BrowserRouter>
          <Navbar />
          <SyncUser />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/profile"
              element={
                // <ProtectedRoute>
                  <Profile />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/profile/chats"
              element={
                // <ProtectedRoute>
                  <Chats />
                // </ProtectedRoute>
              }
            />
           <Route path="/profile-setup" element={<SetupProfile />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AppContextProvier>
      </LoadScript>
    </>
  );
};

export default App;
