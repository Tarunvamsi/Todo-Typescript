import * as mongoose from "mongoose";

interface ITodo extends mongoose.Document {
  title: string;
  description: string;
  completed: boolean;
  date: Date;
  user: mongoose.Schema.Types.ObjectId;
}

const todoSchema = new mongoose.Schema<ITodo>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, required: true },
  date: { type: Date, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Todo = mongoose.model<ITodo>("Todo", todoSchema);

export { Todo };
