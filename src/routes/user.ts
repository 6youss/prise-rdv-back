import { Router } from "express";
import passport from "passport";
import UserController from "../controllers/UserController";

const router = Router();

router.post("/login", UserControlLer.postLogin);
router.post("/signup", UserControlLer.postSignup);
router.post("/token", UserControlLer.refreshToken);

export default router;
