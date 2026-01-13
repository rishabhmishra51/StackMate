const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

//this express inbuild middleware now activated for all routes 
app.use(express.json());

app.post("/signup", async (req, res) => {

  //difference between JSON vs JS object 

  const user = new User(req.body);
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