// studentController.js

const db = require('../server'); // Assuming db connection is exported from server.js
const { body, validationResult } = require('express-validator');

exports.getAllStudents = async (req, res) => {
    try {
        const [rows, fields] = await db.promise().query('SELECT * FROM students');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ message: 'Error fetching students', error: error.message });
    }
};

exports.getStudentById = async (req, res) => {
    const studentId = req.params.id;
    try {
        const [rows, fields] = await db.promise().query('SELECT * FROM students WHERE student_id = ?', [studentId]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error(`Error fetching student with ID ${studentId}:`, error);
        res.status(500).json({ message: 'Error fetching student', error: error.message });
    }
};

exports.createStudent = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Only admins can create students.' });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { first_name, last_name, email, major, enrollment_date } = req.body;

    try {
        const [result] = await db.promise().query(
            'INSERT INTO students (first_name, last_name, email, major, enrollment_date) VALUES (?, ?, ?, ?, ?)',
            [first_name, last_name, email, major, enrollment_date]
        );
        res.status(201).json({ message: 'Student created successfully', student_id: result.insertId });
    } catch (error) {
        console.error('Error creating student:', error);
        res.status(500).json({ message: 'Error creating student', error: error.message });
    }
};

exports.updateStudent = async (req, res) => {
    const studentId = req.params.id;
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Only admins can update students.' });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { first_name, last_name, email, major, enrollment_date } = req.body;

    try {
        const [result] = await db.promise().query(
            'UPDATE students SET first_name = ?, last_name = ?, email = ?, major = ?, enrollment_date = ? WHERE student_id = ?',
            [first_name, last_name, email, major, enrollment_date, studentId]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json({ message: 'Student updated successfully' });
    } catch (error) {
        console.error(`Error updating student with ID ${studentId}:`, error);
        res.status(500).json({ message: 'Error updating student', error: error.message });
    }
};

exports.deleteStudent = async (req, res) => {
    const studentId = req.params.id;
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Only admins can delete students.' });
    }

    try {
        const [result] = await db.promise().query('DELETE FROM students WHERE student_id = ?', [studentId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        console.error(`Error deleting student with ID ${studentId}:`, error);
        res.status(500).json({ message: 'Error deleting student', error: error.message });
    }
};