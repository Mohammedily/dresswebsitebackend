const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
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
    Products:[{
        type: mongoose.Types.ObjectId,
        ref:"AdminProduct",
        required: true
    }]
})

const Admin = new mongoose.model("Admin", AdminSchema);
module.exports = Admin;