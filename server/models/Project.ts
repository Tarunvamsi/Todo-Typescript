import mongoose from "mongoose";
import { Todo } from "./Todo";

interface IProject extends mongoose.Document {
  title: string;
  userId: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
}

const projectSchema = new mongoose.Schema<IProject>({
  title: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

projectSchema.index({ title: 1, userId: 1 }, { unique: true });

// Middleware to delete associated todos when a project is deleted
projectSchema.post("findOneAndDelete", async function(doc) {
  if (doc) {
    await Todo.deleteMany({ projectId: doc._id });
  }
});

const Project = mongoose.model<IProject>("Project", projectSchema);

export { Project };
