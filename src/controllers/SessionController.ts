import { Request, Response, NextFunction } from "express";
import Session, { ISession, isSessionAvailable } from "../models/Session";

class SessionController {
  /**
   * POST /session
   * Add a new session for the user.
   */
  static async postSession(req: Request, res: Response, next: NextFunction) {
    try {
      const { patientId, doctorId, date } = req.body;
      const sessionAvailable = await isSessionAvailable(patientId, doctorId, date);
      if (!sessionAvailable) return res.sendStatus(400);

      const session = await Session.create({
        patient: patientId,
        doctor: doctorId,
        date: date
      });

      res.status(201).json({ session });
    } catch (error) {
      res.sendStatus(500);
    }
  }
}

export default SessionController;
