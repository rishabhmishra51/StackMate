const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

//this express inbuild middleware now activated for all routes 
app.use(express.json());
//difference between JSON vs JS object 
const { body, validationResult } = require("express-validator");

app.post(
  "/signup",
  [
    body("firstName").notEmpty().withMessage("First name is required"),
    body("emailId").isEmail().withMessage("Invalid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors.array());

    try {
      await User.create(req.body);
      res.status(201).json({ message: "User saved in StackMate" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);


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