const mongoose = require("mongoose");


const ClientSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    }, 
    Carts:[{
        type:mongoose.Types.ObjectId,
        ref:"Cart",
        required: true
    }],
    Orders:[{
        type:mongoose.Types.ObjectId,
        ref:"Order",
        required: true
    }]
});


const Client = new mongoose.model("Client", ClientSchema);
module.exports = Client;