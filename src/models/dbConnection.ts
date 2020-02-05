import mongoose from "mongoose";

const dbUri = process.env.MONGODB_URI_LOCAL;

const connection = mongoose.connect(dbUri, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

connection.catch(function(error) {
  console.log("connection error", error);
});

export default connection;
