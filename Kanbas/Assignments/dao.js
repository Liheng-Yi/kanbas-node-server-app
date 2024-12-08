import model from "./model.js";
import courseModel from "../Courses/model.js";

export async function createAssignments(assignment) {
  try {
    // First find the course to get its number
    const course = await courseModel.findById(assignment.course);
    if (!course) {
      throw new Error("Course not found");
    }
    
    // Create new assignment object with course number
    const newAssignment = {
      ...assignment,
      course: course.number, // Use course number instead of ID
      availableFromDate: assignment.startDate || "",
      dueDate: assignment.endDate || "",
      points: parseInt(assignment.points) || 0
    };
    
    delete newAssignment._id;
    return model.create(newAssignment);
  } catch (error) {
    console.error("Error creating assignment:", error);
    throw error;
  }
}
  
export async function findAssignmentsForCourse(courseId) {
  try {
    // First find the course to get its number
    const course = await courseModel.findById(courseId);
    if (!course) {
      console.log("Course not found");
      return [];
    }
    
    // Use the course number to find assignments
    const assignments = await model.find({ course: course.number });
    return assignments;
  } catch (error) {
    console.error("Error finding assignments:", error);
    throw error;
  }
}

export function deleteAssignment(assignmentId) {
  return model.deleteOne({ _id: assignmentId });
}

export function updateAssignment(assignmentId, assignmentUpdates) {
  return model.updateOne({ _id: assignmentId }, { $set: assignmentUpdates });
}