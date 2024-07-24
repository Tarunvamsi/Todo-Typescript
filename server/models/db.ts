import * as mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const mongoUri = "mongodb+srv://tarunvamsipusarla:kbbLfvzRrXVDW3AY@todo-app.zic7d0j.mongodb.net/todos" || "";
console.log("MongoDB URI:", mongoUri); // Debugging line

mongoose.connect(mongoUri)
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error', err));

interface ITodo extends mongoose.Document {
  title: string;
  description: string;
  completed: boolean;
  date : Date;
  user: mongoose.Schema.Types.ObjectId;
}

const todoSchema = new mongoose.Schema<ITodo>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, required: true },
  date: {type: Date, required: true},
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  
});

const Todo = mongoose.model<ITodo>("Todo", todoSchema);

export { Todo };
