const mongoose=require('mongoose');
const KitchenSchema=new mongoose.Schema({
    title:{
        type:String
    },
    price:{
        type: String,
    },
    image:{
        type: String,
    },
    quantity:{
        type:String
    }

});

module.exports=mongoose.model('Kitchen', KitchenSchema);
