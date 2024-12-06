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
import mongoose from 'mongoose';  

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING
console.log(CONNECTION_STRING);
mongoose.connect(CONNECTION_STRING, {
    dbName: 'Kanbas'
})
    .then(async () => {
        console.log('Connected to MongoDB');
        const dbName = mongoose.connection.db.databaseName;
        console.log('Current database name:', dbName);
        
        const admin = mongoose.connection.db.admin();
        const dbList = await admin.listDatabases();
        console.log('Available databases:', dbList.databases.map(db => db.name));
        
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('Collections in current database:', collections.map(c => c.name));
        
        const userCount = await mongoose.connection.db.collection('users').countDocuments();
        console.log('Number of documents in users collection:', userCount);
    })
    .catch(err => console.error('MongoDB Connection Error:', err));

const app = express()
app.use(cors({
  origin: true,  // Allow all origins
  credentials: true
}));

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kanbas",
  resave: false,
  saveUninitialized: false,
};

if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}

app.use(
  session(sessionOptions)
);

app.get('/api/users/all', async (req, res) => {
    try {
        const users = await mongoose.connection.db.collection('users').find().toArray();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.use(express.json())
Lab5(app)
Hello(app)
UserRoutes(app)
CourseRoutes(app)
ModuleRoutes(app)
AssignmentRoutes(app)
EnrollmentRoutes(app)
app.listen(process.env.PORT || 4000)