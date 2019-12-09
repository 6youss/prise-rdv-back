import { Express } from "express";

const passport = require("passport");
const jwtStrategy = require("./strategies/jwt.strategy");
const localStrategy = require("./strategies/local.strategy");
module.exports = function configPassport(app: Express) {
  app.use(passport.initialize());
  passport.use("local", localStrategy);
  passport.use("jwt", jwtStrategy);
};
