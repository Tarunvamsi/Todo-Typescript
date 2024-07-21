// server.ts
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { Todo } from "./db";
import * as types from "./types";

const app = express();
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://tarunvamsipusarla:kbbLfvzRrXVDW3AY@todo-app.zic7d0j.mongodb.net/todos"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.post("/todo", async (req: Request, res: Response) => {
  const createPayload = req.body;
  const parsedPayload = types.createTodo.safeParse(createPayload);

  if (!parsedPayload.success) {
    res.status(400).json({
      msg: "Please check the given input",
    });
    return;
  }
  await Todo.create({
    title: createPayload.title,
    description: createPayload.description,
    completed: false,
  });

  res.json({
    msg: "To do Created",
  });
});

app.get("/todos", async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching todos", error });
  }
});

app.put("/completed", async (req: Request, res: Response) => {
  const updatePayload = req.body;
  const parsedPayload = types.updateTodo.safeParse(updatePayload);

  if (!parsedPayload.success) {
    res.status(400).json({
      msg: "Please check the given input",
    });
    return;
  }

  await Todo.findByIdAndUpdate(
    parsedPayload.data.id,
    { completed: parsedPayload.data.completed },
    { new: true }
  );
  res.json({
    msg: "To do mark as completed",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
