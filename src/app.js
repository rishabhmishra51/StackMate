const express=require("express")
const app=express();

app.use("/test/login", (req, res) => {
  res.send("login");
});
app.use("/test", (req, res) => {
  res.send("test");
});
app.use("/create", (req, res) => {
  res.send("create");
});
app.use("/", (req, res) => {
  res.send("hello from the server!");
});

app.listen(3000,()=>{
     console.log("Server is successful listing on port 3000");    
});