import { Router } from "express";
import Todo from "../models/Todo";

const router = Router();

router.get("/", async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

router.post("/", async (req, res) => {
    const { title } = req.body;
    const newTodo = new Todo({ title });
    await newTodo.save();
    res.json(newTodo);
 });

 router.put("/:id", async (req, res) => {
    const { title } = req.body;
    const newTodo = new Todo({ title });
    await newTodo.save();
    res.json(newTodo);
 });

 