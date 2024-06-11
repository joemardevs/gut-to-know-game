import mongoose from "mongoose";
const Schema = mongoose.Schema;

const LevelSchema = new Schema({
    level: {
        type: Number,
        required: true
    },
    header: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    bgPicFileName: {
        type: String,
        required: true
    },
});

const Level = mongoose.model("Level", LevelSchema, "levels");

export default Level;