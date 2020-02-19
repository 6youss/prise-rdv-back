import { Router } from "express";
import SessionController from "../controllers/SessionController";
import { validateSessionBody, validateDoctorIdParam, validateSessionIdParam } from "../middlewares/validators";
import passport from "passport";

const router = Router();

router.post("/", passport.authenticate("jwt", { session: false }), validateSessionBody, SessionController.postSession);

router.get(
  "/doctor/:doctorId",
  passport.authenticate("jwt", { session: false }),
  validateDoctorIdParam,
  SessionController.getDoctorSessions
);

router.get(
  "/:sessionId",
  passport.authenticate("jwt", { session: false }),
  validateSessionIdParam,
  SessionController.getSessionDetails
);

export default router;
