import { Express } from "express";

import passport from "passport";
import jwtStrategy from "./strategies/jwt.strategy";
import localStrategy from "./strategies/local.strategy";

export default function configPassport(app: Express) {
  app.use(passport.initialize());
  passport.use("local", localStrategy);
  passport.use("jwt", jwtStrategy);
}
