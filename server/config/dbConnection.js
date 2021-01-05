const mongoose = require("mongoose");

const connectDb = () => {
  mongoose.connect("mongodb://localhost/authPractice", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  mongoose.connection
    .once("open", () => {
      console.log("connection with db has been established successfully");
    })
    .on("error", () => {
      console.log("error happened, connection wasn't established");
    });
};

module.exports = connectDb;
