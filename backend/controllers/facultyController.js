const connection = require('../server'); // Adjust the path if your server file is in a different location

// Get all faculty
exports.getAllFaculty = async (req, res) => {
  try {
    const [rows] = await connection.execute('SELECT * FROM faculty');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching faculty:', err);
    res.status(500).json({ message: 'Error fetching faculty' });
  }
};

// Get faculty by ID
exports.getFacultyById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await connection.execute('SELECT * FROM faculty WHERE faculty_id = ?', [id]);
    if (rows.length === 0) { 
      return res.status(404).json({ message: 'Faculty not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching faculty by ID:', err);
    res.status(500).json({ message: 'Error fetching faculty by ID' });
  }
};

// Create new faculty
exports.createFaculty = async (req, res) => {
  const { first_name, last_name, email } = req.body;

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }

  if (!first_name || !last_name || !email) {
    return res.status(400).json({ message: 'Missing required fields: first_name, last_name, email' });
  }
  // Basic email format validation
  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }
  try {
    const [result] = await connection.execute(
      'INSERT INTO faculty (first_name, last_name, email) VALUES (?, ?, ?)',
      [first_name, last_name, email]
    );
    res.status(201).json({ message: 'Faculty created successfully', facultyId: result.insertId });
  } catch (err) {
    console.error('Error creating faculty:', err);
    res.status(500).json({ message: 'Error creating faculty' });
  }
};

// Update faculty by ID
exports.updateFaculty = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email } = req.body;

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }

  // Basic validation for update - ensure at least one field is provided if not all are required
  if (!first_name && !last_name && !email) {
      return res.status(400).json({ message: 'No update data provided.' });
  }
    // Basic email format validation if email is provided
  if (email && !/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
  }
  try {
    const [result] = await connection.execute(
      'UPDATE faculty SET first_name = ?, last_name = ?, email = ? WHERE faculty_id = ?',
      [first_name, last_name, email, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Faculty not found' });
    }
    res.json({ message: 'Faculty updated successfully' });
  } catch (err) {
    console.error('Error updating faculty:', err);
    res.status(500).json({ message: 'Error updating faculty' });
  }
};

// Delete faculty by ID
exports.deleteFaculty = async (req, res) => {
  const { id } = req.params;

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }

  try {
    const [result] = await connection.execute('DELETE FROM faculty WHERE faculty_id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Faculty not found' });
    }
    res.json({ message: 'Faculty deleted successfully' });
  } catch (err) {
    console.error('Error deleting faculty:', err);
    res.status(500).json({ message: 'Error deleting faculty' });
  }
};