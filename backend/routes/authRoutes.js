const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const bcrypt = require('bcrypt');

router.post('/', authController.loginUser);

module.exports = router;
