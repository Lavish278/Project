const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/facultyController');
const authMiddleware = require('../middleware/authMiddleware');

// GET all faculty
router.get('/', authMiddleware, facultyController.getAllFaculty);

// GET a single faculty by ID
router.get('/:id', authMiddleware, facultyController.getFacultyById);

// CREATE a new faculty
router.post('/', authMiddleware, facultyController.createFaculty);

// UPDATE a faculty by ID
router.put('/:id', authMiddleware, facultyController.updateFaculty);

// DELETE a faculty by ID
router.delete('/:id', authMiddleware, facultyController.deleteFaculty);

module.exports = router;