import { Router } from "express";
import DoctorController from "../controllers/DoctorController";
import { validatePhoneParam } from "../middlewares/validators";
// import passport from "passport";

const router = Router();

router.get("/", DoctorController.getDoctors);
router.get("/:phone", validatePhoneParam, DoctorController.getDoctorByPhone);
router.get("/:searchValue", DoctorController.getSearchedDoctors);

export default router;
