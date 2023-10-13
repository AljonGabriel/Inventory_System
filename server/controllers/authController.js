const User = require("../models/user");
const {hashPassword, comparePassword} = require("../helpers/auth");
const jwt = require("jsonwebtoken");

const test = (req, res) => {
  res.json("test is working");
};

//Register Endpoint
const registerUser = async (req, res) => {
  try {
    const {name, email, pwd} = req.body;
    //Check if name was entered
    if (!name) {
      return res.json({
        error: "name is required",
      });
    }

    if (!pwd || pwd.length < 6) {
      return res.json({
        error: "Password is required and should be atleast 6 characters long",
      });
    }

    // check email
    const exist = await User.findOne({email});

    if (exist) {
      return res.json({
        error: "Email is taken",
      });
    }

    const hashedPassword = await hashPassword(pwd);

    const user = await User.create({
      name,
      email,
      pwd: hashedPassword,
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

// Login Endpoint
const loginUser = async (req, res) => {
  try {
    const {email, pwd} = req.body;

    //check ifuser exists
    const user = await User.findOne({email});

    if (!user) {
      return res.json({
        error: "No user found",
      });
    }

    //check if password match
    const match = await comparePassword(pwd, user.pwd);

    if (!match) {
      return res.json({
        error: "Wrong Password",
      });
    } else {
      jwt.sign(
        {email: user.email, id: user._id, name: user.name},
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(user);
        },
      );
    }
  } catch (error) {
    console.log(error);
  }
};

const logoutUser = (req, res) => {
  const {token} = req.cookies;

  if (!token) {
    return res.json({
      error: "No token found",
    });
  } else {
    res.clearCookie("token");
    res.json("Logout Successfully");
  }
};

const getProfile = (req, res) => {
  const {token} = req.cookies;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  }
};

const verifyToken = (req, res) => {
  const {token} = req.cookies;

  if (!token) {
    return res.status(400).json({
      error: "There's no token created",
    });
  }

  try {
    const verifiedtoken = jwt.verify(token, process.env.JWT_SECRET);
    if (!!verifiedtoken) {
      // Token is valid
      return res.json({tokenValid: true});
    }
  } catch (error) {
    // Invalid Token
    return res.status(400).json({
      error: "Invalid Token",
    });
  }
};

// GET USERS

//Get users by ID
const getUserByID = async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id);

  res.json({user: user});
};

//Get all users
const getUsers = async (req, res) => {
  const user = await User.find();

  res.json({user: user});
};

//Update user by ID
const updateUserByID = async (req, res) => {
  //get the ID from the URL endpoint
  const userID = req.params.id;

  //get the data from the body
  const {name, email} = req.body;

  //Find the ID and update it using the data from the body
  await User.findByIdAndUpdate(userID, {name: name, email: email});

  //get the latest update and respond it as JSON
  const updatedUser = await User.findById(userID);

  res.json({user: updatedUser});
};

const deleteUserByID = async (req, res) => {
  const userId = req.params.id;

  await User.deleteOne({_id: userId});

  res.json({success: "Record Deleted"});
};

module.exports = {
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
};
