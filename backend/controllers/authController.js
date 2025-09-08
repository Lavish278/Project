const pool = require('../server'); // Assuming server.js exports the pool

const login = (req, res) => {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    // Query the database to find the user
    pool.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        // Check if user exists
        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = results[0];

        // TODO: Implement password hashing and comparison
        // For now, using a simple password comparison
        if (password !== user.password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // TODO: Implement session management or JWT for authentication

        res.status(200).json({ message: 'Login successful', user });
    });
};

module.exports = { login };
