import { Request, Response } from "express";
import UserModel from "../models/User";
import jwt from "jsonwebtoken";

const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = process.env;

class UserController {
  static async login(req: Request, res: Response) {
    try {
      const { user } = req;
      if (!user) {
        return res.sendStatus(400);
      }
      const accessToken = jwt.sign(user, JWT_ACCESS_SECRET, { expiresIn: "30s" });
      const refreshToken = jwt.sign(user, JWT_REFRESH_SECRET);
      const updated = await UserModel.update({ refreshToken }, { _id: user.id });
      if (updated[0] === 0) return res.sendStatus(500);
      return res.json({ user, accessToken, refreshToken, updated });
    } catch (error) {
      return res.sendStatus(500);
    }
  }

  static async refreshToken(req: Request, res: Response) {
    try {
      const token = req.body.token;
      if (!token) return res.sendStatus(401);
      const user = await UserModel.findOne({ refreshToken: token });
      if (!user) return res.sendStatus(403);
      const { refreshToken } = user;
      jwt.verify(refreshToken, JWT_REFRESH_SECRET, (err, user: any) => {
        if (err) return res.sendStatus(403);
        const accessToken = jwt.sign({ id: user._id, username: user.username }, JWT_ACCESS_SECRET, {
          expiresIn: "30s"
        });
        return res.json({ accessToken });
      });
    } catch (e) {
      res.sendStatus(500);
    }
  }
}

export default UserController;
