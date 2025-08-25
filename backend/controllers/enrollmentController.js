const connection = require('../server'); // Assuming your connection is exported from server.js

// Helper function for authorization check
const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next(); // User is admin, proceed to the next middleware/route handler
    } else {
        res.status(403).json({ message: 'Forbidden: Admins only' });
    }
};

// Get all enrollments
exports.getAllEnrollments = async (req, res) => {
    try {
        const [rows] = await connection.execute('SELECT * FROM enrollments');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching enrollments:', error);
        res.status(500).json({ message: 'Error fetching enrollments' });
    }
};

// Get enrollment by ID
exports.getEnrollmentById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await connection.execute('SELECT * FROM enrollments WHERE enrollment_id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Enrollment not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching enrollment by ID:', error);
        res.status(500).json({ message: 'Error fetching enrollment' });
    }
};

// Create a new enrollment
exports.createEnrollment = [
    authorizeAdmin, // Apply admin authorization middleware
    async (req, res) => {
        const { student_id, course_id, enrollment_date } = req.body;

        // Basic validation
        if (!student_id || !course_id || !enrollment_date) {
            return res.status(400).json({ message: 'Missing required fields: student_id, course_id, enrollment_date' });
        }
        if (isNaN(student_id) || isNaN(course_id)) {
            return res.status(400).json({ message: 'student_id and course_id must be numbers' });
        }

        try {
            const [result] = await connection.execute(
                'INSERT INTO enrollments (student_id, course_id, enrollment_date) VALUES (?, ?, ?)',
                [student_id, course_id, enrollment_date]
            );
            res.status(201).json({ message: 'Enrollment created successfully', enrollment_id: result.insertId });
        } catch (error) {
            console.error('Error creating enrollment:', error);
            res.status(500).json({ message: 'Error creating enrollment' });
        }
    }
];


// Update an existing enrollment
exports.updateEnrollment = [
    authorizeAdmin, // Apply admin authorization middleware
    async (req, res) => {
        const { id } = req.params;
        const { student_id, course_id, enrollment_date } = req.body;

         // Basic validation
        if (!student_id || !course_id || !enrollment_date) {
            return res.status(400).json({ message: 'Missing required fields: student_id, course_id, enrollment_date' });
        }
         if (isNaN(student_id) || isNaN(course_id)) {
            return res.status(400).json({ message: 'student_id and course_id must be numbers' });
        }

        try {
            const [result] = await connection.execute(
                'UPDATE enrollments SET student_id = ?, course_id = ?, enrollment_date = ? WHERE enrollment_id = ?',
                [student_id, course_id, enrollment_date, id]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Enrollment not found' });
            }

            res.json({ message: 'Enrollment updated successfully' });
        } catch (error) {
            console.error('Error updating enrollment:', error);
            res.status(500).json({ message: 'Error updating enrollment' });
        }
    }
];


// Delete an enrollment
exports.deleteEnrollment = [
    authorizeAdmin, // Apply admin authorization middleware
    async (req, res) => {
        const { id } = req.params;
        try {
            const [result] = await connection.execute('DELETE FROM enrollments WHERE enrollment_id = ?', [id]);

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Enrollment not found' });
            }

            res.json({ message: 'Enrollment deleted successfully' });
        } catch (error) {
            console.error('Error deleting enrollment:', error);
            res.status(500).json({ message: 'Error deleting enrollment' });
        }
    }
];