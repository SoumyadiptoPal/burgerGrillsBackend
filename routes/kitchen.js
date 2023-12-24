const express = require('express');
const router = express.Router();
const Kitchen = require('../models/Kitchen');

//Add a new item to the kitchen using POST "/api/kitchen/addKitchen".
router.post('/addKitchen', async (req, res) => {
    try {
        const { title, price, image, quantity} = req.body;
        const kitchen = new Kitchen({
            title, price, image, quantity
        })
        const savedKitchen = await kitchen.save()
        res.json(savedKitchen)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//get all items in the kitchen using GET "/api/kitchen/getKitchen"
router.get('/getKitchen',async (req,res)=>{
    try{
        const kitchen=await Kitchen.find();
        res.json(kitchen);
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 3: Update an existing Cart using: PUT "/api/kitchen/updateKitchen/". Login required
router.put('/updateKitchen/:id', async (req, res) => {
    const { quantity } = req.body;
    try {
        // Create a newCart object
        const newitem = {};
        if (quantity) { newitem.quantity = quantity };

        // Find the item to be updated and update it
        let item = await Kitchen.findById(req.params.id);
        if (!item) { return res.status(404).send("Not Found") }

        item = await Kitchen.findByIdAndUpdate(req.params.id, { $set: newitem }, { new: true })
        res.json({ item });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports=router;