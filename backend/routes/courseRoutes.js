const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const authMiddleware = require('../middleware/authMiddleware');

// GET all courses
router.get('/', authMiddleware, courseController.getAllCourses);

// GET a single course by ID
router.get('/:id', authMiddleware, courseController.getCourseById);

// POST a new course
router.post('/', authMiddleware, courseController.createCourse);

// PUT update a course by ID
router.put('/:id', authMiddleware, courseController.updateCourse);

// DELETE a course by ID
router.delete('/:id', authMiddleware, courseController.deleteCourse);

module.exports = router;