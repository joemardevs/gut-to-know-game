import mongoose from "mongoose";
import { QuestionSchema } from "./Question";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    questions: [QuestionSchema],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema, "users");

export default User;
