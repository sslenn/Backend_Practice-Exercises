import express from 'express';
import dotenv from 'dotenv';
import sequelize from './configs/database.js';
import routes from './routes/routes.js';
import { Student, ClassRoom, Attendance } from './models/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/', routes);

// Initialize Database & Start Server
async function startServer() {
  try {
    // Authenticate database connection
    await sequelize.authenticate();
    console.log('✅ Connection to the database has been established successfully.');

    // Sync models with database
    // Use force: true to drop and recreate tables cleanly on startup
    await sequelize.sync({ force: true });
    console.log('✅ Database tables synchronized successfully.');

    // Seed dummy data if database is empty
    await seedInitialData();

    // Start Express Server
    app.listen(PORT, () => {
      console.log(`🚀 Server is running and listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Unable to connect to the database or start the server:', error.message);
    console.error('Please make sure your MySQL database server is running and configured correctly in configs/database.js or the .env file.');
  }
}

// Function to seed some initial data for testing
async function seedInitialData() {
  try {
    const studentCount = await Student.count();
    if (studentCount === 0) {
      console.log('🌱 Database is empty. Seeding initial test data...');
      
      // Create a default Student
      const student = await Student.create({
        name: 'John Doe',
        email: 'john.doe@example.com'
      });
      console.log(`Created test Student: ${student.name} (ID: ${student.id})`);

      // Create a default Classroom
      const classroom = await ClassRoom.create({
        courseName: 'Backend Development',
        day: 'Monday'
      });
      console.log(`Created test Classroom: ${classroom.courseName} (ID: ${classroom.id})`);

      // Create a default Attendance record
      const attendance = await Attendance.create({
        studentId: student.id,
        classroomId: classroom.id,
        date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
        status: 'present',
        notes: 'On time and active'
      });
      console.log(`Created test Attendance record (ID: ${attendance.id})`);
    }
  } catch (error) {
    console.error('⚠️ Seeding initial data failed:', error.message);
  }
}

startServer();
