const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const admincontroller = require('../controllers/admincontroller');
const adminactioncontroller = require('../controllers/actioncontrollers/adminaction');

router.post('/editUser/:userId', async (req, res) => {
    try {
        const { name, username, email, password } = req.body;
        const userId = req.params.userId;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const editedUserMessage = await admincontroller.editUserdetail(userId, name, username, email, hashedPassword);
        res.status(200).json({ message: editedUserMessage });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error with Updating the User details");
    }
});

router.delete('/deleteartical/:articalid', async (req, res) => {
    try {
        await adminactioncontroller.deleteArticle(req.params.articalid);
        res.status(204).send("Article Deleted"); 
    } catch (error) {
        console.log(error);
        res.status(500).send("Error with deleting the article");
    }
});



router.post('/getArtical/:articalid', async (req, res) => {
    try {
        const articaldetail = await adminactioncontroller.getArticleById(req.params.articalid);
        res.status(200).json(articaldetail); 
    } catch (error) {
        console.log(error);
        res.status(500).send("Error with retrieving the data");
    }
});



router.post('/getAllartical',async (req,res)=>{
    try {
        const articals = adminactioncontroller.getAllArticles();
        res.json(articals)
        res.status(200).end();
    } catch (error) {
        console.log(error)
        res.status(500).send("Error with rectiveing the data")
        
    }
})


router.post('/updateArtical/:articalid', async (req, res) => {
    try {
        const { adminID, title, description, image } = req.body;
        const articalId = req.params.articalid; 
        const updateArtical = await adminactioncontroller.updateArticle(articalId, adminID, title, description, image);
        res.status(200).json(updateArtical); 
    } catch (error) {
        console.log(error);
        res.status(500).send("Error with updating the details");
    }
});


module.exports = router