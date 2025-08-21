import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import systemHealthCheckRouter from "./src/routes/systemHealthCheckRtr";
dotenv.config();
const app = express();

app.use(morgan("dev"));

app.set("json spaces", 5);
app.use(express.json());

app.use("/", systemHealthCheckRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
