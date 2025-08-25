const db = require('../server'); // Assuming your database connection is exported from server.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// You should store your JWT secret in environment variables
const jwtSecret = process.env.JWT_SECRET;
exports.login = async (req, res) => {
  try {
    // 1. Extract email and password from the request body.
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // 2. Fetch the user from the 'users' table by email.
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) {
        console.error('Error fetching user:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const user = results[0];

      // 3. Comparing the provided password with the stored hashed password using bcrypt.
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // 4. Generating a JWT upon successful login.
      const token = jwt.sign({ id: user.user_id, role: user.role }, jwtSecret, { expiresIn: '1h' }); // Token expires in 1 hour

      // 5. Sending the JWT in the response.
      res.status(200).json({ token });
    });

  } catch (error) {
    console.error('Error in login function:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// You can add other authentication functions here, e.g., register
// exports.register = async (req, res) => { ... };