import { Router } from "express";
import UserController from "../controllers/UserController";

const router = Router();

router.post("/login", UserController.postLogin);
router.post("/signup", UserController.postSignup);
router.post("/token", UserController.refreshToken);

export default router;
