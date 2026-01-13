const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "sachin",
    lastName: "chaubey",
    emailId: "sachin40@gmail.com",
    password: "smart@0000"
  });
try{
    await user.save();
  res.send("User saved in StackMate");
}
catch(err){
  console.log("Error on saving the user!!"+err.message);
  
}

});

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