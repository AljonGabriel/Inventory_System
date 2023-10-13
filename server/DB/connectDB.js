const {mongoose} = require("mongoose");
function connectDB() {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log("DB not connected", err));
}

module.exports = connectDB;
