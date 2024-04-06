const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const studnetaction = require('../controllers/actioncontrollers/studentaction');
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

router.post('/Addreservation/:propid/:studentid', async (req, res) => {
    try {
        const { description } = req.body;
        const studentid = req.params.studentid;
        const propertyid = req.params.propid;
        await studnetaction.AddReservation(studentid, propertyid, description);
        res.status(200).send("Reservation added successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error occurred while adding reservation");
    }
});


router.delete('/cancelreservation/:resid', async(req,res) => {
    try {
        const reservationid = req.params.resid; 
        await studnetaction.CancelReservation(reservationid);
        res.status(204).end();
    } catch (error) {
        console.log(error);
        res.status(500).send("Error occurred while canceling the reservation");
    }
});

router.post('/reservation/pending/:studentid', async (req, res) => {
    try {
        const reservedstid = req.params.studentid;
        const pendingReservations = await studnetaction.getPendReser(reservedstid);
        res.status(200).json(pendingReservations);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error with retrieving data from the database");
    }
});

router.post('/reservation/accept/:studentid', async (req,res) => {
    try {
        const reservedstid = req.params.studentid;
        res.status(200).json(await studnetaction.getAccReserv(reservedstid));
    } catch (error) {
        console.log(error);
        res.status(500).send("Error with rectiveing data from the database");
    }
});

router.post('/reservation/reject/:studentid', async (req,res) => {
    try {
        const reservedstid = req.params.studentid;
        res.status(200).json(await studnetaction.getRejReserv(reservedstid));
    } catch (error) {
        console.log(error);
        res.status(500).send("Error with rectiveing data from the database");
    }
});

module.exports = router;
