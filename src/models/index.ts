import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URI_LOCAL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on("error", function(error) {
  console.log("connection error", error);
});

export default mongoose.connection;
