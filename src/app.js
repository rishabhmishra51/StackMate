const express=require("express")
const app=express();
//order of route matter a lot



// app.get("/user",(req,res)=>{
//   console.log(req.query);
  
//   res.send({firstName:"Mini",lastName:"Mishra"});
// });

app.get("/user/:userId/:name/:password",(req,res)=>{
  console.log(req.params);  
  res.send({firstName:"Mini",lastName:"Mishra"});
});

app.post("/user",(req,res)=>{
  res.send("data successfully saved");
});

app.delete("/user",(req,res)=>{
  res.send("deleted successfully");
});

app.listen(3000,()=>{
     console.log("Server is successful listing on port 3000");    
});