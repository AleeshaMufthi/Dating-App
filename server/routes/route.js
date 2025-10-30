const { signup, login, checkAuth } = require("../controllers/authController");
const {
  getUsers,
  addToFav,
  addToDis,
  getFromFav,
  updateLocation,
  updateProfile,
} = require("../controllers/userController");
// const { verifyToken } = require("../middlewares/verifyToken");
const { clerkAuth } = require("../middlewares/clerkAuth");
const { syncUser  } = require("../controllers/authSync");
const { requireAuth } = require("@clerk/express")

const router = require("express").Router();

// AUTHENTICATION ROUTES
router.post("/signup", signup);
router.post("/login", login);
router.post("/checkAuth", syncUser);


// USER ROUTES
router.get("/getUsers", requireAuth(), getUsers);
router.put("/addToFav/:id", requireAuth(), addToFav);
router.put("/addToDis/:id", requireAuth(), addToDis);
router.get("/getFromFav", requireAuth(), getFromFav);
router.put("/updateLocation", requireAuth(), updateLocation);
router.put("/updateProfile", requireAuth(), updateProfile);

module.exports = router;
