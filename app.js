var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var passport = require("passport");
const cors = require("cors");
require("dotenv").config();

var app = express();

// Login and Register
require("./auth/auth");
const loginRouter = require("./routes/login");
const loggedInPage = require("./routes/loggedInUser");
const ticketRouter = require("./routes/ticket");
// ----------------------------------------------------

const bookingRoute = require("./routes/routeSelection");

var registerRouter = require("./routes/register");
//--------------------------------------------------------

//DB Config
const DB_URL = process.env.DB_URL;

//connect to mongo
//---------------------------------------------
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    throw err;
  });
//---------------------------------------------

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.use("/api/login", loginRouter);
app.use("/api/booking", bookingRoute);
app.use("/api/register", registerRouter); // To register page
app.use("/api/ticket", ticketRouter);
app.use(
  "/api/user",
  passport.authenticate("jwt", { session: false }),
  loggedInPage
); //To Secure Route

module.exports = app;
