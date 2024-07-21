import mongoose, { Schema, Document, Model } from "mongoose";
import dotenv from 'dotenv';
const mongoUri = process.env.MONGODB_URI || '';

mongoose.connect(mongoUri);

interface ITodo extends Document {
  title: string;
  description: string;
  completed: boolean;
}

const todoSchema: Schema<ITodo> = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, required: true }
});

const Todo: Model<ITodo> = mongoose.model<ITodo>('Todo', todoSchema);

export { Todo };
