import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { IoHeartSharp, IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import LocationPicker from "./LocationPicker";

const Profile = () => {
  const [users, setUsers] = useState([]);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(AppContext);

  const [changingLocation, setChangingLocation] = useState(false);

  const getUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/getUsers");
      const allUsers = res?.data?.data || [];
      // console.log(allUsers, "all users");

      // If no saved location on current user → show all users except self
      if (!user?.travelLocation) {
        const filtered = allUsers.filter((u) => u._id !== user?._id);
        setUsers(filtered);
        setLoading(false);
        return;
      }

      // If user has a saved travelLocation → show only users whose travelLocation matches
      const filtered = allUsers.filter(
        (u) =>
          u._id !== user?._id &&
          u.travelLocation?.placeName === user.travelLocation.placeName
      );

      setUsers(filtered);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      toast.error("Failed to fetch users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const nextProfile = () => {
    if (currentUserIndex < users.length - 1) {
      setCurrentUserIndex((s) => s + 1);
    }
  };

  const addToFav = async (id) => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/addToFav/" + id,
        null,
        {
          withCredentials: true,
        }
      );
      if (res.data?.success) {
        toast.success(res.data.message || "Added to favourites");
        nextProfile();
      } else {
        toast.error(res.data?.message || "Failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Operation failed");
    }
  };

  const addToDis = async (id) => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/addToDis/" + id,
        null,
        {
           withCredentials: true,
        }
      );
      if (res.data?.success) {
        nextProfile();
      } else {
        toast.error(res.data?.message || "Failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Operation failed");
    }
  };

  useEffect(() => {
    // fetch users whenever the current user object changes (location updates)
    getUsers();
    // reset index when users list changes
    setCurrentUserIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const updateLocationAPI = async ({ placeName, lat, lng }) => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/updateLocation",
        { placeName, lat, lng },
        {
          withCredentials: true,
        }
      );

      const data = res.data;
      if (data.success) {
        // update context user
        setUser(data.data);
        toast.success("Travel location updated!");
        // refresh users after update
        getUsers();
      } else {
        toast.error(data.message || "Failed to update location");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update location");
    }
  };

  // compute currentUser (safe)
  const currentUser = users[currentUserIndex];

  return (
    <div className="flex flex-col sm:flex-row justify-center gap-10 my-10 sm:my-20 px-4">
      {/* Left: Location Section — always visible */}
      <aside className="w-full sm:w-1/3 bg-white p-5 rounded-lg shadow">
        <h2 className="text-gray-700 font-semibold mb-3">Your Travel Location</h2>

        {user?.travelLocation ? (
          <div>
            <p className="text-gray-900 font-medium">📍 {user.travelLocation.placeName}</p>
            <div className="mt-3 flex gap-3">
              <button
                className="px-4 py-2 bg-yellow-500 text-white rounded-full"
                onClick={() => setChangingLocation(true)}
              >
                Change Location
              </button>
            </div>

            {user?.travelLocation?.images?.length > 0 && (
  <div className="grid grid-cols-3 gap-2 mt-4">
    {user.travelLocation.images.map((img, index) => (
      <img
        key={index}
        src={img}
        alt="place"
        className="w-full h-20 object-cover rounded-md"
      />
    ))}
  </div>
)}

          </div>
        ) : (
          <div>
            <p className="text-gray-600">You haven’t selected a travel destination yet.</p>
            <button
              className="mt-3 px-4 py-2 bg-yellow-500 text-white rounded-full"
              onClick={() => setChangingLocation(true)}
            >
              Choose Location
            </button>
          </div>
        )}

        {/* Inline Location Picker (only shown when changing or when user hasn't saved location optionally) */}
        {changingLocation && (
          <div className="mt-4">
            <LocationPicker
              onSave={async (data) => {
                await updateLocationAPI(data);
                setChangingLocation(false);
              }}
            />
            <div className="mt-2 text-sm text-gray-500">Save to update your matches.</div>
          </div>
        )}
      </aside>

      {/* Center: Matching / Travelers Area */}
      <main className="flex flex-col items-center w-full sm:w-1/2">
        {loading ? (
          <p className="text-gray-500">Loading travelers...</p>
        ) : users.length === 0 ? (
          <div className="text-center">
            <p className="text-xl font-semibold text-gray-600">
              🚫 No travelers found for this location
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {user?.travelLocation
                ? `Currently no users have selected "${user.travelLocation.placeName}". Try changing location or wait for travelers to join.`
                : "No other users are available right now."}
            </p>
          </div>
        ) : (
          <div className="rounded-lg shadow-lg w-[75vw] h-[80vw] sm:w-[25vw] sm:h-[60vh] relative overflow-hidden">
            <img
              src={currentUser?.profile}
              alt={currentUser?.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 w-full p-4 bg-black/40 text-white">
              <h1 className="text-xl font-semibold">{currentUser?.name}</h1>
              <p className="text-sm">{currentUser?.email}</p>
            </div>

            <div className="absolute bottom-4 w-full flex justify-between px-6">
              <button
                onClick={() => addToDis(currentUser?._id)}
                className="bg-gray-800 p-3 rounded-full"
              >
                <IoClose className="text-red-500 text-2xl" />
              </button>
              <button
                onClick={() => addToFav(currentUser?._id)}
                className="bg-gray-800 p-3 rounded-full"
              >
                <IoHeartSharp className="text-yellow-400 text-2xl" />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Profile;
