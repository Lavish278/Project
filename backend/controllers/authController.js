const pool = require('../server'); // Assuming server.js exports the pool
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = (req, res) => {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    // Query the database to find the user
    pool.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        // Check if user exists
        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = results[0];

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Create and sign a JSON Web Token
        const token = jwt.sign({ id: user.user_id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token, role: user.role });
    });
};

const register = async (req, res) => {
    const { email, password, role, firstName, lastName, major, enrollmentDate } = req.body;

    // Basic validation
    if (!email || !password || !firstName || !lastName) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the users table
    pool.query('INSERT INTO users (email, password, role) VALUES (?, ?, ?)', [email, hashedPassword, role], (err, results) => {
        if (err) {
            console.error('Error inserting into users table:', err);
            return res.status(500).json({ message: 'Error registering user' });
        }

        const userId = results.insertId;

        // If the user is a student, insert into the students table
        if (role === 'student') {
            pool.query('INSERT INTO students (student_id, first_name, last_name, email, major, enrollment_date) VALUES (?, ?, ?, ?, ?, ?)', [userId, firstName, lastName, email, major, enrollmentDate], (err, results) => {
                if (err) {
                    console.error('Error inserting into students table:', err);
                    return res.status(500).json({ message: 'Error registering student' });
                }
                res.status(201).json({ message: 'User registered successfully' });
            });
        } else {
            res.status(201).json({ message: 'User registered successfully' });
        }
    });
};


module.exports = { login, register };
