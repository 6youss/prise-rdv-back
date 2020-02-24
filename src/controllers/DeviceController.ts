import { Request, Response, NextFunction } from "express";
import Device, { IDevice } from "../models/Device";
import User, { IUser } from "../models/User";

class DeviceController {
  /**
   * POST /
   * Add a new device
   */
  static async postDevice(req: Request, res: Response) {
    try {
      const { user, fcmToken, platform } = req.body;
      const foundUser = await User.findById(user);
      if (!foundUser) return res.status(404).json({ message: "can't add device to unexisting user" });

      const foundDevice = await Device.exists({ user, fcmToken });

      if (foundDevice) {
        return res.status(200).json({ message: "device allready exists with the same token" });
      } else {
        await Device.create({
          user,
          fcmToken,
          platform
        } as IDevice);
        return res.status(201).json({ message: "device added successfully" });
      }
    } catch (error) {
      return res.sendStatus(500);
    }
  }
}

export default DeviceController;
