const express = require("express");

const router = express.Router();

const cors = require("cors");

const {
  test,
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
  verifyToken,
  getUsers,
  getUserByID,
  updateUserByID,
  deleteUserByID,
} = require("../controllers/authController");

// middleware
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  }),
);

router.get("/", test);

//LOGIN / REGISTER ROUTES
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

//Get Information using cookies
router.get("/profile", getProfile);

//Authentication for users using token
router.get("/verifyToken", verifyToken);

//USERS ROUTES
router.get("/user/:id", getUserByID);
router.get("/user/", getUsers);
router.put("/user/:id", updateUserByID);
router.delete("/user/:id", deleteUserByID);

module.exports = router;
