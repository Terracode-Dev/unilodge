const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const bcrypt = require('bcrypt');

router.post('/signup',async (req,res) => {
    const {name,email, username, password,contact} = req.body;

    // Generate a salt
    const salt = await bcrypt.genSalt(10);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, salt);
    
    try {
        const newAdmin = await adminController.createAdmin(name,email, username, hashedPassword,contact);
        res.json(newAdmin);
        res.status(201).end();
    } catch (error) {
        console.error("Error creating Admin", error);
        res.status(500).send("Error creating Admin");
    }
})

module.exports = router;
