import { Router } from "express";
import { Users } from "../database/DTO/Users.js";

export const userRouter = Router();

userRouter.get("/all", async (req, res) => {
  try {
    const users = await Users.getAll();
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err.message });
  }
});

userRouter.post("/register", async (req, res) => {
  try {
    const data = req.body;
    const createdUser = await Users.addUser(data);
    res.status(201).send(createdUser);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { login, pass } = req.body;
    const user = await Users.checkLogin(login, pass);
    res.status(200).send({ message: "Login successful", user });
  } catch (err) {
    res.status(401).send({ error: err.message });
  }
});
