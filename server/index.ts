import express, { NextFunction, Request, Response } from "express";
import { Todo } from "./models/db";
import * as types from "./types";
import dotenv from "dotenv";
import routes from "./routes/auth";
import jwt from "jsonwebtoken";
import User from "./models/User";

dotenv.config();

const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, "secret") as { user: string };
    req.body.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Unauthorized" });
  }
};

app.post("/todo", authenticate, async (req: Request, res: Response) => {
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
    ...parsedPayload.data,
    user: createPayload.user,
  });

  res.json({
    msg: "Todo Created",
  });
});

app.get("/todos", authenticate, async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find({ user: req.body.user });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching todos", error });
  }
});

app.put("/completed", authenticate, async (req: Request, res: Response) => {
  const updatePayload = req.body;
  const parsedPayload = types.updateTodo.safeParse(updatePayload);

  if (!parsedPayload.success) {
    res.status(400).json({
      msg: "Please check the given input",
      errors: parsedPayload.error.errors,
    });
    return;
  }

  await Todo.findOneAndUpdate(
    { _id: parsedPayload.data.id, user: req.body.user },
    { completed: parsedPayload.data.completed },
    { new: true }
  );
  res.json({
    msg: "Todo marked as completed",
  });
});

app.patch("/todos/:id/complete", authenticate, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { completed } = req.body;

  if (typeof completed !== "boolean") {
    return res.status(400).json({ msg: "Invalid completed value" });
  }

  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id, user: req.body.user },
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

app.delete("/todos/:id", authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await Todo.findOneAndDelete({ _id: id, user: req.body.user });
    if (!result) {
      return res.status(404).json({ msg: "Todo not found" });
    }
    res.json({ msg: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting todo", error });
  }
});

app.put("/todos/:id", authenticate, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, completed, date } = req.body;

  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id, user: req.body.user },
      { title, description, completed, date },
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

app.use(routes);
app.use(authenticate)

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
