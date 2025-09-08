      const express = require('express');
      const mysql = require('mysql2');
      const cors = require('cors');

      const studentRoutes = require('./routes/studentRoutes');
      const facultyRoutes = require('./routes/facultyRoutes');
      const enrollmentRoutes = require('./routes/enrollmentRoutes');
      const gradeRoutes = require('./routes/gradeRoutes');
      const attendanceRoutes = require('./routes/attendanceRoutes');
      const authRoutes = require('./routes/authRoutes');
      const courseRoutes = require('./routes/courseRoutes');

      const app = express();
      const port = 3000;

      // Create a connection pool for the database
      const pool = mysql.createPool({
        host: process.env.DB_HOST || '127.0.0.1',
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
      app.use(cors());

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