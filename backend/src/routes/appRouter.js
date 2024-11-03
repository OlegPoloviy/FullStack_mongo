import { Router } from "express";

export const appRouter = Router();

appRouter.get("/",(req,res) => {
    res.send("All ok");
})