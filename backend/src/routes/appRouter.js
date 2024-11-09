import { Router } from "express";
import { Users } from "../database/DTO/Users.js";

export const appRouter = Router();

appRouter.get("/", (req, res) => {
  res.send("All ok");
});
