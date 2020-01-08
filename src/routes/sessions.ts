import { Router } from "express";
import SessionController from "../controllers/SessionController";
import { validateSessionBody } from "../middlewares/validators";
import passport from "passport";

const router = Router();

router.post("/", passport.authenticate("jwt", { session: false }), validateSessionBody, SessionController.postSession);
router.get("/doctor/:doctorId", passport.authenticate("jwt", { session: false }), SessionController.getDoctorSessions);

export default router;
