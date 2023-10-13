const dotenv = require("dotenv").config();
const express = require("express");

/* const cors = require("cors"); */

const cookieParser = require("cookie-parser");
const app = express();

//database connection
const DB = require("./DB/connectDB");
DB();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));

app.use("/", require("./routes/authRoutes"));

app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`),
);
