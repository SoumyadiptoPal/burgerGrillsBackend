const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Burger = require('../models/Burger');

// ROUTE 1: Get All the Burgers using: GET "/api/burgers/fetchallburgers". Login required
router.get('/fetchallburgers', fetchuser, async (req, res) => {
    try {
        const burgers = await Burger.find({ user: req.user.id });
        res.json(burgers)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Add a new Burger using: POST "/api/burgers/addburger". Login required
router.post('/addburger', fetchuser, async (req, res) => {
        try {
            const { title, description, tag, price, image, extras, removals, quantity } = req.body;
            const burger = new Burger({
                title, description, tag, price, image, extras, removals, quantity, user: req.user.id
            })
            const savedBurger = await burger.save()
            res.json(savedBurger)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

module.exports = router