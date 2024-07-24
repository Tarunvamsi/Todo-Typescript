import express, { NextFunction, Request, Response } from "express";
import { Todo } from "./models/Todo";
import * as types from "./services/todo/types";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import cors from "cors";
import { DB_URL, JWT_SECRET, requiredEnvVariables } from "./utils/constants";
import { authRouter, todoRouter } from "./routes";
import mongoose, { Types } from "mongoose";

// Load env config
dotenv.config();
validateEnvConfig();

// Establish DB connection
connectToDB();

const app = express();
app.use(express.json());
app.use(cors());

// app.get("/todos", authenticate, async (req: Request, res: Response) => {
//   try {
//     const todos = await Todo.find({ user: req.body.user });
//     res.status(200).json(todos);
//   } catch (error) {
//     res.status(500).json({ msg: "Error fetching todos", error });
//   }
// });

// app.put("/completed", authenticate, async (req: Request, res: Response) => {
//   const updatePayload = req.body;
//   const parsedPayload = types.updateTodo.safeParse(updatePayload);

//   if (!parsedPayload.success) {
//     res.status(400).json({
//       msg: "Please check the given input",
//       errors: parsedPayload.error.errors,
//     });
//     return;
//   }

//   await Todo.findOneAndUpdate(
//     { _id: parsedPayload.data.id, user: req.body.user },
//     { completed: parsedPayload.data.completed },
//     { new: true }
//   );
//   res.json({
//     msg: "Todo marked as completed",
//   });
// });

// app.patch(
//   "/todos/:id/complete",
//   authenticate,
//   async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const { completed } = req.body;

//     if (typeof completed !== "boolean") {
//       return res.status(400).json({ msg: "Invalid completed value" });
//     }

//     try {
//       const updatedTodo = await Todo.findOneAndUpdate(
//         { _id: id, user: req.body.user },
//         { completed },
//         { new: true }
//       );

//       if (!updatedTodo) {
//         return res.status(404).json({ msg: "Todo not found" });
//       }

//       res.json(updatedTodo);
//     } catch (error) {
//       res.status(500).json({ msg: "Error updating todo", error });
//     }
//   }
// );

// app.delete("/todos/:id", authenticate, async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const result = await Todo.findOneAndDelete({
//       _id: id,
//       user: req.body.user,
//     });
//     if (!result) {
//       return res.status(404).json({ msg: "Todo not found" });
//     }
//     res.json({ msg: "Todo deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ msg: "Error deleting todo", error });
//   }
// });

// app.put("/todos/:id", authenticate, async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { title, description, completed, date } = req.body;

//   try {
//     const updatedTodo = await Todo.findOneAndUpdate(
//       { _id: id, user: req.body.user },
//       { title, description, completed, date },
//       { new: true }
//     );

//     if (!updatedTodo) {
//       return res.status(404).json({ msg: "Todo not found" });
//     }

//     res.json(updatedTodo);
//   } catch (error) {
//     res.status(500).json({ msg: "Error updating todo", error });
//   }
// });

app.use(authRouter);
app.use(todoRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

function connectToDB() {
  mongoose
    .connect(DB_URL)
    .then(() => console.log("Database connected"))
    .catch((err) => console.error("Database connection error", err));
}

function validateEnvConfig() {
  for (let envVar of requiredEnvVariables) {
    if (!process.env[envVar]) {
      throw new Error(`Environment variable ${envVar} is missing.`);
    }
  }
}
