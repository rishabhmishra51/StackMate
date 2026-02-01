const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const {validateSignUpData}=require("./utils/validation")
const bcrypt=require("bcrypt")
const app = express();

//this express inbuild middleware now activated for all routes 
app.use(express.json());
//difference between JSON vs JS object 
const { body, validationResult } = require("express-validator");

app.post("/signup", async (req, res) => {
 try{  
  //Validation of data
  validateSignUpData(req);

  const {firstName,lastName,emailId, password}=req.body
  //Encrypt the password 
  
  const passwordHash = await bcrypt.hash(password,10);
  console.log(passwordHash);
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

//Get user by emailId
app.get("/user",async(req,res)=>{
  const userEmail=req.body.emailId;
  try{
   const users =  await  User.find({emailId:userEmail});
    if(users.length === 0){
      res.status(404).send("User not found!")
    }
   res.send(users);
  }
  catch(err){
    res.status(400).send("Something went wrong");
  }
})

//feed api for  getting all the users from database
app.get("/feed",async(req,res)=>{
 try{
    const users=await User.find({});
    res.send(users);
 }
 catch(err){
  res.status(400).send("Something went wrong!")
 }
})

//delete use
app.delete("/user",async(req,res)=>{
  const userId=req.body.userId;
  try{
    const user=await User.findByIdAndDelete(userId);
    res.send("user deleted successfully!");
  }
  catch(err){
    res.status(400).send("Something went wrong");
  }
})

//update 
app.patch("/user/:userId",async(req,res)=>{
  const userId=req.params?.userId;
  const data=req.body;
 
 
  try{
     //making that there is after creation not allowed update like email
  const allowedUpdate =["firstName","lastName","gender","about","skills","photoUrl","age","password"]

  const isUpdateAllowed = Object.keys(data).every((k)=> allowedUpdate.includes(k));
  if(!isUpdateAllowed){
    res.status(400).send("Update Not allowed")
  }

   const user = await User.findByIdAndUpdate({_id:userId},data,{
    returnDocument:'before',
     runValidators:true,
    })
    console.log(user);    
    res.send("User updated successfully!");
   
  }
  catch(err){
    res.status(400).send("Update failed!",err.message)
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