const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

//this express inbuild middleware now activated for all routes 
app.use(express.json());
//difference between JSON vs JS object 
app.post("/signup", async (req, res) => {
  const user = new User(req.body);
try{
    await user.save();
  res.send("User saved in StackMate");
}
catch(err){
  console.log("Error on saving the user!!"+err.message);
  
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
app.patch("/user",async(req,res)=>{
  const userId=req.body.userId;
  const data=req.body;
  try{
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