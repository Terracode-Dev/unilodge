const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const admincontroller = require('../controllers/admincontroller');
const adminactioncontroller = require('../controllers/actioncontrollers/adminaction');

router.post('/editUser/:userid',async (req,res) => {
    try {
        const { name, username, email, password} = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const editedUser = await admincontroller.editUserdetail(name,username,email,hashedPassword);
        res.json(editedUser);
        res.json(201).end();
    } catch (error) {
        console.log(error)
        res.status(500).send("Error with Updating the User details")
    }
})

router.delete('/deleteartical/:articalid',async (req,res) => {
    try {
        const {articalId} = req.body;
        const deleteartical = adminactioncontroller.deleteArticle(articalId);
        res.json(deleteartical);
        res.status(200).end();
    } catch (error) {
        console.log(error);
        res.status(500).send("Error with deleting the artical")
    }
    
})


router.post('/getArtical/:articalid',async (req,res) =>{
    try {
        const {articalId} = req.body;
        const articaldetail = adminactioncontroller.getArticleById(articalId);
        res.json(articaldetail);
        res.status(200).end();
    } catch (error) {
        console.log(error)
        res.status(500).send("Error with rectriving the data")
        
    }
})


router.post('./getAllartical',async (req,res)=>{
    try {
        const articals = adminactioncontroller.getAllArticles();
        res.json(articals)
        res.status(200).end();
    } catch (error) {
        console.log(error)
        res.status(500).send("Error with rectiveing the data")
        
    }
})


router.post('/updateArtical/:articalid',async (req,res) => {
    try {
        const {articalId, adminID, title, description, image} = req.body;
        const updateArtical = adminactioncontroller.updateArticle(articalId,adminID,title,description,image);
        res.json(updateArtical);
        res.status(200).end();
    } catch (error) {
        console.log(error)
        res.status(500).send("Error with updating the details")   
    }
})