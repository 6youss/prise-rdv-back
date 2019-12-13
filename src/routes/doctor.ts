import { Router } from "express";
import DoctorController from "../controllers/DoctorController";
// import passport from "passport";

const router = Router();

router.get("/", DoctorController.getDoctors);

export default router;
