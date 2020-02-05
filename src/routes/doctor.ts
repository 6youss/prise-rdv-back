import { Router } from "express";
import DoctorController from "../controllers/DoctorController";
// import passport from "passport";

const router = Router();

router.get("/", DoctorController.getDoctors);
router.get("/:phone", DoctorController.getDoctorByPhone);
router.get("/:searchValue", DoctorController.getSearchedDoctors);

export default router;
