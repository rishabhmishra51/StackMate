const express=require("express")
const app=express();

app.use("/user",(req,res,next)=>{
console.log("handling the route user");
next();
// res.send("Response");

},(req,res,next)=>{
 console.log("handling the route user 2" );
  // res.send("response 2nd") 
  next();
}
,(req,res,next)=>
{
 console.log("handling the route user 3 ");
  // res.send("response 3rd") 
next();
}
,(req,res,next)=>{
 console.log("handling the route user 4");
  res.send("response 4th") 
// next();
});

app.listen(3000,()=>{
     console.log("Server is successful listing on port 3000");    
});