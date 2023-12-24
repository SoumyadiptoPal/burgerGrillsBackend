const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Cart = require('../models/Cart');

// ROUTE 1: Get All the burgers in the cart using: GET "/api/carts/fetchallcart". Login required
router.get('/fetchallcart', fetchuser, async (req, res) => {
    try {
        const cart = await Cart.find({ user: req.user.id });
        res.json(cart)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Add a new Burger in Cart using: POST "/api/carts/addcart". Login required
router.post('/addcart', fetchuser, async (req, res) => {
        try {
            const { title, description, tag, price, image, extras, removals, quantity } = req.body;
            const cart = new Cart({
                title, description, tag, price, image, extras, removals, quantity, user: req.user.id
            })
            const savedCart = await cart.save()
            res.json(savedCart)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

// ROUTE 3: Update an existing Cart using: PUT "/api/cart/updatecart/". Login required
router.put('/updatecart/:id', fetchuser, async (req, res) => {
    const { quantity } = req.body;
    try {
        // Create a newCart object
        const newCart = {};
        if (quantity) { newCart.quantity = quantity };

        // Find the Cart to be updated and update it
        let cart = await Cart.findById(req.params.id);
        if (!cart) { return res.status(404).send("Not Found") }

        if (cart.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        cart = await Cart.findByIdAndUpdate(req.params.id, { $set: newCart }, { new: true })
        res.json({ cart });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 4: Delete an existing Burger from a cart using: DELETE "/api/carts/deletecart". Login required
router.delete('/deletecart/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let cart = await Cart.findById(req.params.id);
        if (!cart) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Cart
        if (cart.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        cart = await Cart.findByIdAndDelete(req.params.id);
        res.json({cart});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router