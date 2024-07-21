import express, { Request, Response } from "express";
import { Todo } from "./db";
import * as types from "./types";
import dotenv from "dotenv";

dotenv.config();

const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

app.post("/todo", async (req: Request, res: Response) => {
  const createPayload = req.body;
  const parsedPayload = types.createTodo.safeParse(createPayload);

  if (!parsedPayload.success) {
    res.status(400).json({
      msg: "Please check the given input",
      errors: parsedPayload.error.errors,
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
      errors: parsedPayload.error.errors,
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

app.patch("/todos/:id/complete", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { completed } = req.body;

  if (typeof completed !== 'boolean') {
    return res.status(400).json({ msg: "Invalid completed value" });
  }

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { completed },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ msg: "Error updating todo", error });
  }
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
