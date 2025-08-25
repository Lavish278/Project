const db = require('../server'); // Adjust the path based on your structure

const getAllGrades = async (req, res) => {
  try {
    const [rows, fields] = await db.promise().query('SELECT * FROM grades');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching grades:', err);
    res.status(500).send('Error fetching grades');
  }
};

const getGradeById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows, fields] = await db.promise().query('SELECT * FROM grades WHERE grade_id = ?', [id]);
    if (rows.length === 0) {
      res.status(404).send('Grade not found');
    } else {
      res.json(rows[0]);
    }
  } catch (err) {
    console.error('Error fetching grade by ID:', err);
    res.status(500).send('Error fetching grade by ID');
  }
};

const createGrade = async (req, res) => {
  // Authorization: Only admins can create grades
  if (req.user.role !== 'admin') {
    return res.status(403).send('Forbidden: Only administrators can create grades.');
  }

  const { enrollment_id, assignment_name, grade, date_recorded } = req.body;

  if (!enrollment_id || !assignment_name || !grade || typeof enrollment_id !== 'number') {
    return res.status(400).send('Required fields (enrollment_id, assignment_name, grade) are missing or enrollment_id is not a number.');
  }

  try {
    const [result] = await db.promise().query(
      'INSERT INTO grades (enrollment_id, assignment_name, grade, date_recorded) VALUES (?, ?, ?, ?)',
      [enrollment_id, assignment_name, grade, date_recorded]
    );
    res.status(201).json({ id: result.insertId, message: 'Grade created successfully' });
  } catch (err) {
    console.error('Error creating grade:', err);
    res.status(500).send('Error creating grade');
  }
};

const updateGrade = async (req, res) => {
  // Authorization: Only admins can update grades
  if (req.user.role !== 'admin') {
    return res.status(403).send('Forbidden: Only administrators can update grades.');
  }

  const { id } = req.params;
  const { enrollment_id, assignment_name, grade, date_recorded } = req.body;

  if (!enrollment_id || !assignment_name || !grade || typeof enrollment_id !== 'number') {
    return res.status(400).send('Required fields (enrollment_id, assignment_name, grade) are missing or enrollment_id is not a number.');
  }

  try {
    const [result] = await db.promise().query(
      'UPDATE grades SET enrollment_id = ?, assignment_name = ?, grade = ?, date_recorded = ? WHERE grade_id = ?',
      [enrollment_id, assignment_name, grade, date_recorded, id]
    );
    if (result.affectedRows === 0) {
      res.status(404).send('Grade not found');
    } else {
      res.json({ message: 'Grade updated successfully' });
    }
  } catch (err) {
    console.error('Error updating grade:', err);
    res.status(500).send('Error updating grade');
  }
};

const deleteGrade = async (req, res) => {
  // Authorization: Only admins can delete grades
  if (req.user.role !== 'admin') {
    return res.status(403).send('Forbidden: Only administrators can delete grades.');
  }

  const { id } = req.params;
  try {
    const [result] = await db.promise().query('DELETE FROM grades WHERE grade_id = ?', [id]);
    if (result.affectedRows === 0) {
      res.status(404).send('Grade not found');
    } else {
      res.json({ message: 'Grade deleted successfully' });
    }
  } catch (err) {
    console.error('Error deleting grade:', err);
    res.status(500).send('Error deleting grade');
  }
};

module.exports = {
  getAllGrades,
  getGradeById,
  createGrade,
  updateGrade,
  deleteGrade,
};