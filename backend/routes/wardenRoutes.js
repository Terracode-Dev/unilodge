const express = require('express');
const router = express.Router();
const wardenController = require('../controllers/wardenController');
const bcrypt = require('bcrypt');

router.post('/signup',async (req,res) => {
    const {name, username, email, password} = req.body;

    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        const newWarden  = await wardenController.createWarden(name, username, email, hashedPassword);
        res.json(newWarden);
        res.status(201).end();
    } catch (error) {
        console.error("Error creating warden", error);
        res.status(500).send("Error creating warden");
    }
})

router.delete('/delete/:userid', async (req, res) => {
    try {
        await wardenController.deleteWarden(req.params.userid);
        res.send('Warden deleted');
        res.status(204).end();
    } catch (error) {
        console.error("Error deleting student", error);
        res.status(500).send("Error deleting student");
    }
})
module.exports = router;
