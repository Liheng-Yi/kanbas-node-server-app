const courses = require('./courses.json');
const modules = require('./modules.json');
const assignments = require('./assignments.json');
const enrollments = require('./enrollments.json');
const users = require('./user.json');
export interface Course {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  department: string;
  credits: number;
  description: string;
}

export interface Lesson {
  _id: string;
  name: string;
  description: string;
  module: string;
}

export interface Module {
  _id: string;
  name: string;
  description: string;
  course: string;
  lessons: Lesson[];
}

export interface Assignment {
  _id: string;
  title: string;
  course: string;
  module: string;
  availableFromDate: string;
  dueDate: string;
  description: string;
  points: number;
}
export interface Enrollment {
  _id: string;
  user: string;
  course: string;
}
export interface User {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  role: string;
  loginId: string;
  section: string;
  lastActivity: string;
  totalActivity: string;
}

export { courses, modules, assignments, enrollments, users };
