import { Request, Response, NextFunction } from "express";
import Session, { ISession } from "../models/Session";

class SessionController {
  /**
   * POST /session
   * Add a new session for the user.
   */
  static async postSession(req: Request, res: any, next: NextFunction) {
    try {
      const { patientId, doctorId, date } = req.body;
      const session = await Session.create({
        patient: patientId,
        doctor: doctorId,
        date: date
      });
      console.warn(session);
      res.status(200);
    } catch (error) {
      console.error(error);
      res.status(500);
    }
  }
}

export default SessionController;
