const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');

router.post('/create', async (req, res) => {
    const { price, address, lat, lng, picture, name, description, userid } = req.body;

    try {
        const newProperty = await propertyController.createProperty(price, address, lat, lng, picture, name, description, userid);
        res.json(newProperty);
        res.status(201).end();
    } catch (error) {
        console.error("Error creating property", error);
        res.status(500).send("Error creating property");
    }
});

module.exports = router;
