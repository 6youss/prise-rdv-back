import { Router } from "express";
import UserController from "../controllers/UserController";
import passport from "passport";

const router = Router();

router.get("/", passport.authenticate("jwt", { session: false }) , UserController.getUser);
router.post("/login", UserController.postLogin);
router.post("/signup", UserController.postSignup);
router.post("/token", UserController.refreshToken);

export default router;
