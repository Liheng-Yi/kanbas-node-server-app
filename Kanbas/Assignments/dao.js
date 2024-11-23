import db from "../Database/index.js";

export const findAllAssignments = () => {
  return db.assignments;
};

export const findAssignmentById = (aid) => {
  return db.assignments.find((assignment) => assignment._id === aid);
};

export const findAssignmentsForCourse = (courseId) => {
  console.log("findAssignmentsForCourse from server");
  // console.log("assignments after deletion:", db.assignments);
  return db.assignments.filter((assignment) => assignment.course === courseId);

};

export const createAssignment = (assignment) => {
  const newAssignment = { ...assignment, _id: new Date().getTime().toString() };
  db.assignments.push(newAssignment);
  console.log("createAssignment from server");
  return newAssignment;
};

export const updateAssignment = (aid, assignment) => {
  const index = db.assignments.findIndex((a) => a._id === aid);
  if (index !== -1) {
    db.assignments[index] = { ...db.assignments[index], ...assignment };
    console.log("updateAssignment from server");
    return db.assignments[index];
  }
  return null;
};


export function deleteAssignment(aid) {
 const { assignments } = db;
 db.assignments = assignments.filter((assignment) => assignment._id !== aid);
console.log("deleting assignment with id:", aid);
console.log("assignments after deletion:", db.assignments);
 console.log("deleteAssignment from server");

}
