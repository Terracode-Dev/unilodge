const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const bcrypt = require('bcrypt');

router.get('/:userid', async (req, res) => {
    
    try {
        console.log("User id for reservations: ", req.params.userid);
        const properties = await propertyController.getReservedProperties(req.params.userid);
        console.log("Properties: ", properties);
        res.json(properties);
        res.status(200).end();
    } catch (error) {
        console.error("Error getting properties", error);
        res.status(500).send("Error getting properties");
    }
});

router.put('/:resStatid', async (req, res) => {
    try {
        console.log("Reservation status id: ", req.params.resStatid);
        console.log("Status: ", req.body.status);
        await propertyController.updateReservationStatus(req.params.resStatid, req.body.status);
        res.status(200).end();
    } catch (error) {
        console.error("Error updating reservation status", error);
        res.status(500).send("Error updating reservation status");
    }
});

router.post('/', async (req, res) => {
    try {
        await propertyController.addReservation(req.body.pid, req.body.lid , req.body.uid);
        res.status(200).end();
    } catch (error) {
        console.error("Error updating reservation status", error);
        res.status(500).send("Error updating reservation status");
    }
});

module.exports = router;
