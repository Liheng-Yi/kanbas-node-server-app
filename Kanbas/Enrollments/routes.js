import * as dao from "./dao.js";

function EnrollmentRoutes(app) {
  const findAllEnrollments = async (req, res) => {
    const enrollments = await dao.findAllEnrollments();
    res.json(enrollments);
  };


  const enrollInCourse = async (req, res) => {
    const { userId, courseId } = req.body;
    const enrollment = await dao.enrollInCourse(userId, courseId);
    res.json(enrollment);
  };

  const unenrollFromCourse = async (req, res) => {
    const { userId, courseId } = req.body;
    const status = await dao.unenrollFromCourse(userId, courseId);
    res.json(status);
  };

  // Routes to match frontend API calls
  app.get("/api/enrollments", findAllEnrollments);
  app.post("/api/enrollments/enroll", enrollInCourse);
  app.post("/api/enrollments/unenroll", unenrollFromCourse);
}

export default EnrollmentRoutes; 