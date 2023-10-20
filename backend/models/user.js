const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    pwd: {
      type: String,
      unique: true,
    },
    level: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
