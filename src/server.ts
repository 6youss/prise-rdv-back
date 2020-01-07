require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes";
import dbConnection from "./models/dbConnection";
import configPassport from "./config/passport";

const app = express();

dbConnection.then(function() {
  app.use(cors());
  app.use(express.static("./public"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  configPassport(app);
  // Routes
  app.use("/api", routes);

  app.listen(process.env.PORT, () => {
    console.log("App server listening on port " + process.env.PORT);
  });
});

export default app;
