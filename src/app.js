const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
const {validateSignUpData}=require("./utils/validation")
const bcrypt=require("bcrypt")
const cookieParser=require("cookie-parser")
const jwt = require("jsonwebtoken")
const {userAuth}=require("./middlewares/auth")

//this express inbuild middleware now activated for all routes 
app.use(express.json());
//this middleware help to read the cookies back
app.use(cookieParser())

//difference between JSON vs JS object 
const { body, validationResult } = require("express-validator");

app.post("/signup", async (req, res) => {
 try{  
  //Validation of data
  validateSignUpData(req);

  const {firstName,lastName,emailId, password}=req.body
  //Encrypt the password 
  
  const passwordHash = await bcrypt.hash(password,10);
 
  // Creating a new instance of the User model
  const user = new User({
    firstName,
    lastName,
    emailId,
    password:passwordHash,
  });

 
    await user.save();
    res.send("User Added successfully!");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.post("/login",async(req,res)=>{
try{
const {emailId,password}=req.body;
const user =await User.findOne({emailId:emailId})
if(!user){
  throw new Error("invalid credentials")
}
const isPasswordValid = await bcrypt.compare(password,user.password)
if(isPasswordValid){
  const token =await jwt.sign({_id:user._id},"Rishabh@4873",{expiresIn: "1d"})
 
  res.cookie("token",token,{expires:new Date(Date.now()+9*3600000)})
  res.send(" Login successfully!!")
}
else{
  res.send("invalid credentials")
}
}
catch(err){
  res.status(400).send("EROOR : "+err.message)
}
});

app.get("/profile",userAuth,async(req,res)=>{
 try{ 
  
  const user=req.user;
  res.send(user)
 }
 catch(err){
  res.status(400).send("ERROR : "+err.message)
 }
});

app.post("/sendConnectionRequest",userAuth,async(req,res)=>{
  console.log("Sending a connection Request");
  res.send("Connection Request sent!");
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