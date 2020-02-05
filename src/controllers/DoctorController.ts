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
  /**
   * GET /doctor/:phone
   * Get doctor by phone number
   */
  static async getDoctorByPhone(req: Request, res: Response, next: NextFunction) {
    const phone = req.params.phone;
    try {
      const doctor = await Doctor.find({ phone }).select("_id firstName lastName");
      return res.json({
        doctor
      });
    } catch (error) {
      return res.sendStatus(500);
    }
  }

  /**
   * GET /doctor/:saerchValue
   * Get searched Doctors
   */
  static async getSearchedDoctors(req: Request, res: Response, next: NextFunction) {
    const searchValue = req.params.searchValue;

    if (!searchValue) return res.status(422).json({ message: "Invalid Search Text" });

    const getRegex = (str: string) => ({
      $or: [{ firstName: { $regex: str, $options: "i" } }, { lastName: { $regex: str, $options: "i" } }]
    });

    const query = searchValue.split(" ").reduce((accum, currentValue) => [...accum, getRegex(currentValue)], []);

    try {
      const doctors = await Doctor.find({ $and: query })
        .select("_id firstName lastName")
        .lean();
      return res.json({
        doctors
      });
    } catch (error) {
      return res.sendStatus(500);
    }
  }
}

export default DoctorController;
