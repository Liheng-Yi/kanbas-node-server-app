import model from "./model.js";
import courseModel from "../Courses/model.js";

export async function findModulesForCourse(courseId) {
  console.log("findModulesForCourse from server");
  
  // First find the course to get its number
  const course = await courseModel.findById(courseId);
  if (!course) {
    console.log("Course not found");
    return [];
  }
  
  // Use the course number to find modules
  const modules = await model.find({ course: course.number });
  // console.log("Modules found:", modules);
  return modules;
}

export function createModule(module) {
  delete module._id
 return model.create(module);
}

export function deleteModule(moduleId) {
 return model.deleteOne({ _id: moduleId });
}

export function updateModule(moduleId, moduleUpdates) {
  console.log("updateModule from server");
  console.log(moduleId);
  console.log(moduleUpdates);
  console.log("************************");
 return model.updateOne({ _id: moduleId }, moduleUpdates);
}
