require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes";
import mongooseConnection from "./models/index";
const app = express();

mongooseConnection.once("open", function() {
  app.use(cors());
  app.use(express.static("./public"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  require("./config/passport")(app);
  // Routes
  app.use("/api", routes);

  app.listen(process.env.PORT, () => {
    console.log("App server listening on port " + process.env.PORT);
  });
});
