const express=require("express")
const app=express();

app.get("/getUserData",(req,res)=>{
  try{
throw new Error("dsafhj");
res.send("user data sent") 
  }
  catch(err){
res.status(500).send("something went wrong 1");
  }
});

app.use("/",(err,req,res,next)=>{
  if(err){
    res.status(500).send("something went wrong");
  }
})

app.listen(3000,()=>{
     console.log("Server is successful listing on port 3000");    
});