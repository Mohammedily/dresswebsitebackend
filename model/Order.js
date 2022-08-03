const mongoose = require("mongoose");


const OrderSchema = new mongoose.Schema({
    email:{
        type:String
    },
    source:{
        type:String
    },
    name:{
     type:String
    },
    amount:{
        type:Number
    },
    currrency:{
        type:String
    },
    productName:{
        type:String
    },
    productPrice:{
        type:String
    },
    productQty:{
        type:String
    },
    Date:{
     type:Date,
   default: () => Date.now() + 3*60*60*1000
    },
    shippingAddress:{
        address:{type:String},
        city:{type:String},
        country:{type:String},
        postalCode:{type:Number}
    },
    item:[{
        _id:{
            type:mongoose.Types.ObjectId,
            required: true
        },
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
        quantity:{
            type: Number,
            required: true
        },
        adminId:{
            type: mongoose.Types.ObjectId,
            ref:'Admin',
            required: true
        },
}],
    clientId:{
        type:mongoose.Types.ObjectId,
        ref:"Client",
        required:true
    },
    orderstatus:{
        type:String
    }
})


const Order = new mongoose.model("Order", OrderSchema);
module.exports = Order;