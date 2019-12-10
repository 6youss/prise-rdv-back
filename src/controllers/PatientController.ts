import { Request, Response, NextFunction } from "express";
import Patient, { IPatient } from "../models/Patient";

class PatientController {
  /**
   * GET /patient
   * Set all the patients
   */
  static async getPatients(req: Request, res: Response, next: NextFunction) {
    const patients = await Patient.find();
    return res.json({
      patients
    });
  }
}

export default PatientController;
