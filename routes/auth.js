const express = require('express');
const router=express.Router();
const User=require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Harryisagoodb$oy';



//Create a user usig POST /api/auth/createuser
router.post('/createuser',[
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
  body('address', 'Enter a valid name').isLength({ min: 3 }),
  body('city', 'Enter a valid city').isLength({ min: 3 }),
  body('country', 'Enter a valid country').isLength({ min: 3 }),
  body('pincode', 'Enter a valid pincode').isLength({ min: 3 }),
  body('contact', 'Enter a valid contact').isLength({ min: 3 }),
],async (req,res)=>{
  // console.log(req.body);
  let success=false;
  const errors=validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({success, errors:errors.array()})
  }
  try{
    //check whether the user with this enail id already exists
    let user = await User.findOne({email: req.body.email });
    if(user){
      return res.status(400).json({success,error: "Sorry a user with this email alresdy exists"});
    }  
    success=true;
    const salt=await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    user= await User.create({
    name:req.body.name,
    email:req.body.email,
    password:secPass,
    address:req.body.address,
    city:req.body.city,
    country:req.body.country,
    pincode:req.body.pincode,
    contact:req.body.contact,
  });
  // await user.save();

  const data={
    user:{
      id: user.id
    }
  }

  const authtoken=jwt.sign(data, JWT_SECRET);

  res.json({success,authtoken})

}catch(error)
{
  console.error(error.message);
  res.status(500).send("Internal Server Error");
}
})

// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  let success = false;
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      success = false
      return res.status(400).json({success, error: "Please try to login with correct credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success = false
      return res.status(400).json({ success, error: "Please try to login with correct credentials" });
    }

    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authtoken })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 3: Get User Details
router.post('/getuser', fetchuser,  async (req, res) => {

  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

//Route 4:Update User details
router.put('/updateuser/:id',fetchuser,async(req,res)=>{
  const {name,email,password,address,city,country,pincode,contact}=req.body;
  const salt=await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
  try{
    const newuser={
        name:name,
        email: email,
        password: secPass,
        address: address,
        city: city,
        country: country,
        pincode: pincode,
        contact: contact
    }
    let user = await User.findById(req.params.id);
        if (!user) { return res.status(404).send("Not Found") }

        user=await User.findByIdAndUpdate(req.params.id, { $set: newuser }, { new: true }).select("-password")

  }catch(error){
    console.log(error.message);
  }
})

router.get('/getallUsers',async (req,res)=>{
  try{
      const users=await User.find();
      res.json(users)
  }catch(error){
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
})

module.exports=router