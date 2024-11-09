import express from "express";
import { appRouter } from "./routes/appRouter.js";
import { userRouter } from "./routes/userRouter.js";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";

const PORT = process.env.SERVER_PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/", appRouter);
app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`App is working on http://localhost:${PORT}`);
});
