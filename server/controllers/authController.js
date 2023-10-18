const User = require("../models/user");
const {
  hashPassword,
  comparePassword,
  passwordRequirements,
} = require("../helpers/auth");
const jwt = require("jsonwebtoken");

const test = (req, res) => {
  res.json("test is working");
};

//Register Endpoint
const registerUser = async (req, res) => {
  try {
    const {name, email, pwd, repwd} = req.body;

    // Initialize an empty response object
    const response = {};

    if (!name && !email && !pwd && !repwd) {
      response.all = "All fields our required";
    }

    //Check if name was entered
    if (!name) {
      response.name = "Name is required";
    }

    const validatedPasswordRes = passwordRequirements(pwd, repwd);

    if (!pwd) {
      response.password = "Password is required";
    } else if (validatedPasswordRes) {
      response.password = validatedPasswordRes;
    }

    if (!repwd) {
      response.repassword = "Confirm your password";
    }

    // check email
    const exist = await User.findOne({email});

    if (!email) {
      response.email = "E-mail is required";
    } else if (exist) {
      response.email = "E-mail already taken";
    }

    // Check if there are any errors in the response
    if (Object.keys(response).length > 0) {
      return res.status(400).json({
        errors: response,
      });
    }

    const hashedPassword = await hashPassword(pwd);

    const user = await User.create({
      name,
      email,
      pwd: hashedPassword,
      level: process.env.USER_LEVEL_ONE,
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const {email, pwd} = req.body;

    let response = {};

    if (!email && !pwd) {
      response.all = "All fields are required";
    }

    const user = await User.findOne({email});

    if (!email) {
      response.email = "E-mail is required";
    } else if (!user) {
      response.email = "Email didn't match our records";
    }

    if (!pwd) {
      response.pwd = "Password is required";
    } else {
      const comparedPwd = await comparePassword(pwd, user.pwd);

      if (!comparedPwd) {
        response.pwd = "Password is wrong";
      }
    }

    // Check if there are any errors in the response
    if (Object.keys(response).length > 0) {
      return res.status(400).json({
        errors: response,
      });
    }

    jwt.sign(
      {email: user.email, id: user._id, name: user.name, role: user.role},
      process.env.JWT_SECRET,
      {},
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json(user);
      },
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "Internal server error"});
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

const verifyToken = (req, res) => {
  const {token} = req.cookies;

  if (!token) {
    return res.status(400).json({
      error: "There's no token created",
    });
  }

  try {
    const authenticatedUserToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!!authenticatedUserToken) {
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

const getProfile = (req, res) => {
  try {
    const {token} = req.cookies;

    if (token) {
      const user = jwt.verify(token, process.env.JWT_SECRET, {});
      res.json(user);
    }
  } catch (err) {
    console.log(err);
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
