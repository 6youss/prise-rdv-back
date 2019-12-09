import { Router } from "express";
import passport from "passport";
import UserControler from "../controlers/UserControler";

const router = Router();

router.post("/login", passport.authenticate("local", { session: false }), UserControler.login);
router.post("/token", UserControler.refreshToken);

export default router;
