require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes";
import dbConnection from "./models/dbConnection";
import configPassport from "./passport";
const app = express();

export const server = dbConnection.then(() => {
  app.use(cors());
  app.use(express.static("./public"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  configPassport(app);
  // Routes
  app.use("/api", routes);

  return app.listen(process.env.PORT, () => {
    console.log("App server listening on port " + process.env.PORT);
  });
});

export default app;
