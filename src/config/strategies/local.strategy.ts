import { Strategy } from "passport-local";

import User from "../../models/User";

export default new Strategy(
  {
    usernameField: "username",
    passwordField: "password"
  },
  async (username, password, done) => {
    User.findOne({ username: username.toLowerCase() }, (err, user: any) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(undefined, false, { message: `User ${username} not found.` });
      }
      user.comparePassword(password, (err: Error, isMatch: boolean) => {
        if (err) {
          return done(err);
        }
        if (isMatch) {
          return done(undefined, user);
        }
        return done(undefined, false, { message: "Invalid user name or password." });
      });
    });
  }
);
