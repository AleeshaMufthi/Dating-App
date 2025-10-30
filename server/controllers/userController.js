const { User } = require("../db/models/User");
const { clerkClient, getAuth } = require('@clerk/express');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password").lean();
    console.log(users,'users from get user');
    
    return res.status(200).json({
      success: true,
      data: users || [],
    });
  } catch (error) {
    console.error("Error in getUsers:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

const addToFav = async (req, res) => {
  const myId = req.id;
  const { id } = req.params;
  try {
    let user = await User.findByIdAndUpdate(
      { _id: myId },
      {
        $push: { favourites: id },
      }
    );
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Added to favourites" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const addToDis = async (req, res) => {
  const myId = req.id;
  const { id } = req.params;
  try {
    let user = await User.findByIdAndUpdate(
      { _id: myId },
      {
        $push: { disliked: id },
      }
    );
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Added to disliked" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getFromFav = async (req, res) => {
  const myId = req.id;
  try {
    let user = await User.findById({ _id: myId }).populate({
      path: "favourites",
      select: "name email profile _id",
    });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, data: user.favourites });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateLocation = async (req, res) => {
  const userId = req.id;
  const { placeName, lat, lng } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { travelLocation: { placeName, lat, lng } },
      { new: true }
    );

    if (!updatedUser)
      return res.status(404).json({ success: false, message: "User not found" });

    return res.status(200).json({
      success: true,
      message: "Location updated successfully",
      data: updatedUser
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const clerkUser = await clerkClient.users.getUser(userId);

    console.log(clerkUser, 'clerk user');
    
    const email = clerkUser.emailAddresses[0].emailAddress;

    console.log(email, 'email');
    

    const { name, age, work, education, gender, hometown, interests, foodPreference, profile } = req.body;

    const user = await User.findOneAndUpdate(
      { email },
      { $set: { name, age, work, education, gender, hometown, interests, foodPreference, profile } },
      { new: true }
    );

    console.log(user,'user');
    

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found in DB" });
    }

    res.status(200).json({ success: true, data: user });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};


module.exports = { getUsers, addToDis, addToFav, getFromFav, updateLocation, updateProfile };
