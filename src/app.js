const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser=require("cookie-parser")

//this express inbuild middleware now activated for all routes 
app.use(express.json());
//this middleware help to read the cookies back
app.use(cookieParser())

//difference between JSON vs JS object 

const authRouter = require('./routes/auth')
const profileRouter = require('./routes/profile')
const requestRouter = require('./routes/request');
const userRouter = require("./routes/user");

// Register application routers.
// All incoming requests are checked against these routers in order.
// If a route matches and sends a response, Express stops processing further routers.
app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);

connectDB()
  .then(() => {
    console.log("Database connected");
    console.log("Using DB:", require("mongoose").connection.name);

    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((err) => {
    console.error("MongoDB error:", err.message);
  });