const { User} = require("../db/models/User");
const { clerkClient, getAuth } = require("@clerk/clerk-sdk-node");

const syncUser = async (req, res) => {
  try {
    console.log('called sync user????');
    
    const { email, name, clerkId } = req.body;
    console.log(req.body,'req.bodyyy');
    

    if (!email || !clerkId) {
      return res.status(400).json({ success: false, message: "Email and clerkId is required" });
    }

    const userExists = await User.findOne({ email });

    if (!userExists) {
      const newUser = await User.create({ email, name });
      return res.status(201).json({
        success: true,
        message: "User created successfully",
        user: newUser,
        created: true
      });
    }

    return res.status(200).json({
      success: true,
      message: "User already exists",
      user: userExists,
      created: false
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { syncUser  };