const express = require('express');
const router = express.Router();
const landlordController = require('../controllers/landlordController');
const bcrypt = require('bcrypt');

router.post('/signup',async (req,res) => {
    const {name, username, email, password} = req.body;

    // Generate a salt
    const salt = await bcrypt.genSalt(10);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, salt);
    
    try {
        const newLandlord = await landlordController.AddLanloard(name, username, email, hashedPassword);
        res.json(newLandlord);
        res.status(201).end();
    } catch (error) {
        console.error("Error creating landlord", error);
        res.status(500).send("Error creating landlord");
    }
})

router.delete('/delete/:userid', async (req, res) => {
    try {
        await landlordController.deleteLandLoad(req.params.userid);
        res.send('Landlord deleted');
        res.status(204).end();
    } catch (error) {
        console.error("Error deleting landlord", error);
        res.status(500).send("Error deleting landlord");
    }
})

module.exports = router;
