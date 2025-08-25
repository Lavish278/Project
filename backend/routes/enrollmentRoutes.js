const express = require('express');
const router = express.Router();
const { getAllEnrollments, getEnrollmentById, createEnrollment, updateEnrollment, deleteEnrollment } = require('../controllers/enrollmentController');

// GET all enrollments
router.get('/', getAllEnrollments);

// GET a single enrollment by ID
router.get('/:id', getEnrollmentById);

// POST a new enrollment
router.post('/', createEnrollment);

// PUT update an enrollment by ID
router.put('/:id', updateEnrollment);

// DELETE an enrollment by ID
router.delete('/:id', deleteEnrollment);

module.exports = router;