import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ChoiceSchema = new Schema({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  },
});

export const QuestionSchema = new Schema({
  level: {
    type: Number,
    required: true,
  },
  additional_information: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  choices: [ChoiceSchema],
  isAnswered: {
    type: Boolean,
    default: false,
  },
  isQuestionAnsweredCorrect: {
    type: Boolean || null,
    required: false,
    default: null,
  },
  trophy: {
    type: Number,
    required: true,
  },
  picFilename: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
});

const Question = mongoose.model("Question", QuestionSchema, "questions");

export default Question;
