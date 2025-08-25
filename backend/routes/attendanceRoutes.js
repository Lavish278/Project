const express = require('express');
const router = express.Router();
const { getAllAttendance, getAttendanceById, createAttendance, updateAttendance, deleteAttendance } = require('../controllers/attendanceController');

router.get('/', getAllAttendance);
router.get('/:id', getAttendanceById);
router.post('/', createAttendance);
router.put('/:id', updateAttendance);
router.delete('/:id', deleteAttendance);

module.exports = router;