import { Router } from "express";
import user from "./user";
import doctor from "./doctor";
import patient from "./patient";

import errorHandler from "../middlewares/errorHandler";

const routes = Router();

routes.use("/user", user);
routes.use("/doctor", doctor);
routes.use("/patient", patient);

routes.use(errorHandler);

export default routes;
