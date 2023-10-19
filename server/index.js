// Require the Express.js framework
const express = require("express");
// Require the dotenv module to load environment variables from a .env file
const dotenv = require("dotenv").config();

/* const cors = require("cors"); */ // This line appears to be a comment and is not active in the code.

// Require the cookie-parser middleware to handle cookies in Express
const cookieParser = require("cookie-parser");

// Create an instance of the Express application
const app = express();

// Import and execute the code in the "connectDB" module to establish a database connection
const DB = require("./DB/connectDB");
DB();

// Middleware setup:
// Parse incoming JSON requests
app.use(express.json());

// Parse cookies in incoming requests
app.use(cookieParser());

// Parse incoming URL-encoded data with extended set to false
app.use(express.urlencoded({extended: false}));

// Use the routes defined in "authRoutes.js" for handling requests at the root path ("/")
app.use("/", require("./routes/authRoutes"));

// Start the Express server, listening on the port specified in the environment variables
app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`),
);
