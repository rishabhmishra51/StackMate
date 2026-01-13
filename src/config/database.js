const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://NodewithMongoDB:8pkKSlfyMhMkatiO@nodewithmongodb.tdjsh4e.mongodb.net/StackMate?retryWrites=true&w=majority"
  );
};


module.exports = connectDB;
//when we write cluster string it is connected to cluster then using / we specify the name of database
// <connection URL>/DB name




