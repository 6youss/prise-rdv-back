import { Request, Response, NextFunction } from "express";

import Session, { isSessionAvailable } from "../models/Session";
import Doctor from "../models/Doctor";
import Patient from "../models/Patient";

class SessionController {
  /**
   * GET /sessions/doctor/:doctorId
   * Get the doctor's sessions
   */
  static async getDoctorSessions(req: Request, res: Response) {
    try {
      const { doctorId } = req.params;
      const doc = await Doctor.findById(doctorId);
      if (!doc) return res.sendStatus(404);
      const doctorSessions = await Session.find({ doctor: doctorId }).select("_id doctor patient date");
      if (doctorSessions.length === 0) {
        res.sendStatus(204);
      } else {
        res.status(200).json({ sessions: doctorSessions });
      }
    } catch (error) {
      res.sendStatus(500);
    }
  }
  /**
   * GET /sessions/patient/:patientId
   * Get the patient's sessions
   */
  static async getPatientSessions(req: Request, res: Response) {
    try {
      const { patientId } = req.params;
      const patient = await Patient.findById(patientId);
      if (!patient) return res.sendStatus(404);
      const patientSessions = await Session.find({ patient: patientId }).select("_id doctor patient date");
      if (patientSessions.length === 0) {
        res.sendStatus(204);
      } else {
        res.status(200).json({ sessions: patientSessions });
      }
    } catch (error) {
      res.sendStatus(500);
    }
  }

  /**
   * POST /sessions
   * Add a new session for the user.
   */
  static async postSession(req: Request, res: Response) {
    try {
      const { patientId, doctorId, date } = req.body;
      const parsedDate = new Date(date);
      const sessionAvailable = await isSessionAvailable(patientId, doctorId, parsedDate);
      if (!sessionAvailable) return res.status(412).json({ message: "Unavailable session" });
      const session = await Session.create({
        patient: patientId,
        doctor: doctorId,
        date: parsedDate
      });

      res.status(201).json({ session });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default SessionController;
