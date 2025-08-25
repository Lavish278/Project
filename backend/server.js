const express = require('express');
const mysql = require('mysql2');

const studentRoutes = require('/home/user/Project/backend/routes/studentRoutes');
const facultyRoutes = require('/home/user/Project/backend/routes/facultyRoutes');
const enrollmentRoutes = require('/home/user/Project/backend/routes/enrollmentRoutes');
const gradeRoutes = require('/home/user/Project/backend/routes/gradeRoutes');
const attendanceRoutes = require('/home/user/Project/backend/routes/attendanceRoutes');
const authRoutes = require('/home/user/Project/backend/routes/authRoutes');
const courseRoutes = require('/home/user/Project/backend/routes/courseRoutes');

const app = express();
const port = 3000;

// Create a connection pool for the database
const pool = mysql.createPool({
  // !!! In a production environment, these values should always be set via environment variables.
  // Using default values here is for development convenience only and is not secure for production.
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'campus_connect',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool; // Export the pool for use in controllers

// Test database connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database as ID ' + connection.threadId);
  connection.release(); // Release the connection back to the pool
});

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Campus Connect Backend is running!');
});

// Use the route files
app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/grades', gradeRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});