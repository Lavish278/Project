const db = require('../server'); // Assuming your database connection is exported from server.js

// @desc    Get all attendance records
// @route   GET /api/attendance
// @access  Private (Admin, Faculty potentially)
exports.getAllAttendance = async (req, res) => {
  try {
    const [rows] = await db.promise().query('SELECT * FROM attendance');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching attendance records:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get single attendance record by ID
// @route   GET /api/attendance/:id
// @access  Private (Admin, Faculty, Student for their own)
exports.getAttendanceById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.promise().query('SELECT * FROM attendance WHERE attendance_id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching attendance record by ID:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create new attendance record
// @route   POST /api/attendance
// @access  Private (Admin only for now)
exports.createAttendance = async (req, res) => {
  // Authorization: Only admin can create attendance for now
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Only administrators can perform this action' });
  }

  const { enrollment_id, date, present } = req.body;

  // Validation
  if (!enrollment_id || !date || present === undefined) {
    return res.status(400).json({ message: 'Please include all required fields: enrollment_id, date, present' });
  }
  if (typeof enrollment_id !== 'number') {
    return res.status(400).json({ message: 'enrollment_id must be a number' });
  }
  if (typeof present !== 'boolean') {
    return res.status(400).json({ message: 'present must be a boolean (true or false)' });
  }
  // Basic date format check (can be more robust)
  if (isNaN(Date.parse(date))) {
       return res.status(400).json({ message: 'Invalid date format' });
  }


  try {
    const [result] = await db.promise().query('INSERT INTO attendance (enrollment_id, date, present) VALUES (?, ?, ?)', [enrollment_id, date, present]);
    res.status(201).json({ message: 'Attendance record created', attendance_id: result.insertId });
  } catch (error) {
    console.error('Error creating attendance record:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update attendance record
// @route   PUT /api/attendance/:id
// @access  Private (Admin only for now)
exports.updateAttendance = async (req, res) => {
  // Authorization: Only admin can update attendance for now
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Only administrators can perform this action' });
  }

  const { id } = req.params;
  const { enrollment_id, date, present } = req.body;

  // Validation
  if (!enrollment_id || !date || present === undefined) {
    return res.status(400).json({ message: 'Please include all required fields: enrollment_id, date, present' });
  }
   if (typeof enrollment_id !== 'number') {
    return res.status(400).json({ message: 'enrollment_id must be a number' });
  }
  if (typeof present !== 'boolean') {
    return res.status(400).json({ message: 'present must be a boolean (true or false)' });
  }
    // Basic date format check (can be more robust)
  if (isNaN(Date.parse(date))) {
       return res.status(400).json({ message: 'Invalid date format' });
  }

  try {
    const [result] = await db.promise().query('UPDATE attendance SET enrollment_id = ?, date = ?, present = ? WHERE attendance_id = ?', [enrollment_id, date, present, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }

    res.json({ message: 'Attendance record updated' });
  } catch (error) {
    console.error('Error updating attendance record:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete attendance record
// @route   DELETE /api/attendance/:id
// @access  Private (Admin only for now)
exports.deleteAttendance = async (req, res) => {
  // Authorization: Only admin can delete attendance for now
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Only administrators can perform this action' });
  }

  const { id } = req.params;

  try {
    const [result] = await db.promise().query('DELETE FROM attendance WHERE attendance_id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }

    res.json({ message: 'Attendance record deleted' });
  } catch (error) {
    console.error('Error deleting attendance record:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};