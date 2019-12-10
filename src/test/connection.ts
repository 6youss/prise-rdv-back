import mongoose from "mongoose";

before(done => {
  //Connect to mongodb
  mongoose.connect("mongodb://localhost:27017/prise-rdv", { useNewUrlParser: true, useUnifiedTopology: true });

  mongoose.connection.once("open", function() {
    console.log("connection has been made!");
    done();
  });
  mongoose.connection.on("error", function(error) {
    console.log("connection error", error);
  });
});
