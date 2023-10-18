// Import the Express.js framework
const express = require("express");

// Create an instance of an Express router
const router = express.Router();

// Import the CORS middleware for handling Cross-Origin Resource Sharing
const cors = require("cors");

// Import various functions from the "authController" module
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

// Set up middleware to enable CORS with specific configuration
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  }),
);

// Define a route that handles HTTP GET requests to the root path ("/")
router.get("/", test);

// Define routes for user registration, login, and logout
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

// Define a route for retrieving user profile information
router.get("/profile", getProfile);

// Define a route for verifying a user's token
router.get("/verifyToken", verifyToken);

// Define routes related to managing user information
router.get("/user/:id", getUserByID); // Get a user by ID
router.get("/user/", getUsers); // Get a list of users
router.put("/user/:id", updateUserByID); // Update a user by ID
router.delete("/user/:id", deleteUserByID); // Delete a user by ID

// Export the router for use in other parts of the application
module.exports = router;
