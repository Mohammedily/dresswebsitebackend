const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    _id:{
        type:mongoose.Types.ObjectId,
        ref:"AdminProduct",
        required: true
    }
    ,title:{
        type:String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    noofquantity:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    size:{
        type: String,
        required: true
    },
    adminId:{
        type: mongoose.Types.ObjectId,
        ref:'Admin',
        required: true
    },
    clientId:{
        type: mongoose.Types.ObjectId,
        ref:'Client',
        required: true
    }
});

const Cart = new mongoose.model("Cart", CartSchema);
module.exports = Cart;