import express from 'express'
import Hello from './Hello.js'
import Lab5 from './Lab5/index.js'
import cors from 'cors'
import UserRoutes from './Kanbas/Users/routes.js'
import CourseRoutes from './Kanbas/Courses/routes.js'
import session from "express-session";
import "dotenv/config";
import ModuleRoutes from './Kanbas/Modules/routes.js'
import AssignmentRoutes from "./Kanbas/Assignments/routes.js";
import EnrollmentRoutes from "./Kanbas/Enrollments/routes.js";

const app = express()
app.use(cors({
  origin: true,  // Allow all origins
  credentials: true
}));

app.use(express.json());

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kanbas",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV !== "development",
    sameSite: process.env.NODE_ENV === "development" ? "lax" : "none"
  }
};

app.use(session(sessionOptions));

Lab5(app)
Hello(app)
UserRoutes(app)
CourseRoutes(app)
ModuleRoutes(app)
AssignmentRoutes(app)
EnrollmentRoutes(app)
app.listen(process.env.PORT || 4000)