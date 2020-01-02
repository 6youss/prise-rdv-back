import { Request, Response, NextFunction } from "express";
import Session from "../models/Session";

class SessionController {
  /**
   * POST /session
   * Add a new session for the user.
   */
  static async postSession(req: Request, res: Response, next: NextFunction) {
    try {
      // const { patientId, doctorId, date } = req.body;
      // console.log(req.body);
      // Session.create({ patient: patientId, doctor: doctorId, date });
    } catch (error) {
      return res.sendStatus(500);
    }
  }
}

export default SessionController;
