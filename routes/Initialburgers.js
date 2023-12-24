const express = require('express');
const router = express.Router();
const InitialBurger = require('../models/InitialBurger');

//Add a new Burger using POST "/api/Initialburgers/addIburger".
router.post('/addIburger', async (req, res) => {
    try {
        const { title, description, ingredients, tag, price, image } = req.body;
        const burger = new InitialBurger({
            title, description, ingredients, tag, price, image
        })
        const savedBurger = await burger.save()
        res.json(savedBurger)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
router.get('/getBurger',async (req,res)=>{
    try{
        const burger=await InitialBurger.find();
        res.json(burger)
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 4: Delete an existing Burger using: DELETE "/api/Initialburgers/deleteBurger".
router.delete('/deleteBurger/:id', async (req, res) => {
    try {
        // Find the burger to be deleted and delete it
        let burger = await InitialBurger.findById(req.params.id);
        if (!burger) { return res.status(404).send("Not Found") }

        burger = await InitialBurger.findByIdAndDelete(req.params.id);
        res.json({burger});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports=router;