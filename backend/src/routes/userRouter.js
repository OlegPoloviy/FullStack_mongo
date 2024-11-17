import { Router } from "express";
import { Users } from "../database/DTO/Users.js";
import { Posts } from "../database/DTO/Posts.js";

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

userRouter.get("/posts", async (req, res) => {
  try {
    const posts = await Posts.getPosts();
    res.send(posts);
  } catch (err) {
    res.status(500).send(err);
  }
});

userRouter.post("/post", async (req, res) => {
  try {
    const data = req.body;
    const post = await Posts.addPost(data);
    res.send(post);
  } catch (err) {
    res.status(500).send(err);
  }
});

userRouter.put("/post/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body } = req.body;
    const updatedPost = await Posts.updatePost(id, { title, body }); // Use updatePost here
    res.send(updatedPost);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

userRouter.delete("/post/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await Posts.deletePost(id);
    res.send(deletedPost);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
