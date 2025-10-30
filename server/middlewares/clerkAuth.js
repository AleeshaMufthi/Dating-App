const { getAuth } = require("@clerk/clerk-sdk-node");

const clerkAuth = (req, res, next) => {
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  req.userId = userId;
  next();
};

module.exports = { clerkAuth };