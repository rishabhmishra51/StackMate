const express=require("express")
const app=express();
const {adminAuth,userAuth} =require("./middlewares/auth")
//handle Auth middleware for all get,post,patch ...
app.use("/admin",adminAuth);

app.use("/user",(req,res,next)=>{
if(req.path === "/login"){
  return next();
}
userAuth(req,res,next);
})

app.get("/user/profile", (req, res) => {
  res.send("User profile");
});

app.get("/user/orders", (req, res) => {
  res.send("User orders");
});



app.get("/admin/getAlldata",(req,res)=>{
  res.send("All data sent");
});
app.get("/admin/deleteUser",(req,res)=>{
  res.send("a User deleted");
});

app.listen(3000,()=>{
     console.log("Server is successful listing on port 3000");    
});