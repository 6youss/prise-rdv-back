import { Request, Response, NextFunction } from "express";
import Session, { ISession } from "../models/Session";
import UserModel from "../models/User";

class SessionController {
  /**
   * POST /session
   * Add a new session for the user.
   */
  static async postSession(req: Request, res: Response, next: NextFunction) {
    try {
      const { patientId, doctorId, date } = req.body;
      const patient = await UserModel.findById(patientId);
      const doctor = await UserModel.findById(doctorId);
      if (!patient || !doctor) return res.sendStatus(400);

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
