import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import validatePassword from "../utils/validatePassword.js";

// @desc Auth user/set token
// route POST /api/users/auth
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const {email, password} = req.body;

  const user = await User.findOne({email});

  if (!email) {
    res.status(400);
    throw new Error("Please enter your email address");
  }

  if (!password) {
    res.status(400);
    throw new Error("Please enter your password");
  }

  if (!user) {
    res.status(400);
    throw new Error("Invalid E-mail or Password");
  } else if (!(await user.matchPassword(password))) {
    res.status(400);
    throw new Error("Invalid E-mail or Password");
  }
  if (user.approve === true || user.role === "admin") {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error("Ask your supervisor to approve the account");
  }
});

// @desc Register a new user
// route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const {fname, lname, email, password, rePassword} = req.body;

  const userExist = await User.findOne({email});

  let errors = {};
  if (!fname) {
    errors.fname = "Please enter your first name.";
  }

  if (!lname) {
    errors.lname = "Please enter your last name.";
  }

  if (!email) {
    errors.email = "E-mail is required";
  } else if (userExist) {
    errors.email = "E-mail already used";
  }

  const validatePasswordRes = validatePassword(password);

  if (!password) {
    errors.password = "Please enter your password.";
  } else if (validatePasswordRes) {
    errors.password = validatePasswordRes;
  }

  if (!rePassword) {
    errors.rePassword = "Please confirm your password";
  } else if (password !== rePassword) {
    errors.rePassword = "Password does not much";
  }

  if (Object.keys(errors).length > 0) {
    console.log(errors);
    return res.status(400).json(errors);
  }
  const user = await User.create({
    fname,
    lname,
    email,
    password,
    approve: false,
    role: "view",
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      fname: user.fname,
      lname: user.lname,
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
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(),
  });

  res.status(200).json({message: "User logged out"});
});

// @desc Get user profile
// route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler((req, res) => {
  const user = {
    _id: req.user._id,
    fname: req.user.fname,
  };
  console.log(user);
  res.status(200).json(user);
});

// @desc Update user profile
// route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {authUser, registerUser, logoutUser, getUserProfile, updateUserProfile};
