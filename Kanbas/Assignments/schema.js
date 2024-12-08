import mongoose from "mongoose";
const AssignmentSchema = new mongoose.Schema(
  {
    title: String,
    course: String,
    module: String,
    points: Number,
    description: String,
    availableFromDate: String,
    dueDate: String,
  },
  { collection: "assignments" }
);
export default AssignmentSchema;