import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/prise-rdv", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on("error", function(error) {
  console.log("connection error", error);
});

export default mongoose.connection;
