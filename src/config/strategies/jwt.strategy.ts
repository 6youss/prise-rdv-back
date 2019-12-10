import { Strategy, ExtractJwt } from "passport-jwt";

import User from "../../models/User";

const jwtStrategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_ACCESS_SECRET
  },
  async function(jwtPayload, done) {
    //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
    try {
      const user = await User.findById(jwtPayload.id);
      if (user) done(null, user);
      else done(null, false, user);
    } catch (error) {
      done(error);
    }
  }
);
export default jwtStrategy;
