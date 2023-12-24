const mongoose=require('mongoose');
const InitialBurgersSchema=new mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    ingredients:{
        type: Object
    },
    tag:{
        type:String,
    },
    price:{
        type: String,
    },
    image:{
        type: String,
    }

});

module.exports=mongoose.model('initialburger', InitialBurgersSchema);