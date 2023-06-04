import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
  sensor: { required: true, type: String },
  date: { default: Date.now, required: true, type: Date },
  value1: { required: true, type: Number },
  value2: { required: true, type: Number },
});
const record = mongoose.model("Record", recordSchema);
export default record;
