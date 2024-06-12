import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TrophySchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  trophy: {
    type: Number,
    required: true,
  },
});

const Trophy = mongoose.model("Trophy", TrophySchema, "trophies");

export default Trophy;
