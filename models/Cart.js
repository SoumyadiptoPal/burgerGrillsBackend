const mongoose=require('mongoose');
const CartSchema=new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type:String
    },
    description:{
        type:String
    },
    tag:{
        type:String,
    },
    price:{
        type: String,
    },
    image:{
        type: String,
    },
    extras:{
        type: Object
    },
    removals:{
        type: Object
    },
    quantity:{
        type: String
    }
});

module.exports=mongoose.model('cart', CartSchema);