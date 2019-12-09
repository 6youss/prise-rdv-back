import { Strategy } from "passport-local";

import UserModel from "../../models/User";

module.exports = new Strategy(
  {
    usernameField: "username",
    passwordField: "password"
  },
  async (username, password, done) => {
    try {
      const user = await UserModel.findOne({ where: { username } });
      if (user && user.password === password) {
        done(null, { id: user.id, username: user.username }, { message: "Logged In Successfully" });
      } else done(null, false, { message: "Incorrect email or password." });
    } catch (error) {
      console.log(error);
      done(error);
    }
  }
);
