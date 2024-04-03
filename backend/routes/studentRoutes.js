const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const bcrypt = require('bcrypt');

router.post('/signup',async (req,res) => {
    const {name, username, email, password} = req.body;

    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        const newStudent  = await studentController.createStudent(name, username, email, hashedPassword);
        res.json(newStudent);
        res.status(201).end();
    } catch (error) {
        console.error("Error creating student", error);
        res.status(500).send("Error creating student");
    }
})

router.delete('/delete/:userid', async (req, res) => {
    try {
        await studentController.deleteStudent(req.params.userid);
        res.send('Student deleted');
        res.status(204).end();
    } catch (error) {
        console.error("Error deleting student", error);
        res.status(500).send("Error deleting student");
    }
})
module.exports = router;
