import { Router } from "express";
import PatientController from "../controllers/PatientController";

const router = Router();

router.get("/", PatientController.getPatients);

export default router;
