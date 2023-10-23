import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
// @desc Auth user/set token
// route POST /api/users/auth
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const {email, password} = req.body;

  const userExist = await User.findOne({email});

  if (userExist) {
    generateToken(res, userExist._id);
    res.status(201).json({
      _id: userExist._id,
      name: userExist.name,
      email: userExist.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid E-mail or Password");
  }
});

// @desc Register a new user
// route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const {name, email, password} = req.body;

  const userExist = await User.findOne({email});

  if (userExist) {
    res.status(400);
    throw new Error("User already exist");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Logout user
// route POST /api/users/logout
// @access Public
const logoutUser = asyncHandler((req, res) => {
  res.status(200).json({message: "Logout User"});
});

// @desc Get user profile
// route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler((req, res) => {
  res.status(200).json({message: "User profile"});
});

// @desc Update user profile
// route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler((req, res) => {
  res.status(200).json({message: "Update user profile"});
});

export {authUser, registerUser, logoutUser, getUserProfile, updateUserProfile};
