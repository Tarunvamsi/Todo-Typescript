import mongoose from "mongoose";

interface IProject extends mongoose.Document {
  title: string;
  userId: { type: mongoose.Schema.Types.ObjectId; ref: "User"; required: true };
  createdAt: Date
}

const projectSchema = new mongoose.Schema<IProject>({
  title: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now() }
});

projectSchema.index({ title: 1, userId: 1 }, { unique: true });

const Project = mongoose.model<IProject>("Project", projectSchema);

export { Project };