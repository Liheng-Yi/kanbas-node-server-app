import db from "../../oldDB/Database/index.js";

export const findAllEnrollments = () => {
  return db.enrollments;
};

export const createEnrollment = (enrollment) => {
  const newEnrollment = { ...enrollment, _id: new Date().getTime().toString() };
  db.enrollments.push(newEnrollment);
  return newEnrollment;
};

export const deleteEnrollment = (userId, courseId) => {
  const index = db.enrollments.findIndex(
    (enrollment) => enrollment.user === userId && enrollment.course === courseId
  );
  if (index !== -1) {
    const enrollment = db.enrollments[index];
    db.enrollments.splice(index, 1);
    return enrollment;
  }
  return null;
};

export const enrollInCourse = (userId, courseId) => {
  // Check if enrollment already exists
  const exists = db.enrollments.some(
    (enrollment) => enrollment.user === userId && enrollment.course === courseId
  );
  if (exists) {
    return { error: "Already enrolled" };
  }
  const newEnrollment = {
    _id: new Date().getTime().toString(),
    user: userId,
    course: courseId,
    role: "STUDENT"
  };
  db.enrollments.push(newEnrollment);
  return newEnrollment;
};

export const unenrollFromCourse = (userId, courseId) => {
  return deleteEnrollment(userId, courseId);
};
