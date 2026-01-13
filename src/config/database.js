const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    ""
  );
};


module.exports = connectDB;
//when we write cluster string it is connected to cluster then using / we specify the name of database
// <connection URL>/DB name




