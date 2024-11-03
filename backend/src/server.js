import express from "express"
import { appRouter } from "./routes/appRouter.js";
import "dotenv/config"

const PORT = process.env.SERVER_HOST;
const app = express();

app.use(appRouter);

app.listen(PORT,() => {
    console.log(`App is working on http::/localhost:${PORT}`)
})