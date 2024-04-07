const express = require('express');
const router = express.Router();
const landlordController = require('../controllers/landlordController');
const propertyController = require('../controllers/propertyController');
const bcrypt = require('bcrypt');

router.post('/signup',async (req,res) => {
    const {name, username, email, password,contact} = req.body;

    // Generate a salt
    const salt = await bcrypt.genSalt(10);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, salt);
    
    try {
        const newLandlord = await landlordController.createLandlord(name, username, email, hashedPassword,contact);
        res.json(newLandlord);
        res.status(201).end();
    } catch (error) {
        console.error("Error creating landlord", error);
        res.status(500).send("Error creating landlord");
    }
})

router.delete('/delete/:userid', async (req, res) => {
    try {
        await landlordController.deleteLandlord(req.params.userid);
        res.send('Landlord deleted');
        res.status(204).end();
    } catch (error) {
        console.error("Error deleting landlord", error);
        res.status(500).send("Error deleting landlord");
    }
})

router.put('/update/:propid',async (req,res) => {
    const {name, adress, description} = req.body;
    try {
        await propertyController.updateProperty(req.params.propid, name, adress, description);
        res.send('Property updated');
        res.status(200).end();
    } catch (error) {
        console.error("Error updating property", error);
        res.status(500).send("Error updating property");
    }
})

module.exports = router;
