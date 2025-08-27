import { Server as Engine } from "@socket.io/bun-engine";
import { Server } from "socket.io";
import { ServerToClientEvents, ClientToServerEvents } from "./src/types/socket";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import passport from "passport";
import systemHealthCheckRouter from "./src/routes/systemHealthCheckRtr";
import logger from "./src/config/logger";
import { configurePassport } from "./src/config/configurePassport";

dotenv.config();
const app = express();

app.use(morgan("dev"));

app.set("json spaces", 5);
app.use(passport.initialize());
configurePassport();
app.use(express.json());

app.use("/", systemHealthCheckRouter);

const io = new Server<ServerToClientEvents, ClientToServerEvents>();
const engine = new Engine({
  path: "/socket.io",
});

io.bind(engine);

Bun.serve({
  ...engine.handler(),
  port: Number(process.env.PORT) || 3000,
});

io.on("connection", (socket) => {
  logger.info("a user connected");
  socket.on("message", (msg) => {
    logger.info("message: " + msg);
    io.emit("message", msg);
  });
});

io.on("disconnect", (socket) => {
  logger.info("a user disconnected");
});

export default app;
