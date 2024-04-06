const express = require('express');
const router = express.Router();
const landlordController = require('../controllers/landlordController');
const landlordAction = require('../controllers/actioncontrollers/landlordaction');
const bcrypt = require('bcrypt');

router.post('/signup',async (req,res) => {
    const {name, username, email, password,adminid} = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    try {
    const newLandlord = await landlordController.AddLanloard(name, username, email, hashedPassword,adminid);
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

//getting property details 
router.post('/getPendingProperty/:id', async (req, res) => {
    try {
        const landlordid = req.params.id;
        const pendingProperties = await landlordAction.getpendingprop(landlordid);
        res.status(200).json(pendingProperties);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error while retrieving the data");
    }
});

router.post('/getapprovedProperty/:id', async (req, res) => {
    try {
        const landlordid = req.params.id;
        const apprvedProperties = await landlordAction.getapprovedprop(landlordid);
        res.status(200).json(apprvedProperties);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error while retrieving the data");
    }
});

router.post('/getrejectProperty/:id', async (req, res) => {
    try {
        const landlordid = req.params.id;
        const rejectedProperties = await landlordAction.getrejectedprop(landlordid);
        res.status(200).json(rejectedProperties);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error while retrieving the data");
    }
});

//getting reservation details 
router.post('/getPendingreservation/:id', async (req, res) => {
    try {
        const landlordid = req.params.id;
        const pendingProperties = await landlordAction.allPendReser(landlordid);
        res.status(200).json(pendingProperties);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error while retrieving the data");
    }
});

router.post('/getapprovedreservation/:id', async (req, res) => {
    try {
        const landlordid = req.params.id;
        const apprvedProperties = await landlordAction.allAccReserv(landlordid);
        res.status(200).json(apprvedProperties);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error while retrieving the data");
    }
});

router.post('/getrejectreservation/:id', async (req, res) => {
    try {
        const landlordid = req.params.id;
        const rejectedProperties = await landlordAction.allRejReserv(landlordid);
        res.status(200).json(rejectedProperties);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error while retrieving the data");
    }
});

//accept or reject servation 
router.post('/reservation/accept/:lid/:reservationid',async (req,res) => {
    try {
        const landloarid = req.params.lid;
        const reservationid = req.params.reservationid;
        const accpreservation = await landlordAction.AccReserv(reservationid,landloarid);
        res.status(201).json(accpreservation);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error");
    }
});
router.post('/reservation/reject/:lid/:reservationid', async (req,res) => {
    try {
        const landloarid = req.params.lid;
        const reservationid = req.params.reservationid;
        const rejectreservation = await landlordAction.RejReserv(reservationid,landloarid);
        res.status(201).json(rejectreservation);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error");
    }
});

module.exports = router;
