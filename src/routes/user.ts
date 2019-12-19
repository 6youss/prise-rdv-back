import { Router } from "express";
import UserController from "../controllers/UserController";
import passport from "passport";
import { validateSignUpBody } from "../middlewares/validation";

const router = Router();

router.get("/", passport.authenticate("jwt", { session: false }), UserController.getUser);
router.post("/login", UserController.postLogin);
router.post("/signup", validateSignUpBody, UserController.postSignup);
router.post("/token", UserController.refreshToken);

export default router;
