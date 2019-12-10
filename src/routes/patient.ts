import { Router } from "express";
import PatientController from "../controllers/PatientController";
import passport from "passport";

const router = Router();

router.get("/", passport.authenticate("jwt", { session: false }), PatientController.getPatients);

export default router;
