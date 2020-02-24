import { Router } from "express";
import DeviceController from "../controllers/DeviceController";
import { validateDeviceBody } from "../middlewares/validators";
// import passport from "passport";

const router = Router();

router.post("/", validateDeviceBody, DeviceController.postDevice);

export default router;
