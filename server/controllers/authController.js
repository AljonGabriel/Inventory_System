const User = require("../models/user");

const test = (req, res) => {
  res.json("test is working");
};

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

    const user = await User.create({
      name,
      email,
      pwd,
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  test,
  registerUser,
};
