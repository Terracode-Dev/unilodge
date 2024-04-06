const express = require('express');
const router = express.Router();
const wardenController = require('../controllers/wardenController');
const wardenactrion =  require('../controllers/actioncontrollers/wardenaction');
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

router.delete('/deletewarden/:userid', async (req, res) => {
    try {
        await wardenController.deleteWarden(req.params.userid);
        res.send('Warden deleted');
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting warden");
    }
})

router.post('searchproperty/:propid',async () =>{
    try {
        const propertyid = req.params.propid;
        const propertydetail = await wardenactrion.searchPropDetail(propertyid);
        res.status(200).json(propertydetail);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error");
    }
});

router.post('approveProperty/:propertyid/:wardenid',async (req ,res) =>{
    try {
        const propertyid = req.params.propertyid;
        const wardern = req.params.wardenid;
        await wardenactrion.Approveprop(propertyid,wardern);
        res.status(200).send("Approved Successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error");
    }
});

router.post('rejectProperty/:propertyid/:wardenid',async (req ,res) =>{
   try {
        const propertyid = req.params.propertyid;
        const wardern = req.params.wardenid;
        await wardenactrion.RejectProp(propertyid,wardern);
        res.status(200).send("Rejected Successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error");
    } 
});



router.post('getallpendingProperty',async (req ,res) =>{
    try {
        const pendingprop = await wardenactrion.getAllpending();
        res.status(200).json(pendingprop);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error");
    }
});

router.post('getallapprovedproperty',async (req ,res) =>{
   try {
        const approvedprop = await wardenactrion.getAllApprovedProperties();
        res.status(200).json(approvedprop);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error");
    } 
});

router.post('getllrejecedproperty',async (req ,res) =>{
    try {
        const rejectedprop = await wardenactrion.getAllRejectedProperties();
        res.status(200).json(rejectedprop);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error");
    }    
});


module.exports = router;
