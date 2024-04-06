const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const articleController = require('../controllers/articleController');
const bcrypt = require('bcrypt');

router.post('/signup',async (req,res) => {
    const {name,email, username, password,contact} = req.body;

    // Generate a salt
    const salt = await bcrypt.genSalt(10);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, salt);
    
    try {
        const newAdmin = await adminController.createAdmin(name,email, username, hashedPassword,contact);
        res.json(newAdmin);
        res.status(201).end();
    } catch (error) {
        console.error("Error creating Admin", error);
        res.status(500).send("Error creating Admin");
    }
})

router.post('/createblog',async (req,res) => {
    console.log("req body",req.body)
    const { title, description, image} = req.body;
    
    try {
        const newArticle = await articleController.createArticle(title, description, image);
        res.json(newArticle);
        res.status(201).end();
    } catch (error) {
        console.error("Error creating Article", error);
        res.status(500).send("Error creating Article");
    }
})

module.exports = router;
