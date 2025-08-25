const express = require('express');
const { login } = require('../controllers/authController'); // Adjust path as needed

const router = express.Router();

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
router.post('/login', login);

module.exports = router;