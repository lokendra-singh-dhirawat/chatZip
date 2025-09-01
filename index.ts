import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import passport from "passport";
import systemHealthCheckRouter from "./src/routes/systemHealthCheckRtr";
import logger from "./src/config/logger";
import { configurePassport } from "./src/config/configurePassport";
import authRtr from "./src/routes/authRtr";
import corsMiddleware from "./src/middleware/cors";

dotenv.config();
const app = express();

app.use(morgan("dev"));

app.set("json spaces", 5);
app.use(passport.initialize());
configurePassport();

app.set("trust proxy", 1);
app.use(corsMiddleware);

app.use(express.json());

app.use("/", systemHealthCheckRouter);
app.use("/auth", authRtr);

app.listen(process.env.PORT || 3000, () => {
  logger.info(`Server is running on port ${process.env.PORT || 3000}`);
});

export default app;
