import express from 'express';
import { Student, ClassRoom, Attendance } from '../models/index.js';

const router = express.Router();

// --- STUDENT ROUTES ---
// Create a student
router.post('/students', async (req, res) => {
  const { name, email } = req.body;
  try {
    const student = await Student.create({ name, email });
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// List all students
router.get('/students', async (req, res) => {
  try {
    const students = await Student.findAll();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- CLASSROOM ROUTES ---
// Create a classroom
router.post('/classrooms', async (req, res) => {
  const { courseName, day } = req.body;
  try {
    const classroom = await ClassRoom.create({ courseName, day });
    res.status(201).json(classroom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// List all classrooms
router.get('/classrooms', async (req, res) => {
  try {
    const classrooms = await ClassRoom.findAll();
    res.status(200).json(classrooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- ATTENDANCE ROUTES ---
// Mark attendance
router.post('/mark', async (req, res) => {
  const { studentId, classroomId, date, status, notes } = req.body;
  try {
    const record = await Attendance.create({ studentId, classroomId, date, status, notes });
    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all attendance records (with student and classroom details)
router.get('/records', async (req, res) => {
  try {
    const records = await Attendance.findAll({
      include: [Student, ClassRoom]
    });
    res.status(200).json(records);
  } catch (error) { 
    res.status(500).json({ error: error.message });
  }
});

export default router;