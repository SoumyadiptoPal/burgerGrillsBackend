const mongoose=require('mongoose');
const orderSchema=new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    address:{
        type:String,
    },
    city:{
        type: String,
    },
    country:{
        type: String,
    },
    pincode:{
        type: String,
    },
    contact:{
        type:String
    },
    Burger:[{
        title:String,
        description:String,
        tag:String,
        price:String,
        quantity:String,
        extras:Object,
        removals:Object
}]

});

module.exports=mongoose.model('order', orderSchema);