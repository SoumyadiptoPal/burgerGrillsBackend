const express = require('express');
const router = express.Router();
const order = require('../models/Order');

//Add a new customer by POST "/api/order/addorder"
router.post('/addorder', async (req, res) => {
    try {
        const { name, email, address, city, country, pincode, contact, Burger } = req.body;
        const Order = new order({
            name,email, address, city, country, pincode, contact, Burger
        })
        const savedOrder = await Order.save()
        res.json(savedOrder)

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})

//Get all orders by GET "/api/order/getorder"
router.get('/getorder',async (req,res)=>{
    try{
        const Order=await order.find();
        res.json(Order)
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//delete order by DELETE "/api/order/deleteorder"
router.delete('/deleteorder/:id',async(req,res)=>{
try{
    let Order = await order.findById(req.params.id);
    if (!Order) { return res.status(404).send("Not Found") }

    Order = await order.findByIdAndDelete(req.params.id)
    res.json({ "Success": "Order has been deleted", Order:Order});
}catch(error)
{
    console.error(error.message);
        res.status(500).send("Internal Server Error");
}
})

module.exports=router;