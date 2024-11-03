import { Router } from "express";
import {connection} from "../database/connection.js"

export const appRouter = Router();

appRouter.get("/",(req,res) => {
    res.send("All ok");
})

appRouter.get("/users",async (req,res) => {
    try{
        const users = await connection();
        res.send(users)
    }catch(err){
        console.error(err)
    }
})