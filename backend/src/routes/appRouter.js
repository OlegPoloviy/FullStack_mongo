import { Router } from "express";
import {Users} from "../database/DTO/Users.js"

export const appRouter = Router();

appRouter.get("/",(req,res) => {
    res.send("All ok");
})

appRouter.get("/users",async (req,res) => {
    try{
        const users = await Users.getAll();
        res.send(users)
    }catch(err){
        console.error(err)
    }
})