import { Router } from "express";
import { healthcheck } from "../controllers/healthCheck";

const systemRouter = Router();

systemRouter.get("/healthcheck", healthcheck);

export default systemRouter;
