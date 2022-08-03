const mongoose = require("mongoose");


const AdminProductSchema = new mongoose.Schema({
    title:{
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
    adminId:{
        type: mongoose.Types.ObjectId,
        ref:'Admin',
        required: true
    }
})

const AdminProduct = new mongoose.model("AdminProduct", AdminProductSchema);
module.exports = AdminProduct;