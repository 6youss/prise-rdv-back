import { Request, Response, NextFunction } from "express";
import Session, { ISession } from "../models/Session";
import Patient from "../models/Patient";
import Doctor from "../models/Doctor";

export async function isSessionAvailable(patientId: string, doctorId: string, date: Date): Promise<boolean> {
  const session = new Session({
    patient: patientId,
    doctor: doctorId,
    date
  });
  return await session.isSessionAvailable();
}

class SessionController {
  /**
   * POST /session
   * Add a new session for the user.
   */
  static async postSession(req: Request, res: Response, next: NextFunction) {
    try {
      const { patientId, doctorId, date } = req.body;

      const patient = await Patient.findById(patientId);
      const doctor = await Doctor.findById(doctorId);
      const sessionAvailable = await isSessionAvailable(patientId, doctorId, date);
      if (!patient || !doctor || !sessionAvailable) return res.sendStatus(400);

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
