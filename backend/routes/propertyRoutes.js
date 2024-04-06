const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');

router.post('/Addproperty', async (req,res) => {
    try {
        const {price,address,lat,lng,picture,name,lid} = req.body;
        const NewProperty = await propertyController.createProperty(price,address,lat,lng,picture,name,lid);
        res.json(NewProperty);
        res.status(201).end();
    } catch (error) {
        console.log(error);
        res.status(500).send("Error - Adding Property");
    }
});

router.post('/Editproperty/:propertyid', async (req,res) => {
    try {
        const properyid = req.params.propertyid;
        const {price,address,lat,lng,picture,name,lid} = req.body;
        await propertyController.edtiPropety(price,address,lat,lng,picture,name,lid,properyid)
    } catch (error) {
        console.log(error);
        res.status(500).send("Error - Editing Property");
    }
});

router.delete('/Delet/:propertyid',async (req,res) => {
    try {
        const properyid = req.params.propertyid;
        await propertyController.deteleProperty(properyid);
        res.send("Deleted Successfully");
        res.status(204).end();
    } catch (error) {
        console.log(error);
        res.status(500).send("Error - Deleting Property");
    }
});

module.exports = router;