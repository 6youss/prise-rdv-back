import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/User";
import Doctor, { IDoctor } from "../models/Doctor";
import Patient, { IPatient } from "../models/Patient";
import jwt from "jsonwebtoken";
import { IVerifyOptions } from "passport-local";
import passport from "passport";

class UserController {
  /**
   * Get /
   * Get user info using a token
   */
  static async getUser(req: Request, res: Response, next: NextFunction) {
    //get the user info from passport's done() function
    const {
      userType: { value, targetId }
    } = req.user;
    try {
      switch (value) {
        case "doctor": {
          const doctor = await Doctor.findById(targetId);
          return res.status(200).json({ doctor });
        }
        case "patient": {
          const patient = await Patient.findById(targetId);
          return res.status(200).json({ patient });
        }
        default:
          return res.status(422).json({ message: "Wrong user type." });
      }
    } catch (error) {
      return res.sendStatus(500);
    }
  }

  /**
   * POST /login
   * Sign in using email and password.
   */
  static async postLogin(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("local", async (err: Error, user: IUser, info: IVerifyOptions) => {
      try {
        if (!user || err) {
          return res.status(401).json(info);
        }
        const userPayload = {
          id: user._id,
          username: user.username,
          userType: user.userType.value
        };
        const accessToken = jwt.sign(userPayload, process.env.JWT_ACCESS_SECRET, { expiresIn: "30m" });
        const refreshToken = jwt.sign(userPayload, process.env.JWT_REFRESH_SECRET);
        user.refreshToken = refreshToken;
        await user.save();
        return res.json({
          message: "User logged in successfuly.",
          user: userPayload,
          accessToken,
          refreshToken
        });
      } catch (error) {
        return res.sendStatus(500);
      }
    })(req, res, next);
  }

  /**
   * POST /signup
   * Create a new local account.
   */
  static async postSignup(req: Request, res: Response, next: NextFunction) {
    const { username, password, userType } = req.body;
    /**
     * @TODO
     * Validation
     */

    try {
      const foundUser = await User.findOne({ username });
      if (foundUser) {
        return res.status(409).json({ message: "Account with that user name already exists." });
      }

      const user = new User({
        username,
        password
      });

      switch (userType) {
        case "patient": {
          const patient = await Patient.create({
            firstName: req.body.profile.firstName,
            lastName: req.body.profile.lastName
          });
          user.userType = { value: "patient", targetId: patient._id };
          break;
        }
        case "doctor": {
          const doctor = await Doctor.create({
            firstName: req.body.profile.firstName,
            lastName: req.body.profile.lastName
          });
          user.userType = { value: "doctor", targetId: doctor._id };
          break;
        }
        default:
          return res.status(422).json({ message: "Invalid user type" });
      }
      await user.save();
      return res.status(200).json({ message: "account created successfully" });
    } catch (error) {
      res.sendStatus(500);
    }
  }

  static async refreshToken(req: Request, res: Response) {
    try {
      const token = req.body.token;
      if (!token) return res.sendStatus(401);
      const user = await User.findOne({ refreshToken: token });
      if (!user) return res.sendStatus(403);
      const { refreshToken } = user;
      jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user: any) => {
        if (err) return res.sendStatus(403);
        const accessToken = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_ACCESS_SECRET, {
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
