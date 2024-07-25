import mongoose from "mongoose";

interface ITodo extends mongoose.Document {
  title: string;
  description: string;
  dueDate: Date;
  userId: mongoose.Schema.Types.ObjectId;
  completed: boolean;
}

const todoSchema = new mongoose.Schema<ITodo>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  completed: { type: Boolean, default: false },
});

const Todo = mongoose.model<ITodo>("Todo", todoSchema);

export { Todo };
