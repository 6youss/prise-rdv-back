import { Router } from "express";
import user from "./user";
import errorHandler from "../middlewares/errorHandler";

const routes = Router();

routes.use("/user", user);

routes.use(errorHandler);

export default routes;
