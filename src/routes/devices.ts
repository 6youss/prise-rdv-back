import { Router } from "express";
import DeviceController from "../controllers/DeviceController";
import { validateDeviceBody } from "../middlewares/validators";
import passport from "passport";

const router = Router();

router.post("/", passport.authenticate("jwt", { session: false }), validateDeviceBody, DeviceController.postDevice);

export default router;
