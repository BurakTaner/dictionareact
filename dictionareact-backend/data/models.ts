import mongoose, { Schema } from "mongoose";

const wordSchema = new Schema({
  name: {
    type: String,
    index:true,
    unique:true
  },
  description: {
    type: [String]
  }
});

export const Word = mongoose.model("Word", wordSchema);
