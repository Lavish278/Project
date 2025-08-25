const express = require('express');
const router = express.Router();
const gradeController = require('../controllers/gradeController');

// GET all grades
router.get('/', gradeController.getAllGrades);

// GET a single grade by ID
router.get('/:id', gradeController.getGradeById);

// POST a new grade
router.post('/', gradeController.createGrade);

// PUT update a grade by ID
router.put('/:id', gradeController.updateGrade);

// DELETE a grade by ID
router.delete('/:id', gradeController.deleteGrade);

module.exports = router;