import mongoose from "mongoose";

interface ITodo extends mongoose.Document {
  title: string;
  description: string;
  dueDate: Date;
  userId: mongoose.Schema.Types.ObjectId;
  projectId: mongoose.Schema.Types.ObjectId
  completed: boolean;
}

const todoSchema = new mongoose.Schema<ITodo>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  completed: { type: Boolean, default: false },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
});

const Todo = mongoose.model<ITodo>("Todo", todoSchema);

export { Todo };
