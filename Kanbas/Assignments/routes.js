import * as dao from "./dao.js";

function AssignmentRoutes(app) {
  const findAllAssignments = (req, res) => {
    const assignments = dao.findAllAssignments();
    res.json(assignments);
  };

  const findAssignmentById = (req, res) => {
    const { aid } = req.params;
    const assignment = dao.findAssignmentById(aid);
    res.json(assignment);
  };

  const findAssignmentsForCourse = (req, res) => {
    const { courseId } = req.params;
    const assignments = dao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  };

  const createAssignment = (req, res) => {
    const assignment = dao.createAssignment(req.body);
    res.json(assignment);
  };

  const updateAssignment = (req, res) => {
    const { aid } = req.params;
    const status = dao.updateAssignment(aid, req.body);
    res.json(status);
  };

  const deleteAssignment = (req, res) => {
    const { aid } = req.params;
    const status = dao.deleteAssignment(aid);
    res.json(status);
  };

  app.get("/api/assignments", findAllAssignments);
  app.get("/api/assignments/:aid", findAssignmentById);
  app.get("/api/assignments/course/:courseId", findAssignmentsForCourse);
  app.post("/api/assignments", createAssignment);
  app.put("/api/assignments/:aid", updateAssignment);
  app.delete("/api/assignments/:aid", deleteAssignment);
}

export default AssignmentRoutes; 