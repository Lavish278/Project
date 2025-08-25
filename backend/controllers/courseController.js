// controllers/courseController.js

const db = require('../server'); // Assuming your db connection is exported from server.js

// Async function to get all courses
exports.getAllCourses = async (req, res) => {
    try {
        const [rows, fields] = await db.promise().query('SELECT * FROM courses');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ message: 'Error fetching courses' });
    }
};

// Async function to get a single course by ID
exports.getCourseById = async (req, res) => {
    const courseId = req.params.id;
    try {
        const [rows, fields] = await db.promise().query('SELECT * FROM courses WHERE course_id = ?', [courseId]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching course by ID:', error);
        res.status(500).json({ message: 'Error fetching course by ID' });
    }
};

// Async function to create a new course
exports.createCourse = async (req, res) => {
    const { course_code, course_name, credits, instructor_id } = req.body;

    // Basic validation
    if (!course_code || !course_name) {
        return res.status(400).json({ message: 'Course code and course name are required.' });
    }
    if (credits !== undefined && credits !== null && isNaN(credits)) {
        return res.status(400).json({ message: 'Credits must be a number.' });
    }
    try {
        const [result] = await db.promise().query('INSERT INTO courses (course_code, course_name, credits, instructor_id) VALUES (?, ?, ?, ?)', [course_code, course_name, credits, instructor_id]);
        res.status(201).json({ message: 'Course created successfully', courseId: result.insertId });
    } catch (error) {
        console.error('Error creating course:', error);
        res.status(500).json({ message: 'Error creating course' });
    }
};

// Async function to update a course by ID
exports.updateCourse = async (req, res) => {
    const courseId = req.params.id;
    const { course_code, course_name, credits, instructor_id } = req.body;

    // Basic validation
    if (!course_code || !course_name) {
        return res.status(400).json({ message: 'Course code and course name are required.' });
    }
    if (credits !== undefined && credits !== null && isNaN(credits)) {
        return res.status(400).json({ message: 'Credits must be a number.' });
    }
    try {
        const [result] = await db.promise().query('UPDATE courses SET course_code = ?, course_name = ?, credits = ?, instructor_id = ? WHERE course_id = ?', [course_code, course_name, credits, instructor_id, courseId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json({ message: 'Course updated successfully' });
    } catch (error) {
        console.error('Error updating course:', error);
        res.status(500).json({ message: 'Error updating course' });
    }
};

// Async function to delete a course by ID
exports.deleteCourse = async (req, res) => {
    const courseId = req.params.id;
    try {
        const [result] = await db.promise().query('DELETE FROM courses WHERE course_id = ?', [courseId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json({ message: 'Course deleted successfully' });
    } catch (error) {
        console.error('Error deleting course:', error);
        res.status(500).json({ message: 'Error deleting course' });
    }
};