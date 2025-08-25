const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const authMiddleware = require('../middleware/authMiddleware');

// GET all students
router.get('/', authMiddleware, studentController.getAllStudents);

// GET student by ID
router.get('/:id', authMiddleware, studentController.getStudentById);

// CREATE new student
router.post('/', authMiddleware, studentController.createStudent);

// UPDATE student by ID
router.put('/:id', authMiddleware, studentController.updateStudent);

// DELETE student by ID
router.delete('/:id', authMiddleware, studentController.deleteStudent);

module.exports = router;