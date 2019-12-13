import { Request, Response, NextFunction } from "express";
import Doctor from "../models/Doctor";

class DoctorController {
  /**
   * GET /doctor
   * Get all the doctors
   */
  static async getDoctors(req: Request, res: Response, next: NextFunction) {
    try {
      const doctors = await Doctor.find().select("_id firstName lastName");
      return res.json({
        doctors
      });
    } catch (error) {
      return res.sendStatus(500);
    }
  }
}

export default DoctorController;
