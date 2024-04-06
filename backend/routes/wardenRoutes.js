const express = require('express');
const router = express.Router();
const wardenController = require('../controllers/wardenController');
const propertyController = require('../controllers/propertyController');
const bcrypt = require('bcrypt');

router.post('/signup',async (req,res) => {
    const {name, username, email, password,contact} = req.body;

    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        const newWarden  = await wardenController.createWarden(name, username, email, hashedPassword,contact);
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

router.get('/pending', async (req,res) => {
    
    try {
        const properties = await propertyController.getPendingProperties();
        res.json(properties);
        res.status(200).end();
    } catch (error) {
        console.error("Error getting properties", error);
        res.status(500).send("Error getting properties");
    }
});

router.put('/updatestat/:propid', async (req , res) => {

    console.log("Inside updatestat and data is:", req.body);
    const { status } = req.body;
    const propid = req.params.propid;

    try {
        const updatedProperty = await propertyController.updateStatus(propid,status)
        res.json(updatedProperty);
        res.status(200).end();
    } catch (error) {
        console.error("Error updating property status", error);
        res.status(500).send("Error updating property status");
    }
});

module.exports = router;
